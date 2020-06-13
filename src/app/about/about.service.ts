// Author: Daniel Skwarcha

// Imports needed to make this Service work
import {Subject} from 'rxjs'; // This is need so any changes to About stays while the user traverses the application.
import { About } from './about.model'; // Needed to set About
import { Injectable } from '@angular/core'; // Needed so the service does not have to be provided in the providers array in the app.module.ts file

@Injectable({providedIn: 'root'})
export class AboutService{

  aboutInfoChanged = new Subject<About>();

  private aboutInfo: About = null;

  getAbout()
  {
    return this.aboutInfo;
  } // getAbout()

  // Sets Ab
  setAbout(aboutInfo: About){
    this.aboutInfo = aboutInfo;
    this.aboutInfoChanged.next(this.aboutInfo);
  } // setAbout(aboutInfo: About)
} // class AboutService
