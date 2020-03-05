/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
import { FeaturedReceiptItemComponent } from './featured-receipt-item/featured-receipt-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PayCardComponent } from './pay-card/pay-card.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { AvvisoPagamentoComponent } from './avviso-pagamento/avviso-pagamento.component';
import { AlertPagamentoComponent } from './alert-pagamento/alert-pagamento.component';
import { RecaptchaComponent } from './recaptcha/recaptcha.component';
export class LinkMaterialModule {
}
LinkMaterialModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SwipeDirective,
                    HeaderComponent,
                    LinearMenuComponent,
                    FooterComponent,
                    FeaturedItemComponent,
                    FeaturedReceiptItemComponent,
                    ShoppingCartComponent,
                    PayCardComponent,
                    LoginCardComponent,
                    AvvisoPagamentoComponent,
                    AlertPagamentoComponent,
                    RecaptchaComponent
                ],
                imports: [
                    BrowserModule,
                    BrowserAnimationsModule,
                    ReactiveFormsModule,
                    RouterModule,
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
                    FeaturedReceiptItemComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tYXRlcmlhbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2xpbmstbWF0ZXJpYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBb0RyRSxNQUFNLE9BQU8sa0JBQWtCOzs7WUFsRDlCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLDRCQUE0QjtvQkFDNUIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2IsdUJBQXVCO29CQUN2QixtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLHFCQUFxQjtvQkFDckIsZUFBZTtvQkFDZixrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxjQUFjO29CQUNkLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLHFCQUFxQjtvQkFDckIsNEJBQTRCO29CQUM1QixxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtvQkFDdkIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLHFCQUFxQjtvQkFDckIsZUFBZTtpQkFDaEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IFpYaW5nU2Nhbm5lck1vZHVsZSB9IGZyb20gJ0B6eGluZy9uZ3gtc2Nhbm5lcic7XG5cbmltcG9ydCB7IFN3aXBlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3N3aXBlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmVhck1lbnVDb21wb25lbnQgfSBmcm9tICcuL2xpbmVhci1tZW51L2xpbmVhci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZlYXR1cmVkSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZWQtaXRlbS9mZWF0dXJlZC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlZFJlY2VpcHRJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlZC1yZWNlaXB0LWl0ZW0vZmVhdHVyZWQtcmVjZWlwdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaG9wcGluZ0NhcnRDb21wb25lbnQgfSBmcm9tICcuL3Nob3BwaW5nLWNhcnQvc2hvcHBpbmctY2FydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF5Q2FyZENvbXBvbmVudCB9IGZyb20gJy4vcGF5LWNhcmQvcGF5LWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IExvZ2luQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vbG9naW4tY2FyZC9sb2dpbi1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdnZpc29QYWdhbWVudG9Db21wb25lbnQgfSBmcm9tICcuL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWxlcnRQYWdhbWVudG9Db21wb25lbnQgfSBmcm9tICcuL2FsZXJ0LXBhZ2FtZW50by9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50JztcbmltcG9ydCB7IFJlY2FwdGNoYUNvbXBvbmVudCB9IGZyb20gJy4vcmVjYXB0Y2hhL3JlY2FwdGNoYS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTd2lwZURpcmVjdGl2ZSxcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gICAgTGluZWFyTWVudUNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgRmVhdHVyZWRJdGVtQ29tcG9uZW50LFxuICAgIEZlYXR1cmVkUmVjZWlwdEl0ZW1Db21wb25lbnQsXG4gICAgU2hvcHBpbmdDYXJ0Q29tcG9uZW50LFxuICAgIFBheUNhcmRDb21wb25lbnQsXG4gICAgTG9naW5DYXJkQ29tcG9uZW50LFxuICAgIEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCxcbiAgICBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCxcbiAgICBSZWNhcHRjaGFDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBaWGluZ1NjYW5uZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFN3aXBlRGlyZWN0aXZlLFxuICAgIEhlYWRlckNvbXBvbmVudCxcbiAgICBMaW5lYXJNZW51Q29tcG9uZW50LFxuICAgIEZvb3RlckNvbXBvbmVudCxcbiAgICBGZWF0dXJlZEl0ZW1Db21wb25lbnQsXG4gICAgRmVhdHVyZWRSZWNlaXB0SXRlbUNvbXBvbmVudCxcbiAgICBTaG9wcGluZ0NhcnRDb21wb25lbnQsXG4gICAgUGF5Q2FyZENvbXBvbmVudCxcbiAgICBMb2dpbkNhcmRDb21wb25lbnQsXG4gICAgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50LFxuICAgIEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50LFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rTWF0ZXJpYWxNb2R1bGUgeyB9XG4iXX0=