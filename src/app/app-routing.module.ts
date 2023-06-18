import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/dashboard'},
  {path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path: 'courses', loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule)},
  {path: 'learning', loadChildren: () => import('./pages/learning/learning.module').then(m => m.LearningModule)},
  {path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)},
  {path: 'addcourse', loadChildren: () => import('./pages/addcourse/addcourse.module').then(m => m.AddcourseModule)},
  {path: 'editcourse', loadChildren: () => import('./pages/editcourse/editcourse.module').then(m => m.EditcourseModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
