import { Injectable } from '@nestjs/common';

export type Language = 'fr' | 'en' | 'mg';

export interface Translations {
  [key: string]: string | Translations;
}

@Injectable()
export class I18nService {
  private translations: { [key in Language]: Translations } = {
    fr: {
      // Messages d'erreur
      error: {
        notFound: 'Ressource non trouvée',
        unauthorized: 'Non autorisé',
        forbidden: 'Accès interdit',
        badRequest: 'Mauvaise requête',
        internalError: 'Erreur interne du serveur',
        validationFailed: 'Échec de la validation',
        userNotFound: 'Utilisateur non trouvé',
        invalidCredentials: 'Identifiants invalides',
        emailAlreadyExists: 'Cet email existe déjà',
        studentNotFound: 'Étudiant non trouvé',
        classNotFound: 'Classe non trouvée',
        teacherNotFound: 'Professeur non trouvé',
        subjectNotFound: 'Matière non trouvée'
      },
      // Messages de succès
      success: {
        created: 'Créé avec succès',
        updated: 'Mis à jour avec succès',
        deleted: 'Supprimé avec succès',
        loginSuccess: 'Connexion réussie',
        logoutSuccess: 'Déconnexion réussie',
        registrationSuccess: 'Inscription réussie',
        emailSent: 'Email envoyé avec succès'
      },
      // Messages d'information
      info: {
        welcome: 'Bienvenue',
        loading: 'Chargement en cours...',
        processing: 'Traitement en cours...',
        noData: 'Aucune donnée disponible',
        operationSuccessful: 'Opération réussie'
      },
      // Entités
      entities: {
        student: 'Étudiant',
        students: 'Étudiants',
        teacher: 'Professeur',
        teachers: 'Professeurs',
        class: 'Classe',
        classes: 'Classes',
        subject: 'Matière',
        subjects: 'Matières',
        note: 'Note',
        notes: 'Notes',
        user: 'Utilisateur',
        users: 'Utilisateurs',
        school: 'École',
        schools: 'Écoles'
      },
      // Actions
      actions: {
        create: 'Créer',
        update: 'Mettre à jour',
        delete: 'Supprimer',
        view: 'Voir',
        edit: 'Modifier',
        add: 'Ajouter',
        remove: 'Retirer',
        save: 'Enregistrer',
        cancel: 'Annuler',
        submit: 'Soumettre',
        search: 'Rechercher',
        filter: 'Filtrer',
        export: 'Exporter',
        import: 'Importer',
        login: 'Se connecter',
        logout: 'Se déconnecter',
        register: 'S\'inscrire'
      }
    },
    en: {
      // Error messages
      error: {
        notFound: 'Resource not found',
        unauthorized: 'Unauthorized',
        forbidden: 'Forbidden',
        badRequest: 'Bad request',
        internalError: 'Internal server error',
        validationFailed: 'Validation failed',
        userNotFound: 'User not found',
        invalidCredentials: 'Invalid credentials',
        emailAlreadyExists: 'Email already exists',
        studentNotFound: 'Student not found',
        classNotFound: 'Class not found',
        teacherNotFound: 'Teacher not found',
        subjectNotFound: 'Subject not found'
      },
      // Success messages
      success: {
        created: 'Created successfully',
        updated: 'Updated successfully',
        deleted: 'Deleted successfully',
        loginSuccess: 'Login successful',
        logoutSuccess: 'Logout successful',
        registrationSuccess: 'Registration successful',
        emailSent: 'Email sent successfully'
      },
      // Info messages
      info: {
        welcome: 'Welcome',
        loading: 'Loading...',
        processing: 'Processing...',
        noData: 'No data available',
        operationSuccessful: 'Operation successful'
      },
      // Entities
      entities: {
        student: 'Student',
        students: 'Students',
        teacher: 'Teacher',
        teachers: 'Teachers',
        class: 'Class',
        classes: 'Classes',
        subject: 'Subject',
        subjects: 'Subjects',
        note: 'Note',
        notes: 'Notes',
        user: 'User',
        users: 'Users',
        school: 'School',
        schools: 'Schools'
      },
      // Actions
      actions: {
        create: 'Create',
        update: 'Update',
        delete: 'Delete',
        view: 'View',
        edit: 'Edit',
        add: 'Add',
        remove: 'Remove',
        save: 'Save',
        cancel: 'Cancel',
        submit: 'Submit',
        search: 'Search',
        filter: 'Filter',
        export: 'Export',
        import: 'Import',
        login: 'Login',
        logout: 'Logout',
        register: 'Register'
      }
    },
    mg: {
      // Error messages
      error: {
        notFound: 'Tsy hita ny resorsa',
        unauthorized: 'Tsy manana alalana',
        forbidden: 'Raha toy izao',
        badRequest: 'Fangatahana ratsy',
        internalError: 'Hadisoana anatiny ny mpizara',
        validationFailed: 'Tsy nety ny fanamarinana',
        userNotFound: 'Tsy hita ny mpampiasa',
        invalidCredentials: 'Tsy marina ny famantarana',
        emailAlreadyExists: 'Efa misy ity mailaka ity',
        studentNotFound: 'Tsy hita ny mpianatra',
        classNotFound: 'Tsy hita ny sokajy',
        teacherNotFound: 'Tsy hita ny mpampianatra',
        subjectNotFound: 'Tsy hita ny tarika'
      },
      // Success messages
      success: {
        created: 'Namorina tamin\'ny alàlan\'ny fahombiazana',
        updated: 'Navaozina tamin\'ny alàlan\'ny fahombiazana',
        deleted: 'Voafafa tamin\'ny alàlan\'ny fahombiazana',
        loginSuccess: 'Fidirana nahomby',
        logoutSuccess: 'Fialan-tsasatra nahomby',
        registrationSuccess: 'Fisoratana anarana nahomby',
        emailSent: 'Nalefa ny mailaka tamin\'ny alàlan\'ny fahombiazana'
      },
      // Info messages
      info: {
        welcome: 'Tongasafatra',
        loading: 'Maka...',
        processing: 'Manao tratra...',
        noData: 'Tsy misy data azo',
        operationSuccessful: 'Asa nitranga'
      },
      // Entities
      entities: {
        student: 'Mpianatra',
        students: 'Mpianatra',
        teacher: 'Mpampianatra',
        teachers: 'Mpampianatra',
        class: 'Sokajy',
        classes: 'Sokajy',
        subject: 'Tarika',
        subjects: 'Tarika',
        note: 'Marika',
        notes: 'Marika',
        user: 'Mpampiasa',
        users: 'Mpampiasa',
        school: 'Sekoly',
        schools: 'Sekoly'
      },
      // Actions
      actions: {
        create: 'Mamorona',
        update: 'Hanavao',
        delete: 'Mamafa',
        view: 'Hijery',
        edit: 'Hanova',
        add: 'Hanampy',
        remove: 'Hanaisotra',
        save: 'Raiketo',
        cancel: 'Ajanony',
        submit: 'Alefaso',
        search: 'Karohy',
        filter: 'Sasa',
        export: 'Avoaky',
        import: 'Mampiditra',
        login: 'Hiditra',
        logout: 'Hiala',
        register: 'Hisoratra anarana'
      }
    }
  };

  translate(key: string, language: Language = 'fr'): string {
    const translation = this.getNestedTranslation(this.translations[language], key);
    return translation || key;
  }

  private getNestedTranslation(obj: any, key: string): string {
    return key.split('.').reduce((o, i) => o && o[i], obj);
  }

  getSupportedLanguages(): Language[] {
    return ['fr', 'en', 'mg'];
  }

  isLanguageSupported(language: string): language is Language {
    return this.getSupportedLanguages().includes(language as Language);
  }
}
