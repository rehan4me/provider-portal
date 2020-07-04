import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/model/providers';
import { HttpClient } from '@angular/common/http';
import { PROVIDERS_LIST } from 'src/app/mock/providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[];

  curPage = 1;
  pageSize = 5;
  docLength: number;
  searchText;
  itemToSearch = ['name', 'licence'];
  data = JSON.parse(JSON.stringify(PROVIDERS_LIST));

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.docLength = PROVIDERS_LIST.length;
    this.providers = this.data.slice(this.curPage - 1, this.curPage * this.pageSize);
  }

  openDcoument(data: Provider) {
    this.router.navigate(['provider', data.serialNumber]);
  }

  nextPage() {
    const curTotal = this.curPage * this.pageSize;
    if (curTotal < this.docLength) {
      this.providers = this.data.slice(curTotal, curTotal + this.pageSize);
      this.curPage ++;
    }
  }

  prePage() {
    const curTotal = (this.curPage - 1) * this.pageSize;
    if (curTotal >= this.pageSize) {
      this.providers = this.data.slice(curTotal - this.pageSize, curTotal);
      this.curPage --;
    }
  }

  onSearchTextChange(event) {
    if (this.searchText) {
      this.data = PROVIDERS_LIST.filter( (provider: Provider) => {
        for (const field of this.itemToSearch) {
          if (provider[field].toUpperCase().includes(this.searchText.toUpperCase())) {
            return true;
          }
        }
      });
    } else {
      this.data = JSON.parse(JSON.stringify(PROVIDERS_LIST));
      this.resetPage();
    }
    this.docLength = this.data.length;
    this.providers = this.data.slice(this.curPage - 1, this.curPage * this.pageSize);
  }

  resetPage() {
    this.curPage = 1;
    this.pageSize = 5;
  }

  onPageChange() {
    this.providers = this.data.slice(this.curPage - 1, this.curPage * this.pageSize);
  }

}
