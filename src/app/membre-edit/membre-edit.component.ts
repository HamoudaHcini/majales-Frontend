import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Membre } from '../models/Membre';
import { Municipalite } from '../models/Municipalite';
import {MembreService} from '../services/membre.service';
import { MunicipaliteService } from '../services/municipalite.service';
@Component({
  selector: 'app-membre-add',
  templateUrl: './membre-edit.component.html',
  styleUrls: ['./membre-edit.component.css']
})
export class MembreEditComponent implements OnInit {

  membre?:Membre;
  municipalites:Municipalite[];
  idMembre:string;
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

  constructor(private formBuilder: FormBuilder,protected membreService: MembreService,protected municipaliteService: MunicipaliteService,private route: ActivatedRoute) {
    this.municipalites=[];
    this.idMembre="";
  }

  ngOnInit(): void {
    this.idMembre = this.route.snapshot.paramMap.get('id')!;

    this.membreService.getmembreById({ membreId: this.idMembre }).subscribe((res: HttpResponse<Membre>) => {
      this.membre = res.body!;
      this.updateForm(this.membre)
    })

    this.municipaliteService.getMunicipalites().subscribe((res: HttpResponse<Municipalite[]>) => {
      this.municipalites = res.body || [];
    });

  }

  updateForm(membre: Membre): void {
    this.createForm.patchValue({
      _id:membre._id,
      nom:membre.nom,
      prenom:membre.prenom,
      nom_pere:membre.nom_pere,
      sexe:membre.sexe,
      etat_civil: membre.etat_civil,
      problemes_physique: membre.problemes_physique,
      CIN: membre.CIN,
      adresse: membre.adresse,
      portable: membre.portable,
      fix: membre.fix,
      //parcours universitaire
      niveau_academique: membre.niveau_academique,
      specialite: membre.specialite,
      diplome: membre.diplome,
      annee_obtention: membre.annee_obtention,
      municipalite: membre.municipalite,
      secteur:membre.secteur,
      grade:membre.grade,
      poste:membre.poste,
      num_cnss:membre.num_cnss,
      is_active:membre.is_active,
      //politique
      appartenance:membre.appartenance,
      nom_partie:membre.nom_partie,
      description_conseil:membre.description_conseil
    });
  }


  toggleCard() {
    let checkbox = document.getElementById('checkAppartenance') as HTMLInputElement
    let checked = checkbox.checked;

    if (checked==true) {
      document.getElementById('appartenanceCard')!.style.display = "block";
    }else{
      document.getElementById('appartenanceCard')!.style.display = "none";
    }
  }


  createMembreForm() :Membre{
    return {
      ...new Membre(),
      _id: this.idMembre,
      nom: this.createForm.get(['nom'])!.value,
      prenom: this.createForm.get(['prenom'])!.value,
      nom_pere: this.createForm.get(['nom_pere'])!.value,
      sexe: this.createForm.get(['sexe'])!.value,
      etat_civil: this.createForm.get(['etat_civil'])!.value,
      problemes_physique: this.createForm.get(['problemes_physique'])!.value,
      CIN: this.createForm.get(['CIN'])!.value,
      adresse: this.createForm.get(['adresse'])!.value,
      portable: this.createForm.get(['portable'])!.value,
      fix: this.createForm.get(['fix'])!.value,
      niveau_academique: this.createForm.get(['niveau_academique'])!.value,
      specialite: this.createForm.get(['specialite'])!.value,
      diplome: this.createForm.get(['diplome'])!.value,
      annee_obtention: this.createForm.get(['annee_obtention'])!.value,
      municipalite: this.createForm.get(['municipalite'])!.value,
      isParticipated: false,
      secteur: this.createForm.get(['secteur'])!.value,
      grade: this.createForm.get(['grade'])!.value,
      poste: this.createForm.get(['poste'])!.value,
      num_cnss: this.createForm.get(['num_cnss'])!.value,
      is_active: false,
      appartenance: false,
      nom_partie: this.createForm.get(['nom_partie'])!.value,
      description_conseil: this.createForm.get(['description_conseil'])!.value
    };    
  }


  save(){

    this.membre = this.createMembreForm();

    let is_active_true = document.getElementById('customRadio1') as HTMLInputElement
    let checkbox = document.getElementById('checkAppartenance') as HTMLInputElement
    
    if (is_active_true.checked==true) {
      this.membre!.is_active=true;
    }else{
      this.membre!.is_active=false
    }

    if (checkbox.checked==false) {
      this.membre!.appartenance=false;
      this.membre!.nom_partie="";
      this.membre!.description_conseil="";
    }else{
      this.membre!.appartenance=true;
    }



    this.membreService.update(this.membre).subscribe(
      (res) => {
        if(res.status==200){
          console.log(res.body!.message);
          //window.history.back();
        }
      },
      error => console.log(error)
    );







    //console.log("membre :",this.membre);



  }

}
