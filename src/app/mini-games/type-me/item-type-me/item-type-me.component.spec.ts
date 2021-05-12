import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTypeMeComponent } from './item-type-me.component';

describe('ItemTypeMeComponent', () => {
  let component: ItemTypeMeComponent;
  let fixture: ComponentFixture<ItemTypeMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemTypeMeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTypeMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
