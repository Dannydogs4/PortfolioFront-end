// Author: Daniel Skwarcha

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Home } from './home.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{
  BackgroundImages = [{},{},{},{}];
  home: Home;
  myString = 'data:image/jpg;base64,';
  subscription: Subscription;
  constructor(private route: ActivatedRoute){}

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
        }
      )
  }
  getImage(imagePath: string)
  {
    return this.myString + imagePath;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
