import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { AdminExerciseComponent } from './pages/admin-exercise/admin-exercise.component';


@NgModule({
  declarations: [
    AdminExerciseComponent
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule
  ]
})
export class AdminExerciseModule { }
