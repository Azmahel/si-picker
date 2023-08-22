import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpiritCardComponent } from './spirit-card.component';
import { FormsModule } from '@angular/forms';
import { ComplexitySectionComponent } from './complexity-section/complexity-section.component';
import { PowersSectionComponent } from './powers-section/power-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [SpiritCardComponent, ComplexitySectionComponent, PowersSectionComponent],
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, MatTooltipModule],
  exports: [SpiritCardComponent]
})
export class SpiritCardModule { }