import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/gbl/state.service';
import { AFFSService } from 'src/app/services/api/fire.service';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

const base = environment.base;

@Component({
  selector: 'app-create-qr',
  templateUrl: './create-qr.page.html',
  styleUrls: ['./create-qr.page.scss'],
})
export class CreateQRPage implements OnInit {

  title = 'app';
  elementType: 'url' | 'carvas' | 'img' = 'img';
  value = base;
  rid: string = '';
  table: any = {
    name: null,
    no: null,
    qr: base
  };

  constructor(
    private state: StateService,
    private db: AFFSService,
    private route: NavController
  ) {
  }

  ngOnInit() {
    this.rid = this.state.get('restaurant').id || '75JNwv6KJYaUfLM8KKL8';
  }

  ionViewDidEnter() {
    let t = this.state.get('table');
    this.table = (t)?t:this.table;
    this.URL()
  }

  URL(ev?) {
    this.table.qr = base + `?id=${this.rid}&t=${this.table.id}`;
    this.value = this.table.qr;
  }

  async save() {
    if(!this.rid) return;
    let url = `restaurants/${this.rid}/tables`;
    if(this.state.get('table')){
      await this.db.dUpdate(url , this.table.id , this.table)
    } else {
      await this.db.cPush(url, this.table)
    }
    this.route.navigateBack('admin/restaurant');
  }

  async delete() {
    if(!this.table.id) return;
    let url = `restaurants/${this.rid}/tables`;
    await this.db.dDelete(url, this.table.id);
    this.route.navigateBack('admin/restaurant');
  }

}
