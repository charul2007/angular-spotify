import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-indicator',
  template: `
      <div *ngIf="show" class="center-content">
        <div class="css-loading"
        [style.width]="size*12+'px'"
        [style.height]="size*12+'px'">
          <div *ngFor="let n of arr; let i = index" class="blockG"
          [style.top]="size*6+'px'"
          [style.transform]="'rotate('+i*360.0/spikes+'deg)'">
            <div class="inner-block"
            [style.height]="size+'px'"
            [style.border-radius]="(size-1)+'px'"
            [style.animation-duration]="duration + 's'"
            [style.animation-delay]="delays[i] + 's'"></div>
          </div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
  `,
  styles: [`
    .center-content {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }
    .css-loading {
      position:relative;
      margin:auto;
    }

    .blockG{
      position: absolute;
      width:100%;
    }
    .inner-block {
      background-color:rgb(243,243,243);
      width: 25%;
      animation-name:fadeG;
      animation-iteration-count:infinite;
      animation-direction:normal;
    }

    @keyframes fadeG{
      0%{
        background-color:rgb(120,120,120);
      }

      100%{
        background-color:rgb(243,243,243);
      }
    }

  `]
})
export class LoadingIndicator {
  @Input() show: boolean = false;
  @Input() size: number = 3;
  @Input() spikes: number = 12;
  arr = [];
  duration = 0.8;
  delays = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 0];

  constructor() {
  }

  ngOnInit() {
    this.spikes = this.spikes <= 12 ? this.spikes : 12;
    this.arr = Array(this.spikes).fill(1);
    this.duration = this.spikes === 12 ? 1.2 : this.delays[this.spikes-1];
  }
}
