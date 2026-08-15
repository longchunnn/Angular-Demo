import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DictationExercise, DictationExerciseDetail } from '../../models/dictation';
import { DictationService } from '../../service/dictation.service';

@Component({
  selector: 'app-dictation',
  templateUrl: './dictation.component.html',
  styleUrls: ['./dictation.component.css']
})
export class DictationComponent implements OnInit {
  levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  listExercises: DictationExercise[] = [
    { id: '1', level: 'A1', title: 'Exercise 1', isCompleted: false },
    { id: '2', level: 'A2', title: 'Exercise 2', isCompleted: true },
    { id: '3', level: 'B1', title: 'Exercise 3', isCompleted: false },
    { id: '4', level: 'B2', title: 'Exercise 4', isCompleted: true },
    { id: '5', level: 'C1', title: 'Exercise 5', isCompleted: false },
    { id: '6', level: 'C2', title: 'Exercise 6', isCompleted: true },
    { id: '7', level: 'A1', title: 'Exercise 7', isCompleted: false },
    { id: '8', level: 'A2', title: 'Exercise 8', isCompleted: true },
    { id: '9', level: 'B1', title: 'Exercise 9', isCompleted: false },
    { id: '10', level: 'B2', title: 'Exercise 10', isCompleted: true },
    { id: '11', level: 'C1', title: 'Exercise 11', isCompleted: false },
    { id: '12', level: 'C2', title: 'Exercise 12', isCompleted: true }
  ];

  constructor(
    private dictationService: DictationService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.fetchDictationExercises();
  }

  fetchDictationExercises(): void {
    this.dictationService.getDictationExercises().subscribe(
      exercises => {
        this.listExercises=[...this.listExercises,...exercises];
      }
    )
    ;
  }

  getExercisesByLevel(level: string): DictationExercise[] {
    return this.listExercises.filter(ex => ex.level === level);
  }

  getExerciseDetail(id: string): Observable<DictationExerciseDetail> {
    return this.dictationService.getDictationExerciseDetail(id);
  }

  onExerciseClick(exercise: DictationExercise): void {
    this.router.navigate(['/dictation', exercise.id]);
  }
}