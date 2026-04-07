import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  private logger = new Logger('LanguageMiddleware');

  use(req: Request, res: Response, next: NextFunction): void {
    // Récupérer la langue depuis l'en-tête Accept-Language
    const acceptLanguage = req.headers['accept-language'] as string;
    
    // Langues supportées
    const supportedLanguages = ['fr', 'en', 'mg'];
    
    // Déterminer la langue à utiliser
    let language = 'fr'; // langue par défaut
    
    if (acceptLanguage) {
      // Vérifier si la langue demandée est supportée
      const requestedLang = acceptLanguage.split(',')[0].toLowerCase();
      if (supportedLanguages.includes(requestedLang)) {
        language = requestedLang;
      }
    }
    
    // Stocker la langue dans la requête pour une utilisation ultérieure
    req['language'] = language;
    
    // Ajouter l'en-tête de langue dans la réponse
    res.setHeader('Content-Language', language);
    
    this.logger.debug(`Language set to: ${language}`);
    
    next();
  }
}
