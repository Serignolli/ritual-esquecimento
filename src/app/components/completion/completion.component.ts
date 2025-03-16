import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-completion',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-blue-50">
      <div class="text-center max-w-2xl animate-fade-in">
        <div class="completion-circle mb-8">
          <mat-icon class="text-6xl text-purple-600">check_circle</mat-icon>
        </div>

        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-purple-900">
          Your Letting Go Ritual is Complete
        </h2>
        
        <p class="text-xl text-gray-700 mb-8">
          You've taken an important step in your journey. Carry this feeling of lightness
          and renewal with you as you move forward.
        </p>

        <div class="space-y-4">
          <p class="text-lg text-gray-600 italic">
            "The only way to make sense out of change is to plunge into it,
            move with it, and join the dance." - Alan Watts
          </p>
        </div>

        <a routerLink="/"
           mat-raised-button
           class="mt-8 text-lg px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all">
          Return Home
        </a>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 1.5s ease-out;
    }

    .completion-circle {
      animation: scaleIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes scaleIn {
      from { transform: scale(0); }
      to { transform: scale(1); }
    }
  `]
})
export class CompletionComponent {}