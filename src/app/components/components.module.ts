import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpiritCardComponent } from './spirit-card.component';
import { GainSpiritComponent } from './gain-spirit.component';
import { FormsModule } from '@angular/forms';
import { SettingsSidebarComponent } from './settings-sidebar.component';
import { ComplexitySectionComponent } from './complexity-section.component';
import { PowersSectionComponent } from './power-section.component';

@NgModule({
  declarations: [SpiritCardComponent, GainSpiritComponent, SettingsSidebarComponent, ComplexitySectionComponent, PowersSectionComponent],
  imports: [CommonModule, FormsModule],
  exports: [SpiritCardComponent, GainSpiritComponent, SettingsSidebarComponent, ComplexitySectionComponent, PowersSectionComponent] // Export the component for reusability
})
export class ComponentsModule { }