import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
      component = new AppComponent();
  });

  it('should create', () => {
    expect(component.title).toBe('Mustang News');
    expect(component).toBeTruthy();
  });
});
