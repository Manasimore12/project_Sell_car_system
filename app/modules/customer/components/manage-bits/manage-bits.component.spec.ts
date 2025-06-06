import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBitsComponent } from './manage-bits.component';

describe('ManageBitsComponent', () => {
  let component: ManageBitsComponent;
  let fixture: ComponentFixture<ManageBitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
