import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appButtonClicked2]'
})
export class ButtonClicked2Directive {
  @Input('selected') selected: boolean | null = null;

  constructor(
    private readonly el: ElementRef,
  ) {
    this.el.nativeElement.style.backgroundColor = '#77acfd';
    this.el.nativeElement.style.borderRadius = '100%';
  }

  @HostListener('click') onClick() {
    this.highlight('white');
  };

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
