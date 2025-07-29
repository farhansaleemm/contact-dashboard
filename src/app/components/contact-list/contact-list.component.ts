import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { EmailAddress } from 'src/app/models/email.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm = '';
  emails: EmailAddress[];
  contact: Contact ;
  isMobileView: boolean = false;
  showDetailsOnly: boolean = false;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
      this.getEmailAddresess(this.contacts[0]?.id)
    });
    this.checkViewport();

    window.addEventListener('resize', () => {
      this.checkViewport();
    });
  }

  checkViewport() {
    this.isMobileView = window.innerWidth < 768; 
    if (!this.isMobileView) {
      this.showDetailsOnly = false; 
    }
  }
  goBack() {
    this.showDetailsOnly = false;
  }

  getEmailAddresess(id: string){
        if (id) {
      this.contactService.getEmailAddresses(id).subscribe(emailData => {
        console.log("emails: ",emailData);
        console.log("id: ",id);
        this.emails = emailData.find(c => c.contactId === id).email;
        console.log("this.emails: ",this.emails);
      });
    }
  }

  selectContact(contact: Contact){
    this.contact = contact;
    this.getEmailAddresess(contact.id);
    if (this.isMobileView) {
      this.showDetailsOnly = true;
    }
  }

  get filteredContacts() {
    if (!this.searchTerm) {
      return this.contacts;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(contact => 
      contact.firstName?.toLowerCase().includes(term) ||
      contact.lastName?.toLowerCase().includes(term) ||
      contact.phone?.some((phone: string) => phone.includes(term))
    );
  }

}