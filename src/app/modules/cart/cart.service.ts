import { Injectable, NgZone } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs';

const [order, orders] = ['order', 'orders'];

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private	ngZone: NgZone,
  ) { }









	
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
		this.ngZone.run(()=> {
			let p = this.get(prop)
			
			if(p){
				this.set(prop, p);
				return true;
			} else {
				if(func)
				this[func]()
				return false;
			}
		})
	}

	is(prop, func?) {
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
  
  








	order: any = null;
	orderSubject = new BehaviorSubject<any>(this.order);
	discardLoading: any;
	quantitySubject = new BehaviorSubject<number>(0);
	priceSubject = new BehaviorSubject<number>(0);
	
	checkItems() {
		this.ngZone.run(() => {
			if(isNullOrUndefined(this.order)) {
				this.init(order)
				this.calculate();
			}
		})
	}

	decrementItem(pro): boolean {
		this.checkItems();
		if(isNullOrUndefined(this.order))
		return;
		let decrement: boolean = false;
		let pos: number = -1;
		for (let i = 0; i < this.order.items.length; i++) {
			if(pro.name == this.order.items[i].name) {
				pos = i;
				break;
			}
		}
		if(pos != -1) {
			if(this.order.items[pos].quantity > 1) {
				this.order.items[pos].quantity = this.order.items[pos].quantity - 1;
				decrement = true;
			} else {
				if(this.order.items.length == 1){
					this.order = null;
					decrement = true;
				} else {
					this.order.items.splice(pos, 1);
				}
			}
			this.storeSet(order, this.order);
		}
		this.calculate();
		return decrement;
	}
	
	incrementItem(pro): boolean {
		this.checkItems();
		let increment: boolean = false;
		let pos: number = -1;
		for (let i = 0; i < this.order.items.length; i++) {
			if(pro.name == this.order.items[i].name) {
				pos = i;
				break;
			}
		}
		if(pos != -1) {
			this.order.items[pos].quantity = this.order.items[pos].quantity + 1;
			increment = true;
			this.storeSet(order, this.order);
		}
		this.calculate();
		return increment;
	}
	
	removeItem(pro): boolean {
		this.checkItems();
		let removed: boolean = false;
		let pos: number = -1;
		for (let i = 0; i < this.order.items.length; i++) {
			if(pro.name == this.order.items[i].name) {
				pos = i;
				break;
			}
		}
		if(pos != -1) {
			this.order.items.splice(pos, 1);
			this.storeSet(order, this.order);
			removed = true;
		}
		this.calculate();
		return removed;
	}
	
	addItem(item): boolean {

		if(isNullOrUndefined(this.order)){
			this.order = {
				items: []
			}
			this.orderSubject.next(this.order);
		}
		
		let added: boolean = false;
		let pos: number = -1;
		for (let i = 0; i < this.order.items.length; i++) {
			if(item.name == this.order.items[i].name) {
				pos = i;
				break;
			}
		}
		if(pos != -1) {
			this.order.items[pos].quantity += item.quantity;
			added = true;
		} else {
			this.order.items.push(item);
			added = true;
		}
		this.storeSet(order, this.order);
		this.calculate();
		return added;
	}
	
	getItems() {
		this.checkItems();
		return this.order;
	}
	
	getItemsCount() {
		let o: any = this.get(order);
		if(o != null) {
      return o.items.length;
		} else {
			return 0;
		}
	}
  
	discardItems() {
		this.storeSet(order)
		this.quantitySubject.next(0);
		this.priceSubject.next(0);
  	}

  	calculate() {
		let [count, total, items] = [0, 0, (this.order)?(this.order.items || []):[]];
		for(let i of items){
			count += (i.quantity);
			total += (i.quantity * i.price);
		}
		this.quantitySubject.next(count);
		this.priceSubject.next(total);
	}
  
}
