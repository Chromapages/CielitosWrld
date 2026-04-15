export interface ServicePackage {
    _id: string;
    order?: number;
    name: string;
    tagline?: string;
    price: string;
    priceNote?: string;
    features: string[];
    popular?: boolean;
    ctaText: string;
    ctaLink: string;
    targetAudience?: string;
}

export interface ProcessStep {
    title: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
}
