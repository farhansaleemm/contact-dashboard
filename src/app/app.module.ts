import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactService } from './services/contact.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

@NgModule({
  declarations: [AppComponent, ContactListComponent, ContactDetailsComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule,AppRoutingModule],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
