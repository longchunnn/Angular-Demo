import { AdminGuard } from './core/guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
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

  },
  {
    path:'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'vocabulary', pathMatch: 'full' },
      {
        path:'dictation',
        loadChildren: () => import('./admin/dictation/dictation.module').then(m => m.AdminDictationModule),
      },
      {
        path:'vocabulary',
        loadChildren: () => import('./admin/vocabulary/vocabulary.module').then(m => m.AdminVocabularyModule),
      },  
      {
        path:'grammar',
        loadChildren: () => import('./admin/grammar/grammar.module').then(m => m.AdminGrammarModule),
      },
      {
        path:'flashcard',
        loadChildren: () => import('./admin/flashcard/flashcard.module').then(m => m.AdminFlashcardModule),
      },
      {
        path:'exercise',
        loadChildren: () => import('./admin/exercise/exercise.module').then(m => m.AdminExerciseModule),
      }

    ]

  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}