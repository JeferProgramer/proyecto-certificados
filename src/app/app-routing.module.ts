import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { MsalGuard } from '@azure/msal-angular';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/certificados', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'certificados', component: LayoutComponent, canActivate: [MsalGuard], children: [
     { path: '', component: CertificadosComponent },
  ]
  }, 
  { path: '**', redirectTo: '/certificados' },
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
})
export class AppRoutingModule { }

