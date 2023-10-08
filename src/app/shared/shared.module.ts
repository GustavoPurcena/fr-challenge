import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';

@NgModule({
  declarations: [
    CurrencyCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
