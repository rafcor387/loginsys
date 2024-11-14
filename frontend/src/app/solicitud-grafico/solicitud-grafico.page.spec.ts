import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudGraficoPage } from './solicitud-grafico.page';

describe('SolicitudGraficoPage', () => {
  let component: SolicitudGraficoPage;
  let fixture: ComponentFixture<SolicitudGraficoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudGraficoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
