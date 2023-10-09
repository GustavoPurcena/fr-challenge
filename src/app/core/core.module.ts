import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { TimeFormatPipe } from './pipes/time-format.pipe';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
