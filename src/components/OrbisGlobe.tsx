import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Sparkles, ArrowUpRight, X, Eye, ExternalLink, Layers, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

export interface GlobeTile {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  year: string;
  row: 'upper' | 'equator' | 'lower';
  colIndex: number;
  accentColor: string;
  secondaryColor: string;
  description: string;
  deliverables: string[];
  metrics: string;
}

export const GLOBE_TILES: GlobeTile[] = [
  // Middle Row (Equator Band) - 8 primary campaign & service showcase tiles
  {
    id: 'dua',
    title: 'DRINK DUA',
    category: 'Product & Brand',
    subtitle: 'Young Coconuts. Nothing Else.',
    year: '2026',
    row: 'equator',
    colIndex: 0,
    accentColor: '#0E3B2B',
    secondaryColor: '#34D399',
    description: 'Minimalist brand identity and sustainable packaging for organic single-origin coconut water from pristine coastal groves.',
    deliverables: ['Brand Architecture', 'Organic Packaging Suite', '3D Interactive E-Commerce', 'Launch Campaign'],
    metrics: '+340% Pre-Order Velocity',
  },
  {
    id: 'corvane',
    title: 'CORVANE',
    category: 'Industrial Design',
    subtitle: 'Hyper-Engineered Titanium Chronographs',
    year: '2026',
    row: 'equator',
    colIndex: 1,
    accentColor: '#12141F',
    secondaryColor: '#C6A66B',
    description: '3D interactive product configurator and kinetic visual campaign for Swiss mechanical timepieces with exposed tourbillons.',
    deliverables: ['Interactive 3D Configurator', 'Kinetic Video CGI', 'VIP Collector Portal', 'Global Ad Deployment'],
    metrics: '98.4% User Engagement Rate',
  },
  {
    id: 'radiates',
    title: 'RADIANCE STUDIO',
    category: 'Haute Editorial',
    subtitle: 'Everything Radiates. We Photograph.',
    year: '2026',
    row: 'equator',
    colIndex: 2,
    accentColor: '#28122D',
    secondaryColor: '#E879F9',
    description: 'High-fashion editorial campaign featuring dramatic chiaroscuro portraiture and avant-garde makeup direction for Paris Fashion Week.',
    deliverables: ['Fashion Photography', 'Editorial Art Direction', 'Retouching & Color Grading', 'Digital Lookbook'],
    metrics: 'Featured in Vogue & Harper’s Bazaar',
  },
  {
    id: 'aura',
    title: 'AURA SOUND',
    category: 'Acoustics & Hardware',
    subtitle: 'Hear The Wind, Not The Crowd.',
    year: '2026',
    row: 'equator',
    colIndex: 3,
    accentColor: '#1A1830',
    secondaryColor: '#A78BFA',
    description: 'Industrial design and launch creative for high-fidelity planar magnetic headphones engineered for acoustic purists.',
    deliverables: ['CAD Photorealism', 'Soundwave Interactive Visualizer', 'Global Press Kit', 'Audio Equalizer App'],
    metrics: 'Sold Out First Production Run',
  },
  {
    id: 'elysium',
    title: 'ELYSIUM COUTURE',
    category: 'Fashion Portraiture',
    subtitle: 'Sculpted Silhouette & Golden Light',
    year: '2026',
    row: 'equator',
    colIndex: 4,
    accentColor: '#201026',
    secondaryColor: '#F472B6',
    description: 'Visual identity and dramatic monochrome portrait catalog showcasing modern architectural eveningwear and hand-embroidered silk.',
    deliverables: ['Studio Portraiture Suite', 'Runway Motion Direction', 'Luxury Catalog Design', 'Exclusive Private Exhibition'],
    metrics: 'Over 2.2M Global Impressions',
  },
  {
    id: 'web-dev',
    title: 'WEB DEVELOPMENT',
    category: 'Agency Service',
    subtitle: 'Futuristic High-Performance Platforms',
    year: '2026',
    row: 'equator',
    colIndex: 5,
    accentColor: '#0E172E',
    secondaryColor: '#38BDF8',
    description: 'Design and develop responsive, high-performance web applications that communicate prestige and convert high-ticket leads.',
    deliverables: ['React / Next.js Architecture', 'Interactive Three.js & WebGL', 'Sub-second Load Optimization', 'Full CMS Integration'],
    metrics: '100% Core Web Vitals Score',
  },
  {
    id: 'sigil',
    title: 'SIGIL CREATORS',
    category: 'Creator Platform',
    subtitle: 'Every Creator Has A Card.',
    year: '2026',
    row: 'equator',
    colIndex: 6,
    accentColor: '#1A1629',
    secondaryColor: '#F59E0B',
    description: 'Decentralized digital profile and micro-monetization network giving visual artists permanent royalty ownership and VIP passes.',
    deliverables: ['Creator Dashboard', 'Algorithmic Pricing Engine', 'Kinetic Brand Identity', 'NFC Hardware Integration'],
    metrics: '42,000 Verified Creators',
  },
  {
    id: 'reels',
    title: 'REEL PRODUCTION',
    category: 'Agency Service',
    subtitle: 'Viral-Worthy Short-Form Motion',
    year: '2026',
    row: 'equator',
    colIndex: 7,
    accentColor: '#2B1130',
    secondaryColor: '#E879F9',
    description: 'Create high-engagement short-form video content with compelling psychological hooks, kinetic typography, and viral sound design.',
    deliverables: ['Kinetic Typography & Pacing', 'Storyline Scripting', 'Color Grading (DaVinci)', 'Sound Design & Mastering'],
    metrics: '4.8M Organic Impressions',
  },

  // Upper Latitude Row (+30 deg) - 8 tiles
  {
    id: 'visionary-portrait',
    title: 'VISIONARY EDITORIAL',
    category: 'Portrait Art',
    subtitle: 'Cinematic Chiaroscuro & Human Form',
    year: '2026',
    row: 'upper',
    colIndex: 0,
    accentColor: '#1F152B',
    secondaryColor: '#D946EF',
    description: 'Intimate fine-art portrait series capturing visionary entrepreneurs and thought leaders with natural cinematic illumination.',
    deliverables: ['Bespoke Portraiture', 'Editorial Curation', 'Exhibition Prints', 'Magazine Feature Layout'],
    metrics: 'Top 10 Global Creative Honors',
  },
  {
    id: 'chronos',
    title: 'CHRONOS LAB',
    category: 'Horology',
    subtitle: 'Mechanical Mastery Under Glass',
    year: '2026',
    row: 'upper',
    colIndex: 1,
    accentColor: '#181B26',
    secondaryColor: '#E4D3AE',
    description: 'Macro-photography and interactive 3D exploded view of a bespoke perpetual calendar movement with ruby bearings.',
    deliverables: ['Macro Photomicrography', 'WebGL Exploded 3D Rig', 'Collector Monograph', 'Digital Heritage Archive'],
    metrics: 'Grand Prix d’Horlogerie Finalist',
  },
  {
    id: 'social-mgmt',
    title: 'SOCIAL MANAGEMENT',
    category: 'Agency Service',
    subtitle: 'End-to-End Strategic Presence',
    year: '2026',
    row: 'upper',
    colIndex: 2,
    accentColor: '#12172B',
    secondaryColor: '#60A5FA',
    description: 'Full-service social media management driving genuine engagement, consistent luxury aesthetic, and community conversion.',
    deliverables: ['Monthly Editorial Grid', 'Direct Engagement Ops', 'Analytics Dashboard', 'Influencer Synergy'],
    metrics: '+280% Community Growth',
  },
  {
    id: 'branding',
    title: 'BRANDING & IDENTITY',
    category: 'Agency Service',
    subtitle: 'Timeless Monograms & Visual Systems',
    year: '2026',
    row: 'upper',
    colIndex: 3,
    accentColor: '#281432',
    secondaryColor: '#F472B6',
    description: 'Distinctive brand identities combining classic typography, custom monograms, and versatile guidelines for market leaders.',
    deliverables: ['Complete Brand Guidelines', 'Custom Typography Suite', 'Packaging Design System', 'Stationery & Digital Assets'],
    metrics: '15+ Brand Transformations',
  },
  {
    id: 'paid-ads',
    title: 'PAID ADVERTISING',
    category: 'Agency Service',
    subtitle: 'High-ROI Algorithmic Campaigns',
    year: '2026',
    row: 'upper',
    colIndex: 4,
    accentColor: '#151C33',
    secondaryColor: '#38BDF8',
    description: 'Targeted advertising on Meta, Google, and LinkedIn that cuts customer acquisition costs while multiplying revenue.',
    deliverables: ['Audience Segmentation', 'Creative A/B Multi-Testing', 'Retargeting Architecture', 'ROAS Optimization'],
    metrics: '4.8x Average Client ROAS',
  },
  {
    id: 'informative-ai',
    title: 'INFORMATIVE AI',
    category: 'Intelligence & Tech',
    subtitle: 'Neural Interfaces & Smart Systems',
    year: '2026',
    row: 'upper',
    colIndex: 5,
    accentColor: '#1D1333',
    secondaryColor: '#C084FC',
    description: 'Interactive educational visualization of neural network synaptic weights and conversational machine intelligence.',
    deliverables: ['Interactive Neural Graph', 'Real-time Inference Demos', 'Technical Documentation', 'SDK Integration'],
    metrics: 'Used by 85k Tech Developers',
  },
  {
    id: 'instagram-growth',
    title: 'INSTAGRAM GROWTH',
    category: 'Agency Service',
    subtitle: 'Viral Growth Loops & Content Funnels',
    year: '2026',
    row: 'upper',
    colIndex: 6,
    accentColor: '#2F122B',
    secondaryColor: '#E879F9',
    description: 'Strategic growth blueprints combining algorithm optimization, content hooks, and audience conversion into revenue.',
    deliverables: ['Viral Hook Frameworks', 'Algorithm Timing Audits', 'Profile Bio Conversion', 'Story Funnel Strategy'],
    metrics: '10x Average Account Reach',
  },
  {
    id: 'email-mktg',
    title: 'EMAIL MARKETING',
    category: 'Agency Service',
    subtitle: 'Automated Retention & Revenue Engines',
    year: '2026',
    row: 'upper',
    colIndex: 7,
    accentColor: '#102235',
    secondaryColor: '#34D399',
    description: 'High-converting email sequences, newsletter templates, and automated workflows that nurture leads on autopilot.',
    deliverables: ['Welcome & Nurture Flows', 'Abandoned Cart Automation', 'VIP Loyalty Campaigns', 'Deliverability Optimization'],
    metrics: '42.8% Average Open Rate',
  },

  // Lower Latitude Row (-30 deg) - 8 tiles
  {
    id: 'atelier-portrait',
    title: 'ATELIER NOIR',
    category: 'Portrait Art',
    subtitle: 'Master Sculptor In Shadow',
    year: '2026',
    row: 'lower',
    colIndex: 0,
    accentColor: '#1A1828',
    secondaryColor: '#C084FC',
    description: 'Atmospheric black and white documentary portraiture documenting traditional haute joaillerie artisans in Rome.',
    deliverables: ['Editorial Book', 'Fine-Art Prints', 'Short Documentary Reel', 'Digital Exhibition'],
    metrics: 'Private Collector Acquisition',
  },
  {
    id: 'lumina',
    title: 'LUMINA LIGHTING',
    category: 'Spatial Design',
    subtitle: 'Architectural Shadow & Glow',
    year: '2026',
    row: 'lower',
    colIndex: 1,
    accentColor: '#241B12',
    secondaryColor: '#FDE047',
    description: 'Atmospheric light sculpture catalog and interactive room visualizer for Italian hand-blown pendant luminaires.',
    deliverables: ['Real-Time Raytraced Room', 'Lighting Spec Sheets', 'Architectural Portal', 'Sample Kit Packaging'],
    metrics: 'Specified in 40+ Luxury Hotels',
  },
  {
    id: 'malossol',
    title: 'MALOSSOL RESERVE',
    category: 'Luxury Gastronomy',
    subtitle: 'Lightly Salted, Slowly Grown.',
    year: '2026',
    row: 'lower',
    colIndex: 2,
    accentColor: '#151624',
    secondaryColor: '#E4D3AE',
    description: 'Bespoke sensory e-commerce experience for Caspian sea sustainable reserve caviar delivered in temperature-monitored titanium vessels.',
    deliverables: ['Editorial Art Direction', 'Custom Typography System', 'Cold-Chain Logistics Portal', 'Private Client Onboarding'],
    metrics: '€420 Average Order Value',
  },
  {
    id: 'seo-local',
    title: 'SEO & LOCAL DOMINANCE',
    category: 'Agency Service',
    subtitle: 'Organic Visibility & Top Rankings',
    year: '2026',
    row: 'lower',
    colIndex: 3,
    accentColor: '#1A122E',
    secondaryColor: '#D8B4FE',
    description: 'Improve search visibility through technical SEO practices, local search dominance, high-authority backlink development, and core web vitals.',
    deliverables: ['Google Business Profile Setup', 'Core Web Vitals Audit', 'Keyword Clustering Strategy', 'High-Authority Link Outreach'],
    metrics: 'Sustainable First-Page Rankings',
  },
  {
    id: 'solaris',
    title: 'SOLARIS ENERGY',
    category: 'Clean Technology',
    subtitle: 'Next-Generation Perovskite Cells',
    year: '2026',
    row: 'lower',
    colIndex: 4,
    accentColor: '#12203A',
    secondaryColor: '#38BDF8',
    description: 'Enterprise investor presentation and technical product design for transparent photovoltaic building-integrated glass.',
    deliverables: ['Series B Pitch System', 'Technical 3D Renderings', 'Corporate Website', 'Interactive Efficiency Calculator'],
    metrics: '$28M Funding Round Closed',
  },
  {
    id: 'animated-ideas',
    title: 'NEW ANIMATED IDEAS',
    category: 'Motion Design',
    subtitle: 'Kinetic 3D Typography & Geometry',
    year: '2026',
    row: 'lower',
    colIndex: 5,
    accentColor: '#2C1138',
    secondaryColor: '#F43F5E',
    description: 'Procedural 3D transition framework and dynamic typography kit for bleeding-edge SaaS web experiences.',
    deliverables: ['Three.js Particle Pipeline', 'Framer Motion Design System', 'Component Library', '60 FPS Hardware Acceleration'],
    metrics: '60 FPS Hardware-Accelerated',
  },
  {
    id: 'tend',
    title: 'TEND GARDEN',
    category: 'Spatial Application',
    subtitle: 'A Tree Two People Grow Together.',
    year: '2026',
    row: 'lower',
    colIndex: 6,
    accentColor: '#0E2824',
    secondaryColor: '#34D399',
    description: 'Real-time collaborative digital garden connecting distant couples through collective touch rituals and generative foliage.',
    deliverables: ['WebGL Growth Simulation', 'Multi-User WebSocket Architecture', 'iOS / Web PWA', 'Soundscape Generation'],
    metrics: '120k Monthly Active Gardeners',
  },
  {
    id: 'new-year',
    title: 'NEW YEAR SPECIAL',
    category: 'Festival Creative',
    subtitle: 'Visionary Horizons Ahead',
    year: '2026',
    row: 'lower',
    colIndex: 7,
    accentColor: '#2F1522',
    secondaryColor: '#FDE047',
    description: 'Inspirational annual retrospective campaign driving corporate contract renewals and forward strategic momentum.',
    deliverables: ['Executive Keynote Video', 'Custom Illustrated Annual Report', 'Interactive Timeline', 'VIP Gift Experience'],
    metrics: '94% Client Retention Achieved',
  },
];

// High-resolution canvas texture renderer (1024 x 680) with crystal-sharp typography and crisp borders
function createTileTexture(tile: GlobeTile, renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const w = 1024;
  const h = 680;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Pristine deep space background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, tile.accentColor);
  bgGrad.addColorStop(0.45, '#0C0E1A');
  bgGrad.addColorStop(1, '#060710');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Cosmic Ambient Radial Glow
  const glow = ctx.createRadialGradient(w * 0.5, h * 0.45, 40, w * 0.5, h * 0.45, w * 0.55);
  glow.addColorStop(0, tile.secondaryColor + '25');
  glow.addColorStop(0.5, 'rgba(217, 70, 239, 0.08)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // 3. Render High-Fidelity Artwork / Portraits
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.46;

  switch (tile.id) {
    case 'radiates':
    case 'visionary-portrait': {
      // High-End Editorial Fashion Portrait (Chiaroscuro Model Silhouette)
      // Dramatic studio spotlight behind subject
      const spotGrad = ctx.createRadialGradient(cx, cy - 20, 10, cx, cy - 20, 180);
      spotGrad.addColorStop(0, 'rgba(232, 121, 249, 0.35)');
      spotGrad.addColorStop(0.6, 'rgba(139, 92, 246, 0.15)');
      spotGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 180, 0, Math.PI * 2);
      ctx.fill();

      // Portrait: Head & Shoulders silhouette with rim lighting
      // Shoulders
      ctx.fillStyle = '#090B14';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 130, 150, 70, 0, 0, Math.PI * 2);
      ctx.fill();

      // Neck
      ctx.fillStyle = '#E8C5AF';
      ctx.beginPath();
      ctx.rect(cx - 26, cy + 10, 52, 70);
      ctx.fill();

      // Neck shadow
      const neckShadow = ctx.createLinearGradient(cx - 26, cy + 10, cx + 26, cy + 10);
      neckShadow.addColorStop(0, 'rgba(0,0,0,0.5)');
      neckShadow.addColorStop(0.5, 'transparent');
      neckShadow.addColorStop(1, 'rgba(232, 121, 249, 0.3)');
      ctx.fillStyle = neckShadow;
      ctx.fillRect(cx - 26, cy + 10, 52, 70);

      // Head / Face oval
      const faceGrad = ctx.createLinearGradient(cx - 50, cy - 80, cx + 50, cy + 20);
      faceGrad.addColorStop(0, '#FFE8D6');
      faceGrad.addColorStop(0.5, '#DDB892');
      faceGrad.addColorStop(1, '#7F5539');
      ctx.fillStyle = faceGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy - 30, 48, 64, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sculpted high-fashion hair
      ctx.fillStyle = '#0F0E17';
      ctx.beginPath();
      ctx.ellipse(cx - 8, cy - 65, 56, 44, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 25, cy - 35, 30, 55, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Fuchsia rim light stroke on jaw and profile
      ctx.strokeStyle = '#E879F9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx + 36, cy - 25, 30, -Math.PI * 0.3, Math.PI * 0.4);
      ctx.stroke();

      // Gold earring glint
      ctx.fillStyle = '#FDE047';
      ctx.beginPath();
      ctx.arc(cx + 42, cy - 10, 5, 0, Math.PI * 2);
      ctx.fill();

      // Elegant editorial label pill
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx - 110, cy + 90, 220, 36, 18);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('EDITORIAL PORTRAITURE', cx, cy + 114);
      ctx.textAlign = 'left';
      break;
    }

    case 'elysium':
    case 'atelier-portrait': {
      // Avant-Garde Haute Couture Portrait in Violet Chiaroscuro
      const aura = ctx.createRadialGradient(cx, cy - 20, 20, cx, cy - 20, 160);
      aura.addColorStop(0, 'rgba(192, 132, 252, 0.35)');
      aura.addColorStop(1, 'transparent');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 160, 0, Math.PI * 2);
      ctx.fill();

      // Haute Couture Architectural Collar
      ctx.strokeStyle = '#C084FC';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 100, cy + 120);
      ctx.lineTo(cx, cy + 30);
      ctx.lineTo(cx + 100, cy + 120);
      ctx.stroke();

      // Sculpted portrait profile
      ctx.fillStyle = '#FAF5FF';
      ctx.beginPath();
      ctx.ellipse(cx, cy - 25, 42, 58, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Obsidian shadow half
      ctx.fillStyle = '#110F1E';
      ctx.beginPath();
      ctx.ellipse(cx - 14, cy - 25, 34, 58, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Gold headpiece crown ray
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 2.5;
      for (let a = -0.8; a <= 0.8; a += 0.35) {
        ctx.beginPath();
        ctx.moveTo(cx + Math.sin(a) * 45, cy - 50 - Math.cos(a) * 35);
        ctx.lineTo(cx + Math.sin(a) * 85, cy - 50 - Math.cos(a) * 65);
        ctx.stroke();
      }
      break;
    }

    case 'corvane':
    case 'chronos': {
      // Precision Swiss Tourbillon Chronograph
      // Outer brass/titanium gear
      ctx.strokeStyle = '#C6A66B';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.stroke();

      // Cog teeth
      ctx.fillStyle = '#C6A66B';
      for (let i = 0; i < 24; i++) {
        const ang = (i * Math.PI) / 12;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        ctx.fillRect(-5, -104, 10, 12);
        ctx.restore();
      }

      // Exposed sapphire crystal interior
      const crystal = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, 85);
      crystal.addColorStop(0, '#1E2538');
      crystal.addColorStop(0.7, '#0C0F17');
      crystal.addColorStop(1, '#05070A');
      ctx.fillStyle = crystal;
      ctx.beginPath();
      ctx.arc(cx, cy, 86, 0, Math.PI * 2);
      ctx.fill();

      // Balance wheel arms
      ctx.strokeStyle = '#E4D3AE';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy);
      ctx.lineTo(cx + 70, cy);
      ctx.moveTo(cx, cy - 70);
      ctx.lineTo(cx, cy + 70);
      ctx.stroke();

      // Inner tourbillon cage
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx.stroke();

      // Center ruby bearing
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      break;
    }

    case 'aura': {
      // High-End Studio Headphones with Soundwave
      ctx.strokeStyle = '#A78BFA';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 85, Math.PI, 0);
      ctx.stroke();

      // Earcups
      ctx.fillStyle = '#1E1B2E';
      ctx.strokeStyle = '#DDD6FE';
      ctx.lineWidth = 3;
      // Left
      ctx.beginPath();
      ctx.roundRect(cx - 105, cy - 40, 32, 70, 16);
      ctx.fill();
      ctx.stroke();
      // Right
      ctx.beginPath();
      ctx.roundRect(cx + 73, cy - 40, 32, 70, 16);
      ctx.fill();
      ctx.stroke();

      // Dynamic soundwave ripples
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = -80; x <= 80; x += 10) {
        const barH = Math.sin(x * 0.08) * 35 * Math.cos(x * 0.03);
        ctx.moveTo(cx + x, cy + 70 - barH);
        ctx.lineTo(cx + x, cy + 70 + barH);
      }
      ctx.stroke();
      break;
    }

    case 'dua': {
      // Pure Tropical Coconut & Crystal Water
      // Water ripples
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 2.5;
      for (let r = 50; r <= 140; r += 28) {
        ctx.beginPath();
        ctx.ellipse(cx, cy + 20, r * 1.5, r * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Coconut fibrous shell
      const shellGrad = ctx.createRadialGradient(cx - 10, cy - 10, 10, cx, cy, 80);
      shellGrad.addColorStop(0, '#854D0E');
      shellGrad.addColorStop(0.7, '#451A03');
      shellGrad.addColorStop(1, '#1C1917');
      ctx.fillStyle = shellGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx.fill();

      // White flesh interior
      ctx.fillStyle = '#FAFAF9';
      ctx.beginPath();
      ctx.ellipse(cx, cy - 4, 46, 54, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Emerald water center
      const waterGrad = ctx.createRadialGradient(cx, cy - 4, 5, cx, cy - 4, 38);
      waterGrad.addColorStop(0, '#A7F3D0');
      waterGrad.addColorStop(1, '#065F46');
      ctx.fillStyle = waterGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy - 4, 32, 40, -0.2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'informative-ai': {
      // Synaptic AI Neural Graph & Data Clusters
      const nodes = [
        { x: cx - 110, y: cy - 45 },
        { x: cx - 110, y: cy + 45 },
        { x: cx, y: cy - 65 },
        { x: cx, y: cy },
        { x: cx, y: cy + 65 },
        { x: cx + 110, y: cy - 35 },
        { x: cx + 110, y: cy + 35 },
      ];

      // Connections
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 2; i++) {
        for (let j = 2; j < 5; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      for (let j = 2; j < 5; j++) {
        for (let k = 5; k < 7; k++) {
          ctx.beginPath();
          ctx.moveTo(nodes[j].x, nodes[j].y);
          ctx.lineTo(nodes[k].x, nodes[k].y);
          ctx.stroke();
        }
      }

      // Glowing nodes
      nodes.forEach((n) => {
        const nGrad = ctx.createRadialGradient(n.x, n.y, 2, n.x, n.y, 14);
        nGrad.addColorStop(0, '#FFFFFF');
        nGrad.addColorStop(0.5, '#C084FC');
        nGrad.addColorStop(1, '#7E22CE');
        ctx.fillStyle = nGrad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 11, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'sigil': {
      // Visionary Creator Emblem
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Concentric geometric star
      ctx.fillStyle = '#F59E0B';
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        ctx.fillRect(-4, -75, 8, 20);
        ctx.restore();
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('01', cx, cy + 12);
      ctx.textAlign = 'left';
      break;
    }

    case 'web-dev': {
      // Modern 3D Code Cube & Terminal Wireframe
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 3;
      // Isometric Box
      ctx.beginPath();
      ctx.moveTo(cx, cy - 60);
      ctx.lineTo(cx + 70, cy - 25);
      ctx.lineTo(cx + 70, cy + 45);
      ctx.lineTo(cx, cy + 80);
      ctx.lineTo(cx - 70, cy + 45);
      ctx.lineTo(cx - 70, cy - 25);
      ctx.closePath();
      ctx.fillStyle = '#0F1E36';
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - 60);
      ctx.lineTo(cx, cy + 80);
      ctx.moveTo(cx, cy + 10);
      ctx.lineTo(cx + 70, cy - 25);
      ctx.moveTo(cx, cy + 10);
      ctx.lineTo(cx - 70, cy - 25);
      ctx.stroke();

      // Cyan core glow
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(cx, cy + 10, 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'reels': {
      // Kinetic Motion Camera Shutter Aperture
      ctx.strokeStyle = '#E879F9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.stroke();

      // 6 overlapping aperture blades
      ctx.fillStyle = 'rgba(232, 121, 249, 0.2)';
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(75, 20);
        ctx.lineTo(45, 75);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    default: {
      // Default Ultra-Sharp Geometric Motif
      ctx.strokeStyle = tile.secondaryColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 110, 40, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();

      const core = ctx.createRadialGradient(cx, cy, 5, cx, cy, 40);
      core.addColorStop(0, '#FFFFFF');
      core.addColorStop(0.5, tile.secondaryColor);
      core.addColorStop(1, 'transparent');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }
  ctx.restore();

  // 4. Inset Header: Category Pill & Year
  ctx.fillStyle = 'rgba(9, 11, 22, 0.85)';
  ctx.strokeStyle = tile.secondaryColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(40, 36, 280, 48, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(tile.category.toUpperCase(), 64, 66);

  // Year in Gold Mono
  ctx.fillStyle = tile.secondaryColor;
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(tile.year, w - 50, 66);
  ctx.textAlign = 'left';

  // 5. Inset Bottom Typography: Subtitle and Bold Title (Crisp, high-contrast)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(tile.subtitle, 46, h - 90);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(tile.title, 46, h - 38);

  // 6. Razor-Sharp Inset Bezel Frame (Crisp 24px inset margin prevents seam clipping / blur)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(20, 20, w - 40, h - 40, 16);
  ctx.stroke();

  // Subtle metallic corner highlights
  ctx.strokeStyle = tile.secondaryColor;
  ctx.lineWidth = 3;
  // Top left
  ctx.beginPath();
  ctx.moveTo(20, 50);
  ctx.lineTo(20, 20);
  ctx.lineTo(50, 20);
  ctx.stroke();
  // Bottom right
  ctx.beginPath();
  ctx.moveTo(w - 50, h - 20);
  ctx.lineTo(w - 20, h - 20);
  ctx.lineTo(w - 20, h - 50);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  const maxAniso = renderer.capabilities?.getMaxAnisotropy?.() || 8;
  texture.anisotropy = Math.min(maxAniso, 16);
  texture.needsUpdate = true;
  return texture;
}

// Polar cap texture: concentric metallic rings with engraved radial tick lines
function createPolarCapTexture(renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 256;
  const cy = 256;

  // Background
  const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 250);
  grad.addColorStop(0, '#1E2338');
  grad.addColorStop(0.5, '#0E1120');
  grad.addColorStop(1, '#06070E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Concentric rings
  ctx.strokeStyle = 'rgba(232, 121, 249, 0.3)';
  ctx.lineWidth = 1.5;
  for (let r = 40; r < 240; r += 32) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Radial tick marks
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 36; i++) {
    const ang = (i * Math.PI) / 18;
    const inner = (i % 3 === 0) ? 140 : 180;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * inner, cy + Math.sin(ang) * inner);
    ctx.lineTo(cx + Math.cos(ang) * 220, cy + Math.sin(ang) * 220);
    ctx.stroke();
  }

  // Center crest
  ctx.fillStyle = '#E879F9';
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  const maxAniso = renderer.capabilities?.getMaxAnisotropy?.() || 8;
  texture.anisotropy = Math.min(maxAniso, 16);
  return texture;
}

interface OrbisGlobeProps {
  onSelectProject?: (tile: GlobeTile) => void;
  onExploreServices?: () => void;
  onBookConsultation?: () => void;
}

export const OrbisGlobe: React.FC<OrbisGlobeProps> = ({
  onSelectProject,
  onExploreServices,
  onBookConsultation,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<GlobeTile | null>(null);
  const [facingTile, setFacingTile] = useState<GlobeTile>(GLOBE_TILES[0]);
  const [hoveredTile, setHoveredTile] = useState<GlobeTile | null>(null);
  const [latLon, setLatLon] = useState<{ lat: number; lon: number }>({ lat: 19.0, lon: 3.2 });

  const globeGroupRef = useRef<THREE.Group | null>(null);
  const tileMeshesRef = useRef<{ mesh: THREE.Mesh; tile: GlobeTile; initialPos: THREE.Vector3 }[]>([]);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 750;

    let renderer: THREE.WebGLRenderer;
    let isSoftwareGl = false;

    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const rendererStr = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
          if (/llvmpipe|swiftshader|software/i.test(rendererStr)) {
            isSoftwareGl = true;
          }
        }
      }
    } catch {
      // probe fallback
    }

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0.15, 0.0, 7.3);
    cameraRef.current = camera;

    // Environment Lighting
    try {
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();
    } catch (e) {
      console.warn('PMREM notice', e);
    }

    // Studio Lights - Cosmic Indigo & Fuchsia Rim
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fuchsiaRimLight = new THREE.DirectionalLight(0xd946ef, 3.2);
    fuchsiaRimLight.position.set(-6, -2, -3);
    scene.add(fuchsiaRimLight);

    const cyanFillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanFillLight.position.set(4, -5, 2);
    scene.add(cyanFillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Root Globe Group
    const isMobile = width < 768;
    const globeRoot = new THREE.Group();
    globeRoot.position.set(isMobile ? 0 : 0.62, isMobile ? 0.35 : -0.42, 0);
    globeGroupRef.current = globeRoot;
    scene.add(globeRoot);

    // 1. Sleek Underlying Metallic Chassis Sphere (eliminates any see-through gaps / stitching blur)
    const chassisGeo = new THREE.SphereGeometry(2.135, 64, 48);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x080a14,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    globeRoot.add(chassisMesh);

    // Subtle coordinate wireframe grid for high-tech spherical definition
    const gridGeo = new THREE.SphereGeometry(2.137, 24, 12);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    globeRoot.add(gridMesh);

    // 2. High-Definition 3D Tiled Sphere Posters
    const sphereRadius = 2.15;
    const tileMeshes: { mesh: THREE.Mesh; tile: GlobeTile; initialPos: THREE.Vector3 }[] = [];

    const rowConfigs = {
      upper: {
        thetaStart: Math.PI / 2 - 0.71,
        thetaLength: 0.41,
      },
      equator: {
        thetaStart: Math.PI / 2 - 0.26,
        thetaLength: 0.52,
      },
      lower: {
        thetaStart: Math.PI / 2 + 0.30,
        thetaLength: 0.41,
      },
    };

    const numCols = 8;
    const phiSpan = (Math.PI * 2) / numCols;
    const phiGap = 0.022; // Clean metallic hairline channel

    GLOBE_TILES.forEach((tile) => {
      const cfg = rowConfigs[tile.row];
      const phiStart = tile.colIndex * phiSpan + phiGap / 2;
      const phiLength = phiSpan - phiGap;

      const tileGeo = new THREE.SphereGeometry(
        sphereRadius,
        24,
        18,
        phiStart,
        phiLength,
        cfg.thetaStart,
        cfg.thetaLength
      );

      const tex = createTileTexture(tile, renderer);
      const tileMat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
      });

      const tileMesh = new THREE.Mesh(tileGeo, tileMat);
      tileMesh.userData = { tile };

      globeRoot.add(tileMesh);
      tileMeshes.push({
        mesh: tileMesh,
        tile,
        initialPos: tileMesh.position.clone(),
      });
    });

    tileMeshesRef.current = tileMeshes;

    // 3. Integrated Metallic Polar Caps
    const polarCapTex = createPolarCapTexture(renderer);
    const polarCapMat = new THREE.MeshBasicMaterial({
      map: polarCapTex,
      side: THREE.DoubleSide,
    });

    // Top Polar Cap
    const topCapGeo = new THREE.SphereGeometry(
      sphereRadius * 0.998,
      40,
      14,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2 - 0.71
    );
    const topCapMesh = new THREE.Mesh(topCapGeo, polarCapMat);
    globeRoot.add(topCapMesh);

    // Bottom Polar Cap
    const bottomCapGeo = new THREE.SphereGeometry(
      sphereRadius * 0.998,
      40,
      14,
      0,
      Math.PI * 2,
      Math.PI / 2 + 0.71,
      Math.PI / 2 - 0.71
    );
    const bottomCapMesh = new THREE.Mesh(bottomCapGeo, polarCapMat);
    globeRoot.add(bottomCapMesh);

    // 4. Raycasting & Drag Interaction
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velX = 0;
      velY = 0;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        velX = deltaX * 0.0035;
        velY = deltaY * 0.0025;

        globeRoot.rotation.y += velX;
        globeRoot.rotation.x += velY;
        globeRoot.rotation.x = Math.max(-0.55, Math.min(0.55, globeRoot.rotation.x));
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);
      const meshesToTest = tileMeshes.map((t) => t.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const tile = hit.userData.tile as GlobeTile;
        if (tile) {
          setSelectedPreview(tile);
          onSelectProject?.(tile);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    domEl.addEventListener('click', onCanvasClick);

    // Touch Support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dX = e.touches[0].clientX - touchStartX;
        const dY = e.touches[0].clientY - touchStartY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;

        globeRoot.rotation.y += dX * 0.0045;
        globeRoot.rotation.x += dY * 0.0025;
        globeRoot.rotation.x = Math.max(-0.55, Math.min(0.55, globeRoot.rotation.x));
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const mobileNow = w < 768;
      globeRoot.position.set(mobileNow ? 0 : 0.62, mobileNow ? 0.35 : -0.42, 0);
    };
    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    let animId: number;
    let mounted = true;
    const clock = new THREE.Clock();
    const _centerWorld = new THREE.Vector3();

    function tick() {
      if (!mounted) return;
      const delta = Math.min(clock.getDelta(), 0.1);

      if (!isDragging) {
        globeRoot.rotation.y += delta * 0.075;
      }

      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        globeRoot.rotation.y += velX;
        globeRoot.rotation.x += velY;
        globeRoot.rotation.x = Math.max(-0.55, Math.min(0.55, globeRoot.rotation.x));
      }

      // Telemetry
      const curLonDeg = Math.round(((-globeRoot.rotation.y * 180) / Math.PI) % 360);
      const curLatDeg = Math.round(((globeRoot.rotation.x * 180) / Math.PI) * 10) / 10;
      const cleanLon = curLonDeg < 0 ? curLonDeg + 360 : curLonDeg;
      setLatLon({
        lat: curLatDeg,
        lon: cleanLon,
      });

      // Find facing tile
      let minDistance = Infinity;
      let facingMatch: GlobeTile = GLOBE_TILES[0];

      tileMeshes.forEach(({ mesh, tile }) => {
        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox;
        if (bbox) {
          bbox.getCenter(_centerWorld);
          mesh.localToWorld(_centerWorld);
          const dist = _centerWorld.distanceTo(camera.position);
          if (dist < minDistance) {
            minDistance = dist;
            facingMatch = tile;
          }
        }
      });

      setFacingTile(facingMatch);

      // Hover Raycast
      raycaster.setFromCamera(mousePos, camera);
      const testList = tileMeshes.map((t) => t.mesh);
      const intersects = raycaster.intersectObjects(testList, false);

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const t = hoveredMesh.userData.tile as GlobeTile;
        setHoveredTile(t);
        domEl.style.cursor = 'pointer';
      } else {
        setHoveredTile(null);
        domEl.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        animId = window.setTimeout(() => {
          if (mounted) tick();
        }, 120);
      } else {
        animId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      mounted = false;
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('click', onCanvasClick);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (isSoftwareGl) {
        clearTimeout(animId);
      } else {
        cancelAnimationFrame(animId);
      }
      try {
        renderer.dispose();
        polarCapTex.dispose();
        polarCapMat.dispose();
        topCapGeo.dispose();
        bottomCapGeo.dispose();
        chassisGeo.dispose();
        chassisMat.dispose();
        gridGeo.dispose();
        gridMat.dispose();
        tileMeshes.forEach((t) => {
          t.mesh.geometry.dispose();
          const mat = t.mesh.material as THREE.MeshBasicMaterial;
          mat.map?.dispose();
          mat.dispose();
        });
        if (container.contains(domEl)) {
          container.removeChild(domEl);
        }
      } catch (err) {
        console.warn('Orbis cleanup notice', err);
      }
    };
  }, [onSelectProject]);

  return (
    <div className="relative w-full h-[95vh] min-h-[700px] bg-[#070814] text-white overflow-hidden select-none">
      {/* Background Cosmic Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_40%,rgba(217,70,239,0.12),rgba(139,92,246,0.06)_40%,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#3B82F6]/10 to-transparent blur-3xl" />

      {/* 1. Top HUD Coordinates Strip (Matching reference) */}
      <div className="absolute top-24 left-0 right-0 z-20 px-6 sm:px-12 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-neutral-400 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E879F9] animate-pulse" />
          <span className="tracking-widest">DIVE — CLICK TO OPEN</span>
        </div>
        <div className="flex items-center gap-6">
          <span>
            LAT <strong className="text-white font-bold">{latLon.lat}°</strong>
          </span>
          <span>
            LON <strong className="text-white font-bold">{latLon.lon}°</strong>
          </span>
          <span className="hidden sm:inline">
            SITES <strong className="text-[#E879F9] font-bold">24</strong>
          </span>
        </div>
      </div>

      {/* 2. Left Side Editorial Headline (Matching reference) */}
      <div className="absolute left-4 sm:left-12 bottom-6 sm:bottom-16 z-20 max-w-md pointer-events-none p-5 sm:p-0 rounded-3xl sm:rounded-none bg-[#070814]/85 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-none shadow-2xl sm:shadow-none">
        <div className="text-[11px] font-mono tracking-wider text-[#E879F9] uppercase mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E879F9]" />
          <span>TWENTY-FOUR CAMPAIGNS FROM ONE STUDIO</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
          One studio, <br />
          <span className="italic font-normal bg-gradient-to-r from-[#FFFFFF] via-[#F5D0FE] to-[#E879F9] bg-clip-text text-transparent">
            in the round.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed max-w-sm">
          Twenty-four sites and campaigns we engineered, wrapped around one world. Turn the globe, open any project, and sculpt your next breakthrough.
        </p>

        {/* Mobile current project badge */}
        <div className="md:hidden mt-3 flex items-center gap-2 text-[11px] font-mono text-neutral-300">
          <span className="text-[#E879F9]">FACING:</span>
          <span className="font-serif font-bold text-white truncate max-w-[160px]">
            {hoveredTile ? hoveredTile.title : facingTile.title}
          </span>
          <button
            onClick={() => {
              const target = hoveredTile || facingTile;
              setSelectedPreview(target);
              onSelectProject?.(target);
            }}
            className="text-[10px] uppercase tracking-wider underline text-[#E879F9] pointer-events-auto cursor-pointer"
          >
            [View Case]
          </button>
        </div>

        <div className="pt-5 flex items-center gap-3.5 pointer-events-auto">
          <button
            onClick={onBookConsultation}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#070814] bg-white hover:bg-neutral-100 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2 group active:scale-95"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={onExploreServices}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-[#0F1326]/80 hover:bg-[#1A213D] rounded-full border border-white/10 shadow-xs transition-colors cursor-pointer"
          >
            Explore Services
          </button>
        </div>
      </div>

      {/* 3. Bottom Right HUD: Facing You Project (Desktop) */}
      <div className="hidden md:block absolute right-6 sm:right-12 bottom-10 sm:bottom-16 z-20 text-right pointer-events-none">
        <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-1 flex items-center justify-end gap-2">
          <span>{hoveredTile ? 'UNDER THE CURSOR' : 'FACING YOU'}</span>
          <span className="font-bold text-[#E879F9]">
            {hoveredTile ? hoveredTile.category : facingTile.category}
          </span>
        </div>
        <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
          {hoveredTile ? hoveredTile.title : facingTile.title}
        </div>
        <div className="text-xs text-neutral-300 font-serif italic mt-0.5">
          {hoveredTile ? hoveredTile.subtitle : facingTile.subtitle}
        </div>

        <div className="pt-3 pointer-events-auto">
          <button
            onClick={() => {
              const target = hoveredTile || facingTile;
              setSelectedPreview(target);
              onSelectProject?.(target);
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D946EF]/20 hover:bg-[#D946EF]/35 border border-[#D946EF]/50 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-[#E879F9]" />
            <span>Open in Detail</span>
          </button>
        </div>
      </div>

      {/* 4. Three.js Mount Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        aria-label="3D Rotating Earth Sphere with Tiled Posters"
      />

      {/* 5. Detail Expansion Modal */}
      {selectedPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setSelectedPreview(null)}
        >
          <div
            className="bg-[#0D0F1E] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden text-white animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPreview(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Header */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E879F9] uppercase mb-2">
              <span>{selectedPreview.category}</span>
              <span>·</span>
              <span>Year {selectedPreview.year}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
              {selectedPreview.title}
            </h2>
            <p className="font-serif italic text-lg text-neutral-300 mb-4">
              "{selectedPreview.subtitle}"
            </p>

            {/* Visual Aero Poster Showcase Banner */}
            <div
              className="w-full h-40 rounded-2xl mb-5 relative overflow-hidden flex items-end p-5 border border-white/10 shadow-inner"
              style={{
                background: `linear-gradient(135deg, ${selectedPreview.accentColor} 0%, #11142A 60%, #070814 100%)`,
              }}
            >
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 border border-[#E879F9]/40 text-[10px] font-mono tracking-widest text-[#E879F9] uppercase">
                CAMPAIGN NO. {selectedPreview.colIndex + 1}
              </div>
              <div className="relative z-10 flex items-center justify-between w-full">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-[#E879F9] uppercase">
                    STUDIO ARCHIVE · {selectedPreview.year}
                  </span>
                  <div className="font-serif text-2xl font-bold text-white tracking-wide">
                    {selectedPreview.title}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">STATUS</div>
                  <div className="text-xs font-semibold text-[#86EFAC]">LIVE PRODUCTION</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedPreview.description}
            </p>

            {/* Deliverables & Metrics */}
            <div className="p-5 rounded-2xl bg-[#12162B] border border-white/10 mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#E879F9] mb-3 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Key Strategic Deliverables</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-200 mb-4">
                {selectedPreview.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E879F9]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Measurable Output:</span>
                <span className="font-serif font-bold text-sm text-[#F5D0FE]">{selectedPreview.metrics}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Orbit
              </button>
              <button
                onClick={() => {
                  setSelectedPreview(null);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#070814] bg-white hover:bg-neutral-100 rounded-full shadow-md transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
              >
                <span>Inquire For This Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
