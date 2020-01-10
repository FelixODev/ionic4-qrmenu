import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateQRPage } from './create-qr.page';

describe('CreateQRPage', () => {
  let component: CreateQRPage;
  let fixture: ComponentFixture<CreateQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
