import { Component } from '@angular/core';
import { Aspect, Complexity, Expansion, Spirit, spirits } from '../data/spirit.module'; // Import your spirit interface
import { SettingsService } from '../service/settings-service';
import { compileClassMetadata } from '@angular/compiler';

@Component({
  selector: 'app-gain-spirit',
  templateUrl: './gain-spirit.component.html',
  styleUrls: ['./gain-spirit.component.css'],
})
export class GainSpiritComponent {
  spirits: Spirit[] = spirits // Populate this array with your spirits data
  selectedSpirits: { spirit: Spirit; aspect?: Aspect }[] = [];
  selectedExpansions: { [key: string]: boolean} = {};
  selectedComplexities: { [key: string]: boolean} = {};
  areCardsCollapsed: boolean = true;
  
  constructor(private settingsService: SettingsService) {}


  getRandomSelection(): void {
    const selectedExpansions = this.settingsService.settings.selectedExpansions;
    const selectedComplexities = this.settingsService.settings.selectedComplexities;
  
    // Filter spirits based on selected expansions and complexities
    const availableSpirits = this.spirits.filter((spirit) =>
      selectedExpansions[spirit.expansion] &&
      selectedComplexities[spirit.complexity]
    );
  
    this.selectedSpirits = []

    if(this.settingsService.settings.highlightNewContent) {
      this.fetchNewContentSpirit(availableSpirits, selectedExpansions);
    }
    Object.values(Complexity)
    .filter((complexity) => this.settingsService.settings.requiredComplexities[complexity])
    .filter((complexity) => this.selectedSpirits.filter( ({spirit}) => spirit.complexity === complexity).length === 0)
    .forEach((complexity) => {
      this.fetchComplexitySpirit(availableSpirits, complexity);
    })
    const remaining = 4- this.selectedSpirits.length
    for (let i = 0; i <  remaining ; i++) {
      if (availableSpirits.length === 0) {
        break; // No more available spirits, stop the loop
      }

      const randomSpiritIndex = Math.floor(Math.random() * availableSpirits.length);
      const randomSpirit = availableSpirits[randomSpiritIndex];

      const filteredAspects = randomSpirit.aspects.filter((aspect) =>selectedExpansions[aspect.expansion])

      const randomAspectIndex = Math.random() < filteredAspects.length / (filteredAspects.length + 1)
        ? undefined
        : Math.floor(Math.random() * filteredAspects.length);

      const randomAspect = randomAspectIndex !== undefined ? filteredAspects[randomAspectIndex] : undefined;

      this.selectedSpirits.push({ spirit: randomSpirit, aspect: randomAspect });

      availableSpirits.splice(randomSpiritIndex, 1); // Remove the selected spirit from available spirits
    }
  }

  private fetchComplexitySpirit(availableSpirits: Spirit[], complexity: Complexity) {
    const complexSpirits = availableSpirits.filter(s => s.complexity === complexity);
    if(complexSpirits.length !== 0) {
      const randomSpiritIndex = Math.floor(Math.random() * complexSpirits.length);
      const randomSpirit = complexSpirits[randomSpiritIndex];
      const randomAspectIndex = Math.random() < randomSpirit.aspects.length / (randomSpirit.aspects.length + 1)
        ? undefined : Math.floor(Math.random() * randomSpirit.aspects.length);
      const randomAspect = randomAspectIndex !== undefined ? randomSpirit.aspects[randomAspectIndex] : undefined;
      this.selectedSpirits.push({ spirit: randomSpirit, aspect: randomAspect });
      availableSpirits.splice(availableSpirits.lastIndexOf(randomSpirit), 1);
    }
  }

  private fetchNewContentSpirit(availableSpirits: Spirit[], selectedExpansions: { [key: string]: boolean; }) {
    const newContentSpirits = availableSpirits.filter((spirit) => this.isNewContent(spirit.expansion) || spirit.aspects.filter((aspect) => this.isNewContent(aspect.expansion)).length !== 0
    );
    if(newContentSpirits.length !== 0) {
      const randomSpiritIndex = Math.floor(Math.random() * newContentSpirits.length);
      const randomSpirit = newContentSpirits[randomSpiritIndex];
      const filteredAspects = randomSpirit.aspects.filter((aspect) => selectedExpansions[aspect.expansion] && this.isNewContent(aspect.expansion));
      let randomAspectIndex;
      if (this.isNewContent(randomSpirit.expansion)) {
        randomAspectIndex = Math.random() < filteredAspects.length / (filteredAspects.length + 1)
          ? undefined
          : Math.floor(Math.random() * filteredAspects.length);
      } else {
        randomAspectIndex = Math.floor(Math.random() * filteredAspects.length);
      }
      const randomAspect = randomAspectIndex !== undefined ? filteredAspects[randomAspectIndex] : undefined;
  
      this.selectedSpirits.push({ spirit: randomSpirit, aspect: randomAspect });
  
      availableSpirits.splice(availableSpirits.lastIndexOf(randomSpirit), 1);
    }
  }

  private isNewContent(ex: Expansion): boolean {
    return [Expansion.HORIZONS, Expansion.NATURE_INCARNATE].includes(ex)
  }

  toggleCardCollapse() {
    this.areCardsCollapsed = !this.areCardsCollapsed;
  }
}