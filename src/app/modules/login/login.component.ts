import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    console.log(this._authService.oAuthService);

    this._authService.$isSigned.subscribe((isSigned) => {
      if(isSigned && this._authService.oAuthService.hasValidAccessToken()) {
        this._router.navigate(['/users']);
      }
    });

    this._authService.signIn();
  }

  login() {
  }

}
