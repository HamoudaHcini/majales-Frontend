import {Municipalite} from './Municipalite';

export class Membre
{
  _id?: string;
  nom?: string;
  prenom?: string;
  nom_pere?: string;
  sexe?: string;
  CIN?: string;

  //parcours universitaire
  niveau_academique?: string;
  specialite?: string;
  diplome?: string;
  annee_obtention?: string;

  etat_civil?: string;
  problemes_physique?: string;
  
  adresse?: string;
  portable?: string;
  fix?: string;
  municipalite?: Municipalite;

  isParticipated:boolean;

  //etat administratif
  secteur?:string;
  grade?:string;
  poste?:string;
  num_cnss?:string;
  is_active?:boolean;

  //politique
  appartenance?:boolean;
  nom_partie?:string;
  description_conseil?:string;
  
  createdAt?:Date;
  updatedAt?:Date;



  constructor() {
    this.isParticipated=false;
  }
}