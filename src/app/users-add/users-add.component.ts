import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Admin } from '../models/Admin';
import { Gouvernorat } from '../models/Gouvernorat';
import { Municipalite } from '../models/Municipalite';
import { GouvernoratService } from '../services/gouvernorat.service';
import { MunicipaliteService } from '../services/municipalite.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  administrateur?:Admin;
  municipalites:Municipalite[];
  gouvernorats:Gouvernorat[];

  createForm = this.formBuilder.group({
    _id: [],
    username: [],
    password: [],
    nom: [],
    prenom: [],
    adresse: [],
    email: [],
    telephone: [],
    CIN: [],
    avatar: [],
    role: [],
  });

  constructor(private formBuilder: FormBuilder,protected usersService: UsersService,protected municipaliteService: MunicipaliteService,protected gouvernoratService: GouvernoratService,) {
    this.municipalites=[];
    this.gouvernorats=[];
  }

  ngOnInit(): void {
    this.municipaliteService.getMunicipalites().subscribe((res: HttpResponse<Municipalite[]>) => {
      this.municipalites = res.body || [];
    });

    this.gouvernoratService.getGouvernorats().subscribe((res: HttpResponse<Gouvernorat[]>) => {
      this.gouvernorats = res.body || [];
    });
  }

  createAdminForm() :Admin{
    return {
      ...new Admin(),
      _id: "",
      username: this.createForm.get(['username'])!.value,
      password: this.createForm.get(['password'])!.value,
      nom: this.createForm.get(['nom'])!.value,
      prenom: this.createForm.get(['prenom'])!.value,
      adresse: this.createForm.get(['adresse'])!.value,
      email: this.createForm.get(['email'])!.value,
      telephone: this.createForm.get(['telephone'])!.value,
      CIN: this.createForm.get(['CIN'])!.value,
      avatar: "",
      role: this.createForm.get(['role'])!.value,
    };    
  }


  save(): void{

    this.administrateur = this.createAdminForm();

    const confirmInput = document.getElementById('confirm') as HTMLInputElement;
      
    if (this.administrateur.nom==null) {
      alert("veuillez remplir le champ nom");
    }else if (this.administrateur.prenom==null) {
      alert("veuillez remplir le champ prenom");
    }else if (this.administrateur.username==null) {
      alert("veuillez remplir le champ username");
    }else if (this.administrateur.telephone==null) {
      alert("veuillez remplir le champ telephone");
    }else if (this.administrateur.email==null) {
      alert("veuillez remplir le champ email");
    }else if (this.administrateur.password==null) {
      alert("veuillez remplir le champ password");
    }else if (confirmInput.value=="") {
      alert("veuillez comfirmer votre mot de passe");
    }else if (this.administrateur.password!=confirmInput.value) {
      alert("les mot de passes ne sont pas correspondants");
    }else if (this.administrateur.adresse==null) {
      alert("veuillez remplir le champ adresse");
    }else if (this.administrateur.CIN==null) {
      alert("veuillez remplir le champ CIN");
    }else if (this.administrateur.role==null) {
      alert("veuillez remplir le champ role");
    }else{

      const choice = document.getElementById('roleInput') as HTMLSelectElement;
        if (choice.value=="ADMIN_GOV") {
          
          const choiceGouvernorat = document.getElementById('choiceGouvernorat') as HTMLSelectElement;
          this.administrateur.role+=":"+choiceGouvernorat.value;

        }else if(choice.value=="ADMIN_MUNI"){
          const choiceMunicipalite = document.getElementById('choiceMunicipalite') as HTMLSelectElement;
          this.administrateur.role+=":"+choiceMunicipalite.value;
        }


      this.usersService.create(this.administrateur).subscribe(
        (res) => {
          if(res.status==200){
            console.log(res.body!.message);
            window.history.back();
          }
        },
        error => console.log(error)
      );



    }

  }

  Annuler(): void{
    window.history.back();
  }

  displayOptions(): void{
    const choice = document.getElementById('roleInput') as HTMLSelectElement;
      if (choice.value=="ADMIN_GOV") {
        document.getElementById('gouvernoratForm')!.style.display = 'block';
        document.getElementById('municipaliteForm')!.style.display = 'none';
      }else if(choice.value=="ADMIN_MUNI"){
        document.getElementById('municipaliteForm')!.style.display = 'block';
        document.getElementById('gouvernoratForm')!.style.display = 'none';
      }
  }
}
