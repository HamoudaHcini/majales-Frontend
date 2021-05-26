import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { BackendResponse } from '../models/BackendResponse';
import { Membre } from '../models/Membre';

import { createRequestOption } from '../utils/request-util';


type EntityArrayResponseType = HttpResponse<Membre[]>;
type EntityResponseType = HttpResponse<Membre>;

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  resourceUrl = SERVER_API_URL+'membres/';

  constructor(protected http: HttpClient) {}

  getMembres(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<Membre[]>(this.resourceUrl, { observe: 'response' })
  }

  

  getMembresByGouvernorat(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .post<Membre[]>(this.resourceUrl+"getMembresByGouvernorat",req, { observe: 'response' })
  }


  getMembresByMunicipalite(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .post<Membre[]>(this.resourceUrl+"getMembresByMunicipalite",req, { observe: 'response' })
  }

  create(membre: Membre): Observable<HttpResponse<BackendResponse>> {
    return this.http
      .post<BackendResponse>(this.resourceUrl+"add", membre, { observe: 'response' });
  } 

  update(membre: Membre): Observable<HttpResponse<BackendResponse>> {
    return this.http
      .post<BackendResponse>(this.resourceUrl+"update", membre, { observe: 'response' });
  } 


  getmembreById(req?: any): Observable<EntityResponseType> {
    const options = createRequestOption(req);
    return this.http
      .post<Membre>(this.resourceUrl+"getById", req ,{ observe: 'response' })
  }
  
}
