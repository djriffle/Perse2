import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdbminerService {
  activeRepsonse;

  constructor(private http:HttpClient) { }

  async lookFor(text){
    try{
      return await this.http.post('https://search.rcsb.org/rcsbsearch/v1/query', {
      "return_type": 'entry',
      "query": {
        "type": "terminal",
        "service": "text",
        "parameters": {
          "value": text
        }
      }
      }).toPromise()
    }
    catch{
      console.log("here")
    }
  }
}



