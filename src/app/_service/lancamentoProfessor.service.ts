import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../_models/Professor';
import {map} from 'rxjs/operators';
import { Disciplina } from '../_models/Disciplina';
import { Turma } from '../_models/Turma';
import { Aluno } from '../_models/Aluno';
import { Lancamento } from '../_models/Lancamento';
@Injectable({
  providedIn: 'root'
})
export class LancamentoProfessorService {
baseUrlDisciplina = 'https://localhost:44324/api/disciplina';
baseUrlTurma = 'https://localhost:44324/api/turma';
baseUrlAluno = 'https://localhost:44324/api/aluno/GetAlunosByDisiciplna';
baseUrlProfessor = 'https://localhost:44324/api/professor';
baseUrlLancamentos = 'https://localhost:44324/api/lancamento';
disciplinaId: any;
constructor(private http: HttpClient) { }

getProfessorById(Id: number): Observable<Professor>{
  return this.http.get<Professor>(`${this.baseUrlProfessor}/${Id}`);
}
getDisciplinaByProfessorId(id: number): Observable<Disciplina[]>{
  return this.http.get<Disciplina[]>(`${this.baseUrlDisciplina}/${id}`);
}
getTurmaByDisciplinaId(id: number): Observable<Turma[]>{
  return this.http.get<Turma[]>(`${this.baseUrlTurma}/${id}`);
}
getAlunosByDisciplina(id: number, id2: number): Observable<Aluno[]>{
  return this.http.get<Aluno[]>(`${this.baseUrlAluno}/?CursoId=${id}&DisciplinaId=${id2}`);
}
getLancamentosByDisciplinaId(id: number){
  return this.http.get<Lancamento[]>(`${this.baseUrlLancamentos}/getLancamentosByDisciplinaId?DisciplinaId=${id}`);
}
post( lancamento: Lancamento){
  return this.http.post(`${this.baseUrlLancamentos}`, lancamento);
}
put( lancamento: Lancamento){
  return this.http.put(`${this.baseUrlLancamentos}`, lancamento);
}
}
