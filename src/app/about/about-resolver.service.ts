// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Injectable } from '@angular/core'; // Needed so that I can avoid providing this in providers array in app.modules.ts
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; //Needed so that I can load and resolve the data for this route prior to it fully opening
import { About } from './about.model'; // Needed so that I can resolve tha About model
import { DataStorageService } from '../shared/data-storage.service'; // Needed so that I can call the fetchAbout method in the DataStorageService typescript file
import { AboutService } from './about.service'; // Needed so that I can check if the current instance of About is null

// Please note: The resolver automatically unsubscribes, so there was no need to do it.
@Injectable({providedIn: 'root'}) // Needed so that I don't have to include this service in the providers array in app.modules.ts
export class AboutResolverService implements Resolve<About>{
  constructor(private dataStorageService: DataStorageService, private aboutService: AboutService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ // The resolve method preloads data before the component is loaded

    const aboutInfo = this.aboutService.getAbout(); // Grabs the current instance of About

    // If the current instance of About is null, fetch data from the backend. Else, return the current instance of About
    if (aboutInfo === null)
    {
      return this.dataStorageService.fetchAbout();
    } // if
    else{
      return aboutInfo;
    } // else
  } // resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
} // Class AboutResolverService implements Resolve<About>
