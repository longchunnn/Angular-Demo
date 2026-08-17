import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictationRoutingModule } from './dictation-routing.module';
import { AdminDictationComponent } from './pages/admin-dictation/admin-dictation.component';


@NgModule({
  declarations: [
    AdminDictationComponent
  ],
  imports: [
    CommonModule,
    DictationRoutingModule
  ]
})
export class AdminDictationModule { }
