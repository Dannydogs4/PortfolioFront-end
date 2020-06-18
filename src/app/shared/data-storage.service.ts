// Author: Daniel Skwarcha

// Imports needed to allow this sevice to work
import { Injectable } from "@angular/core"; // Needed so this service does not have to be inlcuded in the providers array in app.module.ts
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http'; // Needed to run HTTP requests
import { AboutService } from '../about/about.service'; // Uses the AboutService to set the About model
import { HomeService } from '../home/home.service'; // Uses the HomeService to set the Home model
import { ProjectsService } from '../projects/projects.service'; // Uses the ProjectsService to set the Projects Model
import { SkillsService } from '../skills/skills.service'; // Uses the SkillsService to set the Skill Model
import { TestimonialsService } from '../testimonials/testimonials.service'; // Uses the TestimonialsService to set the Testimonials Model
import { About } from '../about/about.model'; // Uses the About model
import { Skills } from '../skills/skills.model'; // Uses the Skills model
import { Projects } from '../projects/projects.model'; // Uses the Projects Model
import { Testimonials } from '../testimonials/testimonials.model'; // Uses the Testimonials model
import { Home } from '../home/home.model'; // Uses the Home model
import {tap} from 'rxjs/operators'; // Needed to run code before returning
import { Observable } from 'rxjs'; // Needed to return an observable after fetching a PDF document

@Injectable({providedIn: 'root'})
export class DataStorageService{
  private portfolioURL: string;
  constructor(private http: HttpClient, private aboutService: AboutService, private homeService: HomeService,
    private projectsService: ProjectsService, private skillsService: SkillsService, private testimonialsService: TestimonialsService){
      this.portfolioURL = 'https://dskwarchaportfolio.herokuapp.com/';
    }

  fetchSkills(){
    return this.http.get<Skills>(this.portfolioURL + 'getSkills').pipe(tap(skills=>{
      this.skillsService.setSkills(skills);
    }));


  } // fetchSkills()
  fetchAbout(){
    return this.http.get<About>(this.portfolioURL + 'getAbout').pipe(tap(about=>{
      this.aboutService.setAbout(about);
    }));
  } // fetchAbout()
  fetchFileClassPath(fileName: string): Observable<HttpResponse<Blob>>{
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf');
    return this.http.get(this.portfolioURL + 'getFileClassPath/' + fileName, {headers: headers, observe: 'response', responseType:'blob'});
  } // fetchFileClassPath(fileName: string): Observable<HttpResponse<Blob>>
  fetchProjects(){
    return this.http.get<Projects>(this.portfolioURL + 'getProjects').pipe(tap(projects=>{
      this.projectsService.setProjects(projects);
    }));

  } // fetchProjects()
  fetchTestimonials(){
    return this.http.get<Testimonials>(this.portfolioURL + 'getTestimonials').pipe(tap(testimonials=>{
      this.testimonialsService.setTestimonials(testimonials);
    }));

  } // fetchTestimonials()
  sendUserInfoContact(userInfoContact: any){
    return this.http.put<any>(this.portfolioURL + 'setContact', userInfoContact);

  } // sendUserInfoContact(userInfoContact: any)
  fetchHomeInfo(){
    return this.http.get<Home>(this.portfolioURL + 'getHome').pipe(tap(home=> {

      this.homeService.setHome(home);
    }));
  } // fetchHomeInfo()
} // class DataStorageService
