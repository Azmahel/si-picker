import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { spirits } from '../data/spirit.module';

@Injectable({
  providedIn: 'root'
})
export class SpiritImageService {
  private imageCache: Map<string, Observable<Blob>> = new Map();

  constructor(private http: HttpClient) {
    spirits.forEach((spirit) => this.getImage(spirit.name))
  }

  getImage(name: string): Observable<Blob> {
    const imageUrl = "si-picker/assets/spirit-images/"+name.replaceAll(" ", "_")+ ".png"
    if (this.imageCache.has(imageUrl)) {
      return this.imageCache.get(imageUrl)!;
    }

    const image$ = this.http.get(imageUrl, { responseType: 'blob' });
    this.imageCache.set(imageUrl, image$);
    return image$;
  }
}