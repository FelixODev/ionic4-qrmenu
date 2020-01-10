import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService, ToastService, LoadingService } from 'src/app/services/utl/ctrl.service';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/modules/cart/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 
  id: string = '75JNwv6KJYaUfLM8KKL8';
  r: Observable<any>;
  t: any = 1;

  table: any = '';
  restaurant: any = null;
 
  constructor(
    public cart: CartService,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private alert: AlertService,
    private toast: ToastService,
    private loading: LoadingService,
  ) {
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id || this.id;
      let url = `restaurants/${this.id}`;
      this.t = params.t || this.t;
      let ext = `/tables/${this.t}`;

      this.r = this.db.doc(url)
      .valueChanges();

      this.r.subscribe((r) => {
        this.restaurant = r;
      })
      
      this.db.doc(url + ext)
      .valueChanges().subscribe(ta => {
        this.table = ta;
      });
    });
  }

  ionViewWillEnter() {
  }

  add(item) {
    // must declare a new variable
    // set adjucent props to param props
    // to prevent mutating the param
    let d = {
      name: item.name,
      desc: item.desc,
      photoURL: item.photoURL,
      price: item.price, 
      quantity: item.quantity
    };
    this.cart.addItem(d)
  }

  async send() {
    await this.loading.show({
      message: "Sending order...",
      duration: 1500,
    })
    this.cart.discardItems();
    this.toast.show("Order sent")
  }

}
