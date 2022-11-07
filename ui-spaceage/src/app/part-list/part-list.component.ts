import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {

  groups = [
    { firstName: 'John', lastName: 'Doe', age: '35', salary: 5000 },
    { firstName: 'Michael', lastName: 'Smith', age: '39', salary: 5000 },
    { firstName: 'Michael', lastName: 'Jordan', age: '45', salary: 7000 },
    { firstName: 'Tanya', lastName: 'Blake', age: '47', salary: 8000 }
];

  constructor() { }

  ngOnInit(): void {
  }

}
