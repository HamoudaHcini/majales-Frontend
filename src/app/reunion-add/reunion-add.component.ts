import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../models/Admin';
import { Membre } from '../models/Membre';
import { Municipalite } from '../models/Municipalite';
import { Participation } from '../models/Participation';

import {Reunion} from '../models/Reunion';
import { MembreService } from '../services/membre.service';
import { MunicipaliteService } from '../services/municipalite.service';
import {ReunionService} from '../services/reunion.service';


@Component({
  selector: 'app-root',
  templateUrl: './reunion-add.component.html',
  styleUrls: ['./reunion-add.component.css']
})
export class ReunionAddComponent implements OnInit {
  connected?:Admin;
  isMunicipalityAdmin=false;
  membres?: Membre[];
  filteredMembres: Membre[];
  chosenMembers:Membre[];
  municipalites:Municipalite[];

  createForm = this.formBuilder.group({
    id: [],
    municipalite:[],
    sujet: [],
    date: [],
    duree: [],
    type: [],
  });


  constructor(private formBuilder: FormBuilder,protected membreService: MembreService,protected municipaliteService: MunicipaliteService,protected reunionService: ReunionService, private router: Router, ) { 
    this.chosenMembers=[];
    this.municipalites=[];
    this.filteredMembres=[]
  }

  ngOnInit(): void {
    const trouv = localStorage.getItem("connected");
    if (trouv==null) {
      this.router.navigateByUrl('/login');
    }else{
      this.connected = JSON.parse(localStorage.getItem("connected")!);
      
      if (this.connected!.role?.includes("GOV")) {
        const idGouv = this.connected!.role.split(":"); // les municipalites qui appartient au gouvernerat de l'admin
        this.municipaliteService.getMunicipalitesByGouvernorat({ gouvernoratId: idGouv[1] }).subscribe((res: HttpResponse<Municipalite[]>) => {
          this.municipalites = res.body || [];
        });         
      }else if(this.connected!.role=="SUPER_ADMIN"){ // toutes les municipalites
        this.municipaliteService.getMunicipalites().subscribe((res: HttpResponse<Municipalite[]>) => {
          this.municipalites = res.body || [];
        }); 
      }else if(this.connected!.role?.includes("MUNI")){//affecter la municipalite de l'admin

        this.municipaliteService.getMunicipalites().subscribe((res: HttpResponse<Municipalite[]>) => {
          this.municipalites = res.body || [];

          const idMun = this.connected!.role!.split(":");
          var municipaliteSelect = document.getElementById('municipalite') as HTMLSelectElement;
          this.createForm.patchValue({
            municipalite:idMun[1],
          });
          municipaliteSelect.disabled=true;
        });         

      }

    }

    this.membreService.getMembres().subscribe((res: HttpResponse<Membre[]>) => {
      this.membres = res.body || [];
      this.filteredMembres = res.body || [];
    });

  }

  checkMembre(membre:Membre) {
    const searchInput = document.getElementById('searchBar') as HTMLInputElement;
    return (membre.CIN!.startsWith(searchInput.value) || membre.nom!.startsWith(searchInput.value) || membre.prenom!.startsWith(searchInput.value));
  }

  sortMembreByMunicipalite(membre:Membre){
    const municipalite = document.getElementById('municipalite') as HTMLSelectElement;
    return membre.municipalite!._id! === municipalite.value
  }

  searchMembre(){
    const searchInput = document.getElementById('searchBar') as HTMLInputElement;
    if (searchInput.value.length==0) {
      this.filteredMembres = this.membres!.filter(this.sortMembreByMunicipalite);
    }else{
      this.filteredMembres = this.membres!.filter(this.checkMembre);
    } 
  }

  sortMembres(){
    this.filteredMembres = this.membres!.filter(this.sortMembreByMunicipalite);
  }

  ChooseMember(member:Membre) :void{


    var trouv=false
    for (let i = 0; i < this.chosenMembers.length; i++) {
      if(this.chosenMembers[i]._id==member._id){
        trouv=true;
      }
    }

    if(trouv==false){
      this.chosenMembers.push(member);
      document.getElementById('checkBtn'+member._id!)!.innerHTML="<i class='fa fa-trash'></i>";
      document.getElementById('checkBtn'+member._id!)!.style.backgroundColor= "#dc3545";
      document.getElementById('checkBtn'+member._id!)!.style.borderColor= "#dc3545";
    }else{
      for (var i = 0; i < this.chosenMembers.length; i++) {
        if(this.chosenMembers[i]._id==member._id)
        {
            this.chosenMembers.splice(i,1);
        }
      }
      document.getElementById('checkBtn'+member._id!)!.innerHTML="<i class='fa fa-check'></i>";
      document.getElementById('checkBtn'+member._id!)!.style.backgroundColor= "#0062cc";
      document.getElementById('checkBtn'+member._id!)!.style.borderColor= "#0062cc";
    }
    
  }

  private createReunionForm(): Reunion {
    return {
      ...new Reunion(),
      _id: "",
      sujet : this.createForm.get(['sujet'])!.value,
      date: this.createForm.get(['date'])!.value,
      duree: this.createForm.get(['duree'])!.value,
      type: this.createForm.get(['type'])!.value,
      municipaliteId :this.createForm.get(['municipalite'])!.value,
      participations:[]
    };
  }

  save(): void{
    var reunion = this.createReunionForm();
    var today = new Date();
    //var dateReunion = new Date(reunion.date!.toString());

    if(reunion.sujet==null){
      alert("veuillez renseigner le champ sujet")
    }else if (reunion.type==null) {
      alert("veuillez renseigner le champ type")
    }else if (reunion.municipaliteId==null) {
      alert("veuillez renseigner le champ municipalite")
    }else if (reunion.date==null) {
      alert("veuillez renseigner le champ date")
    }
    
    else if (today<reunion.date) {
      alert("le champ date est invalide")
    }else if((new Date(reunion.date!.toString()).getMonth()-1)<today.getMonth()){
      alert("le champ date est invalide")
    }else if (new Date(reunion.date!.toString()).getDate()<today.getDate()) {
      alert("le champ date est invalide")
    }
    
    else if (reunion.duree==null) {
      alert("veuillez renseigner le champ duree")
    }else if (reunion.type==null) {
      alert("veuillez renseigner le champ type")
    }else if (this.chosenMembers.length==0) {
      alert("veuillez renseigner la liste des membres")
    }else{

      for (let i = 0; i < this.chosenMembers.length; i++) {
        const membre = this.chosenMembers[i];
        var participation = {
          ...new Participation(),
          _id: membre._id,
          membre : membre,
        };
        reunion.participations?.push(participation);
      }


      this.reunionService.create(reunion).subscribe(
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

}
