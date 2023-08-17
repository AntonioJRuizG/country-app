import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  public countriesList: Country[] = [];
  public isLoading: boolean = false;
  public voidSearchTerm: boolean = true;
  constructor(private countriesService: CountriesService) {}

  searchByCapital(term: string) {
    term ? (this.voidSearchTerm = false) : (this.voidSearchTerm = true);
    this.isLoading = true;
    this.countriesService
      .searchCountryByCapital(term)
      .subscribe((countries) => {
        (this.countriesList = countries), (this.isLoading = false);
      }); // Sin subscripción a la petición http no hay respuesta.
  }
}
