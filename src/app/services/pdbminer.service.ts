import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdbminerService {
  activeRepsonse;

  constructor(private http: HttpClient) { }

  async lookFor(text) {
    try {
      console.log('text = ' + text);
      return await this.http.get('https://search.rcsb.org/rcsbsearch/v2/query', {
        params: {
          json: JSON.stringify(
            {
              return_type: 'entry',
              query: {
                type: 'terminal',
                service: 'full_text',
                parameters: {
                  value: text
                }
              }
            })
        }
      }).toPromise();
    }
    catch {
      console.log('here');
    }
  }
}



