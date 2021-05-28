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
        const admobBanner = new this.admob.BannerAd({
          adUnitId: 'ca-app-pub-3940256099942544/6300978111',
          position: 'top'
        });
        admobBanner.show();
        this.admobBanner = admobBanner
        this.admobSetup=true
        
        this.admob.on('admob.banner.load').subscribe(async () => {

        });
      });
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
