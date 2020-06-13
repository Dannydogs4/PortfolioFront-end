// Author: Daniel Skwarcha

// Imports needed to make this Service work
import { Testimonials } from './testimonials.model'; // Needed to set Testimonials
import { Subject } from 'rxjs'; // This is need so any changes to Testimonials stays while the user traverses the application.
import { Injectable } from '@angular/core'; // Needed so the service does not have to be provided in the providers array in the app.module.ts file

@Injectable({providedIn: 'root'})
export class TestimonialsService{

  testimonialsInfoChanged = new Subject<Testimonials>();
  private testimonialsInfo: Testimonials = null;



  getTestimonials()
  {
    return this.testimonialsInfo;
  } // getTestimonials()
  setTestimonials(testimonialsInfo: Testimonials){
    this.testimonialsInfo = testimonialsInfo;
    this.testimonialsInfoChanged.next(this.testimonialsInfo);
  } // setTestimonials(testimonialsInfo: Testimonials)
} // class TestimonialsService


