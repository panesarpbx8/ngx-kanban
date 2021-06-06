import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());
  
  user$: Observable<User> = this.auth.user$.pipe(shareReplay());
  
  @ViewChild('drawer') drawer: MatSidenav;

  pageTitle: string;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        let title = e.url.split('/')[1];
        this.pageTitle = title.charAt(0).toUpperCase() + title.slice(1);
      }
    });
  }

  close(): void {
    this.isHandset$.pipe(
      take(1),
      tap(isHandset => isHandset ? this.drawer.close() : null),
    ).subscribe();
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/');
    this.close();
  }
  
}
