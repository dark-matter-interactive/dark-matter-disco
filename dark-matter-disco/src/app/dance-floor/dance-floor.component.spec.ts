import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceFloorComponent } from './dance-floor.component';

describe('DanceFloorComponent', () => {
  let component: DanceFloorComponent;
  let fixture: ComponentFixture<DanceFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanceFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
