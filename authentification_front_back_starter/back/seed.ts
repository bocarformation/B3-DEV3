import mongoose from "mongoose";
import dotenv from "dotenv";
import { ProjectModel } from "./src/domain/models/project.model";

dotenv.config();

const SKILLS_POOL = [
    "TypeScript", "Node.js", "React", "Next.js", "PostgreSQL",
    "MongoDB", "Docker", "Redis", "GraphQL", "Kubernetes",
    "Python", "Django", "Tailwind CSS", "Prisma", "CI/CD",
    "Jest", "Cypress", "AWS", "WebSocket", "Microservices",
    "Vue.js", "Angular", "Express", "NestJS", "Rust",
    "Go", "Flutter", "Swift", "Kotlin", "Terraform"
];

const PROJECT_NAMES = [
    "Plateforme e-learning",
    "Dashboard IoT industriel",
    "Application de covoiturage",
    "Marketplace artisanale",
    "Outil de gestion de projet",
    "Réseau social sportif",
    "Système de réservation",
    "Portail immobilier",
    "Application de santé connectée",
    "Plateforme de streaming musical",
    "Outil de facturation SaaS",
    "Application de livraison",
    "Chatbot intélligent",
    "Plateforme de crowdfunding",
    "Système de vote electronique",
    "Application de fitness",
    "Gestionnaire de recettes",
    "Plateforme de mentorat",
    "Outil de veille technologique",
    "Application de budget personnel"
];

function getRandomSkills(min: number, max: number): string[] {
    const count = min + Math.floor(Math.random() * (max - min + 1));
    const shuffled = [...SKILLS_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function getRandomDate(): Date {
    const start = new Date("2023-01-01");
    const end = new Date("2025-12-31");
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seed() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("MONGO_URI non défini dans .env");
        process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connecté à MongoDB");

    // Vider la collection
    await ProjectModel.deleteMany({});
    console.log("Collection projects vidée");

    const projects: { title: string; description: string; skills: string[]; date: Date }[] = [];

    for (let i = 1; i <= 100; i++) {
        const baseName = PROJECT_NAMES[i % PROJECT_NAMES.length];
        projects.push({
            title: `${baseName} v${Math.ceil(i / PROJECT_NAMES.length)}`,
            description: `Projet ${i} : ${baseName.toLowerCase()} avec des fonctionnalités avancées et une architecture moderne.`,
            skills: getRandomSkills(2, 5),
            date: getRandomDate()
        });
    }

    await ProjectModel.insertMany(projects);
    console.log("100 projets insérés avec succès");

    await mongoose.disconnect();
    console.log("Déconnecté de MongoDB");
}

seed().catch((err) => {
    console.error("Erreur seed :", err);
    process.exit(1);
});
