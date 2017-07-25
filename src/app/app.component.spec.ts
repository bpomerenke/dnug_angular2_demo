import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PtoUsageListComponent } from './pto/pto-usage-list.component'
import { PtoUsageChartComponent } from './pto/pto-usage-chart.component'
import { PtoUsageService } from './services/pto-usage.service'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, 
        PtoUsageListComponent,
        PtoUsageChartComponent
      ],
      imports: [
        HttpModule,
        ChartsModule,
        NgbModule.forRoot()
      ],
      providers: [PtoUsageService],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Vaca Countdown');
  }));
});
