import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turma } from '../_models/Turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  baseUrl = 'https://localhost:44324/api/turma';
constructor(private http: HttpClient) { }
createTurma(model: Turma){
  return this.http.post(`${this.baseUrl}`, model);
 }
listaTurma()
{
  return this.http.get<Turma[]>(`${this.baseUrl}`);
}
}
