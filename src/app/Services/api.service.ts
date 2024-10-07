import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loginUrl = `${environment.dynamicRoutes}/Access360/LoginDbContext`;
  timeCodeUrl = 'http://localhost:3000/timecode/';
  timezoneUrl = 'http://localhost:3000/timezone/';
  signUrlToGetToken = 'https://localhost:7012/Access360/LoginDbContext/GetToken';
  userSignInApi = 'https://localhost:7012/Access360/LoginDbContext/UserSignIn';
  accessToken = localStorage.getItem('accessToken');
  holidayApiUrl = 'https://localhost:7136/Access360API/Holiday';
  
  constructor(private http: HttpClient) { }
  login(Emailid: string) {
    return this.http.post<any>(`${this.loginUrl}/TenantLogin`, { Emailid });
  }
  
  signToGetToken(username: string, password: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };
    return this.http.get<any>(`${this.signUrlToGetToken}`, options);
  }
  
  signInAPI(userId: string, companyId: number): Observable<any> {
    if (this.accessToken && this.accessToken.startsWith('"') && this.accessToken.endsWith('"')) {
      this.accessToken = this.accessToken.substring(1, this.accessToken.length - 1);
    }
    if (!this.accessToken) {
      return of(null); // Or handle the error accordingly
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'ClientName': '8BUIN',
      'ClientPassword': 'jybroKt01gcIR8xD3TQ/rA=='
    });
  
    const body = { userId: userId, companyId: companyId };
  
    console.log('Making HTTP request with body:', body, 'and headers:', headers);
    return this.http.post<any>(this.userSignInApi, body, { headers: headers });
  }
  createHoliday(req: string): Observable<any> {
    if (this.accessToken && this.accessToken.startsWith('"') && this.accessToken.endsWith('"')) {
      // Remove double quotes
      this.accessToken = this.accessToken.substring(1, this.accessToken.length - 1);
    }
    if (!this.accessToken) {
      return of(null); // Return or handle the error accordingly
    }
  
    // Set headers with access token, auth, clientname, and content-type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`, // Pass the access token directly
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'ClientName': 'max-admin',
      'ClientPassword': 'M0lpwEKb2o8='
    });
  
    // Make the HTTP request with headers and body
    return this.http.post<any>(`${this.holidayApiUrl}/${'createHoliday'}`, req, { headers: headers });
  }
  
  updateAccessHoliday(req: string): Observable<any> {
    if (this.accessToken && this.accessToken.startsWith('"') && this.accessToken.endsWith('"')) {
      // Remove double quotes
      this.accessToken = this.accessToken.substring(1, this.accessToken.length - 1);
    }
    if (!this.accessToken) {
      return of(null); // Return or handle the error accordingly
    }
  
    // Set headers with access token, auth, clientname, and content-type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`, // Pass the access token directly
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'ClientName': 'max-admin',
      'ClientPassword': 'M0lpwEKb2o8='
    });
  
    // Make the HTTP request with headers and body
    return this.http.post<any>(`${this.holidayApiUrl}/${'updateHoliday'}`, req, { headers: headers });
  }
  
  
  deleteAccessHoliday(req: string): Observable<any> {
    if (this.accessToken && this.accessToken.startsWith('"') && this.accessToken.endsWith('"')) {
      // Remove double quotes
      this.accessToken = this.accessToken.substring(1, this.accessToken.length - 1);
    }
    if (!this.accessToken) {
      return of(null); // Return or handle the error accordingly
    }
  
    // Set headers with access token, auth, clientname, and content-type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`, // Pass the access token directly
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'ClientName': 'max-admin',
      'ClientPassword': 'M0lpwEKb2o8='
    });
  
    // Make the HTTP request with headers and body
    return this.http.post<any>(`${this.holidayApiUrl}/${'deleteHoliday'}`, req, { headers: headers });
  }
  
  holidayListApi(req: string): Observable<any> {
    if (this.accessToken && this.accessToken.startsWith('"') && this.accessToken.endsWith('"')) {
      // Remove double quotes
      this.accessToken = this.accessToken.substring(1, this.accessToken.length - 1);
    }
    if (!this.accessToken) {
      return of(null); // Return or handle the error accordingly
    }
  
    // Set headers with access token, auth, clientname, and content-type
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`, // Pass the access token directly
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'ClientName': 'max-admin',
      'ClientPassword': 'M0lpwEKb2o8='
    });
  
    // Make the HTTP request with headers and body
    return this.http.post<any>(`${this.holidayApiUrl}/${'getListofHolidays'}`, req, { headers: headers });
  }
  
  createTimeData(data: any): Observable<any> {
    return this.http.post(this.timeCodeUrl, data);
  }
  
  readTimeData(): Observable<any> {
    return this.http.get(this.timeCodeUrl);
  }
  
  deleteTimeData(id: []): Observable<any> {
    return this.http.delete(this.timeCodeUrl + id);
  }
  
  updateTimeData(id: string, data: any): Observable<any> {
    return this.http.put(this.timeCodeUrl + id, data);
  }
  createTimezone(data: any): Observable<any> {
    return this.http.post(this.timezoneUrl, data);
  }
  readTimezone(): Observable<any> {
    return this.http.get(this.timezoneUrl);
  }
  deleteTimezone(id: []): Observable<any> {
    return this.http.delete(this.timezoneUrl + id);
  }
  updateTimezone(id: string, data: any): Observable<any> {
    return this.http.put(this.timezoneUrl + id, data);
  }
}
