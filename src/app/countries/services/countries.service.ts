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

  constructor(private http: HttpClient) {}

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
      )
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
      )
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
      )
    );
  }

  searchCountryByCode(searchValue: string): Observable<Country | null> {
    const url = `${this.countriesApiUri}/alpha/${searchValue}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null)),
      delay(2000)
    );
  }
}
