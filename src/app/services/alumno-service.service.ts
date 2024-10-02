import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { alumno } from '../models/alumno.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlumnoServiceService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  

  buscarAlumno(id: number) {
    return this.http.get<alumno>(this.apiUrl + '/' + id);
  }

  searchBYName(name: string) {
    return this.http.get<alumno[]>(this.apiUrl + '/consultar/' + name);
  }

  listarAlumnos() {
    return this.http.get<alumno[]>(this.apiUrl);
  }

  crearAlumno(alumno: alumno) {
    return this.http.post<alumno>(this.apiUrl, alumno);
  }

  editarAlumno(id: number, alumno: alumno) {
    return this.http.put<alumno>(this.apiUrl + '/' + id, alumno);
  }

  borrarAlumno(id: number) {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }

}

//Endpoint de SPRING BOOT
//http://localhost:8080/api/
//http://localhost:8080/api/alumnos
//http://localhost:8080/api
//http://localhost:8080/api/
//http://localhost:8080/api/