import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

export type Region = '' | 'Americas' | 'Africa' | 'Asia' | 'Europe' | 'Oceania';
@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countriesList: Country[] = [];
  public regions: Region[] = [
    'Americas',
    'Africa',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public isLoading: boolean = false;
  public voidSearchTerm: boolean = true;
  public selectedRegion?: string;

  constructor(private searchService: CountriesService) {}

  ngOnInit(): void {
    this.countriesList = this.searchService.cacheStore.byRegion.countries;
    this.selectedRegion = this.searchService.cacheStore.byRegion.region;
  }

  searchByRegion(term: Region) {
    this.selectedRegion = term;
    term ? (this.voidSearchTerm = false) : (this.voidSearchTerm = true);
    this.isLoading = true;
    this.searchService.searchCountryByRegion(term).subscribe((countries) => {
      (this.countriesList = countries), (this.isLoading = false);
    });
  }
}
