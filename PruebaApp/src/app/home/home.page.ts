import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private dataService: DataService) {
    this.dataService.getUsers().subscribe(res => {
      console.log(res);
    })
  }

}
