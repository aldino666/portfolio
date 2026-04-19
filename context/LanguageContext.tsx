"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    nav_projects: 'Projects',
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_contact: 'Contact',
    hero_title: 'Full Stack Developer | Web3 | SAP',
    hero_subtitle: 'Building the future of the web with modern technologies, blockchain innovations, and enterprise excellence.',
    hero_cta_projects: 'View Projects',
    hero_cta_contact: 'Contact Me',
    about_title: 'About Me',
    about_text: 'I am a versatile developer with a passion for building scalable web applications and exploring the decentralized world of Web3. With a strong foundation in SAP ecosystems, I bridge the gap between enterprise-grade stability and cutting-edge innovation.',
    skills_title: 'Technical Skills',
    skills_web: 'Web Development',
    skills_web3: 'Web3 / Blockchain',
    skills_sap: 'SAP Ecosystem',
    skills_tools: 'Tools & Others',
    projects_title: 'Featured Projects',
    experience_title: 'My Journey',
    contact_title: 'Get In Touch',
    contact_name: 'Name',
    contact_email: 'Email',
    contact_message: 'Message',
    contact_send: 'Send Message',
    footer_rights: 'All rights reserved.',
    sap_future: 'Future SAP Project Manager',
    github_url: 'https://github.com/aldino666',
    linkedin_url: 'https://www.linkedin.com/in/ramanantsirahonana/',
    about_subtitle: 'A bridge between enterprise stability and decentralized innovation.',
    about_approach: 'My approach combines technical rigor with creative problem-solving. Whether it\'s developing a high-performance dApp or optimizing enterprise workflows, I focus on delivering impact through clean code and intuitive user experiences.',
    spec_web_title: 'Web Development',
    spec_web_desc: 'Crafting modern, responsive, and performance-driven web applications.',
    spec_web3_title: 'Web3 & Blockchain',
    spec_web3_desc: 'Building decentralized apps and smart contracts on Solana and Ethereum.',
    spec_sap_title: 'SAP Ecosystem',
    spec_sap_desc: 'Enterprise integration and future-ready SAP project management.',
    skills_subtitle: 'My technical toolkit across different domains.',
    projects_subtitle: 'A selection of my recent work in Web, Web3, and Enterprise solutions.',
    proj_dapp_title: 'Web3 dApp Dashboard',
    proj_dapp_desc: 'A decentralized application featuring wallet connection, signature verification, and real-time transaction monitoring on Solana.',
    proj_smart_title: 'Solana Smart Contract',
    proj_smart_desc: 'Custom Rust-based smart contract for a token distribution platform with automated vesting schedules.',
    proj_data_title: 'Data Analytics Platform',
    proj_data_desc: 'Enterprise-grade dashboard for visualizing complex datasets with real-time updates and interactive charts.',
    proj_sap_title: 'SAP Integration Case Study',
    proj_sap_desc: 'A technical exploration of bridging custom web interfaces with SAP ERP systems via OData services.',
    journey_subtitle: 'The milestones that shaped my professional path.',
    journey_sap_exp_title: 'SAP ERP expertise and development',
    journey_sap_exp_desc: 'Advanced technical and functional development within the SAP ecosystem.',
    journey_web3_title: 'Expertise in smart contracts (Solana / Rust)',
    journey_web3_desc: 'Developing decentralized solutions and participating in large-scale projects like Oxalix.',
    journey_nomerikia_title: 'Full Stack Developer at Nomerikia.mg',
    journey_nomerikia_desc: 'Designed and implemented robust web solutions for diverse clients.',
    journey_health_title: 'Full Stack Web Developer Internship',
    journey_health_desc: 'Experience in the health sector building specialized web tools.',
    journey_edu_title: 'Degree in App Development & IT Management',
    journey_edu_desc: 'Comprehensive training in software engineering and information systems management.',
    contact_subtitle: 'Ready to discuss your next big project or an enterprise opportunity?',
    contact_connect: 'Connect with me',
    contact_sap_expert: 'Looking for a future SAP Expert?',
    available: 'Available for new projects',
    web3_interaction_title: 'Web3 Interaction',
    web3_interaction_subtitle: 'Support my work with a Solana donation. Demonstrate real-world blockchain capability.',
    wallet_connect: 'Connect Wallet',
    wallet_connected: 'Connected',
    wallet_not_connected: 'Not Connected',
    amount_placeholder: 'Amount (SOL)',
    send_button: 'Send SOL',
    status_pending: 'Transaction Pending...',
    status_success: 'Transaction Successful!',
    status_error: 'Transaction Failed',
  },
  fr: {
    nav_projects: 'Projets',
    nav_about: 'À Propos',
    nav_skills: 'Compétences',
    nav_contact: 'Contact',
    hero_title: 'Développeur Full Stack | Web3 | SAP',
    hero_subtitle: 'Bâtir l\'avenir du web avec des technologies modernes, des innovations blockchain et l\'excellence en entreprise.',
    hero_cta_projects: 'Voir les Projets',
    hero_cta_contact: 'Me Contacter',
    about_title: 'À Propos de Moi',
    about_text: 'Je suis un développeur polyvalent passionné par la création d\'applications web évolutives et l\'exploration du monde décentralisé du Web3. Avec une base solide dans les écosystèmes SAP, je fais le pont entre la stabilité d\'entreprise et l\'innovation de pointe.',
    skills_title: 'Compétences Techniques',
    skills_web: 'Développement Web',
    skills_web3: 'Web3 / Blockchain',
    skills_sap: 'Écosystème SAP',
    skills_tools: 'Outils & Autres',
    projects_title: 'Projets Phares',
    experience_title: 'Mon Parcours',
    contact_title: 'Me Contacter',
    contact_name: 'Nom',
    contact_email: 'Email',
    contact_message: 'Message',
    contact_send: 'Envoyer',
    footer_rights: 'Tous droits réservés.',
    sap_future: 'Futur Chef de Projet SAP',
    github_url: 'https://github.com/aldino666',
    linkedin_url: 'https://www.linkedin.com/in/ramanantsirahonana/',
    about_subtitle: 'Un pont entre la stabilité d\'entreprise et l\'innovation décentralisée.',
    about_approach: 'Mon approche combine rigueur technique et résolution créative de problèmes. Qu\'il s\'agisse de développer une dApp haute performance ou d\'optimiser les flux de travail en entreprise, je me concentre sur l\'impact grâce à un code propre et des expériences utilisateur intuitives.',
    spec_web_title: 'Développement Web',
    spec_web_desc: 'Création d\'applications web modernes, réactives et performantes.',
    spec_web3_title: 'Web3 & Blockchain',
    spec_web3_desc: 'Construction d\'applications décentralisées et de contrats intelligents sur Solana et Ethereum.',
    spec_sap_title: 'Écosystème SAP',
    spec_sap_desc: 'Intégration d\'entreprise et gestion de projet SAP tournée vers l\'avenir.',
    skills_subtitle: 'Ma boîte à outils technique dans différents domaines.',
    projects_subtitle: 'Une sélection de mes travaux récents en Web, Web3 et solutions d\'entreprise.',
    proj_dapp_title: 'Tableau de bord dApp Web3',
    proj_dapp_desc: 'Une application décentralisée comprenant la connexion de portefeuille, la vérification de signature et le suivi des transactions en temps réel sur Solana.',
    proj_smart_title: 'Contrat Intelligent Solana',
    proj_smart_desc: 'Contrat intelligent personnalisé basé sur Rust pour une plateforme de distribution de jetons avec des calendriers d\'acquisition automatisés.',
    proj_data_title: 'Plateforme d\'Analyse de Données',
    proj_data_desc: 'Tableau de bord de qualité entreprise pour visualiser des ensembles de données complexes avec des mises à jour en temps réel et des graphiques interactifs.',
    proj_sap_title: 'Étude de cas d\'Intégration SAP',
    proj_sap_desc: 'Une exploration technique du rapprochement des interfaces web personnalisées avec les systèmes SAP ERP via les services OData.',
    journey_subtitle: 'Les étapes clés qui ont façonné mon parcours professionnel.',
    journey_sap_exp_title: 'Expertise et développement SAP ERP',
    journey_sap_exp_desc: 'Développement technique et fonctionnel avancé au sein de l\'écosystème SAP.',
    journey_web3_title: 'Expertise en smart contracts (Solana / Rust)',
    journey_web3_desc: 'Développement de solutions décentralisées et participation à de grands projets comme Oxalix.',
    journey_nomerikia_title: 'Développeur Full Stack chez Nomerikia.mg',
    journey_nomerikia_desc: 'Conception et implémentation de solutions web robustes pour divers clients.',
    journey_health_title: 'Stage Développeur Web Fullstack',
    journey_health_desc: 'Expérience dans le domaine de la santé pour la création d\'outils web spécialisés.',
    journey_edu_title: 'Formation en développement d\'application et management informatique',
    journey_edu_desc: 'Cursus complet en ingénierie logicielle et gestion des systèmes d\'information.',
    contact_subtitle: 'Prêt à discuter de votre prochain grand projet ou d\'une opportunité en entreprise ?',
    contact_connect: 'Connectez avec moi',
    contact_sap_expert: 'Vous recherchez un futur expert SAP ?',
    available: 'Disponible pour de nouveaux projets',
    web3_interaction_title: 'Interaction Web3',
    web3_interaction_subtitle: 'Soutenez mon travail avec une donation Solana. Démonstration de capacité blockchain réelle.',
    wallet_connect: 'Connecter Portefeuille',
    wallet_connected: 'Connecté',
    wallet_not_connected: 'Non Connecté',
    amount_placeholder: 'Montant (SOL)',
    send_button: 'Envoyer SOL',
    status_pending: 'Transaction en cours...',
    status_success: 'Transaction réussie !',
    status_error: 'Échec de la transaction',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
