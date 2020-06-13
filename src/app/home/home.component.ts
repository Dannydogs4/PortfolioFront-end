// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this component
import { Component, OnInit, OnDestroy } from "@angular/core"; // Needed to treat home.component.ts as a component and use methods related to a component
import { Home } from './home.model'; // Needed to use information from Home inside the HTML
import { Subscription } from 'rxjs'; // Needed in order to unsubscribe from methods subscribed to
import { ActivatedRoute, Data } from '@angular/router'; // Needed to implement the resolve guard/ resolve service

@Component({
  selector: 'app-home', // The selector (HTML Tag) of this component
  templateUrl: './home.component.html', // What HTML Template this component is connected to
  styleUrls: ['./home.component.css'] // The CSS styling this component is using
})

export class HomeComponent implements OnInit, OnDestroy{

  // Variables
  BackgroundImages = [{},{},{},{}];
  home: Home;
  myString = 'data:image/jpg;base64,';
  subscription: Subscription;

  // The way the variables in the parameters of the constructor are declared is a shortcut in Angular. It both declares and defines the variables in a few lines
  // just by adding private, public, or protected. It can then be used in other parts of the application, depending on the scope you give it.
  constructor(private route: ActivatedRoute){}

    // First method that occurs when the component is created
  ngOnInit(): void{
     this.subscription= this.route.data.subscribe(
        (data: Data) =>{
          this.home = data['home'];
          this.BackgroundImages = [
            {'background' : 'url(' + this.getImage(this.home.image[0].ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover',
            'background-position': 'center'},
            {'background' : 'url(' + this.getImage(this.home.image[1].ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover',
            'background-position': 'left 10% bottom 20%'},
            {'background' : 'url(' + this.getImage(this.home.image[2].ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover',
            'background-position': 'center'},
            {'background' : 'url(' + this.getImage(this.home.image[3].ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover',
            'background-position': 'center'}
          ];
        } // (data: Data) =>
      ); // this.route.data.subscribe()
  } // ngOnInit()

  // Accepts a string that is supposed to be a 64 based encoded image path and returns data:image/jpg;base64,+ the encoded image path
  getImage(imagePath: string)
  {
    return this.myString + imagePath;
  } // getImage(imagePath: string)

  // This method runs when the user goes to another component. Unsubscribe from the resolver
  ngOnDestroy(){
    this.subscription.unsubscribe();
  } // ngOnDestroy()
} // HomeComponent
