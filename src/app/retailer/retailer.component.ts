import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { flatten } from '@angular/compiler';

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

  constructor() { }

  ngOnInit(): void {
    // this.imageContanerDiv.nativeElement
  }

  onSelectFile(event) {
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

}
