import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membre-add',
  templateUrl: './membre-add.component.html',
  styleUrls: ['./membre-add.component.css']
})
export class MembreAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleCard() {
    let checkbox = document.getElementById('checkAppartenance') as HTMLInputElement
    let checked = checkbox.checked;

    if (checked==true) {
      document.getElementById('appartenanceCard')!.style.display = "block";
    }else{
      document.getElementById('appartenanceCard')!.style.display = "none";
    }
  }

}
