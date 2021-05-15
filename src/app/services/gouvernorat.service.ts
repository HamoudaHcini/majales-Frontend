import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { BackendResponse } from '../models/BackendResponse';
import { Gouvernorat } from '../models/Gouvernorat';
import { Membre } from '../models/Membre';

import { createRequestOption } from '../utils/request-util';


type EntityArrayResponseType = HttpResponse<Gouvernorat[]>;
type EntityResponseType = HttpResponse<Gouvernorat>;

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {

  resourceUrl = SERVER_API_URL+'gouvernorats/';

  constructor(protected http: HttpClient) {}

  getGouvernorats(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<Gouvernorat[]>(this.resourceUrl, { observe: 'response' })
  }

  getGouvernoratById(req?: any): Observable<EntityResponseType> {
    const options = createRequestOption(req);
    return this.http
      .post<Gouvernorat>(this.resourceUrl+"getById", req ,{ observe: 'response' })
  }
  
}
