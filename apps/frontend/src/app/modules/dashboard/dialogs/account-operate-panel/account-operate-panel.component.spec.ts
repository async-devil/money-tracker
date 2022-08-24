import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOperatePanelComponent } from './account-operate-panel.component';

describe('AccountOperatePanelComponent', () => {
  let component: AccountOperatePanelComponent;
  let fixture: ComponentFixture<AccountOperatePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOperatePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOperatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
