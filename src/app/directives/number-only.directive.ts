import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numberOnly]'
})
export class NumberOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event): void {
    const initValue = this.el.nativeElement.value;
    const numbersOnly = /[^0-9]*/g;
    this.el.nativeElement.value = initValue.replace(numbersOnly, '');
    if (initValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
