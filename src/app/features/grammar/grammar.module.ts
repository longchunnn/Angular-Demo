import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrammarRoutingModule } from './grammar-routing.module';
import { GrammarComponent } from './pages/grammar/grammar.component';


@NgModule({
  declarations: [
    GrammarComponent
  ],
  imports: [
    CommonModule,
    GrammarRoutingModule
  ]
})
export class GrammarModule { }
