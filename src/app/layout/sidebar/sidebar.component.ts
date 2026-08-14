import { Component, OnInit, Output } from '@angular/core';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { Router} from '@angular/router';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen : boolean = true;
  @Output() toggleSidebar= new EventEmitter<void>();  
  constructor(private supabaseService: SupabaseService, private router: Router) { }
  
  ngOnInit(): void {
  }
  menuItems: MenuItem[] = [
    { icon: 'pi pi-th-large', label: 'Dashboard', path: '/dashboard' },
    { icon: 'pi pi-book', label: 'Vocabulary', path: '/vocabulary' },
    { icon: 'pi pi-shield', label: 'Arena', path: '/arena' },
    { icon: 'pi pi-caret-right', label: 'Dictation', path: '/dictation' },
    { icon: 'pi pi-file-edit', label: 'Grammar', path: '/grammar' },
  ];
  handleToggleSidebar() {
    this.toggleSidebar.emit();
  }
  async logout() {
    await this.supabaseService.logout();
    this.router.navigate(['/auth/login']);
  }
}
