import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonRadiusSensitive]'
})
export class ButtonRadiusSensitiveDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = '#77acfd';
    this.el.nativeElement.style.borderRadius = '100%';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#777fe3');
    this.highRadius('30%');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#77acfd');
    this.highRadius('100%');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  private highRadius(radius: string) {
    this.el.nativeElement.style.borderRadius = radius;
  }

}
