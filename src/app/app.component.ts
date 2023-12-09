import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EthereumService } from './ethereum.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(private ethereumService: EthereumService) {}

  title = 'World';
  name = 'Kyle';
  userId = "549";
  firstDapp = "First Angular Dapp";
  moodState = "Default";
  newMood: string = '';

  async getMood(): Promise<void> {
    const mood = await this.ethereumService.getMood();
    this.moodState = mood;
  }

  async onSubmit(): Promise<void> {
    await this.ethereumService.setMood(this.newMood);
  }
}

