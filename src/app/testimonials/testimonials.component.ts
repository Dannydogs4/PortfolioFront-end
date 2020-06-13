// Author: Daniel Skwarcha

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Testimonials } from './testimonials.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls:['./testimonials.component.css']
})

export class TestimonialsComponent implements OnInit, OnDestroy{

  testimonials: Testimonials;

  isLoading = false;
  myString = 'data:image/jpg;base64,';
  subscription: Subscription;
  subscriptionBreakPoint: Subscription;
  enableMobileNavigation = false;
  BackgroundImage = {};
  dropDownActive = false;
  testimonialItem = {Author: '', Testimonial: ''};
  testimonialBoxHidden = false;
  displayTestimonial = "none";
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
          this.testimonials = data['testimonials'];
          this.BackgroundImage = {
            'background' : 'url(' + this.getImage(this.testimonials.image.ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover'
          };
          this.isLoading = false;
        }
      )
  }

  getImage(image: string)
  {
    return this.myString + image;
  }
  getTestimonialLink(author: string, testimonial: string)
  {

    this.testimonialItem.Author = author;
    this.testimonialItem.Testimonial = testimonial;
    this.displayTestimonial = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  }

  TestimonialDropDownClose(){

    if (this.dropDownActive)
    {
      this.dropDownActive = false;
      setTimeout(()=>{this.displayTestimonial = "none";},300);
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscriptionBreakPoint.unsubscribe();
  }
}
