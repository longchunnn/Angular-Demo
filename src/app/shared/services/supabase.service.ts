import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export interface User {
  id: string;
  email: string;
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

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          flowType: 'pkce', // 👈 Ép dùng PKCE Flow thay vì Implicit
          detectSessionInUrl: true,
          autoRefreshToken: true,
          persistSession: true,
        },
      },
    );
  }
  async isauthenticated(): Promise<boolean> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();
    return !!session;
  }
  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      name:
        data.user.user_metadata?.['name'] ||
        data.user.user_metadata?.['full_name'] ||
        null,
      avatarUrl: data.user.user_metadata?.['avatar_url'] || null,
    };
  }
  async login(email: string, pass: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error || !data.user) {
      return { user: null, error };
    }

    const user = await this.getUser();
    return { user, error: null };
  }
  async register(
    email: string,
    pass: string,
    name: string,
  ): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { name, full_name: name },
      },
    });

    if (error || !data.user) {
      return { user: null, error };
    }

    const user = await this.getUser();
    return { user, error: null };
  }
  async loginWithGoogle(): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      console.error('Google login error:', error);
    }
  }
  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error);
    }
  }
}
