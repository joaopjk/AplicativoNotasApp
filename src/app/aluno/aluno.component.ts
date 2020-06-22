import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../_service/aluno.service';
import { CursoService } from '../_service/curso.service';
import { Router } from '@angular/router';
import { Aluno } from '../_models/Aluno';
import { Curso } from '../_models/Curso';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {
  registerForm: FormGroup;
  aluno: Aluno;
  cursos: Curso[];
  Curso: Curso;
  // tslint:disable-next-line: max-line-length
  constructor(public fb: FormBuilder, private toastr: ToastrService, private alunoService: AlunoService, private cursoService: CursoService, public router: Router) 
  {
    this.listarCursos();
   }

  ngOnInit() {
    this.listarCursos();
    this.validation();
  }
  listarCursos()  {
    this.cursoService.listaCursos().subscribe(dados => this.cursos = dados);
  }
  validation(){
    this.registerForm = this.fb.group({
      MatriculaId: ['', Validators.required],
      Nome: ['', Validators.required],
      CursoId: ['', Validators.required]
    });
  }
  cadastrarAluno(){
    if (this.registerForm.valid){
      this.aluno = Object.assign( this.registerForm.value);
      this.alunoService.register(this.aluno).subscribe(
        () => {
          this.router.navigate(['/aluno']);
          this.toastr.success('Cadastro realizado com sucesso');
        }, error => {
          const erro = error.error;
          this.toastr.error('Não foi possivel cadastrar o Aluno');
        }
      );
    }else
    {
      this.toastr.error('Formulario inválido');
    }
  }
}
