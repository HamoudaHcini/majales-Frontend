import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(protected membreService: MembreService,protected municipaliteService: MunicipaliteService) { 
    this.membres = [];
    this.filteredMembres=[];
    this.municipalites=[];
  }
  
  ngOnInit(): void {

    this.membreService.getMembres().subscribe((res: HttpResponse<Membre[]>) => {
      this.membres = res.body || [];
      this.filteredMembres = res.body || [];
    });

    this.municipaliteService.getMunicipalites().subscribe((res: HttpResponse<Municipalite[]>) => {
      this.municipalites = res.body || [];
    });
  }

  checkMembre(membre:Membre) {
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

}
