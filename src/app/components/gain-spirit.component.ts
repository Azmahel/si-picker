import { Component } from '@angular/core';
import { Aspect, Complexity, Expansion, SpecialityToken, Spirit, Token, incarna, spirits } from '../data/spirit.module'; // Import your spirit interface
import { Settings, SettingsService } from '../service/settings-service';

@Component({
  selector: 'app-gain-spirit',
  templateUrl: './gain-spirit.component.html',
  styleUrls: ['./gain-spirit.component.css'],
})
export class GainSpiritComponent {
  spirits: Spirit[] = spirits 
  selectedSpirits: { spirit: Spirit; aspect?: Aspect }[] = [];
  availableSpirits: Spirit[] = spirits;
  settings: Settings;
  
  constructor(private settingsService: SettingsService) {
    this.settings = settingsService.settings;
  }

  getRandomSelection(): void {
    this.settings = this.settingsService.settings;
    this.availableSpirits = this.getAvailableSpirits()
  
    this.selectedSpirits = []

    if(this.settingsService.settings.highlightNewContent) {
      this.fetchNewContentSpirit( this.settingsService.settings.selectedExpansions);
    }

    this.getRequiredComplexitySpirits();

    const remaining = this.settings.optionCount - this.selectedSpirits.length
    for (let i = 0; i <  remaining ; i++) {
      const randomSpirit =  this.random(this.availableSpirits)
      if(randomSpirit) {
        if(this.tokenRequirements(randomSpirit)) {
          this.selectSpirit( randomSpirit, this.getRandomAspect(randomSpirit))
        } else {
          this.selectSpirit( randomSpirit, this.random(this.availableAspects(randomSpirit)))
        }
       
      } else {
        break;
      }
    }
  }

  private selectSpirit(spirit: Spirit, aspect: Aspect | undefined) {
    this.selectedSpirits.push({ spirit, aspect });
    this.availableSpirits.splice(this.availableSpirits.lastIndexOf(spirit), 1); 
  }

  private getRequiredComplexitySpirits() {
    Object.values(Complexity)
      .filter((complexity) => this.settingsService.settings.highlightComplexities[complexity])
      .filter((complexity) => this.selectedSpirits.filter(({ spirit }) => spirit.complexity === complexity).length === 0)
      .forEach((complexity) => { this.fetchComplexitySpirit(complexity);});
  }

  private fetchComplexitySpirit(complexity: Complexity) {
    const complexSpirits = this.availableSpirits.filter(s => s.complexity === complexity);
    const randomSpirit = this.random(complexSpirits);
    if(randomSpirit) {
      this.selectSpirit( randomSpirit, this.getRandomAspect(randomSpirit))
    }
  }

  private getRandomAspect(spirit: Spirit): Aspect | undefined {
    const filteredAspects: (Aspect | undefined)[] = this.availableAspects(spirit);
    return this.random(filteredAspects.concat([undefined]));
  }

  private fetchNewContentSpirit( selectedExpansions: { [key: string]: boolean; }) {
    const newContentSpirits = this.availableSpirits.filter((spirit) => this.isNewContent(spirit.expansion) || spirit.aspects.filter((aspect) => this.isNewContent(aspect.expansion)).length !== 0);
    const randomSpirit = this.random(newContentSpirits);
    if(randomSpirit) {
      const filteredAspects = this.isNewContent(randomSpirit.expansion) ? 
          (this.availableAspects(randomSpirit) as (Aspect | undefined)[]).concat([undefined]) :  
          this.availableAspects(randomSpirit).filter(aspect => this.isNewContent(aspect.expansion))
      this.selectSpirit( randomSpirit, this.random(filteredAspects))
    }
  }

  private isNewContent(ex: Expansion): boolean {
    return [Expansion.HORIZONS, Expansion.NATURE_INCARNATE].includes(ex)
  }

  private getAvailableSpirits() {
    return this.spirits.filter((spirit) =>
      this.settingsService.settings.selectedExpansions[spirit.expansion] &&
      this.settingsService.settings.selectedComplexities[spirit.complexity]&&
      this.powersInBounds(spirit) && 
      this.filterAvailableTokens(spirit) &&
      (this.tokenRequirements(spirit) || this.availableAspects(spirit).length > 0)
    )
  }

  filterAvailableTokens(spirit: Spirit): boolean {
    return this.filterTokens(spirit.tokens || []) && (!this.hasIncarna(spirit.specialTokens|| []) || this.settingsService.settings.allowIncarna)
  }

  filterAvailableAspectTokens(aspect: Aspect): boolean {
    return this.filterTokens(aspect.tokens || []) && (!this.hasIncarna(aspect.specialTokens|| []) || this.settingsService.settings.allowIncarna)
  }

  filterTokens(tokens: Token[]) {
    return tokens.filter(t => !this.settingsService.settings.allowedTokens[t]).length === 0
  }

  tokenRequirements(spirit: Spirit): boolean {
    if (this.settingsService.settings.requireIncarna) {
      if (!this.hasIncarna(spirit.specialTokens || [])) {
        return false;
      }
    }
    const requiredTokens = this.getRequiredTokens();
    if (requiredTokens.length > 0) {
      const filteredTokens = (spirit.tokens || []).filter(t => this.settingsService.settings.requiredTokens[t])
      const spiritHasTokens = this.settingsService.settings.reqiredTokensAny ? filteredTokens.length > 0 : filteredTokens.length === requiredTokens.length;
      return spiritHasTokens;
    }
    return true;
  }

  private getRequiredTokens(): Token[] {
    return Object.values(Token).filter(t => this.settingsService.settings.requiredTokens[t])
  }
  private hasIncarna(value: SpecialityToken[]) {
    return value.filter(this.isIncarna).length > 0;
  }

  private isIncarna(value: SpecialityToken): boolean {
    return incarna.lastIndexOf(value) !== -1;
  }

  private availableAspects(spirit: Spirit): (Aspect)[] {
    return spirit.aspects.filter((aspect) => 
      this.settingsService.settings.selectedExpansions[aspect.expansion] &&
      this.filterAvailableAspectTokens(aspect) &&
      this.aspectTokenRequirements(spirit, aspect)
    )
  }

  private aspectTokenRequirements(spirit: Spirit, aspect: Aspect): boolean {
    if(this.tokenRequirements(spirit)) {
      return true;
    }
    if(this.settingsService.settings.requireIncarna && !this.hasIncarna(aspect.specialTokens || [])) {
      return false;
    }
    
    const requiredTokens = this.getRequiredTokens().filter(t => (spirit?.tokens?.lastIndexOf(t) ||-1 ) === -1);
    for( let token of (aspect.tokens || [] as Token[])) {
      if(requiredTokens.lastIndexOf(token) !== -1) {
        if(this.settingsService.settings.reqiredTokensAny) {
          return true;
        } else {
          requiredTokens.splice(requiredTokens.lastIndexOf(token), 1)
        }
      }
    }
    return requiredTokens.length === 0;
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
      let base = this.tokenRequirements(s) ? [{spirit: s, aspect: undefined as (Aspect | undefined) }] : []
      return base.concat(this.availableAspects(s).map((a) => { return { spirit: s, aspect: a as (Aspect | undefined)} })) } );
  }

  private random<T>(list: T[]) : T | undefined {
    return list.length === 0 ? undefined : list[ Math.floor(Math.random() * list.length)];
  }
}
