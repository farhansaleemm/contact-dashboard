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
  emails: EmailAddress;
  contact: Contact;
  isMobileView: boolean = false;
  showDetailsOnly: boolean = false;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      if (data[0]) {
        data[0].avatar = '/assets/farhan.png';
      }
  
      // if (data[1]) {
      //   data[1].avatar = '/assets/johana.png';
      // }
  
      if (data[3]) {
        data[3].avatar = '/assets/johana.png';
      }
      this.contacts = data;
      this.getEmailAddresses(this.contacts[0]?.id);
      this.contact = this.contacts[0];
    });

    this.checkViewport();
    window.addEventListener('resize', () => this.checkViewport());
  }

  get selectedContact(): Contact {
    return this.contact;
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

  getEmailAddresses(id: string) {
    if (id) {
      this.contactService.getEmailAddresses(id).subscribe(emailData => {
        this.emails = emailData.find(c => c.contactId === id)?.email || [];
      }, error => {
        console.error('Email fetch error:', error);
      });
    }
  }

  selectContact(contact: Contact) {
    this.contact = contact;
    this.getEmailAddresses(contact.id);
    if (this.isMobileView) {
      this.showDetailsOnly = true;
    }
  }

  get filteredContacts(): Contact[] {
    if (!this.searchTerm.trim()) return this.contacts;

    const term = this.searchTerm.trim().toLowerCase();

    return this.contacts.filter(contact => {
      const nameHit =
        contact.firstName?.toLowerCase().includes(term) ||
        contact.lastName?.toLowerCase().includes(term);
      const phoneHit = contact.phone?.some(phone => phone.replace(/\s/g, '').includes(term));
      const emailHit = contact.email?.some(email => email.toLowerCase().includes(term));
      return nameHit || phoneHit || emailHit;
    });
  }
}
