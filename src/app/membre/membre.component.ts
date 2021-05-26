import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Membre } from '../models/Membre';
import { Municipalite } from '../models/Municipalite';
import { MembreService } from '../services/membre.service';
import { MunicipaliteService } from '../services/municipalite.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit { 
  membres: Membre[];
  filteredMembres: Membre[];
  municipalites: Municipalite[];
  detailMembre:Membre;

  constructor(protected membreService: MembreService,protected municipaliteService: MunicipaliteService) { 
    this.membres = [];
    this.filteredMembres=[];
    this.municipalites=[];

    this.detailMembre = {
      ...new Membre(),
      _id: "",
      nom: "",
      prenom: "",
      nom_pere: "",
      sexe: "",
      etat_civil: "",
      problemes_physique: "",
      CIN: "",
      adresse: "",
      portable: "",
      fix: "",

      niveau_academique: "",
      specialite: "",
      diplome: "",
      annee_obtention: "",


      municipalite: {...new Municipalite(),
        _id:"",
        Nom:"",
      },
      
      secteur:"",
      grade:"",
      poste:"",

      num_cnss:"",
      nom_partie:"",
      description_conseil:"",
    };
  }
  
  ngOnInit(): void { //Affichage liste membre

    this.membreService.getMembres().subscribe((res: HttpResponse<Membre[]>) => {
      this.membres = res.body || [];
      this.filteredMembres = res.body || [];
    });

    this.municipaliteService.getMunicipalites().subscribe((res: HttpResponse<Municipalite[]>) => {
      this.municipalites = res.body || [];
    });
  }

  checkMembre(membre:Membre) { //Rechercher membre
    const searchInput = document.getElementById('searchBar') as HTMLInputElement;
    return (membre.CIN!.startsWith(searchInput.value) || membre.nom!.startsWith(searchInput.value) || membre.prenom!.startsWith(searchInput.value));
  }

  searchMembre(){
    const searchInput = document.getElementById('searchBar') as HTMLInputElement;
    
    if (searchInput.value.length==0) {
      this.filteredMembres = this.membres;
    }else{
      this.filteredMembres = this.membres.filter(this.checkMembre);
    }
  }

  sortMembreByMunicipalite(membre:Membre){
    const municipalite = document.getElementById('municipalite') as HTMLSelectElement;
    return membre.municipalite!._id! === municipalite.value
  }

  sortMembres(){

    const searchInput = document.getElementById('municipalite') as HTMLInputElement;

    if (searchInput.value==="all") {
      this.filteredMembres = this.membres;
    }else{
      this.filteredMembres = this.membres.filter(this.sortMembreByMunicipalite);
    } 
  }

  Details(membre:Membre):void{ 
    this.detailMembre=membre;
  }

  public downloadPDF(membre:Membre){ //télécharger fiche membre
    var data = document.getElementById('detailMembreModal') as HTMLElement
    html2canvas(data).then(canvas => {

      var imgHeight = canvas.height * 250 /canvas.width;

      const imgData = canvas.toDataURL('image/png')

      let doc = new jsPDF('p','mm','a4');

      doc.addImage(imgData,'PNG',0,0,200,imgHeight);
      doc.save(membre.prenom+" "+membre.nom+'.pdf');
    })
  }

}
