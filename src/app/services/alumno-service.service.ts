import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { alumno } from '../models/alumno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoServiceService {
  private http = inject(HttpClient);

  buscarAlumno(id: number) {
    return this.http.get<alumno>('http://localhost:8080/api/' + id);
  }

  listarAlumnos() {
    return this.http.get<alumno[]>('http://localhost:8080/api/alumnos');
  }

  crearAlumno(alumno: alumno) {
    return this.http.post<alumno>('http://localhost:8080/api', alumno);
  }

  editarAlumno(id: number, alumno: alumno) {
    return this.http.put<alumno>('http://localhost:8080/api/' + id, alumno);
  }

  borrarAlumno(id: number) {
    return this.http.delete<void>('http://localhost:8080/api/' + id);
  }

}
