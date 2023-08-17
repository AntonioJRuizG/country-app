import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  public countriesList: Country[] = [];
  public isLoading: boolean = false;
  public voidSearchTerm: boolean = true;
  constructor(private searchService: CountriesService) {}

  searchByRegion(term: string) {
    term ? (this.voidSearchTerm = false) : (this.voidSearchTerm = true);
    this.isLoading = true;
    this.searchService.searchCountryByRegion(term).subscribe((countries) => {
      (this.countriesList = countries), (this.isLoading = false);
    });
  }
}
