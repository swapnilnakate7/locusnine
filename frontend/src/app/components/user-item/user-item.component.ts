import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'sn-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input('value') user?: User;
  constructor() { }

  ngOnInit(): void {
  }

}
