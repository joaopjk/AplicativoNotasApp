import { Component, OnInit } from '@angular/core';
import { Matricula } from '../_models/Matricula';
import { Professor } from '../_models/Professor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from '../_service/professor.service';
import { Router } from '@angular/router';
import { MatriculaService } from '../_service/matricula.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  registerForm: FormGroup;
  professor: Professor;
  matriculas: Matricula[];
  // tslint:disable-next-line: max-line-length
  constructor(public fb: FormBuilder, private toastr: ToastrService, private professorService: ProfessorService,private matriculaService: MatriculaService, public router: Router) { }

  ngOnInit() {
    this.listarMatriculas();
    this.validation();
  }
  listarMatriculas()  {
    this.matriculaService.listaMatricula().subscribe(dados => this.matriculas =dados);
  }
  validation(){
    this.registerForm = this.fb.group({
      MatriculaId: ['', Validators.required],
      Nome: ['', Validators.required]
    });
  }
  cadastrarProfessor(){
    if (this.registerForm.valid){
      this.professor = Object.assign( this.registerForm.value);
      this.professorService.createProfessor(this.professor).subscribe(
        () => {
          this.router.navigate(['/professor']);
          this.toastr.success('Cadastro realizado com sucesso');
        }, error => {
          const erro = error.error;
          this.toastr.error('Não foi possivel cadastrar o Professor');
        }
      );
    }else
    {
      this.toastr.error('Formulario inválido');
    }
  }
}
