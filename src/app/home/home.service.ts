// Author: Daniel Skwarcha

// Imports needed to make this Service work
import { Home } from './home.model'; // Needed to set Home
import { Subject } from 'rxjs'; // This is need so any changes to Home stays while the user traverses the application.
import { Injectable } from '@angular/core'; // Needed so the service does not have to be provided in the providers array in the app.module.ts file

@Injectable({providedIn: 'root'})
export class HomeService{
  homeInfoChanged = new Subject<Home>();
  private homeInfo: Home = null;

  getHome()
  {
    return this.homeInfo;
  } // getHome()
  setHome(homeInfo: Home){
    this.homeInfo = homeInfo;
    this.homeInfoChanged.next(this.homeInfo);
  } // setHome(homeInfo: Home)
} // class HomeService


