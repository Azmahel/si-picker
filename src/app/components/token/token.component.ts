import { Component, Input, OnInit } from '@angular/core';
import { messages } from 'src/app/data/messages';
import { Aspect, Expansion, SpecialityToken, Spirit, Token, spirits } from 'src/app/data/spirit.module';
import { SpiritImageService } from 'src/app/service/spirit-image-service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  @Input() token: Token | SpecialityToken = Token.BEASTS;
  Token = Token

  constructor() {}
}