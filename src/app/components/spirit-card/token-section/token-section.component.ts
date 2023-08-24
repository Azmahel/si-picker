import { Component, Input } from '@angular/core';
import { Powers, SpecialityToken, Token, spirits } from '../../../data/spirit.module';

@Component({
  selector: 'app-token-section',
  templateUrl: './token-section.component.html',
  styleUrls: ['./token-section.component.css']
})
export class TokenSectionComponent {
  @Input() tokens: (Token | SpecialityToken)[] =Object.values(Token);
}
