import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  saveProducts(products:any[]){
     return this.http.put('https://ux-products-f66bd-default-rtdb.europe-west1.firebasedatabase.app/products.json',products)
  }
  fetchProducts(){
    return this.http.get('https://ux-products-f66bd-default-rtdb.europe-west1.firebasedatabase.app/products.json')
  }
  deleteProducts(){
    return this.http.delete('https://ux-products-f66bd-default-rtdb.europe-west1.firebasedatabase.app/products.json')
    
  }
}
