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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tYXRlcmlhbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2xpbmstbWF0ZXJpYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBaUR0RixNQUFNLE9BQU8sa0JBQWtCOzs7WUEvQzlCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLHdCQUF3QjtvQkFDeEIsdUJBQXVCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsWUFBWTtvQkFDWixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QscUJBQXFCO29CQUNyQixlQUFlO29CQUNmLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLGVBQWU7b0JBQ2YscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLHVCQUF1QjtvQkFDdkIsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLHFCQUFxQjtvQkFDckIsZUFBZTtpQkFDaEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IFpYaW5nU2Nhbm5lck1vZHVsZSB9IGZyb20gJ0B6eGluZy9uZ3gtc2Nhbm5lcic7XG5cbmltcG9ydCB7IFN3aXBlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3N3aXBlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmVhck1lbnVDb21wb25lbnQgfSBmcm9tICcuL2xpbmVhci1tZW51L2xpbmVhci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZlYXR1cmVkSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZWQtaXRlbS9mZWF0dXJlZC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaG9wcGluZ0NhcnRDb21wb25lbnQgfSBmcm9tICcuL3Nob3BwaW5nLWNhcnQvc2hvcHBpbmctY2FydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF5Q2FyZENvbXBvbmVudCB9IGZyb20gJy4vcGF5LWNhcmQvcGF5LWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IExvZ2luQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vbG9naW4tY2FyZC9sb2dpbi1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdnZpc29QYWdhbWVudG9Db21wb25lbnQgfSBmcm9tICcuL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWxlcnRQYWdhbWVudG9Db21wb25lbnQgfSBmcm9tICcuL2FsZXJ0LXBhZ2FtZW50by9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU3dpcGVEaXJlY3RpdmUsXG4gICAgSGVhZGVyQ29tcG9uZW50LFxuICAgIExpbmVhck1lbnVDb21wb25lbnQsXG4gICAgRm9vdGVyQ29tcG9uZW50LFxuICAgIEZlYXR1cmVkSXRlbUNvbXBvbmVudCxcbiAgICBTaG9wcGluZ0NhcnRDb21wb25lbnQsXG4gICAgUGF5Q2FyZENvbXBvbmVudCxcbiAgICBMb2dpbkNhcmRDb21wb25lbnQsXG4gICAgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50LFxuICAgIEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgWlhpbmdTY2FubmVyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTd2lwZURpcmVjdGl2ZSxcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gICAgTGluZWFyTWVudUNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgRmVhdHVyZWRJdGVtQ29tcG9uZW50LFxuICAgIFNob3BwaW5nQ2FydENvbXBvbmVudCxcbiAgICBQYXlDYXJkQ29tcG9uZW50LFxuICAgIExvZ2luQ2FyZENvbXBvbmVudCxcbiAgICBBdnZpc29QYWdhbWVudG9Db21wb25lbnQsXG4gICAgQWxlcnRQYWdhbWVudG9Db21wb25lbnQsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtNYXRlcmlhbE1vZHVsZSB7IH1cbiJdfQ==