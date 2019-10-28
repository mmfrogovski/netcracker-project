
import { AllServicesService } from './all-services.service';
import {TestBed} from "@angular/core/testing";

describe('AllServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllServicesService = TestBed.get(AllServicesService);
    expect(service).toBeTruthy();
  });
});
