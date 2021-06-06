import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<User> = this.auth.user$.pipe(shareReplay());
 
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
