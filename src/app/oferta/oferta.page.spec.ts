import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OfertaPage } from './oferta.page';

describe('OfertaPage', () => {
  let component: OfertaPage;
  let fixture: ComponentFixture<OfertaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OfertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
