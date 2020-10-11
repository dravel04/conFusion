import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  pacos: Leader[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.getLeaders();
  }

  getLeaders(): void {
    this.leaderService.getLeaders()
      .then((leaders) => this.pacos = leaders);
  }

}
