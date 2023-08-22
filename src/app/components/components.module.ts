import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GainSpiritComponent } from './gain-spirit.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpiritCardModule } from './spirit-card/spirit-card.module';
import { SettingsSidebarModule } from './settings-sidebar/settings-sidebar.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ GainSpiritComponent],
  imports: [CommonModule, FormsModule, MatSliderModule, BrowserAnimationsModule, SpiritCardModule, SettingsSidebarModule, MatTooltipModule, MatButtonModule],
  exports: [GainSpiritComponent,] // Export the component for reusability
})
export class ComponentsModule { }