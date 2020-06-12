import {Subject} from 'rxjs';
import { About } from './about.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AboutService{

  aboutInfoChanged = new Subject<About>();

  private aboutInfo: About = null;
  //private aboutInfo = new About('Test Image', 'Test Image Name', 'Test Graduate', 'Test InterestsTech', 'Test InterestsNonTech', 'Test ExplainWebsite', 'Test Goals', 'Test Resume');

  getAbout()
  {
    return this.aboutInfo;
  }
  setAbout(aboutInfo: About){
    this.aboutInfo = aboutInfo;
    this.aboutInfoChanged.next(this.aboutInfo);
  }
}
