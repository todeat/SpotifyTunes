import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyPlayingComponent } from './currently-playing.component';

describe('CurrentlyPlayingComponent', () => {
  let component: CurrentlyPlayingComponent;
  let fixture: ComponentFixture<CurrentlyPlayingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentlyPlayingComponent]
    });
    fixture = TestBed.createComponent(CurrentlyPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
