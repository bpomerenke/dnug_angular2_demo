import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';
import { PtoUsageService } from './services/pto-usage.service'
import { AppComponent } from './app.component';
import { PtoUsageChartComponent } from './pto/pto-usage-chart.component'
import { PtoUsageListComponent } from './pto/pto-usage-list.component'

@NgModule({
  declarations: [
    AppComponent,
    PtoUsageChartComponent,
    PtoUsageListComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule
  ],
  providers: [PtoUsageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
