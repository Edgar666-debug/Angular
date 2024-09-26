import { Component, inject, OnInit } from '@angular/core';
import { AlumnoServiceService } from '../services/alumno-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { alumno } from '../models/alumno.interface';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-alumno',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './add-alumno.component.html',
  styleUrl: './add-alumno.component.css'
})
export default class AddAlumnoComponent implements OnInit {
  private alumnoService = inject(AlumnoServiceService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  private fb = inject(FormBuilder);

  form?: FormGroup;
  Alumno?: alumno;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alumnoService.buscarAlumno(parseInt(id)).subscribe(
        (alumno) => {
        this.Alumno = alumno;
        this.form = this.fb.group({
          id: [alumno.id] ,
          nombre: [alumno.nombre, [Validators.required]],
          apellidos: [alumno.apellidos, [Validators.required]],
          matricula: [alumno.matricula, [Validators.required]],
        });
      });
    } else {
      this.form = this.fb.group({
        id: [Math.floor(Math.random() * 100)],
        nombre: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        matricula: ['', [Validators.required]],
      });
    }
    }
    
    saveAlumno() {
      if(this.form?.invalid) {
        return;
      }
      const alumnoForm = this.form!.value;
      let request: Observable<alumno>; 
      if (this.Alumno) {
        request = this.alumnoService.editarAlumno(this.Alumno.id, alumnoForm);
      }else {
        request = this.alumnoService.crearAlumno(alumnoForm);
      }
      
      request.subscribe({ 
        next: () => {
        this.router.navigate(['/']);
        Swal.fire('Alumno guardado', '', 'success');
      },
      error: response => {
        Swal.fire('Error', response.error.message, 'error');
      }
    });
    }

  }
