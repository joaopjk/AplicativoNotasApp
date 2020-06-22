import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { AlunoComponent } from './aluno/aluno.component';
import { CursoComponent } from './curso/curso.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { ProfessorComponent } from './professor/professor.component';
import { PrincipalComponent } from './principal/principal.component';



const routes: Routes = [
{path: 'user', component: UserComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
]},
  {path: 'lancamentos', component: LancamentosComponent},
  {path: 'aluno', component: AlunoComponent},
  {path: 'curso', component: CursoComponent},
  {path: 'disciplina', component: DisciplinaComponent},
  {path: 'matricula', component: MatriculaComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: 'principal', component: PrincipalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
