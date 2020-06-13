// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this component
import { Component, OnInit, OnDestroy } from "@angular/core"; // Needed to treat testimonials.component.ts as a component and use methods related to a component
import { Testimonials } from './testimonials.model'; // Needed to use information from Testimonials inside the HTML
import { Subscription } from 'rxjs'; // Needed in order to unsubscribe from methods subscribed to
import { ActivatedRoute, Data } from '@angular/router'; // Needed to implement the resolve guard/ resolve service
import {BreakpointObserver} from '@angular/cdk/layout'; // Needed to tell if when the screen size changes

@Component({
  selector: 'app-testimonials', // The selector (HTML Tag) of this component
  templateUrl: './testimonials.component.html', // What HTML Template this component is connected to
  styleUrls:['./testimonials.component.css'] // The CSS styling this component is using
})

export class TestimonialsComponent implements OnInit, OnDestroy{

  // Variables
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
      } // screenState = >
    ); // subscribe()
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
      } // (data: Data) =>
    ); // this.route.data.subscribe()
  } //ngOnInit

  // Accepts a string that is supposed to be a 64 based encoded image path and returns data:image/jpg;base64, + image
  getImage(image: string)
  {
    return this.myString + image;
  } // getImage()

  // Accepts two strings that are the author and the testimonial of the testimonial they clicked on. Sets a Javascript object's author and testionial. Then sets the
  // drop down's display to block and opens the drop down. This is done this way because the drop down is outside of the ngFor directive. Therefore, there is no way to
  // access that specific intance of the testimonial and its information from the drop down
  getTestimonialLink(author: string, testimonial: string)
  {
    this.testimonialItem.Author = author;
    this.testimonialItem.Testimonial = testimonial;
    this.displayTestimonial = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  } // getTestimonialLink()

  // Closes the drop down and sets the display of the drop down to none after the animation is finished
  TestimonialDropDownClose(){
    if (this.dropDownActive)
    {
      this.dropDownActive = false;
      setTimeout(()=>{this.displayTestimonial = "none";},300);
    } // if
  } // TestimonialDropDownClose()

  // The method runs when the user leaves the component. Unsubscribes from the resolver and unsubscribes from the breakpoint
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscriptionBreakPoint.unsubscribe();
  } // ngOnDestroy()
}// class TestimonialsComponent
