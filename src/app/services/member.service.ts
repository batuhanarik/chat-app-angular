import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  endpointUrl = 'users';

  constructor(private _http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this._http.get<Member[]>(
      this.baseUrl + this.endpointUrl,
      httpOptions
    );
  }
  getMember(username) {
    return this._http.get(
      `${this.baseUrl}${this.endpointUrl}/` + username,
      httpOptions
    );
  }
}
