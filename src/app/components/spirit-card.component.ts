import { Component, Input, OnInit } from '@angular/core';
import { Spirit, Complexity, Aspect, ComplexityChange, spirits, Expansion } from '../data/spirit.module'; // Adjust the path as needed
import { SpiritImageService } from '../service/spirit-image-service';
import { OnSameUrlNavigation } from '@angular/router';

@Component({
  selector: 'app-spirit-card',
  templateUrl: './spirit-card.component.html',
  styleUrls: ['./spirit-card.component.css']
})
export class SpiritCardComponent implements OnInit {
  @Input() spirit: Spirit = spirits[0];
  @Input() aspect: Aspect | undefined;
  @Input() isCollapsed: boolean = false;
  expansion = Expansion;
  imageUrl = '';

  constructor(private spiritService: SpiritImageService) {}

  ngOnInit(): void {
    this.spiritService.getImage(this.spirit.name).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(blob);
    });
  }

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

  getComplexityBadgeClass(change: ComplexityChange): string {
    if (change === ComplexityChange.UP) {
      return 'up';
    } else if (change === ComplexityChange.DOWN) {
      return 'down';
    } else if (change === ComplexityChange.EQUAL) {
      return 'equal';
    }
    return ''; // Return an empty string if no change or unknown value
  }

  getComplexityBadgeText(change: ComplexityChange): string {
    if (change === ComplexityChange.UP) {
      return '↑';
    } else if (change === ComplexityChange.DOWN) {
      return '↓';
    } else if (change === ComplexityChange.EQUAL) {
      return '=';
    }
    return ''; // Return an empty string if no change or unknown value
  }

  getExpansion(): Expansion {
    return this.aspect ?  this.aspect.expansion : this.spirit.expansion;
  }
}