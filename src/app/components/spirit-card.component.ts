import { Component, Input, OnInit } from '@angular/core';
import { Spirit, Aspect, spirits, Expansion } from '../data/spirit.module'; // Adjust the path as needed
import { SpiritImageService } from '../service/spirit-image-service';

@Component({
  selector: 'app-spirit-card',
  templateUrl: './spirit-card.component.html',
  styleUrls: ['./spirit-card.component.css']
})
export class SpiritCardComponent implements OnInit {
  @Input() spirit: Spirit = spirits[0];
  @Input() aspect: Aspect | undefined;
  @Input() isCollapsed: boolean = false;
  expansion = Expansion;
  imageUrl = '';

  constructor(private spiritService: SpiritImageService) {}

  ngOnInit(): void {
    this.spiritService.getImage(this.spirit.name).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(blob);
    });
  }

  getExpansion(): Expansion {
    return this.aspect ?  this.aspect.expansion : this.spirit.expansion;
  }
}