import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/gbl/state.service';
import { AlertService } from 'src/app/services/utl/ctrl.service';
import { Router } from '@angular/router';
import { AFFSService } from 'src/app/services/api/fire.service';

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
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  restaurant: any = null;
  tables: Array<any> = [];

  ionViewDidEnter() {
    this.restaurant = this.state.get('restaurant');
    this.db.cGet(`restaurants/${this.restaurant.id}/tables`)
    .subscribe(t => {
      this.tables = t;
    })
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

}
