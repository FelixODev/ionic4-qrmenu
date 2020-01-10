import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertCtrl: AlertController,
  ) {
  }

  async ctrl(m?) {
    let message;
    if(!m.message && !m.inputs){
      message = m;
    } else {
      message = m.message || '';
    }
    if(typeof message === 'string' || message instanceof String){
      message = message.replace(/<br>/g,'');
    }
    return await this.alertCtrl.create({
      cssClass: m.cssClass || 'alertCtrl',
      header: m.header || 'Notification',
      subHeader: m.subHeader || null,
      message: message,
      ...(m.inputs)?{inputs: m.inputs}: null,
      buttons: m.buttons || ['Ok']
    });
  }

  async show(m?) {
    const alert = await this.ctrl(m);
    await alert.present();
    return alert[m.then || 'onDidDismiss']()
  }

  check(data) {
    let obj = data;
    let msg = "";
    if(obj instanceof String || typeof obj === 'string'){
      msg = String(obj);
    }
    else {
      for(let prop in obj)
      {
        msg = msg + `${prop}: ${obj[prop]},\n` + '\n';
      }
    }
    this.show(msg);
  }

  log(data){
    console.log(data);
    return this.check(data);
  }

  comingSoon() {
    this.show("Still under construction. Coming soon!");
  }
    
}










import { LoadingController } from '@ionic/angular';
  
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingCtrl: LoadingController,
  ) { }

  async ctrl(items?: any) {
    items = (items)?items:{};
    return await this.loadingCtrl.create({
      message: items.message || items || 'Loading...',
      spinner: items.spinner,
      duration: items.duration,
    });
  }

  async show(items?: any) {
    const loading = await this.ctrl(items);
    await loading.present();
    return loading[items.then || 'onDidDismiss']()
  }
  
}










import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastCtrl: ToastController,
  ) { }
    
  async ctrl(items?: any) {
    items = (items)?items:{};
    return await this.toastCtrl.create({
      message: items.message || items || 'Complete',
      duration: items.duration || 1000,
      showCloseButton: items.showCloseButton || true,
      position: items.position || 'bottom',
      closeButtonText: items.closeButtonText,
      translucent: items.translucent || true
    });
  }
  
  async show(items?: any) {
    const toast = await this.ctrl(items);
    await toast.present();
    return toast[items.then || 'onDidDismiss']()
  }

}










import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public modalCtrl: ModalController
  ) { 
  }

  async ctrl(view: any) {
    return await this.modalCtrl.create({
      component: view.component, 
      componentProps: {
        items: view.items || '',
        ctrl: this.modalCtrl
      },
      cssClass: view.cssClass || '',
      showBackdrop: true,
      backdropDismiss: view.backdropDismiss
    });
  }

  async show(view: any) {
    const modal = await this.ctrl(view);
    await modal.present();
    return modal[view.then || 'onDidDismiss']()
  }
    
}










import { PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  
  constructor(
    public popCtrl: PopoverController
  ) {
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
    return popover[view.then || 'onDidDismiss']()
  }
    
}