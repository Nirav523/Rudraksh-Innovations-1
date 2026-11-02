import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, X, Sparkles, Camera, Layers, ExternalLink, ZoomIn, Play, Pause } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface CreativeGalleryProps {
  onProjectInquiry?: (projectTitle: string) => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'Social Campaigns' | 'Viral Reels' | 'Brand Identity' | 'Web & UI';
  client: string;
  year: string;
  imageUrl: string;
  isCircularWindow?: boolean;
  aspectClass: string;
  description: string;
  disciplines: string[];
}

interface InteractiveGalleryCardProps {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}

const InteractiveGalleryCard: React.FC<InteractiveGalleryCardProps> = ({ item, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(item)}
      className={`relative shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group shadow-xl bg-neutral-900 border border-white/10 hover:border-amber-400/60 hover:shadow-[0_12px_36px_rgba(245,158,11,0.25)] transition-all duration-500 select-none ${item.aspectClass}`}
    >
      <div className="w-full h-full overflow-hidden relative bg-black">
        <img
          src={item.imageUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          style={{
            transformOrigin: isHovered ? `${mousePos.x}% ${mousePos.y}%` : 'center center',
          }}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out will-change-transform ${
            isHovered ? 'scale-140' : 'scale-100'
          }`}
        />
      </div>

      {/* Hover Zoom Badge */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/30 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl scale-90 group-hover:scale-100">
        <ZoomIn className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
        <span className="text-[10px] font-mono tracking-wider text-amber-100 font-semibold uppercase">
          Zoom
        </span>
      </div>

      {/* Info Card Overlay with Smooth Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[10px] uppercase tracking-wider text-[#F59E0B] font-bold block mb-0.5">
            {item.category}
          </span>
          <h4 className="font-bold text-sm sm:text-base leading-tight text-white drop-shadow-sm">
            {item.title}
          </h4>
          <div className="flex items-center justify-between mt-1 text-[11px] text-neutral-300">
            <span>{item.client}</span>
            <span className="text-amber-400/90 font-mono text-[10px]">Click to View →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreativeGallery: React.FC<CreativeGalleryProps> = ({ onProjectInquiry }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showAllDetailsModal, setShowAllDetailsModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Curated agency portfolio containing the authentic 23 client works & campaign drops
  const row1Items: GalleryItem[] = [
    {
      id: 'work-1',
      title: 'Heineken 0.0 Pure Malt Lager',
      category: 'Social Campaigns',
      client: 'Heineken Global Beverages',
      year: '2026',
      imageUrl: '/assets/aistudio/phototune.ai_1793344577_4a2eb875.png',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Chilled commercial hero product launch featuring condensation drops, crisp carbonation glow, frosted glassware, and roasted snack pairings.',
      disciplines: ['Commercial Shoot', 'Product Retouching', 'Social Media Ads'],
    },
    {
      id: 'work-2',
      title: 'PlayStation Built To Win',
      category: 'Social Campaigns',
      client: 'Sony PlayStation',
      year: '2026',
      imageUrl: '/assets/aistudio/Comment_your_favorite_emoji_below__and_I_ll_send_you_the_prompt_Created_this_premium_PlayStation_6424513e.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'DualSense Edge Wireless Controller campaign with pro-level esports typography and futuristic interactive holographic HUD elements.',
      disciplines: ['Esports Advertising', 'Holographic UI', 'Poster Design'],
    },
    {
      id: 'work-3',
      title: 'Nissin Cup Noodles Super Hot',
      category: 'Viral Reels',
      client: 'Nissin Foods India',
      year: '2026',
      imageUrl: '/assets/aistudio/output-image_1aa227fd.jpeg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Steaming chili-infused noodles fork-lift hero creative with fresh lime wedges, red chilies, and high-energy viral ad composition.',
      disciplines: ['FMCG Commercial', 'Food Styling', 'High-Conversion Reels'],
    },
    {
      id: 'work-4',
      title: 'Brooke Bond Taj Mahal Tea',
      category: 'Brand Identity',
      client: 'Brooke Bond Taj Mahal',
      year: '2026',
      imageUrl: '/assets/aistudio/12344_d4649340.jpeg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Royal heritage artisanal chai campaign with traditional ceramic earthenware cups, steaming aroma, and raw aromatic cinnamon and cardamom.',
      disciplines: ['Heritage Branding', 'Product Staging', 'Commercial Photography'],
    },
    {
      id: 'work-5',
      title: 'Grab It. Love It. Gourmet Burger',
      category: 'Social Campaigns',
      client: 'Gourmet Burger Drop',
      year: '2026',
      imageUrl: '/assets/aistudio/1234_c3ad84d1.jpeg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Playful parachute delivery visual creative with bold red backdrop, sesame brioche bun textures, and punchy promotional copywriting.',
      disciplines: ['Food Advertising', 'Creative Manipulation', 'Conversion Creatives'],
    },
    {
      id: 'work-6',
      title: 'Hyphen Dual-Phase Serum',
      category: 'Social Campaigns',
      client: 'Hyphen Skincare India',
      year: '2026',
      imageUrl: '/assets/aistudio/wmremove-transformed_f5d253a0.jpeg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Luxury beauty travel campaign staging dual-phase de-pigmentation serum bottles over premium blush leather luggage and sunglasses.',
      disciplines: ['D2C Skincare', 'Luxury Product Shoot', 'Meta Ad Creatives'],
    },
    {
      id: 'work-7',
      title: 'Yoga Bar High Protein Oats',
      category: 'Social Campaigns',
      client: 'Yoga Bar Superfoods',
      year: '2026',
      imageUrl: '/assets/aistudio/phototune.ai_1793344498_cae197e2.png',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Vibrant lifestyle breakfast shoot capturing fitness enthusiasts enjoying Kesar Pista Kulfi high-protein oats with whole almonds.',
      disciplines: ['FMCG Lifestyle Shoot', 'D2C Creative', 'Influencer Angle'],
    },
    {
      id: 'work-8',
      title: 'Brownsticks Live Artistically',
      category: 'Brand Identity',
      client: 'Brownsticks Interiors',
      year: '2026',
      imageUrl: '/assets/aistudio/8_a80d36b9.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Modern architectural interior campaign with camera viewfinder grid UI and sophisticated olive green curved furniture styling.',
      disciplines: ['Interior Branding', 'Architectural Storytelling', 'Visual Identity'],
    },
    {
      id: 'work-9',
      title: 'Happy Diwali Festive Saree',
      category: 'Social Campaigns',
      client: 'Royal Heritage Silks',
      year: '2026',
      imageUrl: '/assets/aistudio/c3e39ced-76ec-4cc5-90af-1bf0742e6198_b78ac3e1.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Festive Diwali campaign intertwining warm terracotta diya flame glow with folded traditional silk sarees and marigold petals.',
      disciplines: ['Festive Campaign', 'Still Life Retouching', 'Social Media Creatives'],
    },
    {
      id: 'work-10',
      title: 'Happy Dussehra Mythological Drop',
      category: 'Social Campaigns',
      client: 'Rudraksh Mythos Series',
      year: '2026',
      imageUrl: '/assets/aistudio/___Dussehra_Premium_PSD_Drop____Celebrate_the_victory_of_good_over_evil_with_our_6_Premium_PS-ezremove_9c5cbb2c.png',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Epic midnight battle poster illustrating Lord Rama drawing his celestial glowing arrow against the colossal multi-headed silhouette of Ravana.',
      disciplines: ['Mythological Art', 'Digital Illustration', 'Festive PSD Drop'],
    },
    {
      id: 'work-11',
      title: 'Happy Navratri Dandiya Raas',
      category: 'Viral Reels',
      client: 'Gujarat Cultural Mahotsav',
      year: '2026',
      imageUrl: '/assets/aistudio/Created_this_beautiful_Navratri_post_using_ChatGPT____.Honestly__AI_makes_it_so_much_easier_to_b__2__a2c56e2a.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Gujarati folk couple dancing Garba Raas with vibrant wooden dandiya sticks framed by a radiant crimson full moon and marigolds.',
      disciplines: ['Folk Culture Motion', 'Festival Creatives', 'Social Media Strategy'],
    },
    {
      id: 'work-12',
      title: 'Happy Dhanteras Goddess Lakshmi',
      category: 'Social Campaigns',
      client: 'Divine Wealth Series',
      year: '2026',
      imageUrl: '/assets/aistudio/One_festival__6_creative_designs__all_made_with_AI____Exploring_new_ideas_and_turning_creativit__3__d8b6d2c0.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Luminous depiction of Goddess Lakshmi seated on a pink lotus with golden kalash urn brimming with gold coins and radiant diyas.',
      disciplines: ['Devotional Art', 'Gold Foil Simulation', 'Festive Campaigns'],
    },
  ];

  const row2Items: GalleryItem[] = [
    {
      id: 'work-13',
      title: 'Ganesh Chaturthi Family Devotion',
      category: 'Social Campaigns',
      client: 'Traditional Indian Festivities',
      year: '2026',
      imageUrl: '/assets/aistudio/Created_this_beautiful_Ganesh_Chaturthi_post_using_ChatGPT_Honestly__AI_makes_it_so_much_easier___1__fcf1a759.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Heartfelt celebration capturing an Indian family seated together in devotion before an idol of Lord Ganesha in warm sunlit ambiance.',
      disciplines: ['Cultural Storytelling', 'Festive Photography', 'Brand Emotion'],
    },
    {
      id: 'work-14',
      title: 'Happy Navratri Sacred Trishul',
      category: 'Social Campaigns',
      client: 'Shakti Divinity Series',
      year: '2026',
      imageUrl: '/assets/aistudio/Created_this_beautiful_Navratri_post_using_ChatGPT____.Honestly__AI_makes_it_so_much_easier_to_b_56d74083.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Glistening golden trishul held by a henna-decorated bridal hand casting the nine-armed divine shadow of Maa Durga onto marble walls.',
      disciplines: ['Creative Concept', 'Shadow Manipulation', 'Festive Poster'],
    },
    {
      id: 'work-15',
      title: 'Shree Ganeshay Namah Botanical',
      category: 'Brand Identity',
      client: 'Eco Ganesha Art Collective',
      year: '2026',
      imageUrl: '/assets/aistudio/Created_this_beautiful_Ganesh_Chaturthi_post_using_ChatGPT_Honestly__AI_makes_it_so_much_easier__2d991aa7.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Sculptural emerald-green leaf origami rendition of Lord Ganesha with gold leaf trimming and hand-drawn Devanagari calligraphy.',
      disciplines: ['Minimalist Art', 'Eco Branding', 'Calligraphy Integration'],
    },
    {
      id: 'work-16',
      title: 'Happy Rath Yatra Puri Chariot',
      category: 'Social Campaigns',
      client: 'Puri Jagannath Heritage',
      year: '2026',
      imageUrl: '/assets/aistudio/Agar_aap_bhi_AI_se_aise_beautiful_festival_posts_banana_chahte_ho__to_bas_ek_ChatGPT_prompt_hi_k_a5ab263b.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Panoramic festival procession capturing millions of devotees pulling the sacred chariot of Lord Jagannath in golden afternoon light.',
      disciplines: ['Heritage Marketing', 'Crowd Composition', 'Cultural Poster'],
    },
    {
      id: 'work-17',
      title: 'Happy Dhanteras Palace Kalash',
      category: 'Social Campaigns',
      client: 'Palace Heritage Jewelers',
      year: '2026',
      imageUrl: '/assets/aistudio/One_festival__6_creative_designs__all_made_with_AI____Exploring_new_ideas_and_turning_creativit_7c4f0161.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Symmetrical royal Rajasthani palace archway framed by ornate golden urns brimming with gold coins and reflections over polished marble.',
      disciplines: ['3D Environment', 'Jewelry Promotion', 'Festive Campaigns'],
    },
    {
      id: 'work-18',
      title: 'Merry Christmas Medical Stethoscope',
      category: 'Social Campaigns',
      client: 'MedCare Health Group',
      year: '2026',
      imageUrl: '/assets/aistudio/ee4b7589-246a-47f9-8824-5527bd8e30be_248162b8.jpg',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Warm holiday greeting conceptually blending a doctor’s stethoscope around a plush red velvet Santa hat over reflective crimson glass.',
      disciplines: ['Healthcare Branding', 'Holiday Post', 'Concept Still Life'],
    },
    {
      id: 'work-19',
      title: 'Merry Christmas Luxury Living Space',
      category: 'Brand Identity',
      client: 'Velvet & Timber Studio',
      year: '2026',
      imageUrl: '/assets/aistudio/___Christmas_Premium_PSD_Drop____Celebrate_the_season_of_joy_with_our_Premium_Christmas_PSD_T__1_-ezremove_d5359ee2.png',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Sophisticated wine-red interior space with a tall decorated Christmas pine, candy canes, velvet lounge chair, and designer lighting.',
      disciplines: ['Interior Architecture', 'Festive Drop', 'Visual Staging'],
    },
    {
      id: 'work-20',
      title: 'Happy Onam Sadhya Feast Boat',
      category: 'Social Campaigns',
      client: 'Kerala Tourism Board',
      year: '2026',
      imageUrl: '/assets/aistudio/__Comment__Onam__to_get_FREE_PSDs___Celebrate_this_Onam_with_creativity_that_shines___We_re-ezremove_f97280cc.png',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Creative aerial perspective of four boatmen rowing a giant banana leaf loaded with Onam delicacies through sun-dappled emerald waters.',
      disciplines: ['Conceptual Creative', 'Tourism Marketing', 'Festive Campaigns'],
    },
    {
      id: 'work-21',
      title: 'Nissin Super Hot Fire Macro',
      category: 'Viral Reels',
      client: 'Nissin Foods India',
      year: '2026',
      imageUrl: '/assets/aistudio/phototune.ai_1793344683_8477e265.png',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Macro food styling capturing streaming hot red-chili noodles and fiery red dipping sauce engineered for high-retention vertical reels.',
      disciplines: ['Macro Food Videography', 'Viral Hook Creative', 'Commercial Production'],
    },
    {
      id: 'work-22',
      title: 'Happy Diwali Diamond Jewelry Diya',
      category: 'Brand Identity',
      client: 'Prestige Diamond House',
      year: '2026',
      imageUrl: '/assets/aistudio/Untitled_design__2__e77e333a.png',
      aspectClass: 'w-[190px] sm:w-[230px] md:w-[260px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Exquisite diamond necklace formed in the silhouette of a lit diya resting gently on a sketched gold-outlined hand against deep burgundy silk.',
      disciplines: ['Jewelry Retouching', 'Luxury Creative', 'Festive Typography'],
    },
    {
      id: 'work-23',
      title: 'Rudra Furniture Sourcing Cohesive Spaces',
      category: 'Web & UI',
      client: 'Rudra Furniture Sourcing',
      year: '2026',
      imageUrl: '/assets/aistudio/12_d19806ad.png',
      aspectClass: 'w-[300px] sm:w-[380px] md:w-[450px] h-[260px] sm:h-[310px] md:h-[350px]',
      description: 'Expansive luxury interior catalog showcase highlighting tailored linen sofas, leather lounge chairs, dark wood tables, and integrated shelving.',
      disciplines: ['Interior Catalog', 'Web Platform', 'Architectural Staging'],
    },
  ];

  const allItems = [...row1Items, ...row2Items];
  const filteredItems = activeFilter === 'All'
    ? allItems
    : allItems.filter((item) => item.category === activeFilter);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yRow1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yRow2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} id="portfolio" className="py-10 sm:py-14 relative bg-[#07090E] text-white overflow-hidden border-t border-b border-white/5 font-sans">
      <motion.div style={{ y: yHeader }} className="max-w-7xl mx-auto px-6 sm:px-8 mb-6 sm:mb-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold tracking-widest text-[#F59E0B] uppercase mb-2">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/1__2__58ec0766.png"
                  alt="Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <span>CURATED WORK & CASE STUDIES</span>
              <span className="text-white/40">·</span>
              <span className="text-white/80">RUDRAKSH INNOVATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-sans leading-none mb-4">
              Our Work
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg">
              Curated selection of our most captivating viral campaigns, short-form reels, branding systems, and high-impact digital experiences.
            </p>
          </div>

          {/* Right Action: Smooth Drift Control & Pill Button "See Details →" */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsMarqueePaused(!isMarqueePaused)}
              className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              title={isMarqueePaused ? "Resume smooth scrolling" : "Pause gallery movement"}
            >
              <span className={`w-2 h-2 rounded-full ${isMarqueePaused ? 'bg-amber-500' : 'bg-emerald-400 animate-pulse'}`} />
              <span className="hidden sm:inline">{isMarqueePaused ? 'Drift Paused' : 'Smooth & Slow Drift'}</span>
              <span className="sm:hidden">{isMarqueePaused ? 'Paused' : 'Slow'}</span>
              {isMarqueePaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3 text-neutral-400" />}
            </button>

            <button
              onClick={() => setShowAllDetailsModal(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-[#F59E0B] text-black text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer group"
            >
              <span>See Details</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Social Campaigns', 'Viral Reels', 'Brand Identity', 'Web & UI'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-[#F59E0B] text-black font-bold shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Dynamic Multi-Row Photography Grid with Smooth, Slow Infinite Drift + Parallax Drift */}
      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden select-none">
        
        {/* Row 1 - Moves slowly & smoothly to RIGHT with vertical parallax; pauses on hover for zoom inspection */}
        <motion.div style={{ y: yRow1 }} className="relative w-full overflow-hidden">
          <div
            className="flex gap-3 sm:gap-4 w-max cursor-pointer animate-marquee-right-slow pause-on-hover"
            style={{ animationPlayState: isMarqueePaused ? 'paused' : undefined }}
          >
            {[...row1Items, ...row1Items]
              .filter((item) => activeFilter === 'All' || item.category === activeFilter)
              .map((item, index) => (
                <InteractiveGalleryCard
                  key={`${item.id}-r1-${index}`}
                  item={item}
                  onSelect={(selected) => setSelectedItem(selected)}
                />
              ))}
          </div>
        </motion.div>

        {/* Row 2 - Moves slowly & smoothly to LEFT with opposing vertical parallax; pauses on hover for zoom inspection */}
        <motion.div style={{ y: yRow2 }} className="relative w-full overflow-hidden">
          <div
            className="flex gap-3 sm:gap-4 w-max cursor-pointer animate-marquee-left-slow pause-on-hover"
            style={{ animationPlayState: isMarqueePaused ? 'paused' : undefined }}
          >
            {[...row2Items, ...row2Items]
              .filter((item) => activeFilter === 'All' || item.category === activeFilter)
              .map((item, index) => (
                <InteractiveGalleryCard
                  key={`${item.id}-r2-${index}`}
                  item={item}
                  onSelect={(selected) => setSelectedItem(selected)}
                />
              ))}
          </div>
        </motion.div>
      </div>

      {/* Single Project Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0D0E16] text-white border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                <div className="w-full bg-[#08090F] relative flex flex-col items-center justify-center p-4 sm:p-6 border-b border-white/10">
                  <div className="relative max-h-[52vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/80 p-2 shadow-2xl border border-white/10 group cursor-zoom-in">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[48vh] w-auto max-w-full object-contain rounded-xl group-hover:scale-130 transition-transform duration-700 ease-out will-change-transform"
                    />
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                      <ZoomIn className="w-3 h-3 text-[#F59E0B]" />
                      <span>Hover Zoom</span>
                    </div>
                  </div>
                  <div className="w-full mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#F59E0B]">
                        {selectedItem.category} Case Study
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">{selectedItem.title}</h3>
                    </div>
                    <span className="text-xs text-neutral-400 font-mono shrink-0">{selectedItem.year}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    <div>
                      <span className="text-neutral-400 block mb-1">Commissioned By</span>
                      <span className="font-semibold text-white">{selectedItem.client}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block mb-1">Discipline</span>
                      <span className="font-semibold text-[#F59E0B]">{selectedItem.category}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                      Delivered Disciplines:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.disciplines.map((d, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/10 text-xs text-neutral-200 border border-white/10"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Ready to initiate your creative campaign?</span>
                    <button
                      onClick={() => {
                        const title = selectedItem.title;
                        setSelectedItem(null);
                        onProjectInquiry?.(title);
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* "See Details" Full Showcase Index Modal */}
      <AnimatePresence>
        {showAllDetailsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#0B0C14] text-white border border-white/15 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Logo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#F59E0B]">
                      Rudraksh Innovations Portfolio Index
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold">Our Work & Case Studies</h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllDetailsModal(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid of All Work */}
              <div className="overflow-y-auto py-6 space-y-4 pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {allItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowAllDetailsModal(false);
                        setSelectedItem(item);
                      }}
                      className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-neutral-900 relative">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <ZoomIn className="w-3 h-3 text-[#F59E0B]" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#F59E0B]">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-sm leading-snug group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                        <span>{item.client}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0 text-xs text-neutral-400">
                <span>Total {allItems.length} Published Projects & Campaigns</span>
                <button
                  onClick={() => {
                    setShowAllDetailsModal(false);
                    onProjectInquiry?.('Full Creative Portfolio Consultation');
                  }}
                  className="px-5 py-2 rounded-full bg-[#F59E0B] text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Book Creative Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
