// Author: Daniel Skwarcha

// This typescript file was created to improve the entire application by lessening the overall size of the files downloaded when the user traverses the application

// Imports needed in order for the entire component and everything included with it works
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// The routes associated with this component. The path is blank because it is used as children in the app-routing.module.ts file.
const routes: Routes = [
{
  path: '', component: ContactComponent
}
];

// One of the many modules in the app. forChild is used instead of forRoot because forRoot was already used in app-routing.module.ts
@NgModule({
  declarations:[ContactComponent, LoadingSpinnerComponent],
  exports: [ContactComponent],
  imports:[CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class ContactModule{

}
