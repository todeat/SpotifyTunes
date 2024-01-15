import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistgeneratorComponent } from './playlistgenerator.component';

describe('PlaylistgeneratorComponent', () => {
  let component: PlaylistgeneratorComponent;
  let fixture: ComponentFixture<PlaylistgeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistgeneratorComponent]
    });
    fixture = TestBed.createComponent(PlaylistgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
