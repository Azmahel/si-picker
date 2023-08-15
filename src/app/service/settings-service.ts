import { Injectable } from '@angular/core';
import { Complexity, Expansion } from '../data/spirit.module';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: Settings = {
    selectedExpansions: this.createInitialSelectionMap(Object.values(Expansion)),
    selectedComplexities: this.createInitialSelectionMap(Object.values(Complexity)),
    highlightNewContent: true,
    requiredComplexities: {},
  };

  private settingsKey = 'spiritCardSettings';

  constructor() { 
    const settingsJSON = localStorage.getItem(this.settingsKey);
   
    if(settingsJSON) {
        this.settings = {
            ...this.settings,
            ...JSON.parse(settingsJSON)
        }
    }
  }
  private createInitialSelectionMap(options: string[]): { [key: string]: boolean } {
    const selectionMap: { [key: string]: boolean } = {};
    options.forEach(option => {
      selectionMap[option] = true;
    });
    return selectionMap;
  }

  saveSettings(): void {
    localStorage.setItem(this.settingsKey, JSON.stringify(this.settings));
  }
}

export interface Settings {
  selectedExpansions: { [key: string]: boolean };
  selectedComplexities: { [key: string]: boolean };
  highlightNewContent: boolean
  requiredComplexities: { [key: string]: boolean };
}