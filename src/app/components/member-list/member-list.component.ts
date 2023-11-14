import { Component } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  members: Member[];

  constructor(private _member: MemberService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this._member.getMembers().subscribe((res) => {
      this.members = res;
    });
  }
}
