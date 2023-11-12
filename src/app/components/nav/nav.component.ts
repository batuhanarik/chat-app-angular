import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: any = { username: '', password: '' };
  constructor(
    public _account: AccountService,
    private router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this._account.login(this.model).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/members');
      },
      (error: any) => {
        console.log(error);
        this._toastr.error(error.error);
      }
    );
  }
  logout() {
    this._account.logout();
    this.router.navigateByUrl('/');
  }
}
