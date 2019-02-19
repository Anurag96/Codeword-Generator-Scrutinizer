import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CodewordsetService } from 'src/app/services/codewordset.service';

export interface PeriodicElement {
  codeWords: string;
 }

//  const ELEMENT_DATA: PeriodicElement[] = [{
//   codeWords: "Albania"
// }, {
//   codeWords: "Morocco"
// }, {
//   codeWords: "United States"
// }, {
//   codeWords: "Indonesia"
// }, {
//   codeWords: "Peru"
// }, {
//   codeWords: "Cape Verde"
// }, {
//   codeWords: "Canada"
// }, {
//   codeWords: "Venezuela"
// }, {
//   codeWords: "Kosovo"
// }, {
//   codeWords: "Iran"
// }, {
//   codeWords: "Ukraine"
// }, {
//   codeWords: "Sweden"
// }, {
//   codeWords: "Indonesia"
// }, {
//   codeWords: "Finland"
// }, {
//   codeWords: "Nigeria"
// }]


@Component({
  selector: 'app-codeword',
  templateUrl: './codeword.component.html',
  styleUrls: ['./codeword.component.css']
})
export class CodewordComponent implements OnInit {
  displayedColumns: string[] = ['name', 'btn1', 'btn2'];
  dataSource = new MatTableDataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private codewordsetService: CodewordsetService) { 
    let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.codewordsetService.getCodewords([{ CodeWordSetName: id }])
    .subscribe((response : any) => {
       console.log(response);
      //  this.displayedColumns = response;
       this.dataSource = new MatTableDataSource(response.data[id]);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      })
  }

  ngOnInit() {
    
  }

  rowClicked(row: any): void {
    console.log(row);
    this.router.navigate(['/codewordset'])
  }


}
