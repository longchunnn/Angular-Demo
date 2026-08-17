import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFlashcardComponent } from './pages/admin-flashcard/admin-flashcard.component';

const routes: Routes = [
  {
    path: '',component: AdminFlashcardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardRoutingModule { }
