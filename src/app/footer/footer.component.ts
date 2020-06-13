// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Component, OnInit } from "@angular/core"; // Needed to treat footer.component.ts as a component and use methods related to a component
import {Clipboard} from '@angular/cdk/clipboard'; // Needed to copy to the user's device

@Component({
  selector: 'app-footer', // The selector (HTML Tag) of this component
  templateUrl: './footer.component.html', // What HTML Template this component is connected to
  styleUrls: ['./footer.component.css'] // The CSS styling this component is using
})

export class FooterComponent implements OnInit{
  // Variables
  dropDownActive =false;
  displayEmailNotice = "none";
  personalLinks: any = [
    {imagePath: "../assets/Linkedin-icon.jpg", link: "https://www.linkedin.com/in/daniel-skwarcha-3b3207162/"},
    {imagePath: "../assets/Twitter-icon.png", link: "https://twitter.com/skwarcha"},];
  emailAddress : string = 'dskwarcha@comcast.net';

  // The way the variables in the parameters of the constructor are declared is a shortcut in Angular. It both declares and defines the variables in a few lines
  // just by adding private, public, or protected. It can then be used in other parts of the application, depending on the scope you give it.
  constructor(private clipboard: Clipboard){}

  ngOnInit(){

  }

  // Copies the email string to the user's device. Then displays a dropdown notifying the user that the email address was copied by setting displayEmailNotice to block
  // and then dropDownActive to true
  CopyEmailAddress(){
    this.clipboard.copy(this.emailAddress);
    this.displayEmailNotice = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  }// CopyEmailAddress()

  // Closes the drop down by setting the dropDownActive variable to false and then setting the display of the drop down to none after the animation is finished so the user
  // cannot interact with the drop down
  EmailNoticeDropDownClose(){
    this.dropDownActive = false;
    setTimeout(()=>{this.displayEmailNotice = "none";},300);
  } // EmailNoticeDropDownClose()
} // class FooterComponent
