// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Injectable } from '@angular/core'; // Needed so that I can avoid providing this in providers array in app.modules.ts
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; //Needed so that I can load and resolve the data for this route prior to it fully opening
import { DataStorageService } from '../shared/data-storage.service'; // Needed so that I can call the fetchProjects method in the DataStorageService typescript file
import { Projects } from './projects.model'; // Needed so that I can resolve tha Projects model
import { ProjectsService } from './projects.service'; // Needed so that I can check if the current instance of Projects is null

// Please note: The resolver automatically unsubscribes, so there was no need to do it.
@Injectable({providedIn: 'root'}) // Needed so that I don't have to include this service in the providers array in app.modules.ts
export class ProjectsResolverService implements Resolve<Projects>{
  constructor(private dataStorageService: DataStorageService, private projectsService: ProjectsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ // The resolve method preloads data before the component is loaded

    const projectsInfo = this.projectsService.getProjects(); // Grabs the current instance of Projects

    // If the current instance of Projects is null, fetch data from the backend. Else, return the current instance of Projects
    if (projectsInfo === null)
    {
      return this.dataStorageService.fetchProjects();
    } // if
    else{
      return projectsInfo;
    } // else
  } // resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
} // Class ProjectsResolverService implements Resolve<Projects>
