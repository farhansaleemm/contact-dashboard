import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnChanges {
  @Input() emails: string[];
  @Input() contact: Contact;

  meetingUrl = '#';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contact || changes.emails) {
      this.meetingUrl = this.resolveMeetingUrl(
        this.contact && (this.contact as any).meetingLink
      );
    }
  }

  ngOnInit(): void {}

  private resolveMeetingUrl(link?: string): string {
    const raw = (link || 'http://go.betacall.com/meet/j.stevens').trim();
    if (!raw) {
      return '#';
    }
    if (/^https?:\/\//i.test(raw)) {
      return raw;
    }
    return `https://${raw}`;
  }
}
