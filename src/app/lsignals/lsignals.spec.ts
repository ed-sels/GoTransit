import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lsignals } from './lsignals';

describe('Lsignals', () => {
  let component: Lsignals;
  let fixture: ComponentFixture<Lsignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lsignals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lsignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
