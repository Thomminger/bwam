// Page structure and content definitions
const pages = {
    'private-clients': {
        title: 'Private Clients',
        sections: {
            'accounts-cards': {
                title: 'Accounts & Cards',
                content: {
                    en: {
                        title: 'Accounts & Cards',
                        description: 'Comprehensive banking solutions for your personal needs.',
                        features: [
                            {
                                title: 'Personal Accounts',
                                description: 'Flexible account options with competitive interest rates.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Credit Cards',
                                description: 'Premium credit cards with exclusive benefits.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Digital Banking',
                                description: 'Secure and convenient online banking services.',
                                icon: 'smartphone'
                            }
                        ]
                    },
                    de: {
                        title: 'Konten & Karten',
                        description: 'Umfassende Banklösungen für Ihre persönlichen Bedürfnisse.',
                        features: [
                            {
                                title: 'Privatkonten',
                                description: 'Flexible Kontomöglichkeiten mit wettbewerbsfähigen Zinssätzen.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Kreditkarten',
                                description: 'Premium-Kreditkarten mit exklusiven Vorteilen.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Digitales Banking',
                                description: 'Sichere und bequeme Online-Banking-Dienste.',
                                icon: 'smartphone'
                            }
                        ]
                    },
                    fr: {
                        title: 'Comptes & Cartes',
                        description: 'Solutions bancaires complètes pour vos besoins personnels.',
                        features: [
                            {
                                title: 'Comptes Personnels',
                                description: 'Options de compte flexibles avec des taux d\'intérêt compétitifs.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Cartes de Crédit',
                                description: 'Cartes de crédit premium avec des avantages exclusifs.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Banque Numérique',
                                description: 'Services bancaires en ligne sécurisés et pratiques.',
                                icon: 'smartphone'
                            }
                        ]
                    }
                }
            },
            'investing': {
                title: 'Investing',
                content: {
                    en: {
                        title: 'Investment Solutions',
                        description: 'Tailored investment strategies for your financial goals.',
                        features: [
                            {
                                title: 'Portfolio Management',
                                description: 'Professional management of your investment portfolio.',
                                icon: 'trending-up'
                            },
                            {
                                title: 'Sustainable Investing',
                                description: 'ESG-focused investment opportunities.',
                                icon: 'leaf'
                            },
                            {
                                title: 'Retirement Planning',
                                description: 'Long-term investment strategies for retirement.',
                                icon: 'umbrella'
                            }
                        ]
                    },
                    de: {
                        title: 'Anlagelösungen',
                        description: 'Maßgeschneiderte Anlagestrategien für Ihre finanziellen Ziele.',
                        features: [
                            {
                                title: 'Portfoliomanagement',
                                description: 'Professionelle Verwaltung Ihres Anlageportfolios.',
                                icon: 'trending-up'
                            },
                            {
                                title: 'Nachhaltiges Investieren',
                                description: 'ESG-fokussierte Anlagemöglichkeiten.',
                                icon: 'leaf'
                            },
                            {
                                title: 'Altersvorsorge',
                                description: 'Langfristige Anlagestrategien für den Ruhestand.',
                                icon: 'umbrella'
                            }
                        ]
                    },
                    fr: {
                        title: 'Solutions d\'Investissement',
                        description: 'Stratégies d\'investissement adaptées à vos objectifs financiers.',
                        features: [
                            {
                                title: 'Gestion de Portefeuille',
                                description: 'Gestion professionnelle de votre portefeuille d\'investissement.',
                                icon: 'trending-up'
                            },
                            {
                                title: 'Investissement Durable',
                                description: 'Opportunités d\'investissement axées sur l\'ESG.',
                                icon: 'leaf'
                            },
                            {
                                title: 'Planification de la Retraite',
                                description: 'Stratégies d\'investissement à long terme pour la retraite.',
                                icon: 'umbrella'
                            }
                        ]
                    }
                }
            }
        }
    },
    'business-clients': {
        title: 'Business Clients',
        sections: {
            'business-accounts': {
                title: 'Business Accounts',
                content: {
                    en: {
                        title: 'Business Banking Solutions',
                        description: 'Comprehensive banking services for your business.',
                        features: [
                            {
                                title: 'Business Accounts',
                                description: 'Flexible account solutions for businesses of all sizes.',
                                icon: 'building'
                            },
                            {
                                title: 'Payment Solutions',
                                description: 'Efficient payment processing and management.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Trade Finance',
                                description: 'International trade and export financing.',
                                icon: 'globe'
                            }
                        ]
                    },
                    de: {
                        title: 'Geschäftskunden-Lösungen',
                        description: 'Umfassende Bankdienstleistungen für Ihr Unternehmen.',
                        features: [
                            {
                                title: 'Geschäftskonten',
                                description: 'Flexible Kontolösungen für Unternehmen jeder Größe.',
                                icon: 'building'
                            },
                            {
                                title: 'Zahlungslösungen',
                                description: 'Effiziente Zahlungsabwicklung und -verwaltung.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Handelsfinanzierung',
                                description: 'Internationale Handels- und Exportfinanzierung.',
                                icon: 'globe'
                            }
                        ]
                    },
                    fr: {
                        title: 'Solutions Bancaires pour Entreprises',
                        description: 'Services bancaires complets pour votre entreprise.',
                        features: [
                            {
                                title: 'Comptes Entreprise',
                                description: 'Solutions de compte flexibles pour entreprises de toutes tailles.',
                                icon: 'building'
                            },
                            {
                                title: 'Solutions de Paiement',
                                description: 'Traitement et gestion efficaces des paiements.',
                                icon: 'credit-card'
                            },
                            {
                                title: 'Financement du Commerce',
                                description: 'Financement du commerce international et des exportations.',
                                icon: 'globe'
                            }
                        ]
                    }
                }
            }
        }
    },
    'institutional': {
        title: 'Institutional',
        sections: {
            'asset-management': {
                title: 'Asset Management',
                content: {
                    en: {
                        title: 'Institutional Asset Management',
                        description: 'Professional asset management for institutional clients.',
                        features: [
                            {
                                title: 'Portfolio Management',
                                description: 'Customized investment strategies for institutions.',
                                icon: 'trending-up'
                            },
                            {
                                title: 'Risk Management',
                                description: 'Comprehensive risk assessment and mitigation.',
                                icon: 'shield'
                            },
                            {
                                title: 'Research & Analysis',
                                description: 'In-depth market research and analysis.',
                                icon: 'bar-chart'
                            }
                        ]
                    },
                    de: {
                        title: 'Institutionelles Asset Management',
                        description: 'Professionelles Vermögensmanagement für institutionelle Kunden.',
                        features: [
                            {
                                title: 'Portfoliomanagement',
                                description: 'Maßgeschneiderte Anlagestrategien für Institutionen.',
                                icon: 'trending-up'
                            },
                            {
                                title: 'Risikomanagement',
                                description: 'Umfassende Risikobewertung und -minderung.',
                                icon: 'shield'
                            },
                            {
                                title: 'Forschung & Analyse',
                                description: 'Detaillierte Marktforschung und -analyse.',
                                icon: 'bar-chart'
                            }
                        ]
                    },
                    fr: {
                        title: 'Gestion d\'Actifs Institutionnelle',
                        description: 'Gestion d\'actifs professionnelle pour les clients institutionnels.',
                        features: [
                            {
                                title: 'Gestion de Portefeuille',
                                description: 'Stratégies d\'investissement personnalisées pour les institutions.',
                                icon: 'trending-up'
                            },
                            {
                                title: 'Gestion des Risques',
                                description: 'Évaluation et atténuation complètes des risques.',
                                icon: 'shield'
                            },
                            {
                                title: 'Recherche & Analyse',
                                description: 'Recherche et analyse approfondies du marché.',
                                icon: 'bar-chart'
                            }
                        ]
                    }
                }
            }
        }
    }
};

// Export the pages object
window.bwamPages = pages; 