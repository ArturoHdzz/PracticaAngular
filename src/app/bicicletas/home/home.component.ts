import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  users:any[]=[];
  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.getAllusers
  }

  getAllusers(){
    debugger;
    this.http.get('').subscribe((res:any) => {
      this.users = res.data;
    }, error => {
      alert("Error API")
    })
  }
}
