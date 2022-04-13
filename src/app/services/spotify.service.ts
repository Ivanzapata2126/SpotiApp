import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token:string = 'BQCt6CcFJkwcGpvUAcSg68q-u6FIcaapGWV5a2ZKMDsUwbD3u-DVeHXfmBv3kc7nDweolwfh3bj_pqaAWwA';
  constructor(private http:HttpClient) { }

  getQuery(query:string){
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(url,{headers});
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=12')
    .pipe(map((data:any)=>data.albums.items));
  }
  getArtistas(termino:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe(map((data:any)=>data.artists.items));
  }
  getArtista(id:string){
    return this.getQuery(`artists/${id}`)
    //.pipe(map((data:any)=>data.artists.items));
  }
  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?market=ES`)
    .pipe(map((data:any)=>data['tracks']));
  }
}
