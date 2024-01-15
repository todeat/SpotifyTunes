import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleaseComponent } from './new-release.component';

describe('NewReleaseComponent', () => {
  let component: NewReleaseComponent;
  let fixture: ComponentFixture<NewReleaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewReleaseComponent]
    });
    fixture = TestBed.createComponent(NewReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
