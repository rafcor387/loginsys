import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepuestosPage } from './repuestos.page';

describe('RepuestosPage', () => {
  let component: RepuestosPage;
  let fixture: ComponentFixture<RepuestosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepuestosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
