import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonSensitive]'
})
export class ButtonSensitiveDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = '#f1f1f1';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#f1f1f1');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
