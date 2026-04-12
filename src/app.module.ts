import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrismaModule } from './features/prisma/prisma.module';
import { ClassesModule } from './features/classes/classes.module';
import { EtudiantsModule } from './features/etudiants/etudiants.module';
import { EcolagesModule } from './features/ecolages/ecolages.module';
import { SalairesModule } from './features/salaires/salaires.module';
import { ProfesseursModule } from './features/proffesseurs/professeurs.module';
import { MatieresModule } from './features/matieres/matieres.module';
import { NotesModule } from './features/notes/notes.module';
import { YearsSchoolModule } from './features/years_school/years_school.module';
import { AuthClientModule } from './features/auth-client/auth-client.module';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { SemestreModule } from './features/semestre/semestre.module';
import { ClassEStudentsController } from './features/class-e_students/class-e_students.controller';
import { ClassEStudentsModule } from './features/class-e_students/class-e_students.module';
import { StudentsYearsModule } from './features/students_years/students_years.module';
import { EmploiDuTempsModule } from './features/emploi-du-temps/emploi-du-temps.module';
import { PresenceProfModule } from './features/presence_prof/presence_prof.module';
import { ActualitesModule } from './features/actualites/actualites.module';
import { DepensesModule } from './features/depenses/depenses.module';
import { FinancesModule } from './features/finances/finances.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LanguageMiddleware } from './common/middleware/language.middleware';
import { I18nService } from './common/services/i18n.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'), // Dossier racine où se trouve 'upload'
      serveRoot: '/', // URL de base pour les fichiers
    }),
    PrismaModule,
    ClassesModule,
    EtudiantsModule,
    EcolagesModule,
    SalairesModule,
    ProfesseursModule,
    MatieresModule,
    NotesModule,
    YearsSchoolModule,
    AuthClientModule,
    SemestreModule,
    UserModule,
    AuthModule,
    ClassEStudentsModule,
    StudentsYearsModule,
    EmploiDuTempsModule,
    PresenceProfModule,
    ActualitesModule,
    DepensesModule,
    FinancesModule,
  ],
  controllers: [],
  providers: [LanguageMiddleware, I18nService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LanguageMiddleware)
      .forRoutes('*');
  }
}
