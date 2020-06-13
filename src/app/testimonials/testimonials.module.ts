// Author: Daniel Skwarcha

// This typescript file was created to improve the entire application by lessening the overall size of the files downloaded when the user traverses the application

// Imports needed in order for the entire component and everything included with it works
import { NgModule } from '@angular/core';
import { TestimonialsComponent } from './testimonials.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TestimonialsResolverService } from './testimonials-resolver.service';

// The routes associated with this component. The path is blank because it is used as children in the app-routing.module.ts file. The resolve is used for the reolver
// guard/service.  The about in resolve is the name used in the component for the data being grabbed, i.e. data['testimonials']
const routes: Routes = [
{path: '', component: TestimonialsComponent,
 resolve: {testimonials: TestimonialsResolverService}
}
];

// One of the many modules in the app. forChild is used instead of forRoot because forRoot was already used in app-routing.module.ts
@NgModule({
  declarations:[TestimonialsComponent],
  exports: [TestimonialsComponent, RouterModule],
  imports:[CommonModule, RouterModule.forChild(routes)]
})
export class TestimonialsModule{

}
