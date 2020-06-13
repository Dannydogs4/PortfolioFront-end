// Author: Daniel Skwarcha

import { Home } from './home.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class HomeService{
  homeInfoChanged = new Subject<Home>();
  private homeInfo: Home = null;

  getHome()
  {
    return this.homeInfo;
  }
  setHome(homeInfo: Home){
    this.homeInfo = homeInfo;
    this.homeInfoChanged.next(this.homeInfo);
  }
}


