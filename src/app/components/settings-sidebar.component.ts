import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Complexity, Expansion } from '../data/spirit.module';
import { Settings, SettingsService } from '../service/settings-service';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.css']
})
export class SettingsSidebarComponent {

  settingsActive = false;
  expansions: string[] = Object.values(Expansion);
  complexities: string[] = Object.values(Complexity);
  settings: Settings
  sections: { [key: string]: boolean } = {
    expansions: false,
    complexities: false,
  };
  
  constructor(private settingsService: SettingsService) {
    this.settings = settingsService.settings;
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }

  onExpansionChange(expansion: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settings.selectedExpansions[expansion] = checked;
    this.settingsService.saveSettings()
  }

  onHighlightChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settings.highlightNewContent = checked;
    this.settingsService.saveSettings()
  }

  onComplexityChange(complexity: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settings.selectedComplexities[complexity] = checked;
    this.settingsService.saveSettings()
  }

  onRequiredComplexityChange(complexity: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.settings.requiredComplexities[complexity] = checked;
    this.settingsService.saveSettings()
  }

  toggleSettings() {
    this.settingsActive = !this.settingsActive;
  }
}