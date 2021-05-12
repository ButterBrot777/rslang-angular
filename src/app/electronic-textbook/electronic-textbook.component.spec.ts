import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicTextbookComponent } from './electronic-textbook.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ElectronicTextbookComponent', () => {
  let component: ElectronicTextbookComponent;
  let fixture: ComponentFixture<ElectronicTextbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectronicTextbookComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicTextbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
