import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Home } from './home.model';
import { HomeService } from './home.service';

@Injectable({providedIn: 'root'})
export class HomeResolverService implements Resolve<Home>{
  constructor(private dataStorageService: DataStorageService, private homeService: HomeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    const homeInfo = this.homeService.getHome();

    if (homeInfo === null)
    {
      return this.dataStorageService.fetchHomeInfo();

    }
    else{
      return homeInfo;
    }
  }
}
