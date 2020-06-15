import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LancamentoProfessorService } from '../_service/lancamentoProfessor.service';
import { Professor } from '../_models/Professor';
import { Disciplina } from '../_models/Disciplina';
import { Aluno } from '../_models/Aluno';
import { Turma } from '../_models/Turma';
import { Lancamento } from '../_models/Lancamento';
import { defineLocale  } from 'ngx-bootstrap/chronos';
import { BsLocaleService  } from 'ngx-bootstrap/datepicker';
import {ptBrLocale} from 'ngx-bootstrap/locale';

defineLocale('pt-br',ptBrLocale);

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {
  registerForm: FormGroup;
  professor: Professor;
  disciplinas: Disciplina[];
  disciplina:Disciplina;
  aluno:Aluno;
  alunos:Aluno[];
  turma: Turma;
  turmas: Turma[];
  lancamento: Lancamento;
  lancamentos: Lancamento[];
  modoSalvar = 'post';
  disciplinaId:any;
  turmaId:any;
  teste: any;
  limparAluno = false;
  constructor(public fb: FormBuilder,private service:LancamentoProfessorService
    , private localBsLocaleService: BsLocaleService ) {
      this.localBsLocaleService.use('pt-br');
    }
    
    ngOnInit() {
      this.getPrefessor();
      this.getDisciplinaByProfessorId();
      this.validation();
    }
    openModal(template: any){
      this.registerForm.reset();
      template.show();
    }
    closeModal(template: any){
      template.hide()
    }
    salvarAlteracao(template: any){  
      if(this.registerForm.valid){
        if(this.modoSalvar === 'post'){
          this.lancamento = Object.assign({},this.registerForm.value);
          this.lancamento.tipo = this.teste;
          this.service.post(this.lancamento).subscribe(
            (novoLancamento: Lancamento) =>{
              console.log(novoLancamento);
              template.hide();
              this.getLancamentosByDisciplinaId();
            },error => {
              console.log(error);
            }
            );
          }else{
            this.lancamento = Object.assign({id: this.lancamento.id},this.registerForm.value);
            this.lancamento.tipo = this.teste;
            this.service.put(this.lancamento).subscribe(
              () =>{
                template.hide();
                this.getLancamentosByDisciplinaId();
              },error => {
                console.log(error);
              }
              );
            }     
          }
        }
        validation(){
          this.registerForm = new FormGroup({
            id: new FormControl('6'),
            descLancamento: new FormControl('', Validators.required),
            nota: new FormControl('', Validators.required),
            notaTotal: new FormControl('', Validators.required),
            alunoId: new FormControl('', Validators.required),
            disciplinaId: new FormControl('', Validators.required),
            dataLancamento: new FormControl('', Validators.required),
            select: new FormControl('', Validators.required)
          });
        }
        editarLancamento(lancamento: Lancamento,template:any){
          this.modoSalvar = 'put';
          this.openModal(template);
          this.lancamento = lancamento;
          this.registerForm.patchValue(lancamento);
          
        }
        novoLancamento(template:any){
          this.modoSalvar = 'post';
          this.openModal(template);
          this.registerForm.reset();
        }
        getPrefessor(){
          this.service.getProfessorById(1).subscribe( //Lembrar de Usar a variavel global
            (professor: Professor) => {
              this.professor = professor;
            },error =>{
              console.log(error);
            }
            );
          }
          getDisciplinaByProfessorId(){
            this.service.getDisciplinaByProfessorId(1).subscribe(
              (disciplina:Disciplina[]) =>{
                this.disciplinas = disciplina;
                console.log(this.disciplinas);
              },error => {
                console.log(error)
              }
              );
            }
            getTurmaByDisciplinaId(id:any){
              this.service.getTurmaByDisciplinaId(id).subscribe(
                (turma:Turma[])=> {
                  this.turmas = turma;
                  console.log(this.turmas);
                },error => {
                  console.log(error)
                }
                );
              }
              getAlunosByDisciplina(id: any){
                this.service.getAlunosByDisciplina(this.disciplinaId,id).subscribe(
                  (aluno:Aluno[])=>{
                    this.alunos = aluno;
                  },error=>{
                    console.log(error);
                  }
                  );
                }
                getLancamentosByDisciplinaId(){
                  this.service.getLancamentosByDisciplinaId(1).subscribe(
                    (lancamento:Lancamento[])=>{
                      this.lancamentos =lancamento;
                    },error => {
                      console.log(error);
                    }
                    )
                  }
                  onSelect(id){
                    for( var i = 0 ; i< this.disciplinas.length ;i++){
                      if(this.disciplinas[i].descDisciplina == id){
                        this.disciplinaId = this.disciplinas[i].id;
                      }
                    }
                    console.log(id,this.disciplinaId);
                    this.getTurmaByDisciplinaId(this.disciplinaId);
                  }
                  onSelect2(id){
                    // var Parent = document.getElementById('Aluno');
                    // if(this.limparAluno == false){
                    //   this.limparAluno = true;
                    // }else{
                    //   while(Parent.hasChildNodes()){
                    //     Parent.removeChild(Parent.firstChild);
                    //   }
                    //   this.limparAluno = false;
                    // }
                    for( var i = 0 ; i< this.turmas.length ;i++){
                      if(this.turmas[i].nome == id){
                        this.turmaId = this.turmas[i].id;
                      }
                      console.log(this.turmaId)  
                      this.getAlunosByDisciplina(this.turmaId);
                      this.getLancamentosByDisciplinaId();
                    }
                  }
                  onSelect3(id){
                    console.log(id);
                    this.teste = id;
                  }
                  operLancamentos(){
                    this.getLancamentosByDisciplinaId();
                  }
                }
                