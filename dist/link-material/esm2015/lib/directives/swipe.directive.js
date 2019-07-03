/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
export class SwipeDirective {
    /**
     * @param {?} element
     * @param {?} renderer
     */
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this._directiveEnabled = false;
        this.mlSwipeRight = new EventEmitter();
        this.mlSwipeLeft = new EventEmitter();
        this.touchstartX = 0;
        this.touchendX = 0;
        this.delay = { start: 0, end: 0, diff: 0 };
        renderer.addClass(element.nativeElement, 'swipe-directive');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTs(event) {
        if (this._directiveEnabled) {
            this.touchstartX = event.changedTouches[0].screenX;
            this.delay.start = Date.now();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTe(event) {
        if (this._directiveEnabled) {
            this.touchendX = event.changedTouches[0].screenX;
            this.delay.end = Date.now();
            this.delay.diff = Math.abs(this.touchendX - this.touchstartX);
            this.handleSwipe();
        }
    }
    /**
     * @protected
     * @return {?}
     */
    handleSwipe() {
        /** @type {?} */
        const touch = (this.touchendX < this.touchstartX) ? -1 : ((this.touchendX > this.touchstartX) ? 1 : 0);
        if (touch != 0 && this.delay.diff >= 50 && (this.delay.end - this.delay.start) <= 300) {
            switch (touch) {
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
SwipeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mlcSwipeLeftItem]'
            },] }
];
/** @nocollapse */
SwipeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
SwipeDirective.propDecorators = {
    onTs: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
    onTe: [{ type: HostListener, args: ['touchend', ['$event'],] }],
    _directiveEnabled: [{ type: Input, args: ['mlcSwipeLeftItem',] }],
    mlSwipeRight: [{ type: Output, args: ['on-swipe-right',] }],
    mlSwipeLeft: [{ type: Output, args: ['on-swipe-left',] }]
};
if (false) {
    /** @type {?} */
    SwipeDirective.prototype._directiveEnabled;
    /** @type {?} */
    SwipeDirective.prototype.mlSwipeRight;
    /** @type {?} */
    SwipeDirective.prototype.mlSwipeLeft;
    /**
     * @type {?}
     * @protected
     */
    SwipeDirective.prototype.touchstartX;
    /**
     * @type {?}
     * @protected
     */
    SwipeDirective.prototype.touchendX;
    /**
     * @type {?}
     * @protected
     */
    SwipeDirective.prototype.delay;
    /**
     * @type {?}
     * @private
     */
    SwipeDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    SwipeDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3N3aXBlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs1RyxNQUFNLE9BQU8sY0FBYzs7Ozs7SUEyQnpCLFlBQW9CLE9BQW1CLEVBQVUsUUFBbUI7UUFBaEQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFUekMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBRXBDLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRSxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsVUFBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUc5QyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQTVCeUMsSUFBSSxDQUFDLEtBQUs7UUFDbEQsSUFBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7OztJQUV1QyxJQUFJLENBQUMsS0FBSztRQUNoRCxJQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7O0lBZVMsV0FBVzs7Y0FDYixLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDOUYsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ3JGLFFBQU8sS0FBSyxFQUFFO2dCQUNaLEtBQUssQ0FBQyxDQUFDO29CQUNMLDhCQUE4QjtvQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsTUFBTTtnQkFDUixLQUFLLENBQUM7b0JBQ0osK0JBQStCO29CQUMvQiw0QkFBNEI7b0JBQzVCLE1BQU07YUFDVDtTQUNGO0lBQ0gsQ0FBQzs7O1lBaERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7O1lBSm1CLFVBQVU7WUFBNkMsU0FBUzs7O21CQU1qRixZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUUsUUFBUSxDQUFFO21CQU92QyxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUUsUUFBUSxDQUFFO2dDQVVyQyxLQUFLLFNBQUMsa0JBQWtCOzJCQUV4QixNQUFNLFNBQUMsZ0JBQWdCOzBCQUN2QixNQUFNLFNBQUMsZUFBZTs7OztJQUh2QiwyQ0FBOEQ7O0lBRTlELHNDQUErRTs7SUFDL0UscUNBQTZFOzs7OztJQUU3RSxxQ0FBMEI7Ozs7O0lBQzFCLG1DQUF3Qjs7Ozs7SUFDeEIsK0JBQWdEOzs7OztJQUVwQyxpQ0FBMkI7Ozs7O0lBQUUsa0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttbGNTd2lwZUxlZnRJdGVtXSdcbn0pXG5leHBvcnQgY2xhc3MgU3dpcGVEaXJlY3RpdmUge1xuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyAnJGV2ZW50JyBdKSBvblRzKGV2ZW50KSB7XG4gICAgaWYodGhpcy5fZGlyZWN0aXZlRW5hYmxlZCkge1xuICAgICAgdGhpcy50b3VjaHN0YXJ0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XG4gICAgICB0aGlzLmRlbGF5LnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsgJyRldmVudCcgXSkgb25UZShldmVudCkge1xuICAgIGlmKHRoaXMuX2RpcmVjdGl2ZUVuYWJsZWQpIHtcbiAgICAgIHRoaXMudG91Y2hlbmRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcbiAgICAgIHRoaXMuZGVsYXkuZW5kID0gRGF0ZS5ub3coKTtcbiAgICAgIHRoaXMuZGVsYXkuZGlmZiA9IE1hdGguYWJzKHRoaXMudG91Y2hlbmRYIC0gdGhpcy50b3VjaHN0YXJ0WCk7XG5cbiAgICAgIHRoaXMuaGFuZGxlU3dpcGUoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ21sY1N3aXBlTGVmdEl0ZW0nKSBfZGlyZWN0aXZlRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoJ29uLXN3aXBlLXJpZ2h0JykgbWxTd2lwZVJpZ2h0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnb24tc3dpcGUtbGVmdCcpIG1sU3dpcGVMZWZ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcm90ZWN0ZWQgdG91Y2hzdGFydFggPSAwO1xuICBwcm90ZWN0ZWQgdG91Y2hlbmRYID0gMDtcbiAgcHJvdGVjdGVkIGRlbGF5ID0geyBzdGFydDogMCwgZW5kOiAwLCBkaWZmOiAwIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzd2lwZS1kaXJlY3RpdmUnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVTd2lwZSgpIHtcbiAgICBjb25zdCB0b3VjaCA9ICh0aGlzLnRvdWNoZW5kWCA8IHRoaXMudG91Y2hzdGFydFgpPy0xOigodGhpcy50b3VjaGVuZFggPiB0aGlzLnRvdWNoc3RhcnRYKT8xOjApO1xuICAgIGlmICh0b3VjaCAhPSAwICYmIHRoaXMuZGVsYXkuZGlmZiA+PSA1MCAmJiAodGhpcy5kZWxheS5lbmQgLSB0aGlzLmRlbGF5LnN0YXJ0KSA8PSAzMDApIHtcbiAgICAgIHN3aXRjaCh0b3VjaCkge1xuICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTd2lwZWQgbGVmdCcpO1xuICAgICAgICAgIHRoaXMubWxTd2lwZUxlZnQuZW1pdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N3aXBlZCByaWdodCcpO1xuICAgICAgICAgIC8vIHRoaXMub25Td2lwZVJpZ2h0LmVtaXQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19