import { Component } from '@angular/core';
import { Card } from '../../../../shared/components/card/card';
import { LoggerService } from '../../../../core/services/logger';

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private logger: LoggerService) {}

  onCardClick() {
    this.logger.log('Card was clicked in the Home page!');
  }
}
