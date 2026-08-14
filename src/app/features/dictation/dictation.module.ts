import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictationRoutingModule } from './dictation-routing.module';
import { DictationComponent } from './pages/dictation/dictation.component';


@NgModule({
  declarations: [
    DictationComponent
  ],
  imports: [
    CommonModule,
    DictationRoutingModule
  ]
})
export class DictationModule { }
