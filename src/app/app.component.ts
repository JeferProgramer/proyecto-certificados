import { Component, Inject } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuard, MsalGuardConfiguration } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserLogegedIn: Boolean = false
  title = 'proyecto-certificados';

}
