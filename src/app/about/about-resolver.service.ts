import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { About } from './about.model';
import { DataStorageService } from '../shared/data-storage.service';
import { AboutService } from './about.service';

@Injectable({providedIn: 'root'})
export class AboutResolverService implements Resolve<About>{
  constructor(private dataStorageService: DataStorageService, private aboutService: AboutService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    const aboutInfo = this.aboutService.getAbout();

    if (aboutInfo === null)
    {
      return this.dataStorageService.fetchAbout();
    }
    else{
      return aboutInfo;
    }

  }
}
