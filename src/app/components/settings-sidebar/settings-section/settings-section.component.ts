import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-settings-section',
    templateUrl: './settings-section.component.html',
    styleUrls: ['./settings-section.component.css']
  })
  export class SettingsSectionComponent { 
    @Input() name: string = "Settings";
    @Input() tooltip: string = "";
    @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

    reset(event: Event) {
        this.refresh.emit();
        event.stopPropagation();
    }

  }
