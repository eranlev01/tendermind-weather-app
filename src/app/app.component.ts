import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth-guard/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  public get loggedIn():BehaviorSubject<boolean> { return this.authService.isAuthenticated; }
  constructor(public authService: AuthService) {}

  ngOnInit() {
  }
}
