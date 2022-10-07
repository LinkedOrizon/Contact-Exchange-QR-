import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  credentials: FormGroup
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private db: DatabaseService) { }

  async signUp() {
    //pressing register navigates the user to the register page
    this.router.navigateByUrl('/register', {replaceUrl: true});
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  async login(){
    //sends credentials to authentication service to verify user and reroute if valid
    const user = await this.auth.login(this.credentials.value);
    if (user) {
      this.router.navigateByUrl("/tabs", {replaceUrl: true});
    }
    else{
      alert('Invalid Login, Try Again !');
    }
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

}
