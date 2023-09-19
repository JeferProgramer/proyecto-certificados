import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDialogComponentComponent } from './type-dialog-component.component';

describe('TypeDialogComponentComponent', () => {
  let component: TypeDialogComponentComponent;
  let fixture: ComponentFixture<TypeDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDialogComponentComponent]
    });
    fixture = TestBed.createComponent(TypeDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
