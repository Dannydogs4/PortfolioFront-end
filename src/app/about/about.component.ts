import { Component, OnInit, OnDestroy } from "@angular/core";
import { About } from './about.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit, OnDestroy{

  about: About;
  BackgroundImage = {};
  isLoading = false;
  myString = 'data:image/jpg;base64,';
  dropDownActive = false;
  subscription: Subscription;
  subscriptionPDF: Subscription;
  subscribedToPDF = false;
  displayPDFMessage = "none";

  constructor(private route: ActivatedRoute, private dataStorageService: DataStorageService){}

  ngOnInit(): void{
     this.subscription= this.route.data.subscribe(
        (data: Data) =>{
          this.about = data['about'];
          this.BackgroundImage = {
            'background' : 'url(' + this.getImage(this.about.image.ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover'
          }
        }
      )
  }

  getImage(image: String)
  {
    return this.myString + image;
  }
  getPDF(pdf: string)
  {
    let pdfWindow = window.open("");
    pdfWindow.document.write("<iframe width = '100%' height = '100%' src = 'data:application/pdf;base64," + encodeURI(pdf) + "'></iframe>");
    this.dropDownActive = false;
    setTimeout(()=>{this.displayPDFMessage = "none";},300);
  }
  downloadPDF()
  {
    this.subscriptionPDF = this.dataStorageService.fetchFileClassPath('WebsitePortfolioResume.pdf').subscribe(response => {
      const filename = response.headers.get('WebsitePortfolioResume');
      const blobPDF = new Blob([response.body], {type: 'application/pdf'});
      fileSaver.saveAs(blobPDF, "Daniel_Skwarcha_Resume");
      this.dropDownActive = false;
      setTimeout(()=>{this.displayPDFMessage = "none";},300);
      this.subscribedToPDF = true;
    });


  }
  NewTabMessage()
  {
    this.displayPDFMessage = "block";
    setTimeout(()=>{this.dropDownActive = true;},100);
  }
  NewPDFTabDropDownClose(){
    this.dropDownActive = false;
    setTimeout(()=>{this.displayPDFMessage = "none";},300);

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    if(this.subscribedToPDF){
      this.subscriptionPDF.unsubscribe();
    }
  }
}
