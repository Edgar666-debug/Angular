import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { alumno } from '../models/alumno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoServiceService {
  private http = inject(HttpClient);

  buscarAlumno(id: number) {
    return this.http.get<alumno>('http://localhost:9000/alumnos/' + id);
  }

  listarAlumnos() {
    return this.http.get<alumno[]>('http://localhost:9000/alumnos');
  }

  crearAlumno(alumno: alumno) {
    return this.http.post<alumno>('http://localhost:9000/alumnos', alumno);
  }

  editarAlumno(id: number, alumno: alumno) {
    return this.http.put<alumno>('http://localhost:9000/alumnos/' + id, alumno);
  }

  borrarAlumno(id: number) {
    return this.http.delete<void>('http://localhost:9000/alumnos/' + id);
  }

}

//http://localhost:8080/api/
//http://localhost:8080/api/alumnos
//http://localhost:8080/api
//http://localhost:8080/api/
//http://localhost:8080/api/