import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomComponent } from './recom.component';

describe('RecomComponent', () => {
  let component: RecomComponent;
  let fixture: ComponentFixture<RecomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomComponent]
    });
    fixture = TestBed.createComponent(RecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
