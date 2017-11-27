import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: IUser;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.accountService.getProfile()
      .subscribe(response => { this.user = response.user; });
  }
}
