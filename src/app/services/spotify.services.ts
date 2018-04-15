import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class SpotifyService {

	private url = 'https://any-api.com:';
  private port = '3010';
  private baseUrl = this.url + this.port;
  private targetUrl = 'https://api.spotify.com/v1';
  private client_id = "fe43c742a3cf473d8c2293b264e7d708";
  private client_secret = "c7a416ad28e2453f976d6c04e2b8521c";
  private accessToken: any;
  private tokenType: string;

  constructor(private http: Http) { }

  login() {
    // let authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    let authorizationTokenUrl = `/api/token`;
    let header = new Headers();
    header.append('Authorization', 'Basic ' + btoa(this.client_id + ':' + this.client_secret));
    header.append('Content-Type', 'application/x-www-form-urlencoded;');

    let options = new RequestOptions({ headers: header });
    let body = 'grant_type=client_credentials';

    return this.http.post(authorizationTokenUrl, body, options)
      .map(data => data.json())
      .do(token => {
        this.accessToken = token.access_token;
        this.tokenType = token.token_type;
      }, error => console.log(error));
  }

  getOptions() {
    let header = new Headers();
    header.append('Authorization', this.tokenType + ' ' + this.accessToken);
    let options = new RequestOptions({ headers: header });
    return options;
  }

  searchMusic(payload): Observable<any> {
    const options = this.getOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('offset', payload.offset);
    params.set('limit', payload.limit);
    params.set('type', payload.type);
    params.set('market', payload.market);
    params.set('query', payload.search);

    return this.http.get(this.baseUrl + '/' + this.targetUrl + `/search?query=${payload.search}&market=${payload.market}&type=${payload.type}`, options)
    .map((response: Response) => 
      response.json()
    )
  }

  getArtist(id: string) {
    const options = this.getOptions();
    return this.http.get(this.baseUrl + '/' + this.targetUrl + '/artists/' + `${id}`, options)
    .map((response: Response) => 
      response.json()
    )
  }

  getArtistAlbums(artistId:string){
    const options = this.getOptions();
    return this.http.get(this.baseUrl + '/' + this.targetUrl + '/artists/' + `${artistId}` + '/albums', options)
    .map((response: Response) => 
      response.json()
    )
  }

   getSingleAlbum(id:string){
    const options = this.getOptions();
    return this.http.get(this.baseUrl + '/' + this.targetUrl + '/albums/' + `${id}`, options)
    .map((response: Response) => 
      response.json()
    )
  }

}
