// Types pour les formations (basés sur la base de données)

export interface FormationCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color: string;
    icon?: string;
    order: number;
    formations_count?: number;
}

export interface Formation {
    id: number;
    title: string;
    slug: string;
    short_description?: string;
    description?: string;
    objectives?: string;
    show_objectives?: boolean;
    prerequisites?: string;
    show_prerequisites?: boolean;
    program?: string;
    show_program?: boolean;
    duration?: number;
    show_duration?: boolean;
    level: 'debutant' | 'intermediaire' | 'avance';
    target_audience?: string;
    training_methods?: string;
    certification: boolean;
    certification_label?: string;
    order: number;
    image?: string;
    pdf_file?: string;
    category?: FormationCategory;
    published_at?: string;
}

export interface FormationLevel {
    value: 'debutant' | 'intermediaire' | 'avance';
    label: string;
}

export interface FormationsFilters {
    category: string;
    level: string;
    certification: string;
}

export interface CertificationStats {
    certifiantes: number;
    non_certifiantes: number;
}

export interface FormationsMeta {
    total: number;
    total_categories: number;
}

export interface FormationsPageProps {
    formations: Formation[];
    categories: FormationCategory[];
    levels: FormationLevel[];
    filters: FormationsFilters;
    meta: FormationsMeta;
    certificationStats?: CertificationStats;
    courses?: any[]; // Support pour les mock courses
}

// Alias pour compatibilité
export type CataloguePageProps = FormationsPageProps;
export type CatalogueFilters = FormationsFilters;
export type CatalogueMeta = FormationsMeta;

export interface FormationDetailPageProps {
    formation: Formation;
    relatedFormations: Formation[];
}

