import { Injectable } from '@angular/core';
import { Complexity, Expansion, Powers, spirits } from '../data/spirit.module';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: Settings = this.initialSettings()

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

  initialSettings(): Settings {
    return {
      selectedExpansions: this.defaultExpansions(),
      selectedComplexities: this.defaultComplexities(),
      highlightNewContent: true,
      requiredComplexities: this.defaultRequiredComplexities(),
      cardsExpanded: false,
      minPowers: this.defaultMinPowers(),
      maxPowers: this.defaultMaxPowers(),
      optionCount: 4,
    };
  }

  defaultMinPowers(): Powers {
    return this.findLimits((a,b) => (b < a) ? b : a)
  }

  defaultMaxPowers(): Powers {
    return this.findLimits((a,b) => (b > a) ? b : a);
  }

  private findLimits(comparator: (current: number, other: number) => number) {
    let current = { offense: 0 , control: 0,  fear: 0,  defense: 0, utility: 0 }
    spirits.forEach((spirit) => {
      current.offense = comparator(current.offense , spirit.powers.offense) 
      current.control = comparator(current.control , spirit.powers.control) 
      current.fear = comparator(current.fear , spirit.powers.fear) 
      current.defense = comparator(current.defense , spirit.powers.defense) 
      current.utility = comparator(current.utility , spirit.powers.utility)
    })
    return current;
  }


  defaultExpansions(): { [key: string]: boolean } {
    return this.createInitialSelectionMap(Object.values(Expansion));
  }

  defaultComplexities(): { [key: string]: boolean } {
    return this.createInitialSelectionMap(Object.values(Complexity));
  }

  defaultRequiredComplexities(): { [key: string]: boolean } {
    return {};
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
  cardsExpanded: boolean,
  minPowers: Powers,
  maxPowers: Powers,
  optionCount: number,
}