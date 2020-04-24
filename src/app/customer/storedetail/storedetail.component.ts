import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-storedetail',
  templateUrl: './storedetail.component.html',
  styleUrls: ['./storedetail.component.css']
})
export class StoredetailComponent implements OnInit {

  fileName:string = 'Upload Order Image';
  retailerDetail: any;
  imageURL = Utils.getImages();
  orderDetail: any;
  orderFile: any;

  @ViewChild('orderText',{static: true}) orderText: ElementRef;

  constructor(private titleService: Title, private router:Router, private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService) {
    this.titleService.setTitle('Store Detail' + Utils.getAppName());
  }

  ngOnInit(): void {
    this.spinner.show();
    this.retailerDetail = JSON.parse(localStorage.getItem('selectedRetailer'));
    console.log(this.retailerDetail);
    this.imageURL = this.imageURL + `Store/${this.retailerDetail.StoreImage}`;
    this.spinner.hide();
  }

  fileProgress(fileInput: any) {
    // let file = fileInput.targe
  }

  onChange(event) {
    
    this.orderFile = event.target.files[0];
    // console.log(this.orderFile);
    // let filePathArray = file.value.split('\\');
    // let fileName = filePathArray[filePathArray.length-1];
    this.fileName = this.orderFile.name;
  }

  orderExists() {
    if(this.orderText.nativeElement.value!=='' || (this.fileName!=='Upload Order Image' && this.fileName!=''))
    return true;
    else
    return false;
  }

  onNextPage() {
    // console.log(this.orderDetail);
    // console.log(this.orderFile);
    this.router.navigateByUrl('/customer/userform', { state: { orderDetail: this.orderDetail, orderImage: this.orderFile }});
    // this.router.navigate(['customer/userform']);
  }
  // Dont remove the below function checks for any keypresses in text feild
  onTextEnter(orderText: HTMLInputElement) {
  }

}
