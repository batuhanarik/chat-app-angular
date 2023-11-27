import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { Observable, map, of, take } from 'rxjs';
import { AccountService } from './account.service';
import { UserParams } from '../models/userParams';
import { User } from '../models/user';
import { PaginatedResult } from '../models/pagination';

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
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

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

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    return this._http
      .get<Member[]>(this.baseUrl + this.endpointUrl, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return this.paginatedResult;
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
  setMainPhoto(photoId: number) {
    return this._http.put(
      this.baseUrl + this.endpointUrl + '/set-main-photo/' + photoId,
      {}
    );
  }
  deletePhoto(photoId: number) {
    return this._http.delete(
      this.baseUrl + this.endpointUrl + '/delete-photo/' + photoId
    );
  }
}
