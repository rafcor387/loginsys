import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesPredictionPage } from './sales-prediction.page';

describe('SalesPredictionPage', () => {
  let component: SalesPredictionPage;
  let fixture: ComponentFixture<SalesPredictionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPredictionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
