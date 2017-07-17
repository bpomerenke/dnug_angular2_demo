import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PtoUsageService } from './services/pto-usage.service'
import { AppComponent } from './app.component';
import { PtoUsageChartComponent } from './pto/pto-usage-chart.component'
import { PtoUsageListComponent } from './pto/pto-usage-list.component'
import { PtoUsageModal } from './pto/pto-usage-modal';

@NgModule({
  declarations: [
    AppComponent,
    PtoUsageChartComponent,
    PtoUsageListComponent,
    PtoUsageModal
  ],
  entryComponents: [PtoUsageModal],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    NgbModule.forRoot()
  ],
  providers: [PtoUsageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
