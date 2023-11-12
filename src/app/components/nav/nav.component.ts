import { Component } from '@angular/core';
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
  constructor(public _account: AccountService) {}

  ngOnInit(): void {}

  login() {
    this._account.login(this.model).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  logout() {
    this._account.logout();
  }
}
