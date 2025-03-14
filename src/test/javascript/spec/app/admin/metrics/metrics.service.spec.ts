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
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MetricsService, Metrics, ThreadDump } from 'app/admin/metrics/metrics.service';
import { SERVER_API_URL } from 'app/app.constants';

describe('Service Tests', () => {
  describe('Logs Service', () => {
    let service: MetricsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      service = TestBed.get(MetricsService);
      httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    describe('Service methods', () => {
      it('should call correct URL', () => {
        service.getMetrics().subscribe();

        const req = httpMock.expectOne({ method: 'GET' });
        const resourceUrl = SERVER_API_URL + 'management/jhimetrics';
        expect(req.request.url).toEqual(resourceUrl);
      });

      it('should return Metrics', () => {
        let expectedResult: Metrics | null = null;
        const metrics: Metrics = {
          jvm: {},
          'http.server.requests': {},
          cache: {},
          services: {},
          databases: {},
          garbageCollector: {},
          processMetrics: {}
        };

        service.getMetrics().subscribe(received => {
          expectedResult = received;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(metrics);
        expect(expectedResult).toEqual(metrics);
      });

      it('should return Thread Dump', () => {
        let expectedResult: ThreadDump | null = null;
        const dump: ThreadDump = { threads: [{ name: 'test1', threadState: 'RUNNABLE' }] };

        service.threadDump().subscribe(received => {
          expectedResult = received;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(dump);
        expect(expectedResult).toEqual(dump);
      });
    });
  });
});
