import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(350))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  @Input()
  public placeholder: string = '';

  // Mediante Output el método 'onValue' se inyecta en el selector <shared-search-box (onValue)="métodoDeOtroComponente()"> y ejecuta el método del otro componente en el que el selector sea usado.
  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @ViewChild('txtInput')
  public searchBoxInput!: ElementRef<HTMLInputElement>;

  emitSearchTerm(): void {
    this.onValue.emit(this.searchBoxInput.nativeElement.value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
