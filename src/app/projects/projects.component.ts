import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Projects} from './projects.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls:['./projects.component.css']
})

export class ProjectsComponent implements OnInit, OnDestroy{
  projects: Projects;
  //private tempProjects: Projects;
  isLoading = false;
  myStringPart1 = 'data:image/';
  myStringPart2 = ';base64,';
  subscription: Subscription;
  projectTypeString = ["Professional", "Personal", "Academic"];
  BackgroundImage = {};
  noLinkReason = {Note: '', Reason: ''};
  dropDownActive = false;
  linkButtonHidden = false;
  displayEmailNotice = "none";

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void{
     this.subscription= this.route.data.subscribe(
        (data: Data) =>{
          this.isLoading = true;
          this.projects = data['projects'];

          this.BackgroundImage = {
            'background' : 'url(' + this.getImage('jpg',this.projects.image.ImageContent) + ')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover',
            'background-position' : 'center'
          };
          this.isLoading = false;
        }
      )
  }

  OpenProjectLink(projectLink: string){


    if (projectLink.slice(0,4) ==='http')
    {
      window.open(projectLink, "_blank")
    }
    else{
      this.noLinkReason.Note = 'No Project Link Given'
      this.noLinkReason.Reason = projectLink;
      this.displayEmailNotice = "block";
      setTimeout(()=>{this.dropDownActive = true;},100);
    }

  }
  OpenGitHubLink(gitHubLink: string){


    if (gitHubLink.slice(0,4) ==='http')
    {
      window.open(gitHubLink, "_blank")
    }
    else{
      this.noLinkReason.Note = 'No GitHub Link Given'
      this.noLinkReason.Reason = gitHubLink;
      this.displayEmailNotice = "block";
      setTimeout(()=>{this.dropDownActive = true;},100);
    }

  }
  LinkDropDownClose(){

    if(this.dropDownActive)
    {
      this.dropDownActive = false;
      this.linkButtonHidden = false;
      setTimeout(()=>{this.displayEmailNotice = "none";},300);
    }
  }
  getImage(imageType: string, image: string)
  {
    return this.myStringPart1 + imageType + this.myStringPart2 + image;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
