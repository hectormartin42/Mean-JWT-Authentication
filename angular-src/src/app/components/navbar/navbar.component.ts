import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedin: boolean;

  constructor(private accountService: AccountService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) {

  }

  ngOnInit() {
  }

  onLogout() {
    this.accountService.logout();
    this.flashMessagesService.show('You are logged out!', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/']);
  }
}
