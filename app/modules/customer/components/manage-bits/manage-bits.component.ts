import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedNgZorroModule } from '../../../../shared-ng-zorro.module';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-bits',
  imports: [ReactiveFormsModule,
        CommonModule,
        SharedNgZorroModule,RouterModule],
  templateUrl: './manage-bits.component.html',
  styleUrl: './manage-bits.component.scss'
})
export class ManageBitsComponent {
  carId:number;
     bids :any =[];
      isSpinning:boolean= false;
          constructor(private service: CustomerService,
            private message:NzMessageService,
            private activatedRoute: ActivatedRoute,
          ){ }
          ngOnInit(){
          this.carId = this.activatedRoute.snapshot.params["id"];
            this.getMyBids();
          }
          getMyBids(){
            this.isSpinning=true;
            this.service.getBidsByCarId(this.carId).subscribe((res)=> 
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
