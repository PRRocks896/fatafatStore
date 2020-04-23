import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/utils';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-storedetail',
  templateUrl: './storedetail.component.html',
  styleUrls: ['./storedetail.component.css']
})
export class StoredetailComponent implements OnInit {

  fileName:string = 'Upload Order Image';
  retailerDetail: any;
  imageURL = Utils.getImages();
  @ViewChild('orderText',{static: true}) orderText: ElementRef;

  constructor(private titleService: Title, private router:Router, private activatedRoute: ActivatedRoute ) {
    this.titleService.setTitle('Store Detail' + Utils.getAppName());
  }

  ngOnInit(): void {
    this.retailerDetail = JSON.parse(localStorage.getItem('selectedRetailer'));
    console.log(this.retailerDetail);
    this.imageURL = this.imageURL + `Store/${this.retailerDetail.StoreImage}`;
  }

  fileProgress(fileInput: any) {
    // let file = fileInput.targe
  }

  onChange(file: HTMLInputElement) {
    let filePathArray = file.value.split('\\');
    let fileName = filePathArray[filePathArray.length-1];
    this.fileName = fileName
  }

  orderExists() {
    if(this.orderText.nativeElement.value!=='' || (this.fileName!=='Upload Order Image' && this.fileName!=''))
    return true;
    else
    return false;
  }

  onNextPage() {
    this.router.navigate(['customer/userform']);
  }
  // Dont remove the below function checks for any keypresses in text feild
  onTextEnter(orderText: HTMLInputElement) {
  }

}
