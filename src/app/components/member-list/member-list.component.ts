import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  members$: Observable<Member[]>;

  constructor(private _member: MemberService) {}

  ngOnInit(): void {
    this.members$ = this._member.getMembers();
  }
}
