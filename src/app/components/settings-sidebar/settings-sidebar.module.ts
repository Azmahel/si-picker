import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsSidebarComponent } from './settings-sidebar.component';
import { PowerBoundsComponent } from './power-bounds/power-bounds.component';
import { SettingsSectionComponent } from './settings-section/settings-section.component';
import { SettingsToggleComponent } from './settings-toggle/settings-toggle.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SettingsSidebarComponent, PowerBoundsComponent, SettingsSectionComponent, SettingsToggleComponent],
  imports: [CommonModule, FormsModule, MatSliderModule, BrowserAnimationsModule, MatExpansionModule, MatSlideToggleModule, MatTooltipModule, MatInputModule, MatButtonModule],
  exports: [SettingsSidebarComponent]
})
export class SettingsSidebarModule { }