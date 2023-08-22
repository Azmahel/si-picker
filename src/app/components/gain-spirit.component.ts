import { Component } from '@angular/core';
import { Aspect, Complexity, Expansion, Spirit, spirits } from '../data/spirit.module'; // Import your spirit interface
import { Settings, SettingsService } from '../service/settings-service';
import { compileClassMetadata } from '@angular/compiler';

@Component({
  selector: 'app-gain-spirit',
  templateUrl: './gain-spirit.component.html',
  styleUrls: ['./gain-spirit.component.css'],
})
export class GainSpiritComponent {
  spirits: Spirit[] = spirits // Populate this array with your spirits data
  selectedSpirits: { spirit: Spirit; aspect?: Aspect }[] = [];
  availableSpirits: Spirit[] = spirits;
  settings: Settings;
  
  constructor(private settingsService: SettingsService) {
    this.settings = settingsService.settings;
  }


  getRandomSelection(): void {
    this.settings = this.settingsService.settings;
    // Filter spirits based on selected expansions and complexities
    this.availableSpirits = this.getAvailableSpirits()
  
    this.selectedSpirits = []

    if(this.settingsService.settings.highlightNewContent) {
      this.fetchNewContentSpirit( this.settingsService.settings.selectedExpansions);
    }

    this.getRequiredComplexitySpirits();

    const remaining = this.settings.optionCount - this.selectedSpirits.length
    for (let i = 0; i <  remaining ; i++) {
      if (this.availableSpirits.length === 0) {
        break; // No more available spirits, stop the loop
      }

      const randomSpiritIndex = Math.floor(Math.random() *  this.availableSpirits.length);
      const randomSpirit = this.availableSpirits[randomSpiritIndex];

      this.selectSpirit( randomSpirit, this.getRandomAspect(randomSpirit))
    }
  }

  private selectSpirit(spirit: Spirit, aspect: Aspect | undefined) {
    this.selectedSpirits.push({ spirit, aspect });
      this.availableSpirits.splice(this.availableSpirits.lastIndexOf(spirit), 1); 
  }

  private getRequiredComplexitySpirits() {
    Object.values(Complexity)
      .filter((complexity) => this.settingsService.settings.requiredComplexities[complexity])
      .filter((complexity) => this.selectedSpirits.filter(({ spirit }) => spirit.complexity === complexity).length === 0)
      .forEach((complexity) => {
        this.fetchComplexitySpirit(complexity);
      });
  }

  private fetchComplexitySpirit(complexity: Complexity) {
    const complexSpirits = this.availableSpirits.filter(s => s.complexity === complexity);
    if(complexSpirits.length !== 0) {
      const randomSpiritIndex = Math.floor(Math.random() * complexSpirits.length);
      const randomSpirit = complexSpirits[randomSpiritIndex];
      this.selectSpirit( randomSpirit, this.getRandomAspect(randomSpirit))
    }
  }

  private getRandomAspect(spirit: Spirit): Aspect | undefined {
    const filteredAspects = this.availableAspects(spirit);
      const randomAspectIndex = Math.random() < filteredAspects.length / (filteredAspects.length + 1)
        ? undefined : Math.floor(Math.random() * filteredAspects.length);
      return randomAspectIndex !== undefined ? filteredAspects[randomAspectIndex] : undefined;
  }

  private fetchNewContentSpirit( selectedExpansions: { [key: string]: boolean; }) {
    const newContentSpirits = this.availableSpirits.filter((spirit) => this.isNewContent(spirit.expansion) || spirit.aspects.filter((aspect) => this.isNewContent(aspect.expansion)).length !== 0
    );
    if(newContentSpirits.length !== 0) {
      const randomSpiritIndex = Math.floor(Math.random() * newContentSpirits.length);
      const randomSpirit = newContentSpirits[randomSpiritIndex];
      let randomAspect;
      if (this.isNewContent(randomSpirit.expansion)) {
        randomAspect = this.getRandomAspect(randomSpirit);
      } else {
        const filteredAspects = this.availableAspects(randomSpirit).filter(aspect => this.isNewContent(aspect.expansion));
        let randomAspectIndex = Math.floor(Math.random() * filteredAspects.length);
        randomAspect = randomAspectIndex !== undefined ? filteredAspects[randomAspectIndex] : undefined;
      }
      this.selectSpirit( randomSpirit, randomAspect)
    }
  }

  private isNewContent(ex: Expansion): boolean {
    return [Expansion.HORIZONS, Expansion.NATURE_INCARNATE].includes(ex)
  }

  private getAvailableSpirits() {
    return this.spirits.filter((spirit) =>
      this.settingsService.settings.selectedExpansions[spirit.expansion] &&
      this.settingsService.settings.selectedComplexities[spirit.complexity]&&
      this.powersInBounds(spirit)
    )
  }

  private availableAspects(spirit: Spirit): Aspect[] {
    return spirit.aspects.filter((aspect) =>this.settingsService.settings.selectedExpansions[aspect.expansion])
  }
  
  private powersInBounds(spirit: Spirit): boolean {
    return this.isBetween(this.settings.minPowers.offense, spirit.powers.offense, this.settings.maxPowers.offense) &&
      this.isBetween(this.settings.minPowers.control, spirit.powers.control, this.settings.maxPowers.control) &&
      this.isBetween(this.settings.minPowers.fear, spirit.powers.fear, this.settings.maxPowers.fear) &&
      this.isBetween(this.settings.minPowers.defense, spirit.powers.defense, this.settings.maxPowers.defense) &&
      this.isBetween(this.settings.minPowers.utility, spirit.powers.utility, this.settings.maxPowers.utility)
  }

  private isBetween(a: number, b: number, c: number): boolean {
    return a<=b && b<= c;
  }

  toggleCardCollapse() {
    this.settings.cardsExpanded = !this.settings.cardsExpanded;
    this.settingsService.saveSettings();
  }

  clearCards() {
    this.selectedSpirits = [];
  }

  showAllCards() { 
    this.selectedSpirits = this.getAvailableSpirits().flatMap((s) => { 
      return [{spirit: s, aspect: undefined as (Aspect | undefined) }]
      .concat(this.availableAspects(s).map((a) => { return { spirit: s, aspect: a as (Aspect | undefined)} })) } );
  }
}


