import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpiritCardComponent } from './spirit-card.component';
import { FormsModule } from '@angular/forms';
import { ComplexitySectionComponent } from './complexity-section/complexity-section.component';
import { PowersSectionComponent } from './powers-section/power-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TokenSectionComponent } from './token-section/token-section.component';
import { TokenModule } from '../token/token.module';


@NgModule({
  declarations: [SpiritCardComponent, ComplexitySectionComponent, PowersSectionComponent, TokenSectionComponent],
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, MatTooltipModule, TokenModule],
  exports: [SpiritCardComponent]
})
export class SpiritCardModule { }