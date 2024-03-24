import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./task-list-page/task-list-page.component').then(c => c.TaskListPageComponent),
  },
  {
    path: 'task/:id',
    loadComponent: () => import('./task-details-page/task-details-page.component').then(c => c.TaskDetailsPageComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
