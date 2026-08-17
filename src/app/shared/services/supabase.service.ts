import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

export interface User {
  id: string;
  email: string;
  role: string;
  name: string | null;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          flowType: 'pkce',
          detectSessionInUrl: true,
          autoRefreshToken: true,
          persistSession: true,
        },
      }
    );

    this.supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
        await this.syncUserToDatabase(session.user);
      }
    });
  }

  private async syncUserToDatabase(authUser: any): Promise<User | null> {
    try {
      const payload = {
        id: authUser.id,
        email: authUser.email,
        name:
          authUser.user_metadata?.['name'] ||
          authUser.user_metadata?.['full_name'] ||
          null,
        avatarUrl: authUser.user_metadata?.['avatar_url'] || null,
      };

      const res = await firstValueFrom(
        this.http.post<{ data: User }>(`${environment.apiUrl}/auth/sync`, payload)
      );
      return res.data;
    } catch (err) {
      console.error('Lỗi sync user về DB:', err);
      return null;
    }
  }


  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await this.supabase.auth.getSession();
    return !!session;
  }

  async getUser(): Promise<User | null> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error || !user) return null;

    return await this.syncUserToDatabase(user);
  }

  async login(email: string, pass: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error || !data.user) return { user: null, error };
    const user = await this.getUser();
    return { user, error: null };
  }

  async register(email: string, pass: string, name: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password: pass,
      options: { data: { name, full_name: name } },
    });

    if (error || !data.user) return { user: null, error };
    const user = await this.getUser();
    return { user, error: null };
  }

  async loginWithGoogle(): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}` },
    });
    if (error) console.error('Google login error:', error);
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) console.error('Logout error:', error);
  }
}