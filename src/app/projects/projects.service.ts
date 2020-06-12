import { Subject } from 'rxjs';
import { Projects } from './projects.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProjectsService{
  projectsInfoChanged = new Subject<Projects>();
  private projectsInfo: Projects = null;

  getProjects()
  {
    return this.projectsInfo;
  }
  setProjects(projectsInfo: Projects){
    this.projectsInfo = projectsInfo;
    this.projectsInfoChanged.next(this.projectsInfo);
  }
}


