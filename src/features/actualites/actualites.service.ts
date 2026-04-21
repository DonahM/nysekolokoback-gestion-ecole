import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActualiteDto } from './dto/create-actualite.dto';

@Injectable()
export class ActualitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActualiteDto: CreateActualiteDto, files?: Array<Express.Multer.File>) {
    let mediaUrl = null;
    let mediaType = null;

    if (files && files.length > 0) {
      mediaUrl = files.map(f => f.filename).join(',');
      
      const hasVideo = files.some(f => f.mimetype.startsWith('video'));
      const hasImage = files.some(f => f.mimetype.startsWith('image'));
      
      if (hasVideo && hasImage) mediaType = 'MIXED';
      else if (hasVideo) mediaType = 'VIDEO';
      else mediaType = 'IMAGE';
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

  async checkSuperAdmin(idUserStr?: string) {
    if (!idUserStr) return false;
    const user = await this.prisma.user.findUnique({ where: { idUser: parseInt(idUserStr, 10) } });
    return user && user.roles.includes('SUPPER ADMIN');
  }

  async update(id: number, texte: string) {
    return this.prisma.actualites.update({
      where: { idActualite: id },
      data: { texte }
    });
  }

  async toggleStatus(id: number) {
    const act = await this.prisma.actualites.findUnique({ where: { idActualite: id } });
    if (!act) throw new NotFoundException('Actualite non trouvee');
    
    // We are casting this.prisma.actualites locally because PrismaClient might not have isActive yet without restart,
    // but at runtime `isActive` exists in DB.
    const currentStatus = (act as any).isActive ?? true;
    
    return (this.prisma as any).actualites.update({
      where: { idActualite: id },
      data: { isActive: !currentStatus }
    });
  }
}
