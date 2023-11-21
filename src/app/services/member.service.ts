import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { Observable, map, of, take } from 'rxjs';
import { AccountService } from './account.service';
import { UserParams } from '../models/userParams';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  endpointUrl = 'users';
  members: Member[] = [];
  memberCache = new Map();
  user?: User | null;
  userParams: UserParams | undefined;

  constructor(
    private _http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.userParams = new UserParams(user);
        this.user = user;
      },
    });
  }

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) {
      return of(this.members);
    }
    return this._http.get<Member[]>(this.baseUrl + this.endpointUrl).pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }
  getMember(username): Observable<Member> {
    const member = this.members.find((x) => x.userName === username);
    if (member !== undefined) return of(member);

    return this._http.get<Member>(
      `${this.baseUrl}${this.endpointUrl}/` + username
    );
  }

  updateMember(member: Member) {
    return this._http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }
}
