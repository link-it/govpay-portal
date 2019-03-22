/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
var SwipeDirective = /** @class */ (function () {
    function SwipeDirective(element, renderer) {
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
    SwipeDirective.prototype.onTs = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._directiveEnabled) {
            this.touchstartX = event.changedTouches[0].screenX;
            this.delay.start = Date.now();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SwipeDirective.prototype.onTe = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._directiveEnabled) {
            this.touchendX = event.changedTouches[0].screenX;
            this.delay.end = Date.now();
            this.delay.diff = Math.abs(this.touchendX - this.touchstartX);
            this.handleSwipe();
        }
    };
    /**
     * @protected
     * @return {?}
     */
    SwipeDirective.prototype.handleSwipe = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var touch = (this.touchendX < this.touchstartX) ? -1 : ((this.touchendX > this.touchstartX) ? 1 : 0);
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
    };
    SwipeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mlcSwipeLeftItem]'
                },] }
    ];
    /** @nocollapse */
    SwipeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    SwipeDirective.propDecorators = {
        onTs: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
        onTe: [{ type: HostListener, args: ['touchend', ['$event'],] }],
        _directiveEnabled: [{ type: Input, args: ['mlcSwipeLeftItem',] }],
        mlSwipeRight: [{ type: Output, args: ['on-swipe-right',] }],
        mlSwipeLeft: [{ type: Output, args: ['on-swipe-left',] }]
    };
    return SwipeDirective;
}());
export { SwipeDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3N3aXBlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RztJQThCRSx3QkFBb0IsT0FBbUIsRUFBVSxRQUFtQjtRQUFoRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVR6QyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFcEMsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0RCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5FLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxVQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRzlDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBNUJ5Qyw2QkFBSTs7OztJQUE5QyxVQUErQyxLQUFLO1FBQ2xELElBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Ozs7SUFFdUMsNkJBQUk7Ozs7SUFBNUMsVUFBNkMsS0FBSztRQUNoRCxJQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7O0lBZVMsb0NBQVc7Ozs7SUFBckI7O1lBQ1EsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQzlGLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNyRixRQUFPLEtBQUssRUFBRTtnQkFDWixLQUFLLENBQUMsQ0FBQztvQkFDTCw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1IsS0FBSyxDQUFDO29CQUNKLCtCQUErQjtvQkFDL0IsNEJBQTRCO29CQUM1QixNQUFNO2FBQ1Q7U0FDRjtJQUNILENBQUM7O2dCQWhERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7Ozs7Z0JBSm1CLFVBQVU7Z0JBQTZDLFNBQVM7Ozt1QkFNakYsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFFLFFBQVEsQ0FBRTt1QkFPdkMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFFLFFBQVEsQ0FBRTtvQ0FVckMsS0FBSyxTQUFDLGtCQUFrQjsrQkFFeEIsTUFBTSxTQUFDLGdCQUFnQjs4QkFDdkIsTUFBTSxTQUFDLGVBQWU7O0lBMEJ6QixxQkFBQztDQUFBLEFBbERELElBa0RDO1NBL0NZLGNBQWM7OztJQWtCekIsMkNBQThEOztJQUU5RCxzQ0FBK0U7O0lBQy9FLHFDQUE2RTs7Ozs7SUFFN0UscUNBQTBCOzs7OztJQUMxQixtQ0FBd0I7Ozs7O0lBQ3hCLCtCQUFnRDs7Ozs7SUFFcEMsaUNBQTJCOzs7OztJQUFFLGtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWxjU3dpcGVMZWZ0SXRlbV0nXG59KVxuZXhwb3J0IGNsYXNzIFN3aXBlRGlyZWN0aXZlIHtcbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsgJyRldmVudCcgXSkgb25UcyhldmVudCkge1xuICAgIGlmKHRoaXMuX2RpcmVjdGl2ZUVuYWJsZWQpIHtcbiAgICAgIHRoaXMudG91Y2hzdGFydFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgICAgdGhpcy5kZWxheS5zdGFydCA9IERhdGUubm93KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hlbmQnLCBbICckZXZlbnQnIF0pIG9uVGUoZXZlbnQpIHtcbiAgICBpZih0aGlzLl9kaXJlY3RpdmVFbmFibGVkKSB7XG4gICAgICB0aGlzLnRvdWNoZW5kWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XG4gICAgICB0aGlzLmRlbGF5LmVuZCA9IERhdGUubm93KCk7XG4gICAgICB0aGlzLmRlbGF5LmRpZmYgPSBNYXRoLmFicyh0aGlzLnRvdWNoZW5kWCAtIHRoaXMudG91Y2hzdGFydFgpO1xuXG4gICAgICB0aGlzLmhhbmRsZVN3aXBlKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdtbGNTd2lwZUxlZnRJdGVtJykgX2RpcmVjdGl2ZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCdvbi1zd2lwZS1yaWdodCcpIG1sU3dpcGVSaWdodDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ29uLXN3aXBlLWxlZnQnKSBtbFN3aXBlTGVmdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJvdGVjdGVkIHRvdWNoc3RhcnRYID0gMDtcbiAgcHJvdGVjdGVkIHRvdWNoZW5kWCA9IDA7XG4gIHByb3RlY3RlZCBkZWxheSA9IHsgc3RhcnQ6IDAsIGVuZDogMCwgZGlmZjogMCB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc3dpcGUtZGlyZWN0aXZlJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlU3dpcGUoKSB7XG4gICAgY29uc3QgdG91Y2ggPSAodGhpcy50b3VjaGVuZFggPCB0aGlzLnRvdWNoc3RhcnRYKT8tMTooKHRoaXMudG91Y2hlbmRYID4gdGhpcy50b3VjaHN0YXJ0WCk/MTowKTtcbiAgICBpZiAodG91Y2ggIT0gMCAmJiB0aGlzLmRlbGF5LmRpZmYgPj0gNTAgJiYgKHRoaXMuZGVsYXkuZW5kIC0gdGhpcy5kZWxheS5zdGFydCkgPD0gMzAwKSB7XG4gICAgICBzd2l0Y2godG91Y2gpIHtcbiAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3dpcGVkIGxlZnQnKTtcbiAgICAgICAgICB0aGlzLm1sU3dpcGVMZWZ0LmVtaXQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTd2lwZWQgcmlnaHQnKTtcbiAgICAgICAgICAvLyB0aGlzLm9uU3dpcGVSaWdodC5lbWl0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==