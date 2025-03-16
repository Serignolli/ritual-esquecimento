import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WritingPastComponent } from './components/writing-past/writing-past.component';
import { BurningFilesComponent } from './components/burning-files/burning-files.component';
import { PersonalPromiseComponent } from './components/personal-promise/personal-promise.component';
import { CompletionComponent } from './components/completion/completion.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'writing-past', component: WritingPastComponent },
  { path: 'burning-files', component: BurningFilesComponent },
  { path: 'personal-promise', component: PersonalPromiseComponent },
  { path: 'completion', component: CompletionComponent },
  { path: '**', redirectTo: '' }
];