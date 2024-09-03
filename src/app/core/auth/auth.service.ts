import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { BehaviorSubject } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:28080/realms/buzzoff',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/login',
  clientId: 'bo-fe-ng',
  responseType: 'code',
  scope: 'openid profile email offline_access',
  showDebugInformation: true,
  useSilentRefresh: true,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $isSigned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _oAuthService: OAuthService) {
    this._oAuthService.configure(authCodeFlowConfig);
    this._oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this._oAuthService.setupAutomaticSilentRefresh();
    this._oAuthService.events.subscribe(e => {
      console.log('OAuthService Event', e);
    });
  }

  public signIn() {
    let isSigned = this._oAuthService.loadDiscoveryDocumentAndLogin().then((isSigned) => { this.$isSigned.next(isSigned) });
  }

  get oAuthService(): OAuthService {
    return this._oAuthService;
  }
}
