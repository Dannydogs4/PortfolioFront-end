// Author: Daniel Skwarcha

// My imports that are needed to communicate with different parts of the application and provide features to this component
import { Component, OnInit, OnDestroy } from "@angular/core"; // Needed to treat projects.component.ts as a component and use methods related to a component
import { Subscription } from 'rxjs'; // Needed in order to unsubscribe from methods subscribed to
import { Projects} from './projects.model'; // Needed to use information from Projects inside the HTML
import { ActivatedRoute, Data } from '@angular/router'; // Needed to implement the resolve guard/ resolve service

@Component({
  selector: 'app-projects', // The selector (HTML Tag) of this component
  templateUrl: './projects.component.html', // What HTML Template this component is connected to
  styleUrls:['./projects.component.css'] // The CSS styling this component is using
})

export class ProjectsComponent implements OnInit, OnDestroy{

  // Variables
  projects: Projects;
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

  // The way the variables in the parameters of the constructor are declared is a shortcut in Angular. It both declares and defines the variables in a few lines
  // just by adding private, public, or protected. It can then be used in other parts of the application, depending on the scope you give it.
  constructor(private route: ActivatedRoute){}

  // First method that occurs when the component is created
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
        } // (data: Data) =>
      ); // this.route.data.subscribe()
  } // ngOnInit()

  // Accepts a link that should either contain a hyperlink to the project or a reason as to why there is no hyperlink to the project
  OpenProjectLink(projectLink: string){
    if (projectLink.slice(0,4) ==='http')
    {
      window.open(projectLink, "_blank")
    } // if
    else{
      this.noLinkReason.Note = 'No Project Link Given'
      this.noLinkReason.Reason = projectLink;
      this.displayEmailNotice = "block";
      setTimeout(()=>{this.dropDownActive = true;},100);
    } // else
  } // OpenProjectLink(projectLink: string)

  // Accepts a link that should either contain a hyperlink to the GitHub page associated with this project or a reason as to why there is no hyperlink to the GitHub page
  OpenGitHubLink(gitHubLink: string){
    if (gitHubLink.slice(0,4) ==='http')
    {
      window.open(gitHubLink, "_blank")
    } // if
    else{
      this.noLinkReason.Note = 'No GitHub Link Given'
      this.noLinkReason.Reason = gitHubLink;
      this.displayEmailNotice = "block";
      setTimeout(()=>{this.dropDownActive = true;},100);
    } // else
  } // OpenGitHubLink(gitHubLink: string)

  // Closes the drop down by setting the dropDownActive to false and then sets the display for the dropdown to none so the user cannot interact with the drop down
  LinkDropDownClose(){
    if(this.dropDownActive)
    {
      this.dropDownActive = false;
      this.linkButtonHidden = false;
      setTimeout(()=>{this.displayEmailNotice = "none";},300);
    } // if
  } // LinkDropDownClose()

  // Accepts a string that is an image type and another string that is a 64 based encoded path to the image. Image type is needed because this component deals with both
  // JPG and GIF files
  getImage(imageType: string, image: string)
  {
    return this.myStringPart1 + imageType + this.myStringPart2 + image;
  } // getImage(imageType: string, image: string)

  // This method runs when the user leaves the component. Unsubscribe from the resolver
  ngOnDestroy(){
    this.subscription.unsubscribe();
  } // ngOnDestroy
} // class ProjectsComponent
