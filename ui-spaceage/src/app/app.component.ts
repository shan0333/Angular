import { Component } from '@angular/core';
import { AuthenticationService } from '../app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'spaceage';
    active: any;
    policy: any;
    tempPolicy: any;
    dashboard: any;
    constructor(private loginService: AuthenticationService) {
        
    }

    
   

    isUserLoggedIn() {
        this.tempPolicy = sessionStorage.getItem('policy')
        this.policy = JSON.parse(this.tempPolicy);
        return this.loginService.isUserLoggedIn();
    }
}
