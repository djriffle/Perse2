import { Injectable } from '@angular/core';
import { Pdb } from '../data/pdb'
@Injectable({
  providedIn: 'root'
})
export class PdbfocusService {
  structureId = '4ubb';
  constructor() { }
  

  setFocus(pdb){
    this.structureId = pdb
  }

  getFocus(){
    return this.structureId
  }
}
