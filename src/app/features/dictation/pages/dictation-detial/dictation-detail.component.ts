import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DictationExerciseDetail,
  checkAnswer,
  getHint,
  getWordByWordDiff,
  HintWord,
  WordDiff
} from '../../models/dictation';
import { DictationService } from '../../service/dictation.service';

@Component({
  selector: 'app-dictation-detail',
  templateUrl: './dictation-detail.component.html',
  styleUrls: ['./dictation-detail.component.css']
})
export class DictationDetailComponent implements OnInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('userInput') userInputRef!: ElementRef<HTMLTextAreaElement>;
  exercise: DictationExerciseDetail | null = null;
  exerciseList: DictationExerciseDetail[] = [];

  inputText: string = '';
  savedUserText: string = '';

  isRevealed: boolean = false;
  isPerfectMatch: boolean = false;
  diffResult: WordDiff[] | null = null;
  hintData: HintWord[] | null = null;

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dictationService: DictationService
  ) {}

  ngOnInit(): void {
    // 1. Danh sách mock data để test
    this.exerciseList = [
      {
        id: '1',
        level: 'A1',
        title: 'Exercise 1',
        content: 'This is the content of Exercise 1.',
        audioUrl: 'http://localhost:5000/media/A1.mp3',
        translation: 'This is the transcript of Exercise 1.',
        isCompleted: true
      },
      {
        id: '2',
        level: 'A1',
        title: 'Exercise 2',
        content: 'This is the content of Exercise 2.',
        audioUrl: 'http://localhost:5000/media/A2.mp3',
        translation: 'This is the transcript of Exercise 2.',
        isCompleted: false
      },
      {
        id: '3',
        level: 'A1',
        title: 'Exercise 3',
        content: 'This is the content of Exercise 3.',
        audioUrl: 'http://localhost:5000/media/B1.mp3',
        translation: 'This is the transcript of Exercise 3.',
        isCompleted: false
      }
    ];

    this.routeSub = this.route.paramMap.subscribe(params => {
      const exerciseId = params.get('id') || '1';
      this.loadMockExercise(exerciseId);
      this.focusInput();
    });
  }
  ngAfterViewInit(): void {
    this.focusInput();
  }

  focusInput(): void {
    setTimeout(() => {
      this.userInputRef?.nativeElement?.focus();
      this.playAudio();
    }, 0);
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadMockExercise(id: string): void {
    this.resetExerciseState();
    const found = this.exerciseList.find(e => String(e.id) === String(id));
    if (found) {
      this.exercise = found;
    } else {
      this.onBack();
    }
  }

  resetExerciseState(): void {
    this.inputText = '';
    this.savedUserText = '';
    this.isRevealed = false;
    this.isPerfectMatch = false;
    this.diffResult = null;
    this.hintData = null;
  }

  playAudio(): void {
    if (this.audioPlayerRef?.nativeElement) {
      this.audioPlayerRef.nativeElement.currentTime = 0;
      this.audioPlayerRef.nativeElement.play();
    }
  }

  onInputChange(): void {
  if (this.hintData) {
    this.hintData = null;
  }
}

  onCheck(): void {
    if (!this.exercise) return;

    const correct = checkAnswer(this.inputText, this.exercise.content);
    if (correct) {
      this.isRevealed = true;
      this.isPerfectMatch = true;
      this.diffResult = getWordByWordDiff(this.inputText, this.exercise.content);
      this.hintData = null;
      this.inputText = this.exercise.content;
    } else {
      this.isRevealed = false;
      this.hintData = getHint(this.inputText, this.exercise.content);
    }
  }

  toggleReveal(): void {
    if (!this.exercise) return;

    if (!this.isRevealed) {
      this.savedUserText = this.inputText;
      this.isRevealed = true;
      this.isPerfectMatch = false;
      this.diffResult = null;
      this.hintData = null;
      this.inputText = this.exercise.content;
    } else {
      this.isRevealed = false;
      this.inputText = this.savedUserText;
    }
  }

  onNext(): void {
    if (!this.exercise || this.exerciseList.length === 0) {
      this.onBack();
      return;
    }

    const currentIndex = this.exerciseList.findIndex(
      e => String(e.id) === String(this.exercise?.id)
    );

    if (currentIndex !== -1 && currentIndex < this.exerciseList.length - 1) {
      const nextExercise = this.exerciseList[currentIndex + 1];
      this.router.navigate(['/dictation', nextExercise.id]);
    } else {
      this.onBack();
    }
  }

  onBack(): void {
    this.router.navigate(['/dictation']);
  }

  @HostListener('window:keydown', ['$event'])
  handleGlobalShortcuts(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.toggleReveal();
    } else if (event.key === 'Control') {
      event.preventDefault();
      this.playAudio();
    }
  }

  handleTextareaKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.isRevealed || this.isPerfectMatch) {
        this.onNext();
      } else {
        this.onCheck();
      }
    }
  }
}