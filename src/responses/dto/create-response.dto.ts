import { IsUUID, IsObject } from 'class-validator';

export class CreateResponseDto {
  @IsUUID()
  formId: string;

  @IsObject()
  answers: Record<string, any>;
}

