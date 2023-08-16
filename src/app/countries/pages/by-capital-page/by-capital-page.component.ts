import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  public countriesList: Country[] = [];
  constructor(private countriesService: CountriesService) {}

  searchByCapital(term: string) {
    this.countriesService
      .searchCountryByCapital(term)
      .subscribe((countries) => (this.countriesList = countries)); // Sin subscripción a la petición http no hay respuesta.
  }
}
