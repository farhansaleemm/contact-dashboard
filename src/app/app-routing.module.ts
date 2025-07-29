import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

const routes: Routes = [
  // { path: '', component: ContactDetailsComponent }, 
  // { path: 'contacts/:id', component: ContactDetailsComponent }
  { path: '', component: ContactListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}