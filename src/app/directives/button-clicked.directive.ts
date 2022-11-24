import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonClicked]',
})
export class ButtonClickedDirective {
  @Input('selected') selected: boolean | null = null;
  constructor(
    private readonly elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const requiredStyles: any = {
      'width': '250px',
      'color': '#fff'
    };
    if (this.selected) {
      Object.keys(requiredStyles).forEach((newStyle) => {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          `${newStyle}`,
          requiredStyles[newStyle]
        );
      });
    } else {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        '#ccc'
      );
    }
  }
}
