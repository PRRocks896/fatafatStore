import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredetailComponent } from './storedetail.component';

describe('StoredetailComponent', () => {
  let component: StoredetailComponent;
  let fixture: ComponentFixture<StoredetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
