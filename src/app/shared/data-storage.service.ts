// Author: Daniel Skwarcha

import { Injectable } from "@angular/core";
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { AboutService } from '../about/about.service';
import { HomeService } from '../home/home.service';
import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';
import { TestimonialsService } from '../testimonials/testimonials.service';
import { About } from '../about/about.model';
import { Skills } from '../skills/skills.model';
import { Projects } from '../projects/projects.model';
import { Testimonials } from '../testimonials/testimonials.model';
import { Home } from '../home/home.model';
import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService{
  private portfolioURL: string;
  constructor(private http: HttpClient, private aboutService: AboutService, private homeService: HomeService,
    private projectsService: ProjectsService, private skillsService: SkillsService, private testimonialsService: TestimonialsService){
      this.portfolioURL = 'http://localhost:8080/';
    }

  fetchSkills(){
    return this.http.get<Skills>(this.portfolioURL + 'getSkills').pipe(tap(skills=>{
      this.skillsService.setSkills(skills);
    }))


  }
  fetchAbout(){
    return this.http.get<About>(this.portfolioURL + 'getAbout').pipe(tap(about=>{
      this.aboutService.setAbout(about);
    }))
  }
  fetchFileClassPath(fileName: string): Observable<HttpResponse<Blob>>{
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf');
    return this.http.get(this.portfolioURL + 'getFileClassPath/' + fileName, {headers: headers, observe: 'response', responseType:'blob'});
  }
  fetchProjects(){
    return this.http.get<Projects>(this.portfolioURL + 'getProjects').pipe(tap(projects=>{
      this.projectsService.setProjects(projects);
    }))

  }
  fetchTestimonials(){
    return this.http.get<Testimonials>(this.portfolioURL + 'getTestimonials').pipe(tap(testimonials=>{
      this.testimonialsService.setTestimonials(testimonials);
    }))

  }
  sendUserInfoContact(userInfoContact: any){
    return this.http.put<any>(this.portfolioURL + 'setContact', userInfoContact);

  }
  fetchHomeInfo(){
    return this.http.get<Home>(this.portfolioURL + 'getHome').pipe(tap(home=> {

      this.homeService.setHome(home);
    }))
  }
}
