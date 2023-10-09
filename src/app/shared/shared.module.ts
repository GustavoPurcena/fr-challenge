import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { TimeFormatPipe } from '@app/core/pipes/time-format.pipe';

@NgModule({
  declarations: [
    CurrencyCardComponent,
    TimeFormatPipe,
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
    CurrencyCardComponent
  ]
})
export class SharedModule { }
