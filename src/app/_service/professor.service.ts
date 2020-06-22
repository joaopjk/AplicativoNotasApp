import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Professor } from '../_models/Professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  baseUrl = 'https://localhost:44324/api/professor';

constructor(private http: HttpClient) { }
createProfessor(model: Professor){
  return this.http.post(`${this.baseUrl}`, model);
 }
listaProfessor()
{
  return this.http.get<Professor[]>(`${this.baseUrl}`);
}

}
