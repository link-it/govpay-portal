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

@NgModule({
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
})
export class LinkMaterialModule { }
