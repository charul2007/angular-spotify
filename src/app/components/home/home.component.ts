import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as reducers from '../../reducers';
import * as homeActions from './home.actions';

import 'rxjs/Rx';
import { SpotifyService } from '../../services/spotify.services';

@Component({
  selector: 'app-home',
  template: `
  <h1>Looking for Some Music?</h1>
	<p class="lead">Use this application to browse music from spotify.</p>
	<form [formGroup]="searchMusicForm">
    <div class="form-group">
      <input 
      	type="search"
      	formControlName="searchMusic"
      	name="searchMusic"
      	(keyup)="searchMusic($event)"
      	class="form-control"
      	placeholder="Search Music..."
      	autocomplete="off">   
    </div>    
	</form>
	<loading-indicator [show]="loading" [size]="3" [spikes]="12"></loading-indicator>
	<div *ngIf="music" class="row">
    <div *ngFor="let res of music?.artists?.items" class="col-md-6">
      <div class="search-res well">
        <h4><a routerLink="/artist/{{res.id}}">{{res.name}}</a></h4> 
        <div>
          <strong>Genres: </strong>
          <span *ngFor="let genre of res.genres">{{genre}}</span>
        </div>   
      </div>    
    </div>
	</div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	searchMusicForm: FormGroup;
	music;
	private loading = true;

  constructor(private formBuilder: FormBuilder,
  						private store: Store<reducers.State>,
  						private spotifyService: SpotifyService) { }

  ngOnInit() {

  	this.searchMusicForm = this.formBuilder.group({
      searchMusic: ['', Validators.maxLength(140)]
    });

  	this.spotifyService.login().subscribe(() => {
      this.store.select(reducers.getMusic).subscribe(music => {
      	this.loading = false;
  			this.music = music;
  		});
    });

  }

  searchMusic(event) {

    let searchTerm = event.target.value.trim();
    if (searchTerm.length > 2) {
      this.store.dispatch(new homeActions.LoadMusic({
      	search: searchTerm, 
      	offset: 0,
      	limit: 20,
      	type: 'artist',
      	market: 'us'
      }));
    }
    else {
    	this.store.dispatch(new homeActions.ClearLoadMusic());
    }
  }


}
