import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenComponent } from './token.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [TokenComponent],
  imports: [CommonModule, FormsModule, BrowserAnimationsModule, MatTooltipModule],
  exports: [TokenComponent]
})
export class TokenModule { }