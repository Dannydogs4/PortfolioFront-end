// Author: Daniel Skwarcha

// Imports needed to make this Service work
import { Subject } from 'rxjs'; // This is need so any changes to Projects stays while the user traverses the application.
import { Projects } from './projects.model'; // Needed to set Projects
import { Injectable } from '@angular/core'; // Needed so the service does not have to be provided in the providers array in the app.module.ts file

@Injectable({providedIn: 'root'})
export class ProjectsService{
  projectsInfoChanged = new Subject<Projects>();
  private projectsInfo: Projects = null;

  getProjects()
  {
    return this.projectsInfo;
  } // getProjects()
  setProjects(projectsInfo: Projects){
    this.projectsInfo = projectsInfo;
    this.projectsInfoChanged.next(this.projectsInfo);
  } // setProjects(projectsInfo: Projects)
} // class ProjectsService


