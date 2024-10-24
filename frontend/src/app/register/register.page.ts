import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{

  //name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  id_empleado: number = 0;
  errorMessage: string = '';  // Variable para almacenar el mensaje de error

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el id_empleado desde los parámetros de la ruta
    this.id_empleado = Number(this.route.snapshot.paramMap.get('id_empleado'));
    this.email = String(this.route.snapshot.paramMap.get('email_emp'));
  }

  register() {
    this.authService.register({ /*name: this.name, */
      email: this.email, 
      password: this.password, 
      password_confirmation: this.password_confirmation, 
      id_empleado : this.id_empleado })
      .subscribe(response => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/empleados']); // Redirigir al login
      }, error => {
        console.error('Error en el registro', error);
        this.errorMessage = error;  // Almacenar el mensaje de error
      });
  }
  
}