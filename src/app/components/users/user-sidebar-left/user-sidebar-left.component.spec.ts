import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidebarLeftComponent } from './user-sidebar-left.component';

describe('UserSidebarLeftComponent', () => {
  let component: UserSidebarLeftComponent;
  let fixture: ComponentFixture<UserSidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSidebarLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
