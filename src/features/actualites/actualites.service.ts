import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActualiteDto } from './dto/create-actualite.dto';

@Injectable()
export class ActualitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActualiteDto: CreateActualiteDto, file?: Express.Multer.File) {
    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      mediaUrl = file.filename;
      mediaType = file.mimetype.startsWith('video') ? 'VIDEO' : 'IMAGE';
    }

    return this.prisma.actualites.create({
      data: {
        texte: createActualiteDto.texte,
        mediaUrl,
        mediaType,
        idUser: createActualiteDto.idUser ? Number(createActualiteDto.idUser) : null,
      },
      include: {
        user: { select: { name: true, surname: true, logo: true } }
      }
    });
  }

  async findAll() {
    return this.prisma.actualites.findMany({
      orderBy: { datePublication: 'desc' },
      include: {
        user: { select: { name: true, surname: true, logo: true } }
      }
    });
  }

  async remove(id: number) {
    const act = await this.prisma.actualites.findUnique({ where: { idActualite: id } });
    if (!act) throw new NotFoundException('Actualite non trouvee');
    // We could delete the file from disk here too, but to keep it simple we'll just delete from DB
    return this.prisma.actualites.delete({ where: { idActualite: id } });
  }
}
