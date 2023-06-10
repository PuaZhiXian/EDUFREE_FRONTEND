import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLearningTableComponent } from './my-learning-table.component';

describe('MyLearningTableComponent', () => {
  let component: MyLearningTableComponent;
  let fixture: ComponentFixture<MyLearningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLearningTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLearningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
