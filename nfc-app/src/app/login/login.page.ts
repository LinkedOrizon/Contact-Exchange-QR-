import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder) { }

  async signUp() {
    this.router.navigateByUrl('/register', {replaceUrl: true});
  }

  async login(){
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
