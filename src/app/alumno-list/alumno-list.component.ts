import { Component, inject, OnInit } from '@angular/core';
import { AlumnoServiceService } from '../services/alumno-service.service';
import { RouterModule } from '@angular/router';
import { alumno } from '../models/alumno.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css'
})
export default class AlumnoListComponent implements OnInit {
  private alumnoService = inject(AlumnoServiceService);

  Alumnos: alumno[] = [];

  ngOnInit(): void {
   this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnoService.listarAlumnos().subscribe( 
      (alumnos) => {
        this.Alumnos = alumnos;
      });
  }

  borrarAlumno(Alumnos: alumno) {
        Swal.fire({
          title: "Estas seguro?",
          text: `¿Seguro que quieres borrar a ${Alumnos.nombre} ${Alumnos.apellidos}?`,
          icon: "warning",
          showConfirmButton: true,
          showCancelButton: true ,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrar!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.alumnoService.borrarAlumno(Alumnos.id).subscribe(() => {
              this.cargarAlumnos();
            });
          }
        });
  }

}
