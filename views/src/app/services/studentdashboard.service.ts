import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentdashboardService {

  constructor(private httpclient: HttpClient) { }

  getStudentDeatils(email){
    console.log("Studentdetails: "+email)
    return this.httpclient.get("http://localhost:3000/codeword/studentdashboard/"+email)
    
  }
  updateACK(email,courseNameKey){
    console.log("+++++++++++++++++++++++++");
    console.log(email);
    console.log(courseNameKey);

    return this.httpclient.get("http://localhost:3000/codeword/updateACK/" +email+"/"+courseNameKey)
  }

  countAck(courseNameKey){
    return this.httpclient.get("http://localhost:3000/codeword/coursedetails/"+courseNameKey) 
  }
}
