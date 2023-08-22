import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-settings-toggle',
    templateUrl: './settings-toggle.component.html',
    styleUrls: ['./settings-toggle.component.css']
  })
  export class SettingsToggleComponent { 
    @Input() value: boolean = true;
    @Input() name: string = "Setting";
    @Input() single: boolean = false;
    @Output() onToggle: EventEmitter<boolean> = new EventEmitter();

    toggle() {
        this.value = !this.value;
        this.onToggle.emit(this.value);
    }
  }