import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLeftComponent } from './section-left.component';

describe('SectionLeftComponent', () => {
  let component: SectionLeftComponent;
  let fixture: ComponentFixture<SectionLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
