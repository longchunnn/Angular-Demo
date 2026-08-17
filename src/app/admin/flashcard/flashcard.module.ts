import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardRoutingModule } from './flashcard-routing.module';
import { AdminFlashcardComponent } from './pages/admin-flashcard/admin-flashcard.component';


@NgModule({
  declarations: [
    AdminFlashcardComponent
  ],
  imports: [
    CommonModule,
    FlashcardRoutingModule
  ]
})
export class AdminFlashcardModule { }
