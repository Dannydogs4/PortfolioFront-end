// Author: Daniel Skwarcha

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Testimonials } from './testimonials.model';
import { TestimonialsService } from './testimonials.service';

@Injectable({providedIn: 'root'})
export class TestimonialsResolverService implements Resolve<Testimonials>{
  constructor(private dataStorageService: DataStorageService, private testimonialsService: TestimonialsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const testimonialsInfo = this.testimonialsService.getTestimonials();

    if (testimonialsInfo === null)
    {
      return this.dataStorageService.fetchTestimonials();
    }
    else{
      return testimonialsInfo;
    }
  }
}
