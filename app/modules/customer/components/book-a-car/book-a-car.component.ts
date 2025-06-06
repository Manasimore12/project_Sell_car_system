import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { SharedNgZorroModule } from '../../../../shared-ng-zorro.module';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-book-a-car',
  imports: [ReactiveFormsModule,
      CommonModule,
      SharedNgZorroModule,RouterModule],
      providers: [CustomerService],
  templateUrl: './book-a-car.component.html',
  styleUrl: './book-a-car.component.scss'
})
export class BookACarComponent {

  id: number;
  car: any;
  bidForm: FormGroup;
  isSpinning:boolean=false;

  constructor(private service: CustomerService,
        private activatedRoute: ActivatedRoute,
        private fb:FormBuilder,
        private router:Router,
        private message:NzMessageService
      ){ }

      ngOnInit(){
        this.id = this.activatedRoute.snapshot.params["id"];
        this.bidForm= this.fb.group({
              price:[null,[Validators.required]],
              })
        this.getCar();
      };

      getCar(){
      this.service.getCarById(this.id).subscribe((res)=> 
      {
         console.log(res);
         this.car=res;

        })
    }
    bidACar(formData: any){
      this.isSpinning = true;
      const obj={
        price:formData.price,
        userId:StorageService.getUserId(),
        carId:this.id
      };
      this.service.bidACar(obj).subscribe((res)=>{
      this.isSpinning = false;
      this.message.success("Bid Submitted Sucessfully",{nzDuration:5000 });
      this.router.navigateByUrl("/customer/dashboard")
    }, error =>{
        this.message.error("Something went wrong",{nzDuration:5000 });
    })
    }
}
