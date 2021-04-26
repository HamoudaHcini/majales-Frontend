import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionAddComponent } from './reunion-add.component';

describe('ReunionAddComponent', () => {
  let component: ReunionAddComponent;
  let fixture: ComponentFixture<ReunionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
