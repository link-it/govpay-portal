import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
export declare class SwipeDirective {
    private element;
    private renderer;
    onTs(event: any): void;
    onTe(event: any): void;
    _directiveEnabled: boolean;
    mlSwipeRight: EventEmitter<any>;
    mlSwipeLeft: EventEmitter<any>;
    protected touchstartX: number;
    protected touchendX: number;
    protected delay: {
        start: number;
        end: number;
        diff: number;
    };
    constructor(element: ElementRef, renderer: Renderer2);
    protected handleSwipe(): void;
}
