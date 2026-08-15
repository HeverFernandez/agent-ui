import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loader-container">
      <mat-progress-spinner diameter="50" mode="indeterminate" color="primary"></mat-progress-spinner>
    </div>
  `,
})
export class LoadingSpinnerComponent {}
