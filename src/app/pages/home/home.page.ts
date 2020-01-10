import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/gbl/state.service';
import { Router } from '@angular/router';
import { PopoverService, AlertService } from 'src/app/services/utl/ctrl.service';
import { LoginComponent } from 'src/app/components/view/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  constructor(
    public state: StateService,
    private route: Router,
    private popover: PopoverService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
  }










  go() {
    if(this.state.user){
      this.route.navigateByUrl('/admin')
    } else {
      this.login()
    }
  }










  login() {
    this.popover.show({
      component: LoginComponent
    }).then(r => {
      this.alert.check(r)
    })
  }

}
