import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, finalize, takeLast, take, takeWhile } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userRef: AngularFirestoreDocument<any>;

  constructor(
  public afAuth: AngularFireAuth,
  ) {} 










  state() {
    return this.afAuth.authState
    .pipe(take(1))
  }










  currentUser() {
    return this.afAuth.auth.currentUser
  }










  redirect() {
    return this.afAuth.auth.getRedirectResult()
  }










  async login(provider?) {
    if(!provider) provider = 'GoogleAuthProvider';
    return await this.afAuth.auth
    .signInWithRedirect(
      new auth[provider]()
    )
  }










  async loginPop(provider?) {
    if(!provider) provider = 'GoogleAuthProvider';
    return await this.afAuth.auth
    .signInWithPopup(
      new auth[provider]()
    )
  }










  logout() {
    return this.afAuth.auth.signOut()
  }
  
}










@Injectable({
  providedIn: 'root'
})
export class AFFSService {

  afDoc: AngularFirestoreDocument<any>;
  afCollection: AngularFirestoreCollection<any>;

  constructor(
  public affs: AngularFirestore,
  ) {} 










  doc(ref, user?) {
    // Sets user data to firestore on login
    return this.afDoc = this.affs.doc(`users/${user.uid}`);
  }










  dGet(ref, doc){
    return this.affs.doc(`${ref}/${doc}`)
    .get()
  }










  dUpdate(ref, doc, data){
    return this.affs.doc(`${ref}/${doc}`)
    .update(data)
  }










  dPush(ref, doc, data){
    return this.affs.doc(`${ref}/${doc}`)
    .set(data)
  }










  dDelete(ref, doc){
    return this.affs.doc(`${ref}/${doc}`)
    .delete()
  }










  cGet(q) {
    return this.affs.collection<any>(q)
    .snapshotChanges()
    .pipe(
      take(1),
      map(actions => 
        actions.map(a => ({ 
          ['id']: a.payload.doc.id, 
          ...a.payload.doc.data() 
        }))
      )
    )
  }










  cGetWhere(r: any) {
    return this.affs.collection<any>(r.c, ref => 
      ref.where(r.p, (r.o || r.op || "=="), r.q)
    )
    .snapshotChanges()
    .pipe(
      take(1),
      map(actions => 
        actions.map(a => ({ 
          [r.k || r.key || r.id || 'id']: a.payload.doc.id, 
          ...a.payload.doc.data() 
        }))
      )
    )
  }










  cPush(ref, data){
    return this.affs.collection(ref)
    .add(data)
  }

}










@Injectable({
  providedIn: 'root'
})
export class AFSService {

  constructor(
  public afs: AngularFireStorage
  ) {}

  url: any;
  fileRef: any;
  
	uploadFile(ref:string, base64) {
	  const file = base64;
	  const filePath = `${ref}/${Date.now()}.jpg`;
	  this.fileRef = this.afs.ref(filePath);
	  const task = this.fileRef.putString(file, 'data_url');
  
	  return task.snapshotChanges().pipe(
      takeLast(1)
	  )
  }
  
  getURL(){
    return this.fileRef.getDownloadURL()
    .pipe(takeLast(1))
  }
  
  async getPhotoURL(ref:string, base64){
    let ul = await this.uploadFile(ref, base64).toPromise()
    return this.getURL().toPromise()
  }

}










@Injectable({
  providedIn: 'root'
})
export class AFFService {

  constructor(
  public fns: AngularFireFunctions
  ) {}










  async version() {
    return Promise.resolve('Test')
  }

}