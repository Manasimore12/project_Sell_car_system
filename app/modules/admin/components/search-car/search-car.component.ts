import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedNgZorroModule } from '../../../../shared-ng-zorro.module';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-search-car',
  imports: [ReactiveFormsModule,
      CommonModule,
      SharedNgZorroModule,RouterModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA", "HAVAL"];
    listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
    listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
    listOfTransmission = ["Manual", "Automatic"];
    searchCarForm: FormGroup;
    isSpinning:boolean=false;
    cars:any[]=[];

    constructor(private service:AdminService,
        private fb:FormBuilder, ){}
    
      ngOnInit(){
        this.searchCarForm= this.fb.group({
          brand:[null],
          type:[null],
          transmission:[null],
          color:[null],

          })
      };

      searchCar(){
        this.isSpinning=true;
        this.cars=[];
        this.service.searchCar(this.searchCarForm.value).subscribe((res)=>{
          this.isSpinning= false;
          this.cars=res;
        })
      }
}
