// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Component, OnInit, OnDestroy} from '@angular/core'; // Needed to treat about.component.ts as a component and use methods related to a component
import {BreakpointObserver} from '@angular/cdk/layout'; // Needed to detect a screen size change
import { Subscription} from 'rxjs'; // Needed in order to unsubscribe from methods subscribed to

@Component({
  selector: 'app-header', // The selector (HTML Tag) of this component
  templateUrl: './header.component.html', // What HTML Template this component is connected to
  styleUrls: ['./header.component.css'] // The CSS styling this component is using
})

export class HeaderComponent implements OnInit, OnDestroy{

  // Variables
  enableMobileNavigation: boolean;
  mobileNavigation: boolean;
  currentPage: string = "Home";
  subscription: Subscription;
  displayNavMobile = "none";
  validPathNames: string[] = ['home', 'projects', 'skills', 'testimonials', 'contact', 'about'];
  isValidPathName = false;

    // The way the variables in the parameters of the constructor are declared is a shortcut in Angular. It both declares and defines the variables in a few lines
  // just by adding private, public, or protected. It can then be used in other parts of the application, depending on the scope you give it.
  constructor(private breakpointObserver: BreakpointObserver){}

  // First method that occurs when the component is created
  ngOnInit(){

    // Grabs the users pathname excluding the /
    // Needed in order to know the current page the user is on
    this.currentPage = window.location.pathname.substring(1);

    // If the pathname is blank, set currentPage to home, because that is where the user is actually located, else check if the pathname is equal to one of the elements
    // in the array of valid path names
    // Needed to do this because the code kept grabbing the pathname when the route was still nothing and had yet to redirect to
    if(this.currentPage === '')
    {
      this.currentPage = "home";
    } // if
    else{
      this.currentPage = this.currentPage.toLowerCase();

      for (let i = 0; i < this.validPathNames.length; i++)
      {
        if(this.currentPage == this.validPathNames[i])
        {
          this.isValidPathName = true;
          break;
        } // if
      } // for
      if (!this.isValidPathName)
      {
        this.currentPage = "home";
      } // if
    } // else
    this.currentPage = this.currentPage[0].toUpperCase() + this.currentPage.substring(1).toLowerCase();

    // Check if the length of the screen is greater than or equal to 65rem (1,040 pixels). If it is, switch to desktop view by disabling any form of mobile navigation and
    // setting the nav bar to have a block display. If it is not, enable mobile navigation and set the display of nav to none.
    this.subscription = this.breakpointObserver.observe('(min-width : 65rem)').subscribe(screenState => {
        if(screenState.matches)
        {
          this.mobileNavigation = false;
          this.enableMobileNavigation = false;
          this.displayNavMobile = "block";
        } // if
        else{
          this.mobileNavigation = false;
          this.enableMobileNavigation = true;
          this.displayNavMobile = "none";

        } // else
      } // screenState => {}
    ); // subscribe()
  } // ngOnInit

  // Brings out the navigation options for the user on mobile devices. Also sets the text on the button to whatever the text is in the parameter.
  showMobileNavigation(changePage: string){
    this.currentPage = changePage;

    if (this.mobileNavigation === true)
    {
      this.mobileNavigation = false;
      setTimeout(()=>{this.displayNavMobile = "none";},500);
    } // if
    else if (this.mobileNavigation === false)
    {
      this.displayNavMobile = "block";
      setTimeout(()=>{this.mobileNavigation = true;},100);
    } // else if
  } // showMobileNavigation(changePage: string)

  // Runs when this component changes. Note: This only happens when the user refreshes the page. This is due to the header component not being part of the routing module.
  // Unsubscribes from the subscription for the breakpointObserver
  ngOnDestroy(){
    this.subscription.unsubscribe();
  } // ngOnDestroy
} // class HeaderComponent
