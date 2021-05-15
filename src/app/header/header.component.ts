import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connected:Admin;

  constructor(
    private router: Router,
  ) 
  {
    this.connected = {
      ...new Admin(),
      _id: "",
      nom:"",
      prenom:""
    };
  }
  ngOnInit(): void {
    const trouv = localStorage.getItem("connected");
    if (trouv==null) {
      this.router.navigateByUrl('/login');
    }else{
      this.connected = JSON.parse(localStorage.getItem("connected")!); 
    }
  }

  logout(): void{
    localStorage.removeItem("connected")
    this.router.navigateByUrl('/login');
  }

}
