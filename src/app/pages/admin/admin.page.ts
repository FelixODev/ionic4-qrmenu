import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/gbl/state.service';
import { AFFSService } from 'src/app/services/api/fire.service';
import { AlertService, ModalService } from 'src/app/services/utl/ctrl.service';
import { Router } from '@angular/router';
import { RestaurantComponent } from 'src/app/components/view/restaurant/restaurant.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  restaurants: Array<any> = [{}];

  constructor(
    public state: StateService,
    public db: AFFSService,
    private route: Router,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.state.userSubject
    .subscribe(u => {
      if(u){
        this.db.cGetWhere({
          c: 'restaurants', 
          p: 'uid',
          q: u.uid
        })
        .subscribe(r => {
          this.restaurants = r;
        })
      }
    })
  }

  go(rest){
    if(!rest) return;
    this.state.store('restaurant', rest)
    this.route.navigateByUrl('/admin/restaurant')
  }

  newRestaurant() {
    this.modal.show({
      component: RestaurantComponent
    })
  }

}
