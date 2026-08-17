import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGrammarComponent } from './pages/admin-grammar/admin-grammar.component';

const routes: Routes = [
  {
    path: '',component: AdminGrammarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrammarRoutingModule { }
