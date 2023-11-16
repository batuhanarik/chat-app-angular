import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent {
  member: Member;
  user: User;

  constructor(
    private _account: AccountService,
    private _member: MemberService
  ) {
    this._account.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  getMember() {
    this._member.getMember(this.user.username).subscribe((member) => {
      this.member = member;
    });
  }
}
