import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedNgZorroModule } from '../../../../shared-ng-zorro.module';

@Component({
  selector: 'app-view-my-bids',
  imports: [ReactiveFormsModule,
        CommonModule,
        SharedNgZorroModule,RouterModule],
  templateUrl: './view-my-bids.component.html',
  styleUrl: './view-my-bids.component.scss'
})
export class ViewMyBidsComponent {

  bids :any =[];
  isSpinning:boolean= false;
      constructor(private service: CustomerService,
        private message:NzMessageService
      ){ }
      ngOnInit(){
        this.getMyBids();
      }
      getMyBids(){
        this.isSpinning=true;
        this.service.getMyBids().subscribe((res)=> 
        {
          this.isSpinning =false;
           console.log(res);
           this.bids =res;
          })
      }

      changeBookingStatus(id: number, status:string){
        this.isSpinning = true;
        this.service.updateBidStatus(id,status).subscribe((res)=>{
          this.isSpinning = false;
          this.message.success("Bid Status Changed!",{nzDuration:5000 });
          this.getMyBids();
    }, error =>{
        this.message.error("Something went wrong",{nzDuration:5000 });
    })
      }
}
