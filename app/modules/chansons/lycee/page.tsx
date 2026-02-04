'use client';

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  FeaturedParcours,
  HowItWorks,
  UserSpaces,
  CompetencesSection,
  AvantagesSection,
  CTASection
} from "@/components/home";

export default function ChansonsLyceeHome() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Retour à l&apos;accueil du monorepo
        </Link>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Parcours */}
      <FeaturedParcours />

      {/* How It Works */}
      <HowItWorks />

      {/* User Spaces (Élève / Enseignant) */}
      <UserSpaces />

      {/* Competences CEREDIS */}
      <CompetencesSection />

      {/* Avantages */}
      <AvantagesSection />

      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
