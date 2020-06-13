// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Injectable } from '@angular/core'; // Needed so that I can avoid providing this in providers array in app.modules.ts
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; //Needed so that I can load and resolve the data for this route prior to it fully opening
import { DataStorageService } from '../shared/data-storage.service'; // Needed so that I can call the fetchHomeInfo method in the DataStorageService typescript file
import { Home } from './home.model'; // Needed so that I can resolve tha Home model
import { HomeService } from './home.service'; // Needed so that I can check if the current instance of Home is null

// Please note: The resolver automatically unsubscribes, so there was no need to do it.
@Injectable({providedIn: 'root'}) // Needed so that I don't have to include this service in the providers array in app.modules.ts
export class HomeResolverService implements Resolve<Home>{
  constructor(private dataStorageService: DataStorageService, private homeService: HomeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ // The resolve method preloads data before the component is loaded

    const homeInfo = this.homeService.getHome(); // Grabs the current instance of Home

    // If the current instance of Home is null, fetch data from the backend. Else, return the current instance of Home
    if (homeInfo === null)
    {
      return this.dataStorageService.fetchHomeInfo();
    } // if
    else{
      return homeInfo;
    } // else
  } // resolve()
} // class HomeResolverService
