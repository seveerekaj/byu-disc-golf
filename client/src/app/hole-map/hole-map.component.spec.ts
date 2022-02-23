import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoleMapComponent } from './hole-map.component';

describe('HoleMapComponent', () => {
  let component: HoleMapComponent;
  let fixture: ComponentFixture<HoleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoleMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
