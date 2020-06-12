import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit, OnDestroy{
  isLoading = false;
  private subscription: Subscription;
  private subscribed: boolean = false;
  messageStatus: string;
  dropDownActive = false;
  formHidden = false;
  BackgroundImage = {};
  displayConfirmation = "none";
  constructor(private dataStorageService: DataStorageService){}

  ngOnInit(): void{

  }
  onSubmit(form: NgForm){

    this.isLoading = true;
    this.subscription = this.dataStorageService.sendUserInfoContact(form.value).subscribe((formSubmitted: any) =>{
      this.messageStatus = formSubmitted.response;
      this.displayConfirmation = "block";
      setTimeout(()=>{this.dropDownActive = true;},100);
      this.isLoading = false;
      this.subscribed = true;});
      form.reset();
  }
  ConfirmDropDownClose(){
      if (this.dropDownActive)
      {
        this.dropDownActive = false;
        setTimeout(()=>{this.displayConfirmation = "none";},300);
      }
  }
  ngOnDestroy(){
    if(this.subscribed)
    {
      this.subscription.unsubscribe();
    }

  }
}
