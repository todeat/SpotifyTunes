import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaylistComponent } from './user-playlist.component';

describe('UserPlaylistComponent', () => {
  let component: UserPlaylistComponent;
  let fixture: ComponentFixture<UserPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPlaylistComponent]
    });
    fixture = TestBed.createComponent(UserPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
