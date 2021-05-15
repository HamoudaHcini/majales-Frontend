import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Membre } from '../models/Membre';
import { Municipalite } from '../models/Municipalite';
import { MembreService } from '../services/membre.service';
import { MunicipaliteService } from '../services/municipalite.service';

@Component({
  selector: 'app-membre-add',
  templateUrl: './membre-add.component.html',
  styleUrls: ['./membre-add.component.css']
})
export class MembreAddComponent implements OnInit {

  membre?:Membre;
  municipalites:Municipalite[];
  
  createForm = this.formBuilder.group({
    _id: [],
    nom: [],
    prenom: [],
    nom_pere: [],
    sexe: [],
    etat_civil: [],
    problemes_physique: [],
    CIN: [],
    adresse: [],
    portable: [],
    fix: [],
    //parcours universitaire
    niveau_academique: [],
    specialite: [],
    diplome: [],
    annee_obtention: [],
    municipalite: [],
    secteur:[],
    grade:[],
    poste:[],
    num_cnss:[],
    is_active:[],
    //politique
    appartenance:[],
    nom_partie:[],
    description_conseil:[]
  });

  constructor(private formBuilder: FormBuilder,protected membreService: MembreService,protected municipaliteService: MunicipaliteService) {
    this.municipalites=[]
  }
  ngOnInit(): void {
    this.municipaliteService.getMunicipalites().subscribe((res: HttpResponse<Municipalite[]>) => {
      this.municipalites = res.body || [];
    });
  }

  createMembreForm() :Membre{
    return {
      ...new Membre(),
      _id: "",
      nom: this.createForm.get(['nom'])!.value,
      prenom: this.createForm.get(['prenom'])!.value,
      nom_pere: this.createForm.get(['nom_pere'])!.value,
      sexe: this.createForm.get(['sexe'])!.value,
      etat_civil: "",
      problemes_physique: "",
      CIN: this.createForm.get(['CIN'])!.value,
      adresse: "",
      portable: this.createForm.get(['portable'])!.value,
      fix: "",
      niveau_academique: "",
      specialite: "",
      diplome: "",
      annee_obtention: "",
      municipalite: this.createForm.get(['municipalite'])!.value,
      isParticipated: false,
      secteur: "",
      grade: "",
      poste: "",
      num_cnss: "",
      is_active: false,
      appartenance: false,
      nom_partie: "",
      description_conseil: ""
    };    
  }


  save(){

    this.membre = this.createMembreForm();


    this.membreService.create(this.membre).subscribe(
      (res) => {
        if(res.status==200){
          console.log(res.body!.message);
          window.history.back();
        }
      },
      error => console.log(error)
    );







    //console.log("membre :",this.membre);
  }





}
