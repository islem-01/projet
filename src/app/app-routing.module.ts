import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import { ToolComponent } from './tool/tool.component';
import { LoginComponent } from './login/login.component';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  // 🔓 PUBLIC ROUTES
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🔐 PROTECTED ROUTES
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'member', component: MemberComponent },
      { path: 'create', component: MemberFormComponent },
      { path: 'edit/:id', component: MemberFormComponent },
      { path: 'events', component: EventComponent },
      { path: 'articles', component: ArticleComponent },
      { path: 'tools', component: ToolComponent },
    ]
  },

  // 🔁 FALLBACK
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }