import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers';
import * as albumActions from './album.actions';
import { Artist } from '../../shared/interface/artist';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-album',
  template: `
  <div id="album" *ngIf="album">
    <header class="album-header">
      <div class="row">
        <div class="col-md-4">
          <div *ngIf="album.images?.length > 0">
            <img class="album-thumb" src="{{album.images[0]?.url}}">
          </div>
        </div>
        <div class="col-md-8">
          <h4 *ngIf="album.artists?.length > 0"><span *ngFor="let artist of album?.artists">
          {{artist.name}}
          </span></h4>
          <h2>{{album.name}}</h2>
          <h5>Release Date: {{album.release_date}}</h5>
          <a class="btn btn-primary" target="_blank" href="{{album.external_urls?.spotify}}">View In Spotify</a>
        </div>    
      </div>    
  	</header>
	  <div class="album-tracks">
      <h2>Album Tracks</h2>
      <div *ngFor="let track of album.tracks?.items">
        <div class="well">
          <h5>{{track.track_number}} - {{track.name}}</h5>
          <a *ngIf="track.preview_url" href="{{track.preview_url}}" target="_blank">Preview Track</a>
          <span *ngIf="!track.preview_url">Preview Unavailable</span>  
        </div>    
      </div>    
    </div> 
	</div>
  `,
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

	private albumId: number;
	private album;

  constructor(private store: Store<reducers.State>,
		          private formBuilder: FormBuilder,
		          private route: ActivatedRoute) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
      this.albumId = params[ 'id' ];
      this.store.dispatch(new albumActions.LoadAlbum({id: this.albumId}));
    });

    this.store.select(reducers.getAlbum).subscribe(album => {
  		this.album = album;
  	});

  }

}
