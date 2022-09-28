import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { GestionService } from '../../services/gestion.service';

import { Persona } from './persona.interface';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private GestionService: GestionService) { }

  // persona!: Persona;
  listadoTipoId: any = [];
  listadoPersonas: Persona[] = [];
  mostrarTabla: boolean = true;
  tituloRegistrar: boolean = true;
  formData: Persona = {
    tipoId: '',
    id: '',
    nombre: '',
    apellidos: '',
    edad: '',
    telefono: '',
    direccion: ''
  };

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(() => this.GestionService.listarTodos()),
        tap(console.log)
      )
      .subscribe(listadoPersonas => this.listadoPersonas = listadoPersonas);

    this.activatedRoute.params
      .pipe(
        switchMap(() => this.GestionService.listarTipoId()),
        tap(console.log)
      )
      .subscribe(listadoTipoId => this.listadoTipoId = listadoTipoId);

  }

  // limpiarForm(): void {

  // }

  actualizarListadoPersonas() {
    this.activatedRoute.params
      .pipe(
        switchMap(() => this.GestionService.listarTodos()),
        tap(console.log)
      )
      .subscribe(listadoPersonas => this.listadoPersonas = listadoPersonas);
  }

  limpiarForm() {
    this.formData = {
      tipoId: '',
      id: '',
      nombre: '',
      apellidos: '',
      edad: '',
      telefono: '',
      direccion: ''
    };
  }

  crearPersona() {
    this.mostrarTabla = false;
    this.limpiarForm();
  }

  guardarPersona(): void {

    if (this.formData.tipoId == '' || this.formData.id == '' || this.formData.nombre == '' || this.formData.apellidos == '' || this.formData.edad == '' || this.formData.telefono == '' || this.formData.direccion == '') {
      Swal.fire(
        'Mensaje',
        'Debe diligenciar todos los campos',
        'warning'
      )
    } else {
      Swal.fire({ title: 'Cargando...', allowOutsideClick: false });
      Swal.showLoading();

      this.GestionService.guardarPersona(this.formData)
        .subscribe((resp) => {
          Swal.fire(
            'Mensaje',
            'Registro guardado',
            'success'
          );
          this.tituloRegistrar = true;
          this.mostrarTabla = true;

          this.limpiarForm();
          this.actualizarListadoPersonas();

        }, (err) => {

        });
    }
  }


  editarPersona(persona: Persona): void {
    this.formData = persona;
    this.tituloRegistrar = false;
    this.mostrarTabla = false;

  }

  actualizarPersona(): void {
    if (this.formData.tipoId == '' || this.formData.id == '' || this.formData.nombre == '' || this.formData.apellidos == '' || this.formData.edad == '' || this.formData.telefono == '' || this.formData.direccion == '') {
      Swal.fire(
        'Mensaje',
        'Debe diligenciar todos los campos',
        'warning'
      )
    } else {
      Swal.fire({ title: 'Cargando...', allowOutsideClick: false });
      Swal.showLoading();
      this.GestionService.actualizarPersona(this.formData)
        .subscribe((resp) => {
          Swal.fire(
            'Mensaje',
            'Registro actualizado',
            'success'
          );
          this.tituloRegistrar = true;
          this.mostrarTabla = true;

          this.limpiarForm();
          this.actualizarListadoPersonas();
          console.log(resp);

        }, (err) => {

        });
    }
  }


  eliminarPersona(persona: Persona): void {
    console.log(persona)

    this.GestionService.eliminarPersona(persona.id)
      .subscribe((resp) => {
        this.actualizarListadoPersonas();
        console.log(resp);

      }, (err) => {

      });

  }


}


