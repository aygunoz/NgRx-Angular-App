import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchDate() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogOut() {
    console.log('auth oldu')
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }
}
