import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matricula } from '../_models/Matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  baseUrl = 'https://localhost:44324/api/matricula';

constructor(private http: HttpClient) { }

createMatricula(model: Matricula){
  return this.http.post(`${this.baseUrl}`, model);
 }
listaMatricula()
{
  return this.http.get<Matricula[]>(`${this.baseUrl}`);
}
}
