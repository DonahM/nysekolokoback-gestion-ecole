import { Controller, Post, Body, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthClientService } from './auth-client.service';
import { AuthClientDto } from './dto/create-client.dto';

@Controller('auth-client')
export class AuthClientController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Post('authenticate')
  async authenticate(@Body() body: AuthClientDto) {
    const authResult = await this.authClientService.authenticate(body);

    if (!authResult) {
      throw new UnauthorizedException('Mot de passe incorrect ou étudiant non trouvé');
    }

    return authResult;
  }
}
