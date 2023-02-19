import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
      private loginservice: AuthenticationService,
      private toastr: ToastrService) { }

  ngOnInit() {
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
            this.router.navigate(['item-master']);
        this.invalidLogin = false
      },
      error => {
          this.invalidLogin = true
          this.toastr.error("Please try with correct username and password");

      }
    )
    );

  }

}