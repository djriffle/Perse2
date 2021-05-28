import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Pdb } from '../data/pdb'

//favorite takes id string instead of pdb interface

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  _storage
  favorites
  constructor(private storage:Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadData()
  }

  getFavorites(){
    return this.favorites
  }

  favoritesContains(favorite){
    return (this.favorites.some(elm => {return JSON.stringify(elm) === JSON.stringify(favorite)}))
  }

  async loadData(){
    this.favorites = await this._storage.get('favorites')
    if(this.favorites == null){
      await this._storage.set('favorites',[])
      this.favorites = []
    }
  }
  isFavorite(query):boolean{
    return this.favoritesContains(query)
  }

  addFavorite(favorite){

    if(!this.favorites.includes(favorite)){
      this.favorites.push(favorite)
      this._storage.set('favorites',this.favorites)
    }
    console.log(this.favorites)
  }

  removeFavorite(favorite){
    console.log(this.favoritesContains(favorite))
    if(this.favoritesContains(favorite)){
      console.log(favorite.title)
      this.favorites = this.favorites.filter(function(el) { return el.id != favorite.id;});
      }
    this._storage.set('favorites',this.favorites)
  }
}
