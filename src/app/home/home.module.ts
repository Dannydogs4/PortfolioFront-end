// Author: Daniel Skwarcha

import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeResolverService } from './home-resolver.service';

const routes: Routes = [
{path: '', component: HomeComponent,
 resolve: {home: HomeResolverService}
}
];

@NgModule({
  declarations:[HomeComponent],
  exports: [HomeComponent, RouterModule],
  imports:[CommonModule, RouterModule.forChild(routes)]
})
export class HomeModule{

}
