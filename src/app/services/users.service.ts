import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { Admin } from '../models/Admin';
import { BackendResponse } from '../models/BackendResponse';

type EntityArrayResponseType = HttpResponse<Admin[]>;
type EntityResponseType = HttpResponse<Admin>;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  resourceUrl = SERVER_API_URL+'users/';

  constructor(protected http: HttpClient) {}

  getUsers(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<Admin[]>(this.resourceUrl, { observe: 'response' })
  }

  create(administrateur: Admin): Observable<HttpResponse<BackendResponse>> {
    return this.http
      .post<BackendResponse>(this.resourceUrl+"add", administrateur, { observe: 'response' });
  } 

  update(administrateur: Admin): Observable<HttpResponse<BackendResponse>> {
    return this.http
      .post<BackendResponse>(this.resourceUrl+"update", administrateur, { observe: 'response' });
  } 


  getmembreById(req?: any): Observable<EntityResponseType> {
    return this.http
      .post<Admin>(this.resourceUrl+"getById", req ,{ observe: 'response' })
  }
  delete(AdminId?: any): Observable<HttpResponse<BackendResponse>> {
    return this.http
      .post<BackendResponse>(this.resourceUrl+"destroy", AdminId, { observe: 'response' });
  }
}
