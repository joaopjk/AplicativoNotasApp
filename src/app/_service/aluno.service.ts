import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Aluno } from '../_models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  baseUrl = 'https://localhost:44324/api/aluno';

constructor(private http: HttpClient) { }
register(model: Aluno){
  return this.http.post(`${this.baseUrl}`, model);
 }
}
