/**
 * Copyright 2017-2022 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster Online project, see https://github.com/jhipster/jhipster-online
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { JhonlineTestModule } from '../../../../test.module';
import { PasswordResetInitComponent } from 'app/account/password-reset/init/password-reset-init.component';
import { PasswordResetInitService } from 'app/account/password-reset/init/password-reset-init.service';

describe('Component Tests', () => {
  describe('PasswordResetInitComponent', () => {
    let fixture: ComponentFixture<PasswordResetInitComponent>;
    let comp: PasswordResetInitComponent;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [JhonlineTestModule],
        declarations: [PasswordResetInitComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PasswordResetInitComponent, '')
        .createComponent(PasswordResetInitComponent);
      comp = fixture.componentInstance;
    });

    it('sets focus after the view has been initialized', () => {
      const node = {
        focus(): void {}
      };
      comp.email = new ElementRef(node);
      spyOn(node, 'focus');

      comp.ngAfterViewInit();

      expect(node.focus).toHaveBeenCalled();
    });

    it('notifies of success upon successful requestReset', inject([PasswordResetInitService], (service: PasswordResetInitService) => {
      spyOn(service, 'save').and.returnValue(of({}));
      comp.resetRequestForm.patchValue({
        email: 'user@domain.com'
      });

      comp.requestReset();

      expect(service.save).toHaveBeenCalledWith('user@domain.com');
      expect(comp.success).toBe(true);
    }));

    it('no notification of success upon error response', inject([PasswordResetInitService], (service: PasswordResetInitService) => {
      spyOn(service, 'save').and.returnValue(
        throwError({
          status: 503,
          data: 'something else'
        })
      );
      comp.resetRequestForm.patchValue({
        email: 'user@domain.com'
      });
      comp.requestReset();

      expect(service.save).toHaveBeenCalledWith('user@domain.com');
      expect(comp.success).toBe(false);
    }));
  });
});
