

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	cardValueCount:any; 
	cardValue:any;
	tempKey:any;
	isClicked = false;
	data:any=[{1:'50 SEK'}, {2:'100 SEK'}, {3:'500 SEK'}, {4:'1000 SEK'}, {5:'1500 SEK'}];
	constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, ValidationService.emailValidator]],
			password: ['', [Validators.required, ValidationService.passwordValidator]]
		});
	}

	// Check if user already logged in
	ngOnInit() {
		this.cardValueCount = 0
	this.cardValue = '50 SEK'
	
		if (localStorage.getItem('userData')) {
			this.router.navigate(['/']);
		}
		
	}

	// Initicate login
	// doLogin() {
	// 	const login = this.userService.doLogin(this.loginForm.value);
	// 	this.success(login);
	// }

	
	onClick(value){
		this.cardValue = value
		var isClicked = true;
	}

	negative(key){
		debugger
		if (key != 0){
			this.tempKey = key-2
		key = key-1
			console.log(this.data[this.tempKey][key])
		this.cardValueCount = key
		this.cardValue = this.data[this.tempKey][key]
		}
	
	}
	
	positive(key){
		debugger
		if (key == 0){
			this.tempKey = key+1
		key = key  +2
		}else{
			this.tempKey = key
			key = key  +1
		}
		
		
		
		console.log(this.data[this.tempKey][key])
		this.cardValueCount = key
		this.cardValue = this.data[this.tempKey][key]

	}

	// Login success function
	success(data) {
		if (data.code === 200) {
			localStorage.setItem('userData', JSON.stringify(data.data));
			this.router.navigate(['/']);
			this.toastr.success('Success', 'Logged In Successfully');
		} else {
			this.toastr.error('Failed', 'Invalid Credentials');
		}
	}

}

