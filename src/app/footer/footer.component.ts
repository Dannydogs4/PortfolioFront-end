import { Component, OnInit } from "@angular/core";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit{

  dropDownActive =false;
  displayEmailNotice = "none";
  constructor(private clipboard: Clipboard){}
  personalLinks: any = [
     {imagePath: "../assets/Linkedin-icon.jpg", link: "https://www.linkedin.com/in/daniel-skwarcha-3b3207162/"},
    {imagePath: "../assets/Twitter-icon.png", link: "https://twitter.com/skwarcha"},];
    emailAddress : string = 'dskwarcha@comcast.net';
  ngOnInit(){

  }

  CopyEmailAddress(){
    this.clipboard.copy(this.emailAddress);
    this.displayEmailNotice = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  }
  EmailNoticeDropDownClose(){
    this.dropDownActive = false;
    setTimeout(()=>{this.displayEmailNotice = "none";},300);
  }

}
