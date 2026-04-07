import { PartialType } from '@nestjs/swagger';
import { CreatePresenceProfDto } from './create-presence_prof.dto';

export class UpdatePresenceProfDto extends PartialType(CreatePresenceProfDto) {}
