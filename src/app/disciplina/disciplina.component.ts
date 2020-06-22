import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DisciplinaService } from '../_service/disciplina.service';
import { ProfessorService } from '../_service/professor.service';
import { Router } from '@angular/router';
import { TurmaService } from '../_service/turma.service';
import { Professor } from '../_models/Professor';
import { Disciplina } from '../_models/Disciplina';
import { Turma } from '../_models/Turma';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {
  registerForm: FormGroup;
  disciplina: Disciplina;
  professores: Professor[];
  turmas: Turma[];
  // tslint:disable-next-line: max-line-length
  constructor(public fb: FormBuilder, private toastr: ToastrService, private disciplinaService: DisciplinaService,private professorService:ProfessorService, public router: Router, private turmaService:TurmaService) { }

  ngOnInit() {
    this.validation();
    this.listarProfessor();
    this.listarTurma();
  }
  validation(){
    this.registerForm = this.fb.group({
      ProfessorId: ['', Validators.required],
      Descricao: ['', Validators.required],
      TurmaId: ['', Validators.required]
    });
  }
  listarProfessor()  {
    this.professorService.listaProfessor().subscribe(dados => this.professores =dados);
  }

  listarTurma()  {
    this.turmaService.listaTurma().subscribe(dados => this.turmas =dados);
  }
  cadastrarDisciplina(){
    if (this.registerForm.valid){
      this.disciplina = Object.assign( this.registerForm.value);
      this.disciplinaService.register(this.disciplina).subscribe(
        () => {
          this.router.navigate(['/disciplina']);
          this.toastr.success('Cadastro realizado com sucesso');
        }, error => {
          const erro = error.error;
          erro.foreach(err => {
            switch (err.code){
              case 'DuplicateUserName':
                this.toastr.error('Cadastro Duplicado');
                break;
              default:
                this.toastr.error(`Erro no cadastro ! ${err.code}`);
                break;
            }
          });
        }
      );
    }
  }
}
