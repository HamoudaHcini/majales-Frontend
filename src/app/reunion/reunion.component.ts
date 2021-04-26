import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Reunion } from '../models/Reunion';
import { ReunionService } from '../services/reunion.service';
import { Membre } from '../models/Membre';
import { Participation } from '../models/Participation';

@Component({
  selector: 'app-root',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  reunions?: Reunion[];
  participations?:Participation[];
  detailReunion:Reunion;
  constructor(
    protected reunionService: ReunionService,
  ) 
  {
    this.detailReunion = {
      ...new Reunion(),
      _id: "",
      sujet : "",
      lieu: "",
      date: undefined,
      duree: "",
      type: "",
    };
  }

  ngOnInit(): void {



    this.reunionService.getReunions().subscribe((res: HttpResponse<Reunion[]>) => {
      this.reunions = res.body || [];


      //console.log(res.body)
    });


  }

  Details(reunion:Reunion):void{
    this.detailReunion=reunion;
    this.participations=reunion.participations;
  }


}
