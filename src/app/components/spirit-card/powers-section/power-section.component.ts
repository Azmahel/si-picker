import { Component, Input } from '@angular/core';
import { Powers, spirits } from '../../../data/spirit.module';

@Component({
  selector: 'app-powers-section',
  templateUrl: './powers-section.component.html',
  styleUrls: ['./powers-section.component.css']
})
export class PowersSectionComponent {
  @Input() powers: Powers = spirits[0].powers;
}