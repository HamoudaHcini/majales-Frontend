import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Membre } from '../models/Membre';
import { MembreService } from '../services/membre.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {
  membres: Membre[];
  constructor(protected membreService: MembreService) { 
    this.membres = [];
  }
  
  ngOnInit(): void {

    this.membreService.getMembres().subscribe((res: HttpResponse<Membre[]>) => {
      this.membres = res.body || [];
      //console.log(res.body)
    });
  }

}
