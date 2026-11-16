import { Component } from '@angular/core';
import { Batalla } from './components/batalla/batalla';

@Component({
  imports: [Batalla],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
