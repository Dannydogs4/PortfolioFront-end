// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this component
import { Component, OnInit, OnDestroy } from "@angular/core"; // Needed to treat about.component.ts as a component and use methods related to a component
import { About } from './about.model';  // Needed to use information from About inside the HTML
import { ActivatedRoute, Data } from '@angular/router'; // Needed to implement the resolve guard/ resolve service
import { Subscription } from 'rxjs'; // Needed in order to unsubscribe from methods subscribed to
import { DataStorageService } from '../shared/data-storage.service'; // Needed to use the DataStorageService so I can use the fetchFileClassPath method
import * as fileSaver from 'file-saver'; // Needed to download a file.

@Component({
  selector: 'app-about', // The selector (HTML Tag) of this component
  templateUrl: './about.component.html', // What HTML Template this component is connected to
  styleUrls: ['./about.component.css'] // The CSS styling this component is using
})

export class AboutComponent implements OnInit, OnDestroy{

  // Variables
  about: About;
  BackgroundImage = {};
  myString = 'data:image/jpg;base64,';
  dropDownActive = false;
  subscription: Subscription;
  subscriptionPDF: Subscription;
  subscribedToPDF = false;
  displayPDFMessage = "none";

  // The way the variables in the parameters of the constructor are declared is a shortcut in Angular. It both declares and defines the variables in a few lines
  // just by adding private, public, or protected. It can then be used in other parts of the application, depending on the scope you give it.
  constructor(private route: ActivatedRoute, private dataStorageService: DataStorageService){}

  // First method that occurs when the component is created
  ngOnInit(): void{
    // Sets the about variable to the data the resolver returned back after it ran its code. In this case, it is the data from the backend that is needed for parts of the HTML
    // Sets the Background Image for the About Page. Had to be done this way because you are not able to use a variable from typescript inside of CSS and this way is cleaner
    //  than putting it all in HTML.
     this.subscription= this.route.data.subscribe(
        (data: Data) =>{
          this.about = data['about'];
          this.BackgroundImage = {
            'background' : 'url(' + this.getImage(this.about.image.ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover'
          }; // this.BackgroundImage
        } // (data: Data) =>
      ); // this.route.data.subscribe()
  } // ngOnInit()

  // Accepts a string that is supposed to be a 64 based encoded image string and returns data:image/jpg;base64, + image string in order to properly decode the image and fetch
  // the image from the backend
  getImage(image: string)
  {
    return this.myString + image;
  } // getImage(image; String)

  // Accepts a string that is supposed to be a 64 based encoded pdf string. Then opens a new tab, writes the pdf document to that window in an iframe tag, closes
  // the dropdown, and changes the display of the dropdown to none so it cannot be intereacted with. This is done in a timeout so the animation for the dropdown can
  // occur before the display is set to none
  getPDF(pdf: string)
  {
    let pdfWindow = window.open("");
    pdfWindow.document.write("<iframe width = '100%' height = '100%' src = 'data:application/pdf;base64," + encodeURI(pdf) + "'></iframe>");
    this.dropDownActive = false;
    setTimeout(()=>{this.displayPDFMessage = "none";},300);
  } // getPDF(pdf: string)

  // Downloads the PDF Resume through a combination of Content-Disposition, Blob, and FileSaver. Gets the PDF by passing the string WebsitePortfolioResume.pdf to the
  // fetchFileClassPath method so that the backend can search for that file and return it as a Resource. After it returns, inform the Blob that the type of file
  // inside the reponse body is a pdf. Use the fileSaver to save the blob of information as a pdf named "Daniel_Skwarcha_Resume". Then close the dropdown and change
  // the display of the dropdown to none.
  downloadPDF()
  {
    this.subscriptionPDF = this.dataStorageService.fetchFileClassPath('WebsitePortfolioResume.pdf').subscribe(response => {
      const filename = response.headers.get('WebsitePortfolioResume');
      const blobPDF = new Blob([response.body], {type: 'application/pdf'});
      fileSaver.saveAs(blobPDF, "Daniel_Skwarcha_Resume");
      this.dropDownActive = false;
      setTimeout(()=>{this.displayPDFMessage = "none";},300);
      this.subscribedToPDF = true;
      } // response => {}
    ); // subscibe()
  } // downloadPDF

  // Sets the display for the dropdown to block and then almost immediantly display the dropdown
  NewTabMessage()
  {
    this.displayPDFMessage = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  } // NewTabMessage()

  // Closes the dropdown and then after the animation is finished, sets the display of the dropdown to none.
  NewPDFTabDropDownClose(){
    this.dropDownActive = false;
    setTimeout(()=>{this.displayPDFMessage = "none";},300);

  } // NewPDFTabDropDownClose()

  // When the user leaves the component, run the code in ngOnDestroy. Unsubscribes from the resolver and then if the user downloaded the PDF, unsubscribe from the
  // Get used in the datastorageservice
  ngOnDestroy(){
    this.subscription.unsubscribe();
    if(this.subscribedToPDF){
      this.subscriptionPDF.unsubscribe();
    } // if
  } // ngOnDestory
} // class AboutComponent
