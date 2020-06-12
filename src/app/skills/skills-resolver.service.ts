import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Skills } from './skills.model';
import { SkillsService } from './skills.service';

@Injectable({providedIn: 'root'})
export class SkillsResolverService implements Resolve<Skills>{
  constructor(private dataStorageService: DataStorageService, private skillsService: SkillsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const skillsInfo = this.skillsService.getSkills();

    if (skillsInfo === null)
    {
      return this.dataStorageService.fetchSkills();
    }
    else{
      return skillsInfo;
    }
  }
}
