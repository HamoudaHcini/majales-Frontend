import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Reunion } from '../models/Reunion';
import { ReunionService } from '../services/reunion.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  reunions: Reunion[];
  calendarReunions:Object[];


  calendarOptions: CalendarOptions = {
    initialView:'dayGridMonth',
    height: 860,
    headerToolbar:{
      start: 'prevYear,nextYear',
      center: 'title',
      end: 'prev,next, today'
    },
    events: [

    ]
  };

  constructor(protected reunionService: ReunionService) { 
    this.reunions=[];
    this.calendarReunions=[]
  }

  ngOnInit(): void {
    this.reunionService.getReunions().subscribe((res: HttpResponse<Reunion[]>) => {
      this.reunions = res.body || [];
      for (let i = 0; i < this.reunions.length; i++) {
        this.calendarReunions.push({ title: this.reunions[i].sujet, date: this.reunions[i].date });
      }

      this.calendarOptions.events=this.calendarReunions;
    });   
  }

  handleDateClick(arg:any) {
    alert('date click! ' + arg)
  }

}
