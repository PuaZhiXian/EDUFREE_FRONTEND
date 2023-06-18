import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeachingTableComponent } from './my-teaching-table.component';

describe('MyTeachingTableComponent', () => {
  let component: MyTeachingTableComponent;
  let fixture: ComponentFixture<MyTeachingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTeachingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeachingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
