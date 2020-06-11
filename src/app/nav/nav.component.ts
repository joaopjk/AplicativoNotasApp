import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private toastr: ToastrService, public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  LoggedIn(){
    return this.authService.loggedIn();
  }
  Entrar(){

  }
  Logout(){
    localStorage.removeItem('token');
    this.toastr.show('Log Out');
    this.router.navigate(['user/login']);
  }
}
