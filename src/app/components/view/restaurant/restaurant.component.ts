import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { AFFSService, AuthService, AFSService } from 'src/app/services/api/fire.service';
import { AlertService, LoadingService } from 'src/app/services/utl/ctrl.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {

  items;
  ctrl;

  place: any = {name:'',address:{}};

  constructor(
    private auth: AuthService,
    private db: AFFSService,
    private fs: AFSService,
    private alert: AlertService,
    private loading: LoadingService,
  ) {
    if(!isNullOrUndefined(this.items)) {
      this.place = this.items.map((p) => {return p})
      this.action = 'Edit';
    }
  }

  ngOnInit() {}

	async showLoading(prop, params) {
	  this[prop] = await this.loading.ctrl(params)
	  this[prop].present()
	}

  action: string = 'New';










  addLoading: any;
  addRLoading: any;

  aL() {
    this.showLoading('addLoading', {
      message: 'Taking photo...',
      duration: 5000
    })
  }

  aRL() {
    this.showLoading('addRLoading', {
      message: 'Adding restaurant...',
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
      this.place.photoURL = result;
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
    if(!this.place.uid) {
      let user = await this.auth.state().toPromise()
      this.place.uid = user.uid
    }
    if(this.place.photoURL != this.items.photoURL) {
      this.place.photoURL = await this.uploadPic()
    }
    if(this.place.name 
      && this.place.uid 
      && this.place.address.line1
      && this.place.address.city
      && this.place.address.state
      && this.place.address.country
    ) {
      this.addRestaurant(this.place)
    } else {
      this.alert.show('Please complete the form to proceed')
    }
  }










  async uploadPic() {
    return this.fs.getPhotoURL(
    `restaurants/${this.place.uid}`, 
    this.place.photoURL)
  }










  async addRestaurant(data) {
    let r: any;
    try {
      r = await this.db.cPush('restaurants', data);
    } catch (e) {
      throw e;
    }
    // if(this.addRLoading)
    // this.addRLoading.dismiss()
    this.ctrl.dismiss(r)
  }

}
