import { Component, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-power-bounds',
  templateUrl: './power-bounds.component.html',
  styleUrls: ['./power-bounds.component.css']
})
export class PowerBoundsComponent {
  @Input() label: string = "Offense";
  @Input() minValue: number = 0;
  @Input() maxValue: number = 5;
  @Output() maxChange = new EventEmitter<number>();
  @Output() minChange = new EventEmitter<number>();
  @Input() currentMin: number= 1;
  @Input() currentMax: number = 4;


  newMax(max: number) {
    this.currentMax = max;
    this.maxChange.emit(max);
  }

  newMin(min: number) {
    this.currentMin = min;
    this.minChange.emit(min);
  }
}