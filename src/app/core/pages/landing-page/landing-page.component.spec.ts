
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { Component, Input } from '@angular/core';

// Stubbing the app-currency-card component
@Component({
  selector: 'app-currency-card',
  template: ''
})
class CurrencyCardStubComponent {
  @Input() currencyTitle: string = '';
  @Input() currencyCode: string = '';
}

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageComponent, CurrencyCardStubComponent]
    });
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-currency-card components', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-currency-card').length).toBe(3);
  });
});