import { Component, OnInit, OnDestroy} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Subscription} from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  enableMobileNavigation: boolean;
  mobileNavigation: boolean;
  currentPage: string = "Home";
  subscription: Subscription;
  displayNavMobile = "none";
  constructor(private breakpointObserver: BreakpointObserver){}
  ngOnInit(){

    this.currentPage = window.location.pathname.substring(1);
    if(this.currentPage === '')
    {
      this.currentPage = "home";
    }
    this.currentPage = this.currentPage[0].toUpperCase() + this.currentPage.substring(1).toLowerCase();
    this.subscription = this.breakpointObserver.observe('(min-width : 65rem)').subscribe(screenState => {
      if(screenState.matches)
      {
        this.mobileNavigation = false;
        this.enableMobileNavigation = false;
        this.displayNavMobile = "block";
      }
      else{
        this.mobileNavigation = false;
        this.enableMobileNavigation = true;
        this.displayNavMobile = "none";

      }
    });

  }
  showMobileNavigation(changePage: string){
    this.currentPage = changePage;

    if (this.mobileNavigation === true)
    {
      this.mobileNavigation = false;
      setTimeout(()=>{this.displayNavMobile = "none";},500);
    }
    else if (this.mobileNavigation === false)
    {
      this.displayNavMobile = "block";
      setTimeout(()=>{this.mobileNavigation = true;},100);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
