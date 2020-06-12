import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { Skills } from './skills.model';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit, OnDestroy{

  skills: Skills;
  BackgroundImage = {};
  isLoading = false;
  myString = 'data:image/jpg;base64,';
  subscription: Subscription;
  enableMobileNavigation = false;
  subscriptionBreakPoint: Subscription;
  dropDownActive = false;
  skillButtonClosed= false;
  displaySkill = "none";
  dropDownSkills: string[] = [];
  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver){}

  ngOnInit(): void{
    this.subscriptionBreakPoint = this.breakpointObserver.observe('(min-width : 65rem)').subscribe(screenState => {
      if(screenState.matches)
      {
        this.enableMobileNavigation = false;
      }
      else{
        this.enableMobileNavigation = true;

      }
    });
     this.subscription= this.route.data.subscribe(
        (data: Data) =>{
          this.isLoading = true;
          this.skills = data['skills'];
          this.BackgroundImage = {
            'background' : 'url(' + this.getImage(this.skills.image.ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover'
          };
          this.isLoading = false;
        }
      );

  }

  ActiveSkillsDropDown(chosenSkillShown: string []){

    this.dropDownSkills = chosenSkillShown;
    this.displaySkill = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  }

  SkillsDropDownClose(){
    if(this.dropDownActive)
    {
      this.dropDownActive = false
      setTimeout(()=>{this.displaySkill = "none";},300);
    }

  }

  getImage(image: string)
  {
    //return this.sanitizer.bypassSecurityTrustResourceUrl(this.myString + image);
    //console.log(this.myString + image);
    //console.log("I am setting the image for file type" + imageType);
    //console.log(this.myStringPart1 + imageType + this.myStringPart2 + image);
    return this.myString + image;
    //return 'url(' + this.sanitizer.bypassSecurityTrustResourceUrl(this.myString + image) + ')';
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscriptionBreakPoint.unsubscribe();
  }


}
