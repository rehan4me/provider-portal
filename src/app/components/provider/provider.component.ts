import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/model/providers';
import { ActivatedRoute, Router } from '@angular/router';
import { PROVIDERS_LIST } from 'src/app/mock/providers';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  provider: Provider;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.provider = PROVIDERS_LIST.find((data: Provider) => data.serialNumber === Number(param.id));
      }
    });
  }

  closeDcoument() {
    this.router.navigate(['providers']);
  }

  onSubmit() {
    const doc = PROVIDERS_LIST.filter((data: Provider) => data.serialNumber !== this.provider.serialNumber );
    doc.push(this.provider);
    this.closeDcoument();
  }

}
