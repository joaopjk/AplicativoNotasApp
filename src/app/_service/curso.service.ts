import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../_models/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  baseUrl = 'https://localhost:44324/api/curso';
constructor(private http: HttpClient) { }
createCurso(model: Curso){
  return this.http.post(`${this.baseUrl}`, model);
 }
listaCursos()
{
  return this.http.get<Curso[]>(`${this.baseUrl}/GetAllCurso`);
}
}
