import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public user: any = [];

  constructor(private router: Router){
    var data = sessionStorage.getItem('user')
    if(data){
      this.user = JSON.parse(data);
    }
    console.log(this.user);
  }

  closedSession(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
