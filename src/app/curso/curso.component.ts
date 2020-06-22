import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from '../_service/curso.service';
import { Router } from '@angular/router';
import { Curso } from '../_models/Curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  registerForm: FormGroup;
  curso: Curso;
  constructor(public fb: FormBuilder, private toastr: ToastrService, private cursoService: CursoService, public router: Router) { }

  ngOnInit() {
    this.validation();
  }
  validation(){
    this.registerForm = this.fb.group({
      DescDisciplina: ['', Validators.required]
    });
  }
  cadastrarCurso(){
    if (this.registerForm.valid){
      this.curso = Object.assign( this.registerForm.value);
      this.cursoService.createCurso(this.curso).subscribe(
        () => {
          this.toastr.success('Cadastro realizado com sucesso');
          this.registerForm.reset();
        }, error => {
          const erro = error.error;
          this.toastr.error('Não foi possivel cadastrar o Curso')
        }
      );
    }
  }

}
