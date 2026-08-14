import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictationComponent } from './pages/dictation/dictation.component';

const routes: Routes = [
  {
    path: '', component: DictationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictationRoutingModule { }
