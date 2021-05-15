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

  constructor(protected usersService: UsersService) {
    this.administrateurs=[];
    this.filteredadministrateurs=[];
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

}
