import { Component } from '@angular/core';
import {FavoriteService} from '../services/favorite.service'
import {PdbfocusService} from '../services/pdbfocus.service'
import { Router } from '@angular/router';
import { AdMob } from '@admob-plus/ionic/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  
  favorites
  empty:boolean = true
  //for admob
  admobBanner
  admobSetup:boolean = false

  constructor(
    private favoriteService:FavoriteService,
    private pdbFocusService:PdbfocusService,
    private router:Router,
    private platform:Platform,
    private admob: AdMob) 
    {
      this.platform.ready().then(async () => {
        await this.admob.start();
        this.admob.requestTrackingAuthorization()
        if(this.platform.is("ios")){
          //ios admob
          console.log("Running ios")
          this.admobBanner = new this.admob.BannerAd({
            adUnitId: 'ca-app-pub-7436607995177518/9893580317',
            position: 'top'
          });
        }
        else{
          //andriod admob
          console.log("Running andrioid")
          this.admobBanner = new this.admob.BannerAd({
            adUnitId: 'ca-app-pub-7436607995177518/3835470248',
            position: 'top'
          });
        }
        this.admobBanner.show();
        this.admobSetup=true
        
        this.admob.on('admob.banner.load').subscribe(async () => {

        });
      });
    }

  ngOnInit(){

  }

  ionViewWillEnter(){
    if(this.admobSetup){
      this.admobBanner.show()
    }
    this.favorites = this.favoriteService.getFavorites()
    this.empty = this.favorites.length == 0
  }
  removeFavorite(favorite){
    console.log(favorite)
    this.favoriteService.removeFavorite(favorite)
    this.favorites = this.favoriteService.getFavorites()
  }
  load(favorite){
    this.pdbFocusService.setFocus(favorite.id)
    this.router.navigate(['tabs/tab1'])
  }

  ionViewWillLeave(){
    this.admobBanner.hide()
    console.log("leaving")
  }

}
