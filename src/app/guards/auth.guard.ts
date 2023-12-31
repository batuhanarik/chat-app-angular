import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private _account: AccountService,
    private _toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this._account.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this._toastr.error('You shall not pass!');
          return false;
        }
      })
    );
  }
}
