import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { AGENCY_INFO } from '../data/agencyData';
import { UploadCloud, CheckCircle2, AlertCircle, X, MapPin } from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPinTooltip, setShowPinTooltip] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax scroll effects across the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yGlow = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yMap = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yForm = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yInfo = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Sync preselectedService if passed from services or pricing cards
  React.useEffect(() => {
    if (preselectedService && !message) {
      setMessage(`Inquiry regarding: ${preselectedService}`);
    }
  }, [preselectedService]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid e-mail address.');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Please provide a phone number so we can reach you.');
      return;
    }

    if (!message.trim()) {
      setErrorMsg('Please enter a brief message or project outline.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setAttachedFile(null);
    setSubmitted(false);
    setErrorMsg('');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-10 sm:py-14 relative overflow-hidden bg-[#07090E] text-white border-t border-white/5 font-sans">
      {/* Background ambient lighting with parallax */}
      <motion.div
        style={{ y: yGlow }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#F59E0B]/12 via-[#38BDF8]/10 to-transparent blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Architectural Cadastral Map Container */}
        <div className="relative bg-[#151619] rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.6)] min-h-[520px] sm:min-h-[560px] lg:min-h-[600px] p-6 sm:p-10 flex flex-col justify-between overflow-hidden lg:overflow-visible">
          
          {/* Detailed Vector Cadastral Architectural Map with subtle Parallax */}
          <motion.div
            style={{ y: yMap }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <svg
              className="w-full h-full object-cover opacity-85 select-none rounded-[24px] sm:rounded-[32px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="cadastralGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#202227" strokeWidth="0.75" />
                </pattern>
              </defs>

              {/* Base dark canvas */}
              <rect width="1200" height="600" fill="#141518" />
              <rect width="1200" height="600" fill="url(#cadastralGrid)" opacity="0.4" />

              {/* River & Topographic Contours (Representing Sabarmati & Ahmedabad landscape) */}
              <path
                d="M -50 40 Q 60 70, 110 130 T 170 210 T 260 270 T 380 300 T 540 370 T 630 480 T 720 620 L -50 620 Z"
                fill="#0F1013"
                stroke="#2B2E35"
                strokeWidth="1.5"
              />
              <path
                d="M -30 20 Q 80 50, 130 110 T 190 190 T 280 250 T 400 280 T 560 350 T 650 460 T 740 600"
                fill="none"
                stroke="#24262D"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M -10 0 Q 100 30, 150 90 T 210 170 T 300 230 T 420 260 T 580 330 T 670 440 T 760 580"
                fill="none"
                stroke="#1E2026"
                strokeWidth="1"
              />

              {/* Major Arterial Roads & Avenues */}
              <g stroke="#353841" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 280 0 L 750 470 L 1250 560" />
                <path d="M 450 0 L 890 440 L 1220 480" />
                <path d="M 720 0 L 1020 300 L 1220 320" />
                <path d="M 120 120 L 520 520 L 700 620" />
                <path d="M 420 100 L 980 40" />
                <path d="M 330 240 L 1150 160" />
                <path d="M 490 310 L 1150 240" />
                <path d="M 620 420 L 1180 340" />
              </g>

              {/* Secondary Local Street Network */}
              <g stroke="#26282F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 320 40 L 480 180" />
                <path d="M 380 60 L 540 200" />
                <path d="M 440 80 L 600 220" />
                <path d="M 520 120 L 680 260" />
                <path d="M 580 140 L 740 280" />
                <path d="M 640 160 L 800 300" />
                <path d="M 720 200 L 880 340" />
                <path d="M 780 220 L 940 360" />
                <path d="M 840 240 L 1000 380" />
                <path d="M 900 260 L 1060 400" />

                <path d="M 480 140 L 360 260" />
                <path d="M 550 160 L 430 280" />
                <path d="M 610 180 L 490 300" />
                <path d="M 680 220 L 560 340" />
                <path d="M 750 240 L 630 360" />
                <path d="M 820 280 L 700 400" />
                <path d="M 890 300 L 770 420" />
                <path d="M 960 340 L 840 460" />
              </g>

              {/* Architectural Building Footprints / Parcels */}
              <g fill="#1B1D22" stroke="#2C2F37" strokeWidth="0.8">
                <rect x="525" y="195" width="28" height="20" rx="1" />
                <rect x="560" y="190" width="32" height="24" rx="1" />
                <rect x="540" y="225" width="45" height="18" rx="1" />
                <rect x="595" y="220" width="22" height="28" rx="1" />

                <rect x="635" y="240" width="38" height="26" rx="1" />
                <rect x="680" y="235" width="42" height="22" rx="1" />
                <rect x="650" y="275" width="50" height="24" rx="1" />

                {/* HQ Building highlight where pin sits */}
                <rect x="548" y="248" width="24" height="24" rx="2" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />

                <rect x="735" y="270" width="46" height="30" rx="1" />
                <rect x="790" y="265" width="34" height="25" rx="1" />
                <rect x="750" y="310" width="55" height="22" rx="1" />

                <rect x="840" y="295" width="44" height="32" rx="1" />
                <rect x="895" y="290" width="40" height="28" rx="1" />
                <rect x="860" y="335" width="52" height="26" rx="1" />

                <rect x="945" y="330" width="48" height="34" rx="1" />
                <rect x="1005" y="325" width="36" height="28" rx="1" />
                <rect x="970" y="375" width="58" height="26" rx="1" />
              </g>
            </svg>
          </motion.div>

          {/* Top-Left Action: "look at google maps —" with Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-amber-500/40 bg-black/60 p-0.5 overflow-hidden flex items-center justify-center shadow-lg">
              <img
                src="/assets/aistudio/1__2__58ec0766.png"
                alt="Rudraksh Innovations Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <a
              href={AGENCY_INFO.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300 hover:text-[#F59E0B] transition-colors group cursor-pointer"
            >
              <span className="tracking-wide">look at google maps</span>
              <span className="font-mono text-neutral-400 group-hover:translate-x-1 transition-transform">—</span>
            </a>
          </div>

          {/* Interactive Map Pin Marker */}
          <div
            className="absolute left-[45%] lg:left-[43%] top-[41%] -translate-x-1/2 -translate-y-full z-10 cursor-pointer group"
            onClick={() => setShowPinTooltip(!showPinTooltip)}
            onMouseEnter={() => setShowPinTooltip(true)}
            onMouseLeave={() => setShowPinTooltip(false)}
          >
            {/* Pulse ripple */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
            
            {/* White/Amber Teardrop Pin */}
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-9 sm:w-9 sm:h-10 bg-white rounded-full rounded-br-none -rotate-45 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <div className="rotate-45 text-neutral-900">
                  <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#F59E0B] text-neutral-900" />
                </div>
              </div>
              <div className="w-3 h-1.5 bg-black/40 rounded-full blur-[1px] mt-0.5" />
            </div>

            {/* Interactive Tooltip Card with Company Logo */}
            <AnimatePresence>
              {showPinTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0B0E17]/95 text-white text-xs px-4 py-2.5 rounded-xl border border-amber-500/30 shadow-2xl backdrop-blur-md whitespace-nowrap z-30 pointer-events-none flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-full border border-amber-500/40 bg-black/80 overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Rudraksh Innovations Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white tracking-wide">Rudraksh Innovations Pvt. Ltd.</div>
                    <div className="text-[11px] text-amber-400 font-mono">HQ · Vastral, Ahmedabad, Gujarat (382418)</div>
                    <div className="text-[10px] text-neutral-400">{AGENCY_INFO.contact.phone}</div>
                  </div>
                  <div className="w-2 h-2 bg-[#0B0E17] border-r border-b border-amber-500/30 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Left Column Bottom: Real Address & Contact Info from rudrakshinnovations.com with Parallax */}
          <motion.div
            style={{ y: yInfo }}
            className="relative z-10 max-w-md mt-auto pt-24 sm:pt-32 space-y-4"
          >
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-amber-500/40 bg-black/60 p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src="/assets/aistudio/1__2__58ec0766.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#F59E0B] uppercase font-mono font-semibold">
                  REGISTERED OFFICE & HEADQUARTERS
                </div>
              </div>
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal space-y-1">
                <p className="text-white font-medium">Rudraksh Innovations Private Limited</p>
                <p className="text-neutral-300">{AGENCY_INFO.contact.address}</p>
                <div className="pt-2 flex flex-col gap-1 text-xs">
                  <a href={`tel:${AGENCY_INFO.contact.phone.replace(/\s+/g, '')}`} className="text-neutral-300 hover:text-white transition-colors">
                    Phone: <span className="font-semibold text-white">{AGENCY_INFO.contact.phone}</span>
                  </a>
                  <a href={`tel:${AGENCY_INFO.contact.alternatePhone.replace(/\s+/g, '')}`} className="text-neutral-300 hover:text-white transition-colors">
                    Alternate: <span className="font-semibold text-white">{AGENCY_INFO.contact.alternatePhone}</span>
                  </a>
                  <a href={`mailto:${AGENCY_INFO.contact.email}`} className="text-neutral-300 hover:text-white transition-colors">
                    Email: <span className="font-semibold text-white">{AGENCY_INFO.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Headline: "Contact us" */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white font-sans">
              Contact us
            </h2>
          </motion.div>

          {/* Overlapping Floating White Feedback Form Card with Parallax */}
          <motion.div
            style={{ y: yForm }}
            className="mt-8 lg:mt-0 lg:absolute lg:top-8 xl:top-8 lg:right-8 xl:right-12 lg:w-[450px] xl:w-[480px] z-20"
          >
            <div className="bg-white text-neutral-900 rounded-[20px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-7 sm:p-9 border border-neutral-100">
              
              {/* Card Eyebrow with Official Company Logo */}
              <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-neutral-500 uppercase font-mono mb-6 flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-amber-500/40 bg-black p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src="/assets/aistudio/1__2__58ec0766.png"
                      alt="Rudraksh Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>INQUIRY & PROPOSAL</span>
                </div>
                <span className="text-[#F59E0B] font-semibold text-[10px]">24H RESPONSE</span>
              </div>

              {submitted ? (
                /* Success Message State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Inquiry Received</h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto leading-relaxed">
                      Thank you for contacting Rudraksh Innovations. Our strategy team in Ahmedabad will review your brief and contact you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center text-xs font-semibold text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name or Company"
                      className="w-full bg-transparent border-b border-neutral-200 py-2.5 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors font-sans"
                    />
                  </div>

                  {/* E-mail field */}
                  <div>
                    <label htmlFor="contact-email" className="sr-only">E-mail</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Business E-mail"
                      className="w-full bg-transparent border-b border-neutral-200 py-2.5 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors font-sans"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">Phone</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp (+91 ...)"
                      className="w-full bg-transparent border-b border-neutral-200 py-2.5 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors font-sans"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      id="contact-message"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Project details, goals, or services required..."
                      className="w-full bg-transparent border-b border-neutral-200 py-2.5 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors resize-none font-sans"
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Action Row */}
                  <div className="pt-3 flex items-center justify-between gap-4">
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="contact-file-upload"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor="contact-file-upload"
                        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 cursor-pointer group select-none transition-colors"
                      >
                        <UploadCloud className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 transition-colors shrink-0" />
                        <span className="truncate max-w-[110px] sm:max-w-[130px]">
                          {attachedFile ? attachedFile.name : 'Upload brief (PDF/IMG)'}
                        </span>
                      </label>
                      {attachedFile && (
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="ml-1 text-neutral-400 hover:text-neutral-700 inline-block align-middle cursor-pointer"
                          aria-label="Remove attached file"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#151619] hover:bg-black text-white px-5 sm:px-6 py-3 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group uppercase"
                    >
                      {loading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>SENDING...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND INQUIRY</span>
                          <span className="font-mono group-hover:translate-x-0.5 transition-transform">—</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Editorial Sub-Footer Corner Indicator */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full border border-amber-500/40 bg-black/60 p-0.5 overflow-hidden flex items-center justify-center">
              <img
                src="/assets/aistudio/1__2__58ec0766.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[11px] font-mono text-neutral-400">
              Rudraksh Innovations Pvt. Ltd. · Ahmedabad, Gujarat
            </span>
          </div>

          <div className="text-right text-[11px] font-mono text-neutral-500 flex flex-col items-end">
            <span className="text-neutral-400">/ 28</span>
            <span className="tracking-widest uppercase font-semibold text-neutral-400">Ahmedabad HQ</span>
          </div>
        </div>

      </div>
    </section>
  );
};
