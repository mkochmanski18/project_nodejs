import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensionListComponent } from './recension-list.component';

describe('RecensionListComponent', () => {
  let component: RecensionListComponent;
  let fixture: ComponentFixture<RecensionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecensionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecensionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
