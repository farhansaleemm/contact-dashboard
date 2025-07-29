import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { EmailAddress } from '../../models/email.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnChanges {
  @Input("emails") emails : EmailAddress[];
  @Input("contact") contact : Contact;

  constructor(private route: ActivatedRoute, private contactService: ContactService) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['emails'] && changes['emails'].currentValue) {
    }

    if (changes['contact'] && changes['contact'].currentValue) {
    }
  }

  ngOnInit(): void {
  }
}