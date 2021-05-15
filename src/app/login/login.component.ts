import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/Admin';
import { LoginService } from '../services/login.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(protected loginService: LoginService,private router: Router,) { }

  ngOnInit(): void {
    const connected = localStorage.getItem("connected");
    if (connected!=null) {
      this.router.navigateByUrl('/reunion');
    }
  }

  signIn(): void {

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const username = usernameInput.value;

    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const password = passwordInput.value;

    if (username.length==0) {
      alert("please fill username")
    }else if (password.length==0) {
      alert("please fill password")
    } else {
      this.loginService.login({ email: username ,pwd: password }).subscribe((res: HttpResponse<Admin>) => {
        if (res.status==201) {
          alert("password incorrect")
        }else if (res.status==202) {
          alert("user not found")  
        }else{
          console.log("success")
          localStorage.setItem("connected",JSON.stringify(res.body!));
          this.router.navigateByUrl('/reunion');
        }
        
      });      
    }

  }


}
