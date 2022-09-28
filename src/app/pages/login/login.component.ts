import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  user: string = '';
  pass: string = '';


  ngOnInit(): void {
  }


  iniciarSession(): void {
    if (this.user == '' || this.pass == '') {
      Swal.fire(
        'Mensaje',
        'Debe diligenciar todos los campos',
        'warning'
      )
    }else{
      this.router.navigate(['./gestion']);
    }
  }

}
