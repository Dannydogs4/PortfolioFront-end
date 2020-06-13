// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Injectable } from '@angular/core'; // Needed so that I can avoid providing this in providers array in app.modules.ts
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; //Needed so that I can load and resolve the data for this route prior to it fully opening
import { DataStorageService } from '../shared/data-storage.service'; // Needed so that I can call the fetchTestimonials method in the DataStorageService typescript file
import { Testimonials } from './testimonials.model'; // Needed so that I can resolve tha Testimonials model
import { TestimonialsService } from './testimonials.service'; // Needed so that I can check if the current instance of Testimonials is null

// Please note: The resolver automatically unsubscribes, so there was no need to do it.
@Injectable({providedIn: 'root'}) // Needed so that I don't have to include this service in the providers array in app.modules.ts
export class TestimonialsResolverService implements Resolve<Testimonials>{
  constructor(private dataStorageService: DataStorageService, private testimonialsService: TestimonialsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ // The resolve method preloads data before the component is loaded

    const testimonialsInfo = this.testimonialsService.getTestimonials(); // Grabs the current instance of Testimonials

    // If the current instance of Testimonials is null, fetch data from the backend. Else, return the current instance of Testimonials
    if (testimonialsInfo === null)
    {
      return this.dataStorageService.fetchTestimonials();
    } // if
    else{
      return testimonialsInfo;
    } // else
  } // resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
} // Class TestimonialsResolverService implements Resolve<Testimonials>
