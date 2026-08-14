import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrammarComponent } from './pages/grammar/grammar.component';

const routes: Routes = [
  {
    path: '', component: GrammarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrammarRoutingModule { }
