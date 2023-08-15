import { Component, Input } from '@angular/core';
import { Complexity, ComplexityChange } from '../data/spirit.module';

@Component({
  selector: 'app-complexity-section',
  templateUrl: './complexity-section.component.html',
  styleUrls: ['./complexity-section.component.css']
})
export class ComplexitySectionComponent {
  @Input() complexity: Complexity = Complexity.LOW;
  @Input() complexityChange: ComplexityChange | undefined; 

  getComplexityWidth(complexity: Complexity): number {
    if (complexity === Complexity.VERY_HIGH) {
      return 55; // Use 33% for about one-third of the card's width
    } else if (complexity === Complexity.HIGH) {
      return 55 * 0.75;
    } else if (complexity === Complexity.MODERATE) {
      return 55*0.5; // Use 16.5% for proportional width
    } else {
      return 55*0.25; // Use 11% for proportional width
    }
  }

  getComplexityBadgeClass(change: ComplexityChange | undefined): string {
    if (change === ComplexityChange.UP) {
      return 'up';
    } else if (change === ComplexityChange.DOWN) {
      return 'down';
    } else if (change === ComplexityChange.EQUAL) {
      return 'equal';
    }
    return ''; // Return an empty string if no change or unknown value
  }

  getComplexityBadgeText(change: ComplexityChange | undefined): string {
    if (change === ComplexityChange.UP) {
      return '↑';
    } else if (change === ComplexityChange.DOWN) {
      return '↓';
    } else if (change === ComplexityChange.EQUAL) {
      return '=';
    }
    return ''; // Return an empty string if no change or unknown value
  }
}