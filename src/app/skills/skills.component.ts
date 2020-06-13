// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this component
import { Component, OnInit, OnDestroy } from "@angular/core"; // Needed to treat skills.component.ts as a component and use methods related to a component
import { Subscription } from 'rxjs'; // Needed in order to unsubscribe from methods subscribed to
import { ActivatedRoute, Data } from '@angular/router'; // Needed to implement the resolve guard/ resolve service
import { Skills } from './skills.model'; // Needed to use information from Skills inside the HTML
import {BreakpointObserver} from '@angular/cdk/layout'; // Needed to tell if when the screen size changes

@Component({
  selector: 'app-skills', // The selector (HTML Tag) of this component
  templateUrl: './skills.component.html', // What HTML Template this component is connected to
  styleUrls: ['./skills.component.css'] // The CSS styling this component is using
})
export class SkillsComponent implements OnInit, OnDestroy{

  // Variables
  skills: Skills;
  BackgroundImage = {};
  myString = 'data:image/jpg;base64,';
  subscription: Subscription;
  enableMobileNavigation = false;
  subscriptionBreakPoint: Subscription;
  dropDownActive = false;
  skillButtonClosed= false;
  displaySkill = "none";
  dropDownSkills: string[] = [];

  // The way the variables in the parameters of the constructor are declared is a shortcut in Angular. It both declares and defines the variables in a few lines
  // just by adding private, public, or protected. It can then be used in other parts of the application, depending on the scope you give it.
  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver){}

  // First method that occurs when the component is created
  ngOnInit(): void{
    this.subscriptionBreakPoint = this.breakpointObserver.observe('(min-width : 65rem)').subscribe(screenState => {
      if(screenState.matches)
      {
        this.enableMobileNavigation = false;
      } // if
      else{
        this.enableMobileNavigation = true;

      } // else
    } // screenState =>
  ); // subscribe()
     this.subscription= this.route.data.subscribe(
        (data: Data) =>{
          this.skills = data['skills'];
          this.BackgroundImage = {
            'background' : 'url(' + this.getImage(this.skills.image.ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover'
          };
        } // (data: Data) =>
      ); // this.route.data.subscribe()
  } // ngOnInit

  // Accepts a string array of a skill. Sets the dropDownSkill array to the chosenSkillShows, changes the display of the drop down to block, and sets the dropDownActive to true
  ActiveSkillsDropDown(chosenSkillShown: string []){
    this.dropDownSkills = chosenSkillShown;
    this.displaySkill = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  } // ActiveSkillsDropDown(chosenSkillShown: string [])

  // Closes the drop down and sets the display of the drop down to non after the animation finishes
  SkillsDropDownClose(){
    if(this.dropDownActive)
    {
      this.dropDownActive = false
      setTimeout(()=>{this.displaySkill = "none";},300);
    } // if
  } // SkillsDropDownClose()

  // Accepts a string that is supposed to be a 64 based encoded image path and returns data:image/jpg;base64, + image
  getImage(image: string)
  {
    return this.myString + image;
  } // getImage(image: string)

  // The method runs when the user leaves the component. Unsubscribes from the resolver and unsubscribes from the breakpoint
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscriptionBreakPoint.unsubscribe();
  } // ngOnDestroy()
} // class SkillsComponent
