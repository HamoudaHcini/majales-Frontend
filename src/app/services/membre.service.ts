import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
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
}
