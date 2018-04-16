import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers';
import * as artistActions from './artist.actions';
import { Artist } from '../../shared/interface/artist';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-artist',
  template: `
	<div *ngIf="artist">
	  <header class="artist-header">
	    <div *ngIf="artist.images?.length > 0">
	        <img class="artist-thumb img-circle" src="{{artist.images[0].url}}">    
	    </div>
	    <h1>{{artist.name}}</h1>
	    <p *ngIf="artist.genres?.length > 0">
	        Genres: <span *ngFor="let genre of artist.genres">{{genre}}</span>
	    </p>
	    <div style="clear: both;">
	    	<a class="btn btn-primary" style="margin-top: 18px;" routerLink="previousPage()">Go Back</a>
	    </div>
	  </header> 
	  <div class="artist-albums">
	    <div class="row">
	      <div *ngFor="let album of artistAlbums.items">
	        <div class="col-md-3">
	          <div class="well album">
	          	<div class="artist-name">{{album.name}}</div>
	            <div *ngIf="album.images?.length > 0">
	              <img class="album-thumb img-thumbnail" src="{{album.images[0]?.url}}">    
	              <a class="btn btn-default btn-block" style="margin-top: 18px;" routerLink="/album/{{album.id}}">Album Details</a>
	            </div>   
	          </div>    
	        </div>
	      </div>    
	    </div>    
	  </div>
	</div>
  `,
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

	private destroy$: Subject<boolean> = new Subject<boolean>();
	private artistId: number;
	private artist: Artist[];
	private artistAlbums: Artist[];

  constructor(private store: Store<reducers.State>,
		          private formBuilder: FormBuilder,
		          private route: ActivatedRoute,
		          private location: Location) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
      this.artistId = params[ 'id' ];
      this.store.dispatch(new artistActions.LoadArtist({id: this.artistId}));
      this.store.dispatch(new artistActions.LoadArtistAlbums({id: this.artistId}));
    });

    this.store.select(reducers.getArtist).subscribe(artist => {
  		this.artist = artist;
  	});

  	this.store.select(reducers.getArtistAlbums).subscribe(albums => {
  		this.artistAlbums = albums;
  	});

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  previousPage() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
