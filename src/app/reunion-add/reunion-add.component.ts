import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Membre } from '../models/Membre';
import { Participation } from '../models/Participation';

import {Reunion} from '../models/Reunion';
import { ReunionComponent } from '../reunion/reunion.component';
import { MembreService } from '../services/membre.service';
import {ReunionService} from '../services/reunion.service';
@Component({
  selector: 'app-root',
  templateUrl: './reunion-add.component.html',
  styleUrls: ['./reunion-add.component.css']
})
export class ReunionAddComponent implements OnInit {

  membres?: Membre[];
  chosenMembers:Membre[];

  createForm = this.formBuilder.group({
    id: [],
    sujet: [],
    lieu: [],
    date: [],
    duree: [],
    type: [],
  });


  constructor(private formBuilder: FormBuilder,protected membreService: MembreService,protected reunionService: ReunionService ) { 
    this.chosenMembers=[];
  }

  ngOnInit(): void {
    this.membreService.getMembres().subscribe((res: HttpResponse<Membre[]>) => {
      this.membres = res.body || [];
    });
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
      document.getElementById('checkBtn')!.innerHTML="<i class='fa fa-trash'></i>";
      document.getElementById('checkBtn')!.style.backgroundColor= "#dc3545";
      document.getElementById('checkBtn')!.style.borderColor= "#dc3545";
    }else{
      for (var i = 0; i < this.chosenMembers.length; i++) {
        if(this.chosenMembers[i]._id==member._id)
        {
            this.chosenMembers.splice(i,1);
        }
      }
      document.getElementById('checkBtn')!.innerHTML="<i class='fa fa-check'></i>";
      document.getElementById('checkBtn')!.style.backgroundColor= "#0062cc";
      document.getElementById('checkBtn')!.style.borderColor= "#0062cc";
    }
    
  }

  private createReunionForm(): Reunion {
    return {
      ...new Reunion(),
      _id: "",
      sujet : this.createForm.get(['sujet'])!.value,
      lieu: this.createForm.get(['lieu'])!.value,
      date: this.createForm.get(['date'])!.value,
      duree: this.createForm.get(['duree'])!.value,
      type: this.createForm.get(['type'])!.value,
      participations:[]
    };
  }

  save(): void{
    var reunion = this.createReunionForm();
    var today = new Date();
    var dateReunion = new Date(reunion.date!.toString());


/*    if((dateReunion.getMonth()-1)>=today.getMonth()){
      if (dateReunion.getDate()>=today.getDate()) {
        console.log('jawna behi')  
      }else{
        console.log('bara nayek')
      }
    }else{
      console.log('bara nayek')
    }*/

    if(reunion.sujet==null){
      alert("veuillez renseigner le champ sujet")
    }else if (reunion.lieu==null) {
      alert("veuillez renseigner le champ lieu")
    }else if (reunion.date==null) {
      alert("veuillez renseigner le champ date")
    }else if (today<reunion.date) {
      alert("le champ date est invalide")
    }
    
    else if((dateReunion.getMonth()-1)<today.getMonth()){
      alert("le champ date est invalide")
    }else if (dateReunion.getDate()<today.getDate()) {
      alert("le champ date est invalide")
    }
    
    
    else if (reunion.duree==null) {
      alert("veuillez renseigner le champ duree")
    }else if (reunion.type==null) {
      alert("veuillez renseigner le champ type")
    }else if (this.chosenMembers.length==0) {
      alert("veuillez renseigner la liste des membres")
    }else{
      //reunion.participations = this.chosenMembers;
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
