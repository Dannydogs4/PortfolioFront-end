import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const appRoutes: Routes = [{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
{path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)},
{path: 'skills', loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule)},
{path: 'testimonials', loadChildren: () => import('./testimonials/testimonials.module').then(m => m.TestimonialsModule)},
{path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)},
{path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
