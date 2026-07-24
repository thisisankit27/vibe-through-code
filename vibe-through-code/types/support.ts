export interface SupportTier {
    id: string;
    title: string;
    price: number;
    currency: string;
    frequency?: string;
    label: string;
    description: string;
    narrative: string[];
}

export interface BuilderBenefit {
    id: string;
    label: string;
    description: string;
}

export interface SessionManifest {
    coffee: number;
    stream: number;
    builders: number;
}

