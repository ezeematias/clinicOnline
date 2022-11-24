import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgChange]'
})
export class ImgChangeDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.src = '../../assets/logoCompleted.png';
    this.el.nativeElement.style.width = '20%';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highSrc('../../assets/icon.png');
    this.highlight('6%');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highSrc('../../assets/logoCompleted.png');
    this.highlight('20%');
  }

  private highSrc(src: string) {
    this.el.nativeElement.src = src;
  }

  private highlight(width: string) {
    this.el.nativeElement.style.width = width;
  }

}
