import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidebarRightComponent } from './user-sidebar-right.component';

describe('UserSidebarRightComponent', () => {
  let component: UserSidebarRightComponent;
  let fixture: ComponentFixture<UserSidebarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSidebarRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidebarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
