import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;
  constructor(public fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, public router: Router)
  {}

  ngOnInit() {
    this.validation();
  }
  validation(){
    this.registerForm = this.fb.group({
      MatriculaId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {validator : this.compararSenhas})
    });
  }
  compararSenhas(fb: FormGroup){
    const confirmSenhaCtrl = fb.get('confirmPassword');
    if (confirmSenhaCtrl.errors === null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value){
        fb.get('password').setErrors({mismatch: true});
      }else{
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }
  cadastrarUsuario(){
    if (this.registerForm.valid){
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
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
