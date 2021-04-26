import {Gouvernorat} from './Gouvernorat';

export class Municipalite
{
  _id?: string;
  Nom?: String;
  gouvernorat?: Gouvernorat;
  createdAt?:Date;
  updatedAt?:Date;
}