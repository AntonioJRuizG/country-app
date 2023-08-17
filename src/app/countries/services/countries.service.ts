import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../pages/by-region-page/by-region-page.component';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private countriesApiUri: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([])),
      delay(2000)
    );
  }

  searchCountryByCapital(searchValue: string): Observable<Country[]> {
    const url = `${this.countriesApiUri}/capital/${searchValue}`;
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = {
            term: searchValue,
            countries: countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByName(searchValue: string): Observable<Country[]> {
    const url = `${this.countriesApiUri}/name/${searchValue}`;
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountry = {
            countries,
            term: searchValue,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByRegion(searchValue: Region): Observable<Country[]> {
    const url = `${this.countriesApiUri}/region/${searchValue}`;
    return this.getCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byRegion = {
            countries,
            region: searchValue,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByCode(searchValue: string): Observable<Country | null> {
    const url = `${this.countriesApiUri}/alpha/${searchValue}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null)),
      delay(2000),
      tap(() => this.saveToLocalStorage())
    );
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('countries_app_search_results')) return;
    this.cacheStore = JSON.parse(
      localStorage.getItem('countries_app_search_results')!
    );
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(
      'countries_app_search_results',
      JSON.stringify(this.cacheStore)
    );
  }
}
