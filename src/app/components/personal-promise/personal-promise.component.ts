import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-personal-promise',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-blue-50">
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold mb-6 text-purple-900">Make a Promise to Yourself</h2>
        
        <p class="text-gray-700 mb-6">
          Now that you've let go, take a moment to write a promise to yourself about your future.
          What positive change will you embrace?
        </p>

        <mat-form-field appearance="outline" class="w-full mb-6">
          <textarea
            matInput
            [(ngModel)]="promise"
            rows="4"
            placeholder="I promise myself that..."
            class="w-full p-4 text-lg"
          ></textarea>
        </mat-form-field>

        <div class="flex justify-between">
          <a routerLink="/burning-files"
             mat-button
             class="text-purple-600">
            Back
          </a>
          <a routerLink="/completion"
             mat-raised-button
             [disabled]="!promise.trim()"
             class="bg-purple-600 text-white">
            Complete Ritual
          </a>
        </div>
      </div>
    </div>
  `
})
export class PersonalPromiseComponent {
  promise = '';
}