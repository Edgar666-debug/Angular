import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { alumno } from '../models/alumno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoServiceService {
  private http = inject(HttpClient);
  private url = 'http://localhost:9000/alumnos';

  buscarAlumno(id: number) {
    return this.http.get<alumno>(this.url + '/' + id);
  }

  searchBYName(name: string) {
    return this.http.get<alumno[]>(this.url + '/consultar/' + name);
  }

  listarAlumnos() {
    return this.http.get<alumno[]>(this.url);
  }

  crearAlumno(alumno: alumno) {
    return this.http.post<alumno>(this.url, alumno);
  }

  editarAlumno(id: number, alumno: alumno) {
    return this.http.put<alumno>(this.url + '/' + id, alumno);
  }

  borrarAlumno(id: number) {
    return this.http.delete<void>(this.url + '/' + id);
  }

}

//Endpoint de SPRING BOOT
//http://localhost:8080/api/
//http://localhost:8080/api/alumnos
//http://localhost:8080/api
//http://localhost:8080/api/
//http://localhost:8080/api/