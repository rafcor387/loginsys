import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-prediction',
  templateUrl: './sales-prediction.page.html',
  styleUrls: ['./sales-prediction.page.scss'],
})
export class SalesPredictionPage implements OnInit {
  @ViewChild('salesChart', { static: true }) salesChart!: ElementRef; // Added '!' to indicate definite assignment

  chart: any;
  productoId: string = ''; // Inicializamos como una cadena vacía

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtén el ID del producto desde los parámetros de la ruta y asegúrate de que sea de tipo `string`
    this.productoId = this.route.snapshot.paramMap.get('producto_id') || ''; // Valor predeterminado si es `null`
    this.getSalesPredictionData();
  }

  getSalesPredictionData() {
    // Llama a la API para obtener los datos de predicción de ventas
    this.http.get(`http://localhost:8000/api/predict-sales/${this.productoId}`).subscribe((data: any) => {
      const ventasReales = data.ventas_reales;
      const ventasPredichas = data.ventas_predichas;

      this.createChart(ventasReales, ventasPredichas);
    });
  }

  createChart(ventasReales: number[], ventasPredichas: number[]) {
    this.chart = new Chart(this.salesChart.nativeElement, {
      type: 'line',
      data: {
        labels: ventasReales.map((_, index) => `Dato ${index + 1}`),
        datasets: [
          {
            label: 'Ventas Reales',
            data: ventasReales,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Ventas Predichas',
            data: ventasPredichas,
            borderColor: 'green',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Datos procesados',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Ventas',
            },
          },
        },
      },
    });
  }
}
