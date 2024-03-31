import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensionPageComponent } from './recension-page.component';

describe('RecensionPageComponent', () => {
  let component: RecensionPageComponent;
  let fixture: ComponentFixture<RecensionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecensionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecensionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
