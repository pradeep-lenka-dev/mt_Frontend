import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { ViewsModule } from './views/views.module';
import { authGuard } from './auth-gurd/auth.guard';
const routes: Routes = [
  {
    //path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    path: '', loadChildren:()=>import('./auth/auth.module').then(m =>m.AuthModule)
},
  { path: 'login', component: LoginComponent },
  {path:'',
  // canActivate: [authGuard],
  loadChildren:()=> import('./views/views.module').then(m=>m.ViewsModule)},
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Redirect empty path to login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,AuthModule,ViewsModule]
})
export class AppRoutingModule { }
