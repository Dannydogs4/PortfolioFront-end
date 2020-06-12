import { NgModule } from '@angular/core';
import { SkillsComponent } from './skills.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SkillsResolverService } from './skills-resolver.service';

const routes: Routes = [
{path: '', component: SkillsComponent,
 resolve: {skills: SkillsResolverService}
}
];

@NgModule({
  declarations:[SkillsComponent],
  exports: [SkillsComponent, RouterModule],
  imports:[CommonModule, RouterModule.forChild(routes)]
})
export class SkillsModule{

}
