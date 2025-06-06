import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedNgZorroModule } from '../../../../shared-ng-zorro.module';

@Component({
  selector: 'app-get-bookings',
  imports: [ReactiveFormsModule,
        CommonModule,
        SharedNgZorroModule,RouterModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {
  
    bids :any =[];
    isSpinning:boolean= false;
        constructor(private service: AdminService,){ }
        ngOnInit(){
          this.getMyBids();
        }
        getMyBids(){
          this.isSpinning=true;
          this.service.getBids().subscribe((res)=> 
          {
            this.isSpinning =false;
             console.log(res);
             this.bids =res;
            })
        }
}
