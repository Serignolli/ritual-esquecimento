import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-blue-50">
      <div class="text-center max-w-2xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Letting Go Ritual</h1>
        
        <div class="campfire-animation mb-8">
          <!-- Simple CSS campfire -->
          <div class="fire">
            <div class="flames">
              <div class="flame"></div>
              <div class="flame"></div>
              <div class="flame"></div>
            </div>
            <div class="logs"></div>
          </div>
        </div>

        <p class="text-lg mb-8 text-gray-700">
          Welcome to your personal letting go ceremony. This sacred space is designed to help you
          release what no longer serves you and make room for new beginnings.
        </p>

        <a routerLink="/writing-past" 
           mat-raised-button 
           class="text-lg px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all">
          Start Ritual
        </a>
      </div>
    </div>
  `,
  styles: [`
    .fire {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }

    .flames {
      position: absolute;
      bottom: 40%;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 60px;
    }

    .flame {
      position: absolute;
      bottom: 0;
      width: 20px;
      height: 20px;
      background: linear-gradient(to top, #ff6b08, #ffc107);
      border-radius: 50% 0 50% 50%;
      transform-origin: 50% 50%;
      animation: flicker 1.5s infinite alternate;
    }

    .flame:nth-child(2) {
      left: 20px;
      height: 25px;
      animation-delay: 0.2s;
    }

    .flame:nth-child(3) {
      left: 40px;
      height: 15px;
      animation-delay: 0.4s;
    }

    .logs {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 20px;
      background: #795548;
      border-radius: 5px;
    }

    @keyframes flicker {
      0% { transform: rotate(-45deg) scale(1); }
      100% { transform: rotate(-45deg) scale(1.1); }
    }
  `]
})
export class HomeComponent {}