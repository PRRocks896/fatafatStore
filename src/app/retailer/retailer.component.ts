import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { flatten } from '@angular/compiler';
import { RetailerService } from '../shared/retailer.service';
import { Utils } from '../shared/utils';

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
  inventoryDetail: string = '';
  inventoryImage: any = [];
  retailerDetail: any;

  constructor(private retailerService: RetailerService) { }

  ngOnInit(): void {
    this.retailerDetail = JSON.parse(localStorage.getItem('retailer'));
    this.fetchInventory(this.retailerDetail.RetailerID);
    // this.imageContanerDiv.nativeElement
  }

  fetchInventory(id) {
    this.retailerService.getInventory(id).subscribe((res: any) => {
      // console.log(res);
      if(res.errorcode == '0') {
        this.inventoryDetail = res.InventoryList[0].ItemName;
        res.InventoryList.filter(itemImage => {
          if(itemImage.ItemImage !== '') {
            this.inventoryImage.push(Utils.getImages() + 'Inventory/' + itemImage.ItemImage);
          }
        })
        // console.log(this.inventoryImage);
        // this.inventoryImage = this.inventoryImage + res.InventoryList[1].ItemImage;
        // console.log(this.inventoryImage);
      }
    }, err => console.error(err));
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

  submitInventory() {
    // console.log(this.inventoryDetail);
    // console.log(this.SelectedImage);
    const body = {
      RetailerID: this.retailerDetail.RetailerID,
      ItemName: this.inventoryDetail
    }
    this.retailerService.storeInventory(body, this.SelectedImage).subscribe((res: any) => {
      if(res['errorcode'] == '0')  {
        this.inventoryDetail = '';
        this.SelectedImage = null;
        this.url = '';
        alert(res['message']);
        this.fetchInventory(this.retailerDetail.RetailerID);
        // this.router.navigate(['/']);
      } else {
        
        alert(res['message']);
      }
    }, err => {
      alert(err.error.message);
      console.error(err)
    });
  }
}
