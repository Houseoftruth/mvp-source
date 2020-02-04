import { TestBed } from '@angular/core/testing';

import { ApigatewayService } from './apigateway.service';

describe('ApigatewayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApigatewayService = TestBed.get(ApigatewayService);
    expect(service).toBeTruthy();
  });
});
