import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json')
  fields: Field[];
}

export class Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'textarea' | 'select';
  required: boolean;
  values?: string[];
  defaultValue?: string;
}
