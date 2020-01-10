import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PopoverController } from '@ionic/angular';
import { CartComponent } from '../popover/cart.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
})
export class CartButtonComponent implements OnInit {

  constructor(
    public cart: CartService,
    public popCtrl: PopoverController
  ) { }

  ngOnInit() {}

  showCart(ev?) {
    // if(!isNullOrUndefined(this.cart.order))
    this.show({
     component: CartComponent
    }, ev)
  }








  
  
  async ctrl(view: any, ev?: any) {
    return await this.popCtrl.create({
      component: view.component,
      componentProps: {
        items: view.items || '',
        ctrl: this.popCtrl
      },
      event: ev,
      translucent: view.translucent || false,
      cssClass: view.cssClass,
      showBackdrop: view.showBackdrop,
      backdropDismiss: view.backdropDismiss,
      animated: view.animated,
      enterAnimation: view.enterAnimation,
      leaveAnimation: view.leaveAnimation
    });
  } 
  
  async show(view: any, ev?: any) {
    const popover = await this.ctrl(view, ev);
    await popover.present();
    // return popover[view.then || 'onDidDismiss']()
  }

}
