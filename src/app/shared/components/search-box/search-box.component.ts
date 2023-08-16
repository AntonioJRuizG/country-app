import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  // Mediante Output el método 'onValue' se inyecta en el selector <shared-search-box (onValue)="métodoDeOtroComponente()"> y ejecuta el método del otro componente en el que el selector sea usado.
  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtInput')
  public searchBoxInput!: ElementRef<HTMLInputElement>;

  searchByCapital(): void {
    this.onValue.emit(this.searchBoxInput.nativeElement.value);
  }
}
