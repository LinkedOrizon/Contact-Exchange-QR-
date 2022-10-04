import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentials: FormGroup
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService,) { }

  async register(){
    const user = await this.auth.register(this.credentials.value);
    if (user) {
      this.router.navigateByUrl("/tabs", { replaceUrl: true });
    }
    else{
      alert('Registration Failed, Try Again!');
    }
  }

  cancel(){
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]\d*$/)]],
    })
  }

}
