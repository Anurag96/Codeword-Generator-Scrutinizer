import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodewordsetService } from 'src/app/services/codewordset.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-codeword',
  templateUrl: './add-codeword.component.html',
  styleUrls: ['./add-codeword.component.css']
})
export class AddCodewordComponent implements OnInit {

  errFlag = false;
  adduser = '';
  tcodeWordSetData: any
  isFileUploaded = false;
  isFileUploadedValid = false;
  fileMsg =''
  codeWordCount = 0;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AddCodewordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public snackBar: MatSnackBar, private codeWordSetService: CodewordsetService) {
    this.adduser = { ...data };
  }


  ngOnInit() {
  }

  previewFiles(event: any) {
    let files = event.target.files[0];
    let data = new FormData();
    data.append('file', files)
    this.codeWordSetService
      .previewFiles(data)
      .subscribe((res: any) => {
        console.log(res)
        this.isFileUploaded = true;
        if(res.code == 200){
        this.codeWordCount = res.count;
        this.tcodeWordSetData = res.data;
        this.isFileUploadedValid = true;
        }else{
          this.isFileUploadedValid = false;
          this.fileMsg = res.message;
        }
      },
        err => {
          console.log(err)
          this.isFileUploaded = false;
        })
  }

  onNoClick(data): void {

    this.dialogRef.close({ isCanceled: true });

  }

  save() {
    if (this.tcodeWordSetData) {

      // let sendData = {
      //   CodeWordSetName: data.value.name
      // }
      let sendData2 = {
        CodeWordSetName: this.data,
        Codewords: this.tcodeWordSetData
      }
      // this.codeWordSetService
      //   .saveCodewordSet(sendData)
      //   .subscribe((res: any) => {
      this.codeWordSetService
        .saveCodewords(sendData2)
        .subscribe((res: any) => {
          this.snackBar.openFromComponent(AddCodewordSnackBarComponent, {
            duration: 750,
          });
          this.dialogRef.close()
        },
          err => {
            console.log(err)
          })
        // }
        ,
        err => {
          console.log(err)
        }
      // )
    } else {
      this.errFlag = true;
    }

  }

  rowClicked1(row: any): void {
    console.log(row);
    this.dialogRef.close()
  }

}

@Component({
  selector: 'snack-bar-component-add-codeword',
  templateUrl: 'add-codeword-snack-bar.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class AddCodewordSnackBarComponent { }
