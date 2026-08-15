import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { DictationRoutingModule } from './dictation-routing.module';
import { DictationComponent } from './pages/dictation/dictation.component';
import { DictationDetailComponent } from './pages/dictation-detial/dictation-detail.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DictationComponent, DictationDetailComponent],
  imports: [
    CommonModule,
    DictationRoutingModule,
    ButtonModule,
    AccordionModule,
    TagModule,
    FormsModule
  ],
})
export class DictationModule {}
