import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';


const routes: Routes = [
  { path: 'auth', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  { path:'',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      { path: 'arena',
        loadChildren: () => import('./features/arena/arena.module').then(m => m.ArenaModule),
      },
      { path: 'vocabulary',
        loadChildren: () => import('./features/vocabulary/vocabulary.module').then(m => m.VocabularyModule),
      },
      { path: 'grammar',
        loadChildren: () => import('./features/grammar/grammar.module').then(m => m.GrammarModule),
      },
      { path: 'dictation',
        loadChildren: () => import('./features/dictation/dictation.module').then(m => m.DictationModule),
      }

    ]

  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}