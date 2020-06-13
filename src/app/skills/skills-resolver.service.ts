// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Injectable } from '@angular/core'; // Needed so that I can avoid providing this in providers array in app.modules.ts
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; //Needed so that I can load and resolve the data for this route prior to it fully opening
import { DataStorageService } from '../shared/data-storage.service'; // Needed so that I can call the fetchSkills method in the DataStorageService typescript file
import { Skills } from './skills.model'; // Needed so that I can resolve tha Skills model
import { SkillsService } from './skills.service'; // Needed so that I can check if the current instance of Skills is null

// Please note: The resolver automatically unsubscribes, so there was no need to do it.
@Injectable({providedIn: 'root'}) // Needed so that I don't have to include this service in the providers array in app.modules.ts
export class SkillsResolverService implements Resolve<Skills>{
  constructor(private dataStorageService: DataStorageService, private skillsService: SkillsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ // The resolve method preloads data before the component is loaded

    const skillsInfo = this.skillsService.getSkills(); // Grabs the current instance of Skills

    // If the current instance of Skills is null, fetch data from the backend. Else, return the current instance of Skills
    if (skillsInfo === null)
    {
      return this.dataStorageService.fetchSkills();
    } // if
    else{
      return skillsInfo;
    } // else
  } // resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
} // Class SkillsResolverService implements Resolve<Skills>
