import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{path: '', component: ContactComponent
}
];

@NgModule({
  declarations:[ContactComponent, LoadingSpinnerComponent],
  exports: [ContactComponent],
  imports:[CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class ContactModule{

}
