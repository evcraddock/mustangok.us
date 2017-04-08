import { ErrorsBannerComponent } from './errors-banner.component';
import { ErrorService } from '../../service/index';

describe('ErrorsBannerComponent', () => {
  let component: ErrorsBannerComponent;
  let mockErrorService: ErrorService;

  beforeEach(() => {
    mockErrorService = new ErrorService();
    component = new ErrorsBannerComponent(mockErrorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
