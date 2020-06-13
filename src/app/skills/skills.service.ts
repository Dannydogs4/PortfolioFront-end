// Author: Daniel Skwarcha

import { Skills } from './skills.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SkillsService{

  skillsInfoChanged = new Subject<Skills>();

  private skillsInfo: Skills = null;

  getSkills()
  {
    return this.skillsInfo;
  }
  setSkills(skillsInfo: Skills){
    this.skillsInfo = skillsInfo;
    this.skillsInfoChanged.next(this.skillsInfo);
  }
}




