// Author: Daniel Skwarcha

import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsResolverService } from './projects-resolver.service';

const routes: Routes = [
{path: '', component: ProjectsComponent,
 resolve: {projects: ProjectsResolverService}
}
];

@NgModule({
  declarations:[ProjectsComponent],
  exports: [ProjectsComponent, RouterModule],
  imports:[CommonModule, RouterModule.forChild(routes)]
})
export class ProjectsModule{

}
