import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material';

export interface PeriodicElement {
  codeWordSetName: string;
}

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit {
      
  errFlag = false;
  addcourse :any;
  studentfile: any
  startdate: Date = new Date();
  minDate = new Date();
  minDate2 = new Date();
    


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.minDate2 = this.addcourse.date;
    console.log(this.addcourse.date.getTime())
    if(this.addcourse.date.getTime() > this.addcourse.enddate.getTime()){
      this.addcourse.enddate = this.addcourse.date;
    }
  }

  constructor(public dialogRef: MatDialogRef<AddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public snackBar: MatSnackBar, private dashboardService: DashboardService) {
    this.addcourse = { ...data };
    
  }

  ngOnInit() {
    this.loadCourseModel()
    let curDate = new Date();
    curDate.setDate(curDate.getDate() + 120);
    this.addcourse.date = new Date();
    this.addcourse.enddate = curDate;
  }

  // Add Course
  save(data) {
    let courseDetails = {
      courseNameKey: data.value.name,
      codeWordSetName: data.value.codewordSetName,
      startDate: data.value.startDate,
      endDate: data.value.endDate,
      preSurveyURL: data.value.startURL,
      postSurveyURL: data.value.endURL
    }
    if (data.valid) {
      console.log(data.value);
      console.log(data.endDate);
      this.dashboardService
        .addNewCourse(courseDetails)
        .subscribe((response: any) => {
          let data = new FormData();
          data.append('file', this.studentfile)
          data.append('CourseNameKey', courseDetails.courseNameKey)
          data.append('CodeWordSetName', courseDetails.codeWordSetName)
          this.dashboardService
            .addCourseStudent(data)
            .subscribe((res: any) => {
              this.snackBar.openFromComponent(AddCourseSnackBarComponent, {
                duration: 750,
              });
              this.dialogRef.close()
            },
            err => {
              console.log(err)
            })
        },
        err => {
          console.log(err)
        })
    } else {
      this.errFlag = true;
      data.reset
    }
  }


  // Loading CodewordSet from Codeword Set modal
  loadCourseModel() {
    this.dashboardService
      .getCodewordSet()
      .subscribe((res: any) => {
        this.names = res.data
      })
  }

  // Handeling File Upload
  fileUpload(event: any) {
    this.studentfile = event.target.files[0];
  }

  // Handeling CodewordSet Names
  names: any

  // Closing of Add Course model
  rowClicked(row: any): void {
    console.log(row);
    this.dialogRef.close()
  }

}

export interface CodewordSetName {
  value: String;
  viewValue?: String;
}

@Component({
  selector: 'snack-bar-component-add-user',
  templateUrl: 'add-course-snack-bar.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }`],
})
export class AddCourseSnackBarComponent { }
