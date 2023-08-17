import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-gallery',
  templateUrl: './country-gallery.component.html',
})
export class CountryGalleryComponent {
  @Input()
  public countries: Country[] = [];

  @Input()
  public isLoading: boolean = false;

  @Input()
  public voidSearchTerm: boolean = true;
}
