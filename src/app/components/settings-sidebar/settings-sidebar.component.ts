import { Component, Input, Output, EventEmitter } from '@angular/core';
import { messages } from 'src/app/data/messages';
import { Complexity, Expansion, SpecialityToken, Token } from 'src/app/data/spirit.module';
import { Settings, SettingsService } from 'src/app/service/settings-service';


@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.css']
})
export class SettingsSidebarComponent {

  settingsActive = false;
  expansions: Expansion[] = Object.values(Expansion);
  complexities: Complexity[] = Object.values(Complexity);
  settings: Settings;
  messages = messages;
  tokens: Token[] = Object.values(Token);
  incarna = SpecialityToken.INCARNA;
 
  powers: {name: string, min: number, max: number, currentMin: number, currentMax: number}[] = [];
 
  constructor(private settingsService: SettingsService) {
    this.settings = settingsService.settings;
    this.setupSettings();
  }

  private setupSettings() {
    this.settings = this.settingsService.settings;
    let minPowers = this.settingsService.defaultMinPowers();
    let maxPowers = this.settingsService.defaultMaxPowers();
    let currentMinPowers = this.settingsService.settings.minPowers;
    let currentMaxPowers = this.settingsService.settings.maxPowers;
    this.powers = [
      { name: "Offense", min: minPowers.offense, max: maxPowers.offense, currentMin: currentMinPowers.offense, currentMax: currentMaxPowers.offense },
      { name: "Control", min: minPowers.control, max: maxPowers.control, currentMin: currentMinPowers.control, currentMax: currentMaxPowers.control },
      { name: "Fear", min: minPowers.fear, max: maxPowers.fear, currentMin: currentMinPowers.fear, currentMax: currentMaxPowers.fear },
      { name: "Defense", min: minPowers.defense, max: maxPowers.defense, currentMin: currentMinPowers.defense, currentMax: currentMaxPowers.defense },
      { name: "Utility", min: minPowers.utility, max: maxPowers.utility, currentMin: currentMinPowers.utility, currentMax: currentMaxPowers.utility },
    ];
  }

  onExpansionChange(expansion: string, value: boolean): void {
    this.settings.selectedExpansions[expansion] = value;
    this.settingsService.saveSettings()
  }

  onHighlightChange(value: boolean): void {
    this.settings.highlightNewContent = value;
    this.settingsService.saveSettings()
  }

  onComplexityChange(complexity: string, value: boolean): void {
    this.settings.selectedComplexities[complexity] = value;
    this.settingsService.saveSettings()
  }

  onAllowedTokenChange(token: string, value: boolean): void {
    this.settings.allowedTokens[token] = value;
    this.settingsService.saveSettings()
  }

  onAllowIncarnaChange(value: boolean) {
    this.settings.allowIncarna = value;
    this.settingsService.saveSettings();
  }


  onRequiredTokenChange(token: string, value: boolean): void {
    this.settings.requiredTokens[token] = value;
    this.settingsService.saveSettings()
  }

  onRequireIncarnaChange(value: boolean) {
    this.settings.requireIncarna = value;
    this.settingsService.saveSettings();
  }

  onRequireTokenAnyChange(value: boolean) {
    this.settings.reqiredTokensAny = value;
    this.settingsService.saveSettings();
  }

  onHighlightComplexityChange(complexity: string, value: boolean): void {
    this.settings.highlightComplexities[complexity] = value;
    this.settingsService.saveSettings()
  }

  toggleSettings() {
    this.settingsActive = !this.settingsActive;
  }

  onCountChange() {
    this.settingsService.settings.optionCount = this.settings.optionCount;
    this.saveSettings();
  }

  onPowerMinValueChange(power: string, value: number) {
    switch(power) {
      case "Offense":
        this.settingsService.settings.minPowers.offense = value;
        break;
      case "Control":
        this.settingsService.settings.minPowers.control = value;
        break;
      case "Fear":
        this.settingsService.settings.minPowers.fear = value;
        break;
      case "Defense":
        this.settingsService.settings.minPowers.defense = value;
        break;
      case "Utility":
        this.settingsService.settings.minPowers.utility = value;
        break;
    }
    this.saveSettings();
  }

  onPowerMaxValueChange(power: string, value: number) {
    switch(power) {
      case "Offense":
        this.settingsService.settings.maxPowers.offense = value;
        break;
      case "Control":
        this.settingsService.settings.maxPowers.control = value;
        break;
      case "Fear":
        this.settingsService.settings.maxPowers.fear = value;
        break;
      case "Defense":
        this.settingsService.settings.maxPowers.defense = value;
        break;
      case "Utility":
        this.settingsService.settings.maxPowers.utility = value;
        break;
    }
    this.saveSettings()
  }

  reset(section: string) {
    switch(section) {
      case "all": 
        this.settingsService.settings = this.settingsService.initialSettings();
        break;
      case "expansions":
        this.settingsService.settings.selectedExpansions = this.settingsService.defaultExpansions();
        break;
      case "complexities":
        this.settingsService.settings.selectedComplexities = this.settingsService.defaultComplexities();
        break;
      case "powers":
        this.settingsService.settings.minPowers = this.settingsService.defaultMinPowers();
        this.settingsService.settings.maxPowers = this.settingsService.defaultMaxPowers();
        break;
      case "highlightComplexities":
        this.settingsService.settings.highlightComplexities = this.settingsService.defaultHighlightComplexities();
        break;
      case "allowedTokens":
        this.settingsService.settings.allowedTokens = this.settingsService.defaultAllowedTokens();
        this.settingsService.settings.allowIncarna = true;
        break;
      case "requiredTokens":
        this.settingsService.settings.requiredTokens = this.settingsService.defaultRequiredTokens();
        this.settingsService.settings.requireIncarna = false;
        this.settingsService.settings.reqiredTokensAny = true;
        break;
    }
    this.saveSettings()
  }

  saveSettings() {
    this.settingsService.saveSettings();
    this.setupSettings();
  }
}