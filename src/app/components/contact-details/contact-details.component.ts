import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnChanges {
  @Input("emails") emails : any;
  @Input("contact") contact : Contact;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    /**
     * Assumption:
     * No API refetch required on contact input changes
     * All data flows via inputs from parent component.
     */
  }

  ngOnInit(): void {
  }
}