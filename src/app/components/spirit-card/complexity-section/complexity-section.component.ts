import { Component, Input } from '@angular/core';
import { Complexity, ComplexityChange } from '../../../data/spirit.module';

@Component({
  selector: 'app-complexity-section',
  templateUrl: './complexity-section.component.html',
  styleUrls: ['./complexity-section.component.css']
})
export class ComplexitySectionComponent {
  @Input() complexity: Complexity = Complexity.LOW;
  @Input() complexityValue: number = .5;
  @Input() complexityChange: ComplexityChange | undefined; 
  ComplexityChange = ComplexityChange;

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

  getComplexityClass() : string {
    if (this.complexityChange === ComplexityChange.UP) {
      return 'fa-solid fa-arrow-up'
    } else if (this.complexityChange === ComplexityChange.DOWN) {
      return 'fa-solid fa-arrow-down';
    } else if (this.complexityChange === ComplexityChange.EQUAL) {
      return 'fa-solid fa-equals'
    }
    return ''
  }
}