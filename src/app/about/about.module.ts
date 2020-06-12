import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutResolverService } from './about-resolver.service';

const routes: Routes = [
{path: '', component: AboutComponent,
 resolve: {about: AboutResolverService}
}
];

@NgModule({
  declarations:[AboutComponent],
  exports: [AboutComponent, RouterModule],
  imports:[CommonModule, RouterModule.forChild(routes)]
})
export class AboutModule{

}
