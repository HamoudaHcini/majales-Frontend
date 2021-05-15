import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { Admin } from '../models/Admin';

type EntityResponseType = HttpResponse<Admin>;


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  resourceUrl = SERVER_API_URL+'auth/';

  constructor(protected http: HttpClient) {}


  login(req?: any): Observable<EntityResponseType> {
    return this.http
      .post<Admin>(this.resourceUrl+"login", req ,{ observe: 'response' })
  }
}
