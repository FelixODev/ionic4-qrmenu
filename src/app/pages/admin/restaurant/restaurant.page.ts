import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/gbl/state.service';
import { AlertService, ModalService } from 'src/app/services/utl/ctrl.service';
import { Router } from '@angular/router';
import { AFFSService } from 'src/app/services/api/fire.service';
import { ItemComponent } from 'src/app/components/view/item/item.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  constructor(
    private state: StateService,
    private db: AFFSService,
    private route: Router,
    private modal: ModalService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  restaurant: any = null;
  tables: Array<any> = [];
  items:any = null;

  ionViewDidEnter() {
    this.restaurant = this.state.get('restaurant');
    this.db.cGet(`restaurants/${this.restaurant.id}/tables`)
    .subscribe(t => {
      this.tables = t;
    })
    this.items = this.db.cGet(`restaurants/${this.restaurant.id}/items`)
  }

  view: any = 'menu';

  segmentChanged(ev) {
    this.view = ev.detail.value;
  }

  go(t?) {
    if(!t) {
      this.state.store('table')
    } else {
      this.state.store('table', t)
    }
    
    this.route.navigateByUrl('admin/create-qr')
  }

  newItem() {
    this.modal.show({
      component: ItemComponent,
      items: {
        rid: this.restaurant.id
      }
    })
  }

}
