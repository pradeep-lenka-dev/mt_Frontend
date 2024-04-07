import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashobrdComponent } from './dashobrd/dashobrd.component';
import { authGuard } from '../auth-gurd/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'dashbord',
  canActivate:[authGuard],
   component: DashobrdComponent ,

  //  children:[

  //  ]
 children: [
    { path: '', component: HomeComponent },
    // Add additional child routes if needed
  ]
  // Additional routes if needed
}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewsRoutingModule { }
