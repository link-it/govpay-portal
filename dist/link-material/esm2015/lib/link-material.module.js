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
                    AlertPagamentoComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tYXRlcmlhbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2xpbmstbWF0ZXJpYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBbUR0RixNQUFNLE9BQU8sa0JBQWtCOzs7WUFqRDlCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLDRCQUE0QjtvQkFDNUIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsd0JBQXdCO29CQUN4Qix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLHVCQUF1QjtvQkFDdkIsbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLGVBQWU7b0JBQ2Ysa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLDRCQUE0QjtvQkFDNUIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsd0JBQXdCO29CQUN4Qix1QkFBdUI7b0JBQ3ZCLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLGVBQWU7aUJBQ2hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBaWGluZ1NjYW5uZXJNb2R1bGUgfSBmcm9tICdAenhpbmcvbmd4LXNjYW5uZXInO1xuXG5pbXBvcnQgeyBTd2lwZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zd2lwZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5lYXJNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9saW5lYXItbWVudS9saW5lYXItbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlZEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVkLWl0ZW0vZmVhdHVyZWQtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZWRSZWNlaXB0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZWQtcmVjZWlwdC1pdGVtL2ZlYXR1cmVkLXJlY2VpcHQtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hvcHBpbmdDYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9zaG9wcGluZy1jYXJ0L3Nob3BwaW5nLWNhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IFBheUNhcmRDb21wb25lbnQgfSBmcm9tICcuL3BheS1jYXJkL3BheS1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dpbkNhcmRDb21wb25lbnQgfSBmcm9tICcuL2xvZ2luLWNhcmQvbG9naW4tY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50IH0gZnJvbSAnLi9hdnZpc28tcGFnYW1lbnRvL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50JztcbmltcG9ydCB7IEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50IH0gZnJvbSAnLi9hbGVydC1wYWdhbWVudG8vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFN3aXBlRGlyZWN0aXZlLFxuICAgIEhlYWRlckNvbXBvbmVudCxcbiAgICBMaW5lYXJNZW51Q29tcG9uZW50LFxuICAgIEZvb3RlckNvbXBvbmVudCxcbiAgICBGZWF0dXJlZEl0ZW1Db21wb25lbnQsXG4gICAgRmVhdHVyZWRSZWNlaXB0SXRlbUNvbXBvbmVudCxcbiAgICBTaG9wcGluZ0NhcnRDb21wb25lbnQsXG4gICAgUGF5Q2FyZENvbXBvbmVudCxcbiAgICBMb2dpbkNhcmRDb21wb25lbnQsXG4gICAgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50LFxuICAgIEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgWlhpbmdTY2FubmVyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTd2lwZURpcmVjdGl2ZSxcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gICAgTGluZWFyTWVudUNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgRmVhdHVyZWRJdGVtQ29tcG9uZW50LFxuICAgIEZlYXR1cmVkUmVjZWlwdEl0ZW1Db21wb25lbnQsXG4gICAgU2hvcHBpbmdDYXJ0Q29tcG9uZW50LFxuICAgIFBheUNhcmRDb21wb25lbnQsXG4gICAgTG9naW5DYXJkQ29tcG9uZW50LFxuICAgIEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCxcbiAgICBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTGlua01hdGVyaWFsTW9kdWxlIHsgfVxuIl19