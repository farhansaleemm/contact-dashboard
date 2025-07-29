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
    // Fetch contact list on init
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;

      // Assumption: Display first contact by default
      this.getEmailAddresses(this.contacts[0]?.id);
      this.contact = this.contacts[0];
    });

    this.checkViewport();
    window.addEventListener('resize', () => this.checkViewport());
  }

  checkViewport() {
    this.isMobileView = window.innerWidth < 768;

    // Reset flag to show both panels on desktop
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
        /**
         * Assumption:
         * The /email_addresses endpoint returns an array of objects like:
         * [{ contactId: string, email: EmailAddress[] }]
         * In production: This structure should be normalized and validated.
         */
        this.emails = emailData.find(c => c.contactId === id)?.email || [];
      }, error => {
        // Skipped full error handling for simplicity
        // TODO: Handle error states (e.g., show toast or log)
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
    if (!this.searchTerm) return this.contacts;

    const term = this.searchTerm.toLowerCase();

    // Assumption: Only first name, last name, and phone searchable
    return this.contacts.filter(contact =>
      contact.firstName?.toLowerCase().includes(term) ||
      contact.lastName?.toLowerCase().includes(term) ||
      contact.phone?.some(phone => phone.includes(term))
    );
  }
}
