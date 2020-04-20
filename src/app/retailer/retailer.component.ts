import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { flatten } from '@angular/compiler';
import { RetailerService } from '../shared/retailer.service';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {

  @ViewChild('imageContanerDiv', { static: true }) imageContanerDiv: ElementRef;
  url:any = '';
  edited = false;
  deleteImage:boolean = false;
  SelectedImage;

  constructor(private retailerService: RetailerService) { }

  ngOnInit(): void {
    // this.imageContanerDiv.nativeElement
  }

  onSelectFile(event) {
    this.SelectedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.edited = true;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  onDeleteImage(){
    this.deleteImage = true;
  }

  uploadIamge() {
    this.retailerService.storeImage(this.SelectedImage).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error(err);
    })
  }
}
