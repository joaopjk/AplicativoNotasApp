import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Matricula } from '../_models/Matricula';
import { ToastrService } from 'ngx-toastr';
import { MatriculaService } from '../_service/matricula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {
  registerForm: FormGroup;
  matricula: Matricula;

  constructor(public fb: FormBuilder, private toastr: ToastrService, private matriculaService: MatriculaService, public router: Router) { }

  ngOnInit() {
    this.validation();
  }
  validation(){
    this.registerForm = this.fb.group({
      TipoMatricula: ['', Validators.required]
    });
  }
  cadastrarMatricula(){
    if (this.registerForm.valid){
      this.matricula = Object.assign( this.registerForm.value);
      this.matriculaService.createMatricula(this.matricula).subscribe(
        () => {
          this.router.navigate(['/matricula']);
          this.toastr.success('Cadastro realizado com sucesso');
        }, error => {
          const erro = error.error;
          this.toastr.error('Não foi possivel cadastrar o Tipo de Matrícula')

        }
      );
    }
  }
}
