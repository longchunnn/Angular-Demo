import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArenaRoutingModule } from './arena-routing.module';

import { ArenaComponent } from './pages/arena/arena.component';
import { ArenaMatchingComponent } from './pages/arena-matching/arena-matching.component';


@NgModule({
  declarations: [
    ArenaComponent,
    ArenaMatchingComponent
  ],
  imports: [
    CommonModule,
    ArenaRoutingModule
  ]
})
export class ArenaModule { }
