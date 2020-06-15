/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LancamentoProfessorService } from './lancamentoProfessor.service';

describe('Service: LancamentoProfessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LancamentoProfessorService]
    });
  });

  it('should ...', inject([LancamentoProfessorService], (service: LancamentoProfessorService) => {
    expect(service).toBeTruthy();
  }));
});
