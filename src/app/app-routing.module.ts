import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren:() =>import('./auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path:'tasks',
    loadChildren:() =>import('./tasks/tasks.module').then(m=> m.TasksModule),
    canActivate:[AppGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
