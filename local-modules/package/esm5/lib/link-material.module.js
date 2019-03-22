/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SwipeDirective } from './directives/swipe.directive';
import { HeaderComponent } from './header/header.component';
import { LinearMenuComponent } from './linear-menu/linear-menu.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturedItemComponent } from './featured-item/featured-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PayCardComponent } from './pay-card/pay-card.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { AvvisoPagamentoComponent } from './avviso-pagamento/avviso-pagamento.component';
import { AlertPagamentoComponent } from './alert-pagamento/alert-pagamento.component';
var LinkMaterialModule = /** @class */ (function () {
    function LinkMaterialModule() {
    }
    LinkMaterialModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SwipeDirective,
                        HeaderComponent,
                        LinearMenuComponent,
                        FooterComponent,
                        FeaturedItemComponent,
                        ShoppingCartComponent,
                        PayCardComponent,
                        LoginCardComponent,
                        AvvisoPagamentoComponent,
                        AlertPagamentoComponent
                    ],
                    imports: [
                        BrowserModule,
                        BrowserAnimationsModule,
                        ReactiveFormsModule,
                        MatTooltipModule,
                        MatButtonModule,
                        MatIconModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatAutocompleteModule,
                        MatSelectModule,
                        ZXingScannerModule
                    ],
                    exports: [
                        SwipeDirective,
                        HeaderComponent,
                        LinearMenuComponent,
                        FooterComponent,
                        FeaturedItemComponent,
                        ShoppingCartComponent,
                        PayCardComponent,
                        LoginCardComponent,
                        AvvisoPagamentoComponent,
                        AlertPagamentoComponent,
                        MatTooltipModule,
                        MatButtonModule,
                        MatIconModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatAutocompleteModule,
                        MatSelectModule
                    ]
                },] }
    ];
    return LinkMaterialModule;
}());
export { LinkMaterialModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tYXRlcmlhbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2xpbmstbWF0ZXJpYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFdEY7SUFBQTtJQThDa0MsQ0FBQzs7Z0JBOUNsQyxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2IsdUJBQXVCO3dCQUN2QixtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxxQkFBcUI7d0JBQ3JCLGVBQWU7d0JBQ2Ysa0JBQWtCO3FCQUNuQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIsdUJBQXVCO3dCQUN2QixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QscUJBQXFCO3dCQUNyQixlQUFlO3FCQUNoQjtpQkFDRjs7SUFDaUMseUJBQUM7Q0FBQSxBQTlDbkMsSUE4Q21DO1NBQXRCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgWlhpbmdTY2FubmVyTW9kdWxlIH0gZnJvbSAnQHp4aW5nL25neC1zY2FubmVyJztcblxuaW1wb3J0IHsgU3dpcGVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc3dpcGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGluZWFyTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbGluZWFyLW1lbnUvbGluZWFyLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZWRJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlZC1pdGVtL2ZlYXR1cmVkLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFNob3BwaW5nQ2FydENvbXBvbmVudCB9IGZyb20gJy4vc2hvcHBpbmctY2FydC9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXlDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTG9naW5DYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi1jYXJkL2xvZ2luLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCB9IGZyb20gJy4vYXZ2aXNvLXBhZ2FtZW50by9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCB9IGZyb20gJy4vYWxlcnQtcGFnYW1lbnRvL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTd2lwZURpcmVjdGl2ZSxcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gICAgTGluZWFyTWVudUNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgRmVhdHVyZWRJdGVtQ29tcG9uZW50LFxuICAgIFNob3BwaW5nQ2FydENvbXBvbmVudCxcbiAgICBQYXlDYXJkQ29tcG9uZW50LFxuICAgIExvZ2luQ2FyZENvbXBvbmVudCxcbiAgICBBdnZpc29QYWdhbWVudG9Db21wb25lbnQsXG4gICAgQWxlcnRQYWdhbWVudG9Db21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIFpYaW5nU2Nhbm5lck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU3dpcGVEaXJlY3RpdmUsXG4gICAgSGVhZGVyQ29tcG9uZW50LFxuICAgIExpbmVhck1lbnVDb21wb25lbnQsXG4gICAgRm9vdGVyQ29tcG9uZW50LFxuICAgIEZlYXR1cmVkSXRlbUNvbXBvbmVudCxcbiAgICBTaG9wcGluZ0NhcnRDb21wb25lbnQsXG4gICAgUGF5Q2FyZENvbXBvbmVudCxcbiAgICBMb2dpbkNhcmRDb21wb25lbnQsXG4gICAgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50LFxuICAgIEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50LFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rTWF0ZXJpYWxNb2R1bGUgeyB9XG4iXX0=