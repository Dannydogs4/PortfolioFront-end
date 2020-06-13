// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this service
import { Component, OnInit, OnDestroy } from "@angular/core"; // Needed to treat contact.component.ts as a component and use methods related to a component
import { Subscription } from 'rxjs'; // Needed in order to unsubscribe from methods subscribed to
import { DataStorageService } from '../shared/data-storage.service'; // Needed to use the DataStorageService so I can use the sendUserInfoContact method
import { NgForm } from '@angular/forms'; // Needed so I can use the template driven approach for forms in Angular

@Component({
  selector: 'app-contact', // The selector (HTML Tag) of this component
  templateUrl: './contact.component.html', // What HTML Template this component is connected to
  styleUrls: ['./contact.component.css'] // The CSS styling this component is using
})

export class ContactComponent implements OnInit, OnDestroy{
  // Variables
  isLoading = false;
  private subscription: Subscription;
  private subscribed: boolean = false;
  messageStatus: string;
  dropDownActive = false;
  formHidden = false;
  BackgroundImage = {};
  displayConfirmation = "none";

    // The way the variables in the parameters of the constructor are declared is a shortcut in Angular. It both declares and defines the variables in a few lines
  // just by adding private, public, or protected. It can then be used in other parts of the application, depending on the scope you give it.
  constructor(private dataStorageService: DataStorageService){}

  ngOnInit(): void{

  }

  // Accepts an NgForm variable. Sets isLoading to true so the loading animation appears and the form disappears. Sends the form to the sendUserInfoContact using
  // the DataStorageService object. Subscribes and waits for a response, which is a JSON object with a response key. Displays that reponse in a dropdown. The dropdown
  // is set to block and the dropdown is set to true. Stop the loading animation by setting isLoading to false and set subscribed to true so this can be properly unsubscribed
  // later. The form is then reset.
  onSubmit(form: NgForm){

    this.isLoading = true;
    this.subscription = this.dataStorageService.sendUserInfoContact(form.value).subscribe((formSubmitted: any) =>{
      this.messageStatus = formSubmitted.response;
      this.displayConfirmation = "block";
      setTimeout(()=>{this.dropDownActive = true;},100);
      this.isLoading = false;
      this.subscribed = true;});
      form.reset();
  } // onSubmit(form: NgForm)

  // Closes the dropdown by setting dropDownActive to false. Then sets the display of the dropdown to none after the animation is finished so the dropdown is not clickable
  ConfirmDropDownClose(){
      if (this.dropDownActive)
      {
        this.dropDownActive = false;
        setTimeout(()=>{this.displayConfirmation = "none";},300);
      } // if
  } // ConfirmDropDownClose()

  // When the user leaves the component, runs this method. If the user subscribed (Submitted a form), then unsubscibe.
  ngOnDestroy(){
    if(this.subscribed)
    {
      this.subscription.unsubscribe();
    } // if
  } // ngOnDestroy
} // class ContactComponent
