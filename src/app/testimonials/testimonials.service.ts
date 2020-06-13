// Author: Daniel Skwarcha

import { Testimonials } from './testimonials.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TestimonialsService{

  testimonialsInfoChanged = new Subject<Testimonials>();
  private testimonialsInfo: Testimonials = null;



  getTestimonials()
  {
    return this.testimonialsInfo;
  }
  setTestimonials(testimonialsInfo: Testimonials){
    this.testimonialsInfo = testimonialsInfo;
    this.testimonialsInfoChanged.next(this.testimonialsInfo);
  }
}


