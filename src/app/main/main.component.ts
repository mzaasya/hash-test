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
import { AccordionModule } from 'primeng/accordion';
import { AiService } from 'app/helper/ai/ai.service';
import _ from 'lodash';

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
    AccordionModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private aiService = inject(AiService);

  loading = false;
  loadingLogout = false;
  input1 = '';
  input2 = '';
  header1 = '';
  header2 = '';
  opinion1 = '';
  opinion2 = '';
  inputType = '';
  result: any[] = [];
  hideResult = true;

  async matchPercentage() {
    this.loading = true;

    this.header1 = this.input1;
    this.header2 = this.input2;
    this.opinion1 = await this.aiService.textPrompt(this.input1);
    this.opinion2 = await this.aiService.textPrompt(this.input2);

    let str1 = _.replace(this.input1, /\s+/g, '');
    let str2 = _.replace(this.input2, /\s+/g, '');

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

    this.loading = false;
    this.hideResult = false;
  }

  reset() {
    this.input1 = '';
    this.input2 = '';
    this.header1 = '';
    this.header2 = '';
    this.opinion1 = '';
    this.opinion2 = '';
    this.inputType = '';
    this.result = [];
    this.hideResult = true;
  }

  async logout() {
    this.loadingLogout = true;
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
