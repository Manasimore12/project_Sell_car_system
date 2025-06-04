import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SharedNgZorroModule } from './shared-ng-zorro.module';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    SharedNgZorroModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sellcar_angular';

  isAdminLoggedIn: Boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn: Boolean = StorageService.isCustomerLoggedIn();

  constructor(private router:Router){}
  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn= StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn= StorageService.isCustomerLoggedIn();

      }
    })
  }
  logout(){
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }


}
