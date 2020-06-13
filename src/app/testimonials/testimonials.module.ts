// Author: Daniel Skwarcha

import { NgModule } from '@angular/core';
import { TestimonialsComponent } from './testimonials.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TestimonialsResolverService } from './testimonials-resolver.service';

const routes: Routes = [
{path: '', component: TestimonialsComponent,
 resolve: {testimonials: TestimonialsResolverService}
}
];

@NgModule({
  declarations:[TestimonialsComponent],
  exports: [TestimonialsComponent, RouterModule],
  imports:[CommonModule, RouterModule.forChild(routes)]
})
export class TestimonialsModule{

}
