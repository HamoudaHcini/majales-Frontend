import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Reunion } from '../models/Reunion';
import { ReunionService } from '../services/reunion.service';
import { Participation } from '../models/Participation';
import { Municipalite } from '../models/Municipalite';
import { Admin } from '../models/Admin';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
declare var $: any;



@Component({
  selector: 'app-root',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {

  @ViewChild('content') content? :ElementRef  

  connected?:Admin;
  reunions?: Reunion[];
  participations?:Participation[];
  detailReunion:Reunion;
  constructor(
    protected reunionService: ReunionService,
    private router: Router,
  ) 
  {
    this.detailReunion = {
      ...new Reunion(),
      _id: "",
      municipalite:{...new Municipalite(),
        _id:"",
        Nom:"",
      },
      sujet : "",
      date: undefined,
      duree: "",
      type: "",
    };
    this.connected = {
      ...new Admin(),
      _id: "",
      nom:"",
      prenom:""
    };
  }


  public downloadPDF(reunion:Reunion){
    var data = document.getElementById('detailReunionModal') as HTMLElement
    html2canvas(data).then(canvas => {

      var imgHeight = canvas.height * 250 /canvas.width;

      const imgData = canvas.toDataURL('image/png')

      let doc = new jsPDF('p','mm','a4');

      doc.addImage(imgData,'PNG',0,0,200,imgHeight);
      doc.save(reunion.sujet+'.pdf');
    })
  }

  ngOnInit(): void {

    const trouv = localStorage.getItem("connected");
    if (trouv==null) {
      this.router.navigateByUrl('/login');
    }else{
      this.connected = JSON.parse(localStorage.getItem("connected")!);
      this.reunionService.getReunions().subscribe((res: HttpResponse<Reunion[]>) => {
        this.reunions = res.body || [];
      });    
    }
  }

  Details(reunion:Reunion):void{
    this.detailReunion=reunion;
    this.participations=reunion.participations;
  }

  deleteReunionPreparatoire(reunionId:any) :void{
    for (var i = 0; i < this.reunions!.length; i++) {
      if(this.reunions![i]._id==reunionId)
      {
          this.reunions!.splice(i,1);
      }
    }
    this.reunionService.deletePreparatoire({ reunionId: reunionId }).subscribe(
      (res) => {
        if(res.status==200){
          console.log(res.body!.message);
        }
      },
      error => console.log(error)
    );
  }

  
  deleteReunion(reunionId:any) :void{

    for (var i = 0; i < this.reunions!.length; i++) {
      if(this.reunions![i]._id==reunionId)
      {
          this.reunions!.splice(i,1);
      }
    }
    this.reunionService.delete({ reunionId: reunionId }).subscribe(
      (res) => {
        if(res.status==200){
          console.log(res.body!.message);
        }
      },
      error => console.log(error)
    );

  }

}
