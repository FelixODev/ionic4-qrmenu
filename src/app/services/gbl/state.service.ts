import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }









	
	get(prop: string){
		let i = window.localStorage.getItem(prop);
		if(isNullOrUndefined(i)){
			return null;
		} else {
			let r = JSON.parse(i)
			return r;
		}
	}

	store(prop: string, update?){
		if(isNullOrUndefined(update)){
			window.localStorage.removeItem(prop);
		} else {
			window.localStorage.setItem(prop, JSON.stringify(update));
		}
	}

	set(prop: string, update?){
		update = (update) ? update : null;
		this[prop] = update;
		this[prop + 'Subject'].next(update);
	}

	init(prop, func?) {
		let p = this.get(prop)
		
		if(p){
			this.set(prop, p);
			return true;
		} else {
			if(func)
			this[func]()
			return false;
		}
	}
  
	storeSet(prop: string, update?){
		this.set(prop, update)
		this.store(prop, update)
	}
  









  userSubject = new BehaviorSubject(null);
  user: any = null;

}
