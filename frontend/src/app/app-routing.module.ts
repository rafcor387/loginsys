//app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuard} from './auth.guard';
import { AuthService } from './services/auth.service';
//import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Asegura que coincida exactamente con la raíz ('/')
  },  
  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1] } // Solo permite acceso al rol con id 1
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1,2] } 
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1] } 
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'verification-success',
    loadChildren: () => import('./verification-success/verification-success.module').then( m => m.VerificationSuccessPageModule)
  },
  {
    path: 'repuestos',
    loadChildren: () => import('./repuestos/repuestos.module').then( m => m.RepuestosPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1,2] } 
  },
 
  {
    path: 'marcas',
    loadChildren: () => import('./marcas/marcas.module').then( m => m.MarcasPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1,2] }
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1,2] }
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1,2] }
  },
  {
    path: 'solicitud-grafico',
    loadChildren: () => import('./solicitud-grafico/solicitud-grafico.module').then( m => m.SolicitudGraficoPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1] }
  },
  {
    path: 'sales-prediction/:producto_id',
    loadChildren: () => import('./sales-prediction/sales-prediction.module').then(m => m.SalesPredictionPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1] }
  }, 
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found', // O redirige a la página principal
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
