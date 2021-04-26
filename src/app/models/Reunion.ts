import {Participation} from './Participation';

export class Reunion
{
  _id?: string;
  sujet?: string;
  lieu?: string;
  date?: Date;
  duree?: string;
  type?: string;
  participations?: Participation[];
  createdAt?:Date;
  updatedAt?:Date;
}
