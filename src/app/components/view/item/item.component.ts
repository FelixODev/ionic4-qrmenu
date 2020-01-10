import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { AFFSService, AuthService, AFSService } from 'src/app/services/api/fire.service';
import { AlertService, LoadingService } from 'src/app/services/utl/ctrl.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  items;
  ctrl;

  item: any = {};
  rid: string;
  price: number = 0;

  constructor(
    private auth: AuthService,
    private db: AFFSService,
    private fs: AFSService,
    private alert: AlertService,
    private loading: LoadingService,
  ) {
    if(!isNullOrUndefined(this.items)) {
      this.item = this.items.map((p) => {
        if(!p.rid || !p.price){
          return p;
        }
      })
      this.item.quantity = 1;
      this.action = 'Edit';
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.rid = this.items.rid;
    this.price = (this.items.price / 100) || 0;
  }

	async showLoading(prop, params) {
	  this[prop] = await this.loading.ctrl(params)
	  this[prop].present()
	}

  action: string = 'New';










  addLoading: any;
  addILoading: any;

  aL() {
    this.showLoading('addLoading', {
      message: 'Taking photo...',
      duration: 5000
    })
  }

  aRL() {
    this.showLoading('addILoading', {
      message: 'Adding item...',
      duration: 10000
    })
  }
  
  @ViewChild('filechooser', {static:false}) fileChooserElementRef: ElementRef;

  snap(){
    let isCordovaApp = !!window.cordova;
    if(isCordovaApp){
    } else {
      this.fileChooserElementRef.nativeElement.click()
    }
    this.aL()
  }

  onFileSelected(input?){
    this.processBlob(input)
    .then((result: string) => {
      this.item.photoURL = result;
      if(this.addLoading)
      this.addLoading.dismiss()
    }, (err: any) => {
      // Ignore error, do nothing
    });
  }

  processBlob(input?){
    const fileList: FileList = 
    input.files || input || [{}];
    // if (!fileList && fileList.length !> 0)
    // return;
    return this.fileToBase64(fileList[0])
  }

  fileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }










  async submit() {
    this.aRL()
    if(!this.item.uid) {
      let user = await this.auth.state().toPromise()
      this.item.uid = user.uid
    }
    if(this.item.photoURL != this.items.photoURL) {
      this.item.photoURL = await this.uploadPic()
    }
    if(this.item.name 
      && this.item.desc
      && this.price > 0
    ) {
      this.addItem(this.item)
    } else {
      this.alert.show('Please complete the form to proceed')
    }
  }










  async uploadPic() {
    return this.fs.getPhotoURL(
    `restaurants/${this.rid}/items`, 
    this.item.photoURL)
  }










  async addItem(data?) {
    let r: any;
    this.item.price = this.price * 100;
    try {
      r = await this.db.cPush(`restaurants/${this.rid}/items`, data);
    } catch (e) {
      throw e;
    }
    this.ctrl.dismiss(r)
  }
}
