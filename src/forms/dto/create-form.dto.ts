import { IsString, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class CreateFieldDto {
  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsString()
  type: 'text' | 'email' | 'date' | 'textarea' | 'select';

  @IsBoolean()
  required: boolean;

  @IsArray()
  values?: string[];

  @IsString()
  defaultValue?: string;
}

export class CreateFormDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFieldDto)
  fields: CreateFieldDto[];
}
