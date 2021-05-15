import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { Municipalite } from '../models/Municipalite';
import { createRequestOption } from '../utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class MunicipaliteService {

  resourceUrl = SERVER_API_URL+'municipalites/';

  constructor(protected http: HttpClient) {}

  getMunicipalites(): Observable<HttpResponse<Municipalite[]>> {
    return this.http
      .get<Municipalite[]>(this.resourceUrl, { observe: 'response' })
  }


  getMunicipalitesByGouvernorat(req?: any): Observable<HttpResponse<Municipalite[]>> {
    return this.http
      .post<Municipalite[]>(this.resourceUrl+"getMunicipalitesByGouvernorat", req ,{ observe: 'response' })
  }

}
