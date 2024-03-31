import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensionItemComponent } from './recension-item.component';

describe('RecensionItemComponent', () => {
  let component: RecensionItemComponent;
  let fixture: ComponentFixture<RecensionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecensionItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecensionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
