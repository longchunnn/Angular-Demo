import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SupabaseService} from "../../shared/services/supabase.service";
export interface MenuItem {
  label: string;
  path: string;
}
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  isOpen: boolean = true;
  menuItems: MenuItem[] = [
    { label: 'Flashcard', path: '/admin/flashcard' },
    { label: 'Vocabulary', path: '/admin/vocabulary' },
    { label: 'Exercise', path: '/admin/exercise' },
    { label: 'Dictation', path: '/admin/dictation' },
    { label: 'Grammar', path: '/admin/grammar' },
  ];
  constructor(private router: Router, private supabaseService: SupabaseService) { }

  ngOnInit(): void {
  }
  handleToggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  logout() {
    this.supabaseService.logout().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
