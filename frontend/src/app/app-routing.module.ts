import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuard} from './auth.guard';
//import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'empleados',
    pathMatch: 'full'
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
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1] } // Solo permite acceso al rol con id 1
  },
  {
    path: 'marcas',
    loadChildren: () => import('./marcas/marcas.module').then( m => m.MarcasPageModule),
    canActivate: [RoleGuard],
    data: { allowedRoles: [1,2] } // Solo permite acceso al rol con id 1
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule),
    data: { allowedRoles: [1,2] }
  },


  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
