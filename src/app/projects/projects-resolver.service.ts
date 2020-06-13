// Author: Daniel Skwarcha

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Projects } from './projects.model';
import { ProjectsService } from './projects.service';

@Injectable({providedIn: 'root'})
export class ProjectsResolverService implements Resolve<Projects>{
  constructor(private dataStorageService: DataStorageService, private projectsService: ProjectsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const projectsInfo = this.projectsService.getProjects();

    if (projectsInfo === null)
    {
      return this.dataStorageService.fetchProjects();
    }
    else{
      return projectsInfo;
    }
  }
}
