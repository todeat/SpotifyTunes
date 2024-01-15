import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponentComponent } from './player-component.component';

describe('PlayerComponentComponent', () => {
  let component: PlayerComponentComponent;
  let fixture: ComponentFixture<PlayerComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerComponentComponent]
    });
    fixture = TestBed.createComponent(PlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
