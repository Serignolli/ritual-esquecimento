import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-burning-files',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-blue-50">
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold mb-6 text-purple-900">Symbolic Release</h2>
        
        <p class="text-gray-700 mb-6">
          Upload images or documents that represent what you're ready to let go of.
          This is a symbolic act of release.
        </p>

        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center"
             [class.burning]="isBurning"
             (dragover)="onDragOver($event)"
             (drop)="onDrop($event)">
          <input
            type="file"
            #fileInput
            (change)="onFileSelected($event)"
            multiple
            class="hidden"
            accept="image/*,application/pdf"
          />
          
          <div *ngIf="!files.length">
            <mat-icon class="text-5xl mb-4 text-gray-400">cloud_upload</mat-icon>
            <p class="text-lg mb-2">Drag and drop files here</p>
            <p class="text-sm text-gray-500">or</p>
            <button mat-button (click)="fileInput.click()" class="mt-2">
              Browse Files
            </button>
          </div>

          <div *ngIf="files.length" class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div *ngFor="let file of files" class="relative">
              <div class="aspect-square bg-gray-100 rounded flex items-center justify-center">
                <span class="text-sm text-gray-600">{{ file.name }}</span>
              </div>
              <button mat-icon-button
                      (click)="removeFile(file)"
                      class="absolute -top-2 -right-2 bg-red-500 text-white">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-500 mb-6">
          Note: Files are only used symbolically and will be removed after the ritual.
        </p>

        <div class="flex justify-between">
          <a routerLink="/writing-past"
             mat-button
             class="text-purple-600">
            Back
          </a>
          <button mat-raised-button
                  [disabled]="isBurning"
                  (click)="startBurning()"
                  class="bg-purple-600 text-white">
            {{ isBurning ? 'Releasing...' : 'Release & Continue' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .burning {
      animation: burn 2s ease-out forwards;
    }

    @keyframes burn {
      0% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.8); }
    }
  `]
})
export class BurningFilesComponent {
  files: File[] = [];
  isBurning = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      this.addFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  addFiles(newFiles: File[]) {
    this.files.push(...newFiles);
  }

  removeFile(file: File) {
    this.files = this.files.filter(f => f !== file);
  }

  startBurning() {
    this.isBurning = true;
    setTimeout(() => {
      this.files = [];
      window.location.href = '/personal-promise';
    }, 2000);
  }
}