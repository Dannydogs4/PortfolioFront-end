// Author: Daniel Skwarcha

// Imports needed to make this Service work
import { Skills } from './skills.model'; // Needed to set Skills
import { Subject } from 'rxjs'; // This is need so any changes to Skills stays while the user traverses the application.
import { Injectable } from '@angular/core'; // Needed so the service does not have to be provided in the providers array in the app.module.ts file

@Injectable({providedIn: 'root'})
export class SkillsService{

  skillsInfoChanged = new Subject<Skills>();

  private skillsInfo: Skills = null;

  getSkills()
  {
    return this.skillsInfo;
  } // getSkills()
  setSkills(skillsInfo: Skills){
    this.skillsInfo = skillsInfo;
    this.skillsInfoChanged.next(this.skillsInfo);
  } // setSkills(skillsInfo: Skills)
} // class SkillsService




