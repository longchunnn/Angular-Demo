import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrammarRoutingModule } from './grammar-routing.module';
import { AdminGrammarComponent } from './pages/admin-grammar/admin-grammar.component';


@NgModule({
  declarations: [
    AdminGrammarComponent
  ],
  imports: [
    CommonModule,
    GrammarRoutingModule
  ]
})
export class AdminGrammarModule { }
