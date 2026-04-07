import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthClientDto } from './dto/create-client.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthClientService {
  constructor(private prisma: PrismaService) {}

  async authenticate(loginDto: AuthClientDto): Promise<any> {
    const { idEdt, password } = loginDto;

    // Rechercher l'étudiant par matricule
    const etudiant = await this.prisma.etudiants.findFirst({
      where: { idEdt },
    });

    console.log('Étudiant trouvé:', etudiant);

    if (!etudiant) {
      return null; // Étudiant non trouvé
    }

    // Vérification du mot de passe haché avec argon2
    const isPasswordValid = await argon2.verify(etudiant.password, password);
    console.log('Mot de passe valide:', isPasswordValid);

    if (!isPasswordValid) {
      return null; // Mot de passe incorrect
    }

    return {
      success: true,
      data: {
        idEdt: etudiant.idEdt,
        name: etudiant.name,
      },
    };
  }
}
