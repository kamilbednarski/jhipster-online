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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GitConfigurationModel } from 'app/core/git/git-configuration.model';
import { GitConfigurationService } from 'app/core/git/git-configuration.service';
import { GithubCallbackService } from './callback.service';

@Component({
  selector: 'jhi-github-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
  token: string | undefined;

  provider: string | undefined;

  message: string | undefined;

  isLoading = false;

  alertType = 'warning';

  gitConfig: GitConfigurationModel;

  constructor(
    private route: ActivatedRoute,
    private callbackService: GithubCallbackService,
    private gitConfigurationService: GitConfigurationService
  ) {
    this.gitConfig = this.gitConfigurationService.gitConfig;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.provider = params['provider'];
      this.token = params['token'];
      this.isLoading = true;
      if (this.provider && this.token) {
        const capitalizedProvider = this.provider.charAt(0).toUpperCase() + this.provider.slice(1);
        this.message = `JHipster is trying to link your ${capitalizedProvider} repositories...`;
        this.callbackService.saveToken(this.provider, this.token).subscribe(
          () => {
            this.message = `JHipster is successfully linked to your ${capitalizedProvider} repositories.`;
            this.isLoading = false;
            this.alertType = 'success';
            if (this.gitConfigurationService.gitConfig) {
              if (this.provider === 'github') {
                this.gitConfigurationService.gitConfig.githubConfigured = true;
              } else if (this.provider === 'gitlab') {
                this.gitConfigurationService.gitConfig.gitlabConfigured = true;
              }
            }
          },
          () => {
            this.message = `JHipster has failed to reach your ${capitalizedProvider} repositories.`;
            this.isLoading = false;
            this.alertType = 'danger';
          }
        );
      }
    });
  }
}
