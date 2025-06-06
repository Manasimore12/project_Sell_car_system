import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedNgZorroModule } from '../../../../shared-ng-zorro.module';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  standalone: true, 
  imports: [ReactiveFormsModule,
    CommonModule,
    SharedNgZorroModule,RouterModule],
    providers: [CustomerService],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {
  id: number;
  existingImage: string | null = null;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA", "HAVAL"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  updateCarForm: FormGroup;
  isSpinning:boolean=false;
  selectedFile:File | null;
  imagePreview:String | ArrayBuffer | null;
  imgChanged:boolean=false;

    constructor(private service: CustomerService,
      private activatedRoute: ActivatedRoute,
      private fb:FormBuilder,
      private router:Router,
          private message:NzMessageService
    ){ }

    ngOnInit(){
    this.id = +this.activatedRoute.snapshot.params["id"];
    this.updateCarForm= this.fb.group({
      brand:[null,[Validators.required]],
      name:[null,[Validators.required]],
      type:[null,[Validators.required]],
      transmission:[null,[Validators.required]],
      color:[null,[Validators.required]],
      year:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]],
      })
      this.getCar();
  };
    getCar(){
      this.service.getCarById(this.id).subscribe((res)=> 
      {
         console.log(res);
         this.existingImage = 'data:image/jpeg;base64,' +res.returnedImg;
         this.updateCarForm.patchValue(res);

        })
    }
    updateCar(){
      this.isSpinning= true;
    console.log(this.updateCarForm.value);
    console.log(this.selectedFile);
    const formData: FormData = new FormData();
    formData.append("img",this.selectedFile);
    formData.append("brand",this.updateCarForm.get('brand').value);
    formData.append("name",this.updateCarForm.get('name').value);
    formData.append("type",this.updateCarForm.get('type').value);
    formData.append("color",this.updateCarForm.get('color').value);
    const selectedYear = this.updateCarForm.get('year').value;
    const yearAsISO = selectedYear ? new Date(selectedYear).toISOString() : null;
    formData.append("year", yearAsISO);
    formData.append("transmission",this.updateCarForm.get('transmission').value);
    formData.append("description",this.updateCarForm.get('description').value);
    formData.append("price",this.updateCarForm.get('price').value);    
    formData.append("userId",StorageService.getUserId());
    this.service.updateCar(this.id,formData).subscribe((res)=>{
      this.isSpinning = false;
      this.message.success("Car updated Sucessfully",{nzDuration:5000 });
      this.router.navigateByUrl("/customer/dashboard")
    }, error =>{
        this.message.error("Something went wrong",{nzDuration:5000 });
    })
      

    }
    onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage=null;
  }
  previewImage(){
    const reader = new FileReader();
    reader.onload =() =>{
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
