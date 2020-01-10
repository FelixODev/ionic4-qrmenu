import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/api/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  press: any;
  ctrl;
  
  constructor(
  private auth: AuthService
  ) { 
		this.press = new Audio();
		// this.press.src = '../../assets/audio/button.mp3';
    this.press.load();
		this.press.playbackRate=2.1;
  }

  ngOnInit() {}










  async loginWith(provider) {
    this.auth.login(provider)
  }










}
