import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EthereumService } from './ethereum.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private ethereumService: EthereumService) {}

  title = 'World';
  name = 'Kyle';
  userId = "549";
  firstDapp = "First Angular Dapp"
  moodState = "Default"

  async getMood(): Promise<void> {
    // const mood = await this.ethereumService.getMood();
    // console.log(mood);
    this.moodState = "updated";
  }
}

