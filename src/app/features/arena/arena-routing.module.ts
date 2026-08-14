import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaMatchingComponent } from './pages/arena-matching/arena-matching.component';
import { ArenaComponent } from './pages/arena/arena.component';

const routes: Routes = [
  {path: '', component: ArenaComponent},
  {path:'matching',component:ArenaMatchingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArenaRoutingModule { }
