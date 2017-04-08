import { ErrorService } from './error.service';

describe('ErrorService', () => {
    let service: ErrorService;

  beforeEach(() => {
      service = new ErrorService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    service.updateMessage('test message 1');

    service.update$.subscribe(message => {
      expect(message).toBe('test message 1');
    });
  });
});
