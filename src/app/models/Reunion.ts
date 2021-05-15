import { Municipalite } from './Municipalite';
import {Participation} from './Participation';

export class Reunion
{
  _id?: string;
  sujet?: string;
  municipalite?: Municipalite;
  municipaliteId?: String;
  date?: Date;
  duree?: string;
  type?: string;
  participations?: Participation[];
  createdAt?:Date;
  updatedAt?:Date;
}
