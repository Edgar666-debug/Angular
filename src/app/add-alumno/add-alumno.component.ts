import { Component, inject, OnInit } from '@angular/core';
import { AlumnoServiceService } from '../services/alumno-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { alumno } from '../models/alumno.interface';

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
          id: [alumno.id],
          nombre: [alumno.nombre, [Validators.required]],
          apellidos: [alumno.apellidos, [Validators.required]],
          matricula: [alumno.matricula, [Validators.required]],
        });
      });
    } else {
      this.form = this.fb.group({
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
      if (this.Alumno) {
        this.alumnoService.editarAlumno(this.Alumno.id, alumnoForm).subscribe(
          () => {
            this.router.navigate(['/']);
            window.alert('Alumno actualizado');
          });
      }else {
        this.alumnoService.crearAlumno(alumnoForm).subscribe(
          () => {
            this.router.navigate(['/']);
            window.alert('Alumno creado');
          });
      }
    }

  }
