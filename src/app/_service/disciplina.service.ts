import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disciplina } from '../_models/Disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  baseUrl = 'https://localhost:44324/api/disciplina';

constructor(private http: HttpClient) { }
register(model: Disciplina){
  return this.http.post(`${this.baseUrl}`, model);
 }
}
