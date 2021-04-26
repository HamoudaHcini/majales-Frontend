import { HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Membre } from '../models/Membre';
import { participatedMembre } from '../models/participatedMembre';
import { Participation } from '../models/Participation';
import { Reunion } from '../models/Reunion';
import { MembreService } from '../services/membre.service';
import { ReunionService } from '../services/reunion.service';

@Component({
  selector: 'app-reunion-edit',
  templateUrl: './reunion-edit.component.html',
  styleUrls: ['./reunion-edit.component.css']
})
export class ReunionEditComponent implements OnInit {

  membres: Membre[];
  chosenMembers:Participation[];
  reunion: Reunion = new Reunion;
  idReunion:string;
  createForm = this.formBuilder.group({
    id: [],
    sujet: [],
    lieu: [],
    date: [],
    duree: [],
    type: [],
  });

  constructor(private formBuilder: FormBuilder,protected membreService: MembreService,protected reunionService: ReunionService,private route: ActivatedRoute) {
    this.chosenMembers=[];
    this.membres=[];
    this.idReunion="";
   }

  ngOnInit(): void {
    this.idReunion = this.route.snapshot.paramMap.get('id')!
    console.log("idReunion :",this.idReunion);
    
    
    this.reunionService.getReunionById({ reunionId: this.idReunion }).subscribe((res: HttpResponse<Reunion>) => {
      this.reunion = res.body!;
      this.updateForm(this.reunion);
      this.chosenMembers = this.reunion.participations!


      this.membreService.getMembres().subscribe((res: HttpResponse<Membre[]>) => {
        this.membres = res.body || [];
  
        for (let i = 0; i < this.membres.length; i++) {
          const membre = this.membres[i];
          for (let j = 0; j < this.chosenMembers.length; j++) {
            const chosenMember = this.chosenMembers[j];
            if (membre._id==chosenMember.membre?._id) {
              this.membres[i].isParticipated=true
            }else{
              this.membres[i].isParticipated=false
            }
          }
        }

      });      
    });





  }

  ChooseMember(member:Membre) :void{
    var trouv=false
    for (let i = 0; i < this.chosenMembers.length; i++) {
      if(this.chosenMembers[i].membre!._id==member._id){
        trouv=true;
      }
    }

    if(trouv==false){

      var participation = {
        ...new Participation(),
        _id: member._id,
        membre : member,
      };     
      
      this.chosenMembers.push(participation);
      document.getElementById('checkBtn')!.innerHTML="<i class='fa fa-trash'></i>";
      document.getElementById('checkBtn')!.style.backgroundColor= "#dc3545";
      document.getElementById('checkBtn')!.style.borderColor= "#dc3545";

    }else{

      for (var i = 0; i < this.chosenMembers.length; i++) {
        if(this.chosenMembers[i].membre!._id==member._id)
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
      _id: this.reunion._id,
      sujet : this.createForm.get(['sujet'])!.value,
      lieu: this.createForm.get(['lieu'])!.value,
      date: this.reunion.date,
      duree: this.createForm.get(['duree'])!.value,
      type: this.createForm.get(['type'])!.value,
      participations:this.chosenMembers
    };
  }

  updateForm(reunion: Reunion): void {
    this.createForm.patchValue({
      id: reunion._id,
      sujet: reunion.sujet,
      lieu: reunion.lieu,
      date: reunion.date,
      duree: reunion.duree,
      type: reunion.type,
    });
  }

  save(): void{
    var reunion = this.createReunionForm();
    
    this.reunionService.update(reunion).subscribe(
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
