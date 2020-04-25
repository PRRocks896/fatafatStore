import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RetailerService } from 'src/app/shared/retailer.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-storedetail',
  templateUrl: './storedetail.component.html',
  styleUrls: ['./storedetail.component.css']
})
export class StoredetailComponent implements OnInit {

  fileName:string = 'Upload Order Image';
  retailerDetail: any;
  imageURL = Utils.getImages();
  inventoryImage: any = [];
  inventoryDetail: any = '';
  orderDetail: any;
  orderFile: any;

  @ViewChild('orderText',{static: true}) orderText: ElementRef;

  constructor(private titleService: Title, private router:Router, private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService, private retailerService: RetailerService,
    private commonService: CommonService) {
    this.titleService.setTitle('Store Detail' + Utils.getAppName());
  }

  ngOnInit(): void {
    // this.spinner.show();
    this.retailerDetail = JSON.parse(localStorage.getItem('selectedRetailer'));
    // console.log(this.retailerDetail);
    if(this.retailerDetail.StoreImage !== "") {
      this.imageURL = this.imageURL + `Store/${this.retailerDetail.StoreImage}`;
    }
    this.fetchInventoryImage(this.retailerDetail.RetailerID);
    // this.spinner.hide();
  }

  fetchInventoryImage(id) {
    if(Utils.checkTokenValid()) {
      this.spinner.show();
      this.retailerService.getInventory(id).subscribe((res: any) => {
        this.spinner.hide();
        // console.log(res);
        if(res.errorcode == '0') {
          
          this.inventoryImage = [];
          // this.inventoryImage.push({
          //   itemID: '',
          //   image: Utils.getImages() + `Store/${this.retailerDetail.StoreImage}`
          // });
          // console.log(this.inventoryImage);
          this.inventoryDetail = res.InventoryList[0].ItemName;
          res.InventoryList.map(itemImage => {
            // console.log(itemImage);
            if(itemImage.ItemImage !== "") {
              this.inventoryImage.push({
                itemID: itemImage.ItemID,
                image: Utils.getImages() + 'Inventory/' + itemImage.ItemImage
              });
            }
          })
          console.log(this.inventoryImage);
          // this.inventoryImage = this.inventoryImage + res.InventoryList[1].ItemImage;
          // console.log(this.inventoryImage);
        }
      }, err => {
        this.spinner.hide();
        console.error(err)
      });
    } else {
      this.commonService.getToken().subscribe((res: any) => {
        Utils.setToken(res);
        this.fetchInventoryImage(this.retailerDetail.RetailerID);
      })
    }
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
