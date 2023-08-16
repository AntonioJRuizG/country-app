import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private countriesApiUri: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCountryByCapital(searchValue: string): Observable<Country[]> {
    const url = `${this.countriesApiUri}/capital/${searchValue}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountryByName(searchValue: string): Observable<Country[]> {
    const url = `${this.countriesApiUri}/name/${searchValue}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountryByRegion(searchValue: string): Observable<Country[]> {
    const url = `${this.countriesApiUri}/region/${searchValue}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}
