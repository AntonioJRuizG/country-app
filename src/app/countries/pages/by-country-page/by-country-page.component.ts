import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  public countriesList: Country[] = [];
  public isLoading: boolean = false;
  constructor(private searchService: CountriesService) {}

  searchByCountry(term: string) {
    this.isLoading = true;
    this.searchService.searchCountryByName(term).subscribe((countries) => {
      (this.countriesList = countries), (this.isLoading = false);
    });
  }
}
