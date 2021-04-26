import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from '../utils/request-util';

import { SERVER_API_URL } from '../app.constants';
import { Reunion } from '../models/Reunion';
import { ReunionComponent } from '../reunion/reunion.component';
import { BackendResponse } from '../models/BackendResponse';

type EntityResponseType = HttpResponse<Reunion>;
type EntityArrayResponseType = HttpResponse<Reunion[]>;


@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  resourceUrl = SERVER_API_URL+'reunions/';

  constructor(protected http: HttpClient) {}

  getReunions(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<Reunion[]>(this.resourceUrl, { observe: 'response' })
  }

  getReunionById(req?: any): Observable<EntityResponseType> {
    const options = createRequestOption(req);
    return this.http
      .post<Reunion>(this.resourceUrl+"id", req ,{ observe: 'response' })
  }
  
  create(reunion: Reunion): Observable<HttpResponse<BackendResponse>> {
    return this.http
      .post<BackendResponse>(this.resourceUrl+"add", reunion, { observe: 'response' });
  } 
  
  update(reunion: Reunion): Observable<HttpResponse<BackendResponse>> {
    return this.http
      .post<BackendResponse>(this.resourceUrl+"edit", reunion, { observe: 'response' });
  } 

}
