"use client";

import React, { createContext, useContext, useState } from 'react';

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
    hero_title: 'Smart Contract Solana / Web3.0 | SAP S/4HANA | Web 2.0',
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
    experience_title: 'Specialization & Work with us',
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
    proj_dapp_title: 'ox-amm-pool',
    proj_dapp_desc: 'Decentralized automated market maker for liquidity provision on Solana, ensuring efficient token swaps.',
    proj_smart_title: 'oxalix-smartcontract',
    proj_smart_desc: 'Custom Rust-based smart contract for the Oxalix ecosystem, focusing on security and scalability.',
    proj_data_title: 'Wallet-Tracking-Solana',
    proj_data_desc: 'Comprehensive tool for tracking wallet activities and decoding transaction signatures on the Solana blockchain.',
    proj_sap_title: 'SAP Integration Case Study',
    proj_sap_desc: 'A technical exploration of bridging custom web interfaces with SAP ERP systems via OData services.',
    journey_subtitle: 'Web3 & SAP Expertise',
    journey_sap_work_title: 'SAP ERP Training & Solutions',
    journey_sap_work_desc: 'Training and practical experience in SAP ERP solutions, covering both functional and technical aspects.',
    journey_sap_exp_title: 'SAP ERP expertise and development',
    journey_sap_exp_desc: 'Advanced technical and functional development within the SAP ecosystem.',
    journey_web3_title: 'Web3 Specialization & Development',
    journey_web3_desc: 'Specialization & work in Web3 development, with a focus on Solana smart contracts, decentralized applications (dApps), and blockchain systems.',
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
    web3_support_title: 'Solana Support',
    web3_support_desc: 'Connect your Solana wallet to send a small donation. This feature demonstrates secure transaction signing and real-time blockchain interaction.',
    web3_view_explorer: 'View on Explorer',
    web3_connect_prompt: 'Please connect your wallet to interact',
  },
  fr: {
    nav_projects: 'Projets',
    nav_about: 'À Propos',
    nav_skills: 'Compétences',
    nav_contact: 'Contact',
    hero_title: 'Développeur Smart Contract Solana / Web3.0 | SAP S/4HANA | Web 2.0',
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
    experience_title: 'Spécialisation & Collaboration web 3',
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
    proj_dapp_title: 'ox-amm-pool',
    proj_dapp_desc: 'Market maker automatisé décentralisé pour la fourniture de liquidités sur Solana, assurant des échanges de jetons efficaces.',
    proj_smart_title: 'oxalix-smartcontract',
    proj_smart_desc: 'Contrat intelligent Rust personnalisé pour l\'écosystème Oxalix, axé sur la sécurité et l\'évolutivité.',
    proj_data_title: 'Wallet-Tracking-Solana',
    proj_data_desc: 'Outil complet pour le suivi des activités de portefeuille et le décodage des signatures de transaction sur la blockchain Solana.',
    proj_sap_title: 'Étude de cas d\'Intégration SAP',
    proj_sap_desc: 'Une exploration technique du rapprochement des interfaces web personnalisées avec les systèmes SAP ERP via les services OData.',
    journey_subtitle: 'Expertise Web3 & SAP',
    journey_sap_work_title: 'Formation & Solutions SAP ERP',
    journey_sap_work_desc: 'Formation et expérience pratique des solutions SAP ERP, couvrant les aspects fonctionnels et techniques.',
    journey_sap_exp_title: 'Expertise et développement SAP ERP',
    journey_sap_exp_desc: 'Développement technique et fonctionnel avancé au sein de l\'écosystème SAP.',
    journey_web3_title: 'Spécialisation & Développement Web3',
    journey_web3_desc: 'Spécialisation et travail dans le développement Web3, avec un focus sur les contrats intelligents Solana, les dApps et les systèmes blockchain.',
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
    web3_support_title: 'Support Solana',
    web3_support_desc: 'Connectez votre portefeuille Solana pour envoyer un petit don. Cette fonctionnalité démontre la signature sécurisée de transactions et l\'interaction en temps réel avec la blockchain.',
    web3_view_explorer: 'Voir sur l\'Explorer',
    web3_connect_prompt: 'Veuillez connecter votre portefeuille pour interagir',
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
