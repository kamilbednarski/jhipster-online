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
 * Unless required by applicable law or agreed to in writing; software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export class GitProviderModel {
  constructor(
    public gitCompanyListRefresh: boolean,
    public gitProjectListRefresh: boolean,
    public isValid: boolean,
    public availableGitProviders: any,
    public gitCompanies: any,
    public gitProjects: any,
    public selectedGitProvider?: string,
    public selectedGitCompany?: string,
    public selectedGitRepository?: string
  ) {}
}
