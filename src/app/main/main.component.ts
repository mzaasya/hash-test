/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    TableModule,
    RadioButtonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  loading = false;
  input1 = '';
  input2 = '';
  inputType = '';
  result: any[] = [];
  hideResult = true;

  matchPercentage() {
    let str1 = this.input1;
    let str2 = this.input2;

    if (this.inputType === 'ci') {
      str1 = str1.toUpperCase();
      str2 = str2.toUpperCase();
    }

    const set2 = new Set(str2);

    let matches = 0;
    const matchedChars = [];

    for (const char of str1) {
      if (set2.has(char)) {
        matches++;
        matchedChars.push(char);
      }
    }

    const percentage = (matches / str1.length) * 100;

    this.result = [
      {
        title: 'Total',
        value: str1.length,
      },
      {
        title: 'Matches',
        value: matches,
      },
      {
        title: 'Matched Character(s)',
        value: matchedChars,
      },
      {
        title: 'Percentage',
        value: percentage.toFixed(2) + '%',
      },
    ];

    this.hideResult = false;
  }

  reset() {
    this.input1 = '';
    this.input2 = '';
    this.inputType = '';
    this.result = [];
    this.hideResult = true;
  }

  async logout() {
    this.loading = true;
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
