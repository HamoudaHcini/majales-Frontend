import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/Admin';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  administrateurs: Admin[];
  filteredadministrateurs: Admin[];
  detailAdministrateur:Admin;
  constructor(protected usersService: UsersService) {
    this.administrateurs=[];
    this.filteredadministrateurs=[];

    this.detailAdministrateur= {
      ...new Admin(),
      _id: "",
      username:"",
      password:"",
      nom:"",
      prenom:"",
      adresse:"",
      email:"",
      telephone:"",
      CIN:"",
      avatar:"",
      role:"",
      accessToken:"",
    };
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((res: HttpResponse<Admin[]>) => {
      this.administrateurs = res.body || [];
      this.filteredadministrateurs = res.body || [];
    });
  }

  checkUser(administrateur:Admin) {
    const searchInput = document.getElementById('searchBar') as HTMLInputElement;
    return (administrateur.username!.startsWith(searchInput.value) || administrateur.nom!.startsWith(searchInput.value) || administrateur.prenom!.startsWith(searchInput.value));
  }

  searchUsers(): void{
    const searchInput = document.getElementById('searchBar') as HTMLInputElement;    
    if (searchInput.value.length==0) {
      this.filteredadministrateurs = this.administrateurs;
    }else{
      this.filteredadministrateurs = this.administrateurs.filter(this.checkUser);
    }
  }

  Details(administrateur:Admin):void{
    this.detailAdministrateur=administrateur;
  }






 destroy(administrateur:Admin):void{
  for (var i = 0; i < this.administrateurs!.length; i++) {
    if(this.administrateurs![i]._id==administrateur._id)
    {
        this.administrateurs!.splice(i,1);
    }
  }
  this.usersService.delete({ adminId: administrateur._id }).subscribe(
    (res) => {
      if(res.status==200){
        console.log(res.body!.message);
      }
    },
    error => console.log(error)
  );

}
    
    
  

}
