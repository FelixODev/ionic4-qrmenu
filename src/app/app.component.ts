import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/api/fire.service';
import { AlertService, LoadingService } from './services/utl/ctrl.service';
import { StateService } from './services/gbl/state.service';
import { CartService } from './modules/cart/cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private state: StateService,
    public cart: CartService,
    private auth: AuthService,
    private loading: LoadingService,
    private alert: AlertService
  ) {
    this.cart.checkItems();
    this.initializeApp();
    this.init();
  }

  initializeApp() {
    this.platform.ready()
    .then(() => {
      this.initNative()
    });
  }










  l: any;

  async init() {
    this.l = await this.loading.ctrl('Checking auth...');
    await this.l.present();
    this.redirect()
    .then(() => {
      this.l.dismiss();
    })
  }

  async redirect() {
    this.auth.redirect()
    .then(async r => {
      if(r.user){
        this.checkUser(r.user)
      } else {
        await this.userState()
      }
    })
  }

  async checkUser(u){
    this.state.storeSet('user', u);
  }

  userState() {
    this.auth.state()
    .pipe(take(1))
    .subscribe(u => {
      if(u.uid){
        this.checkUser(u)
      }
    })
  }

  initNative() {
    if(!this.platform.is('cordova'))
    return;
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

}
