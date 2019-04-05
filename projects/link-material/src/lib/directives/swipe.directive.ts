import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mlcSwipeLeftItem]'
})
export class SwipeDirective {
  @HostListener('touchstart', [ '$event' ]) onTs(event) {
    if(this._directiveEnabled) {
      this.touchstartX = event.changedTouches[0].screenX;
      this.delay.start = Date.now();
    }
  }

  @HostListener('touchend', [ '$event' ]) onTe(event) {
    if(this._directiveEnabled) {
      this.touchendX = event.changedTouches[0].screenX;
      this.delay.end = Date.now();
      this.delay.diff = Math.abs(this.touchendX - this.touchstartX);

      this.handleSwipe();
    }
  }

  @Input('mlcSwipeLeftItem') _directiveEnabled: boolean = false;

  @Output('on-swipe-right') mlSwipeRight: EventEmitter<any> = new EventEmitter();
  @Output('on-swipe-left') mlSwipeLeft: EventEmitter<any> = new EventEmitter();

  protected touchstartX = 0;
  protected touchendX = 0;
  protected delay = { start: 0, end: 0, diff: 0 };

  constructor(private element: ElementRef, private renderer: Renderer2) {
    renderer.addClass(element.nativeElement, 'swipe-directive');
  }

  protected handleSwipe() {
    const touch = (this.touchendX < this.touchstartX)?-1:((this.touchendX > this.touchstartX)?1:0);
    if (touch != 0 && this.delay.diff >= 50 && (this.delay.end - this.delay.start) <= 300) {
      switch(touch) {
        case -1:
          // console.log('Swiped left');
          this.mlSwipeLeft.emit();
          break;
        case 1:
          // console.log('Swiped right');
          // this.onSwipeRight.emit();
          break;
      }
    }
  }

}
