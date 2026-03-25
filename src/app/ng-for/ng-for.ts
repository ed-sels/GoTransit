import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  imports: [CommonModule],
  templateUrl: './ng-for.html',
  styleUrl: './ng-for.css',
})
export class NgFor {
  employees:any[] = [
    {empName: 'Jake', empNumber: '101', empEmail: 'john@gmail.com', empDept: 'CS'},
    {empName: 'Jane', empNumber: '102', empEmail: 'jane@gmail.com', empDept: 'IT'},
    {empName: 'Janet', empNumber: '103', empEmail: 'janet@gmail.com', empDept: 'HR'}
  ]
}
