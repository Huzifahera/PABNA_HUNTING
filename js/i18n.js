/**
 * THE PABNA HAUNTING - Bilingual Translation Dictionary (English / বাংলা)
 * Accurate Pabna folklore, historical landmarks, horror narrative and UI copy.
 */

const translations = {
  en: {
    // Nav
    nav_title: "THE PABNA HAUNTING",
    nav_status: "SYSTEM STATUS: HAZARD LEVEL 4",
    nav_hub: "Gateway Hub",
    nav_cctv: "Surveillance Grid",
    nav_archive: "Patient Archive & Ciphers",
    nav_escape: "Lockdown Portal",
    nav_mute: "Sound: ON",
    nav_unmute: "Sound: MUTED",
    nav_panic: "PANIC RESET",
    nav_lang: "বাংলায় পড়ুন",

    // Common
    loading: "DECRYPTING ARCHIVAL STREAM...",
    access_granted: "ACCESS GRANTED",
    access_denied: "ACCESS DENIED - ANOMALY DETECTED",
    submit: "AUTHENTICATE",
    reset: "RESET",
    close: "CLOSE TERMINAL",
    clue_unlocked: "CRITICAL INTEL DISCOVERED",

    // Hub / Index
    hub_badge: "HEMAYETPUR ANOMALY CONTAINMENT UNIT // 1957",
    hub_title: "THE PABNA HAUNTING",
    hub_subtitle: "Paranormal Forensic Reconstruction of Pabna Mental Asylum & The Ichamati Corridor",
    hub_lore_heading: "HISTORICAL DOSSIER & RIVER FOLKLORE",
    hub_lore_p1: "In 1957, near the mist-draped bends of the Ichamati River in Hemayetpur, Pabna, the largest psychiatric sanatorium in East Bengal opened its rusted iron gates. But local elders whisper that long before the concrete wards were cast, the soil belonged to a forgotten zamindar burial ground and British telegraph relay post.",
    hub_lore_p2: "On monsoon nights when the Padma River surges towards the Paksey steel trusses of Hardinge Bridge, emergency sirens echo across empty asylum corridors. Patients in the notorious Ward 7 documented sightings of a drowned telegraphist and shadows pacing between Tarash Palace and the Chatmohar minarets.",
    hub_lore_p3: "Last night at 03:17 AM, all electronic telemetry severed. Automated lockdown protocols sealed the compound. You are a field investigator dispatched to probe the feeds, decode landmark cryptographic relics, and escape before the ward seals eternally.",
    hub_login_title: "SECURITY TERMINAL LOGIN",
    hub_login_desc: "Enter authorized investigator credentials or probe the terminal console below.",
    hub_field_id: "INVESTIGATOR CALLSIGN",
    hub_field_pass: "AUTHORIZATION CIPHER / PASSCODE",
    hub_pass_hint: "Hint: The river bordering Hemayetpur and founding year (e.g., ICHAMATI1957)",
    hub_btn_enter: "OVERRIDE SANATORIUM GATES",
    hub_terminal_prompt: "PARANORMAL_OS v4.19 >> Type 'HELP' for commands",
    hub_telegraph_shortcut: "OPTIONAL PROTOCOL: Reconnect Ichamati Telegraph Grid to unlock early telemetry",
    hub_btn_play_telegraph: "LAUNCH TELEGRAPH WIRE INTERFACE",

    // Surveillance / CCTV
    cctv_heading: "HEMAYETPUR SURVEILLANCE MATRIX",
    cctv_sub: "Live CCTV Feeds from the Abandoned Asylum Grounds & Ichamati Riverfront",
    cctv_warning: "WARNING: Extended observation may induce visual hallucination & entity resonance.",
    cam_1_name: "CAM-01: Main Gate & Ichamati Riverfront",
    cam_2_name: "CAM-02: Ward 7 Solitary Confinement",
    cam_3_name: "CAM-03: Electro-Shock Therapy Wing",
    cam_4_name: "CAM-04: Morgue Sub-Basement",
    cam_5_name: "CAM-05: Hemayetpur Overgrown Courtyard",
    cam_6_name: "CAM-06: Director's Office & Telegraph Desk",
    cctv_feed_active: "ONLINE // 12.4 FPS",
    cctv_feed_glitch: "DISTORTION: 94.2%",
    cctv_inspect: "FOCUS CAMERA",
    cctv_night_vision: "TOGGLE NIGHT VISION",
    cctv_thermal: "THERMAL SENSOR",
    cctv_glitch_btn: "FORCE SIGNAL REFRESH",
    cctv_entity_spotted: "PARANORMAL ANOMALY DETECTED IN FEED!",
    cctv_clue_hint: "Inspect CAM-02 and CAM-04 for etched wall markings and asylum coordinates.",

    // Archive / Ciphers
    archive_heading: "SANATORIUM PATIENT ARCHIVE & CIPHER VAULT",
    archive_sub: "Declassified Records (1958 - 1971) & Historical Landmark Relics",
    archive_search_placeholder: "Search patient by name, ID, or symptom...",
    archive_filter_all: "All Records",
    archive_filter_ward7: "Ward 7 High-Risk",
    archive_filter_cured: "Deceased / Unaccounted",
    cipher_sec_title: "PABNA REGIONAL CRYPTOGRAPHIC RELICS",
    cipher_sec_desc: "To bypass the Master Lockdown in the Escape Portal, you must solve three cipher riddles bound to Pabna's legendary architectural landmarks:",
    
    // Landmark 1: Tarash
    cipher_1_title: "RELIC 1: TARASH PALACE ARTIFACT",
    cipher_1_desc: "The Tarash Zamindar estate in Pabna was built with intricate European and Mughal masonry. In 1962, a patient etched this riddle into his silver spoon:",
    cipher_1_riddle: "I stand on 7 regal pillars. Count my arches twice, subtract 3, and utter the zamindar house name in uppercase followed by the result (e.g., TARASH-11). Arches = 387.",
    cipher_1_placeholder: "Enter Cipher Key (e.g., TARASH-###)",
    cipher_1_btn: "VERIFY TARASH CIPHER",
    
    // Landmark 2: Chatmohar
    cipher_2_title: "RELIC 2: CHATMOHAR SHAHI MOSQUE FREQUENCY",
    cipher_2_desc: "Constructed in 1581-1582 AD by Masum Khan Kabuli. An acoustic anomaly resonates inside the three-domed sanctum at an ultra-low frequency.",
    cipher_2_riddle: "Multiply the Hijri foundation year (989 AH) by the number of domes (3), then divide by 3, and append the Common Era year of Masum Khan's inscription (1582). What is the sacred frequency code?",
    cipher_2_placeholder: "Enter Sacred Code (e.g., SHAHI-1582)",
    cipher_2_btn: "TRANSMIT FREQUENCY",

    // Landmark 3: Hardinge
    cipher_3_title: "RELIC 3: HARDINGE BRIDGE STEEL CIPHER",
    cipher_3_desc: "In Paksey, Pabna, the mighty 16-span railway bridge spans the turbulent Padma River, opened in 1915 with over 52,000 hot-riveted steel girders.",
    cipher_3_riddle: "Cipher Equation: [Year Bridge Opened] + [Number of Main Steel Spans (15)] - [Total Pillars (16)] = RIVET-????",
    cipher_3_placeholder: "Enter Bridge Token (e.g., RIVET-1914)",
    cipher_3_btn: "DECRYPT STEEL KEY",

    // Escape / Lockdown
    escape_heading: "EMERGENCY CONTAINMENT LOCKDOWN",
    escape_sub: "Sector 7 Automated Hazard Protocols Active // Compound Self-Purge Imminent",
    escape_timer_label: "TIME BEFORE FULL SANATORIUM QUARANTINE:",
    escape_status_label: "PROTOCOL STATUS: ALL EXITS SEALED",
    escape_req_title: "SURVIVAL ESCAPE PROTOCOL REQUIREMENTS",
    escape_req_1: "1. Three Landmark Cipher Tokens from Archive Vault",
    escape_req_2: "2. Reconnected Ichamati Telegraph Circuit (or Manual Bypass Wire Grid)",
    escape_req_3: "3. Master Evacuation Code Entry (Derived from Pabna Coordinates)",
    escape_code_placeholder: "MASTER EVACUATION SEQUENCE",
    escape_btn_override: "INITIATE EMERGENCY EVACUATION",
    escape_btn_wire: "EMERGENCY TELEGRAPH WIRE RESTORATION",
    escape_success_title: "EMERGENCY EVACUATION BROADCAST SUCCESSFUL",
    escape_success_p1: "DISTRESS BEACON BROADCAST TRANSMITTED ACROSS ICHAMATI & PAKSEY MILITARY POSTS.",
    escape_success_p2: "The hydraulic blast doors groan open. Dense cool fog rolls off the Ichamati River. You sprint beyond the rusted iron perimeter as the screams of Ward 7 fade into the nocturnal silence of Pabna.",
    escape_jumpscare_alert: "FATAL BREACH: THE WARD 7 PHANTOM HAS FOUND YOU",
    escape_retry: "RE-ENTER SIMULATION"
  },
  bn: {
    // Nav
    nav_title: "পাবনা হন্টিং (THE PABNA HAUNTING)",
    nav_status: "সিস্টেম স্থিতি: বিপদ সংকেত মাত্রা ৪",
    nav_hub: "গেটওয়ে হাব",
    nav_cctv: "সিসিটিভি সার্ভেইল্যান্স",
    nav_archive: "রোগী নথি ও ধাঁধা ভল্ট",
    nav_escape: "লকডাউন পোর্টাল",
    nav_mute: "শব্দ: চালু",
    nav_unmute: "শব্দ: মিউট",
    nav_panic: "প্যানিক রিসেট",
    nav_lang: "Read in English",

    // Common
    loading: "আর্কাইভাল তথ্য ডিক্রিপ্ট করা হচ্ছে...",
    access_granted: "অনুমতি মঞ্জুর করা হয়েছে",
    access_denied: "অনুমতি প্রত্যাখ্যাত - অস্বাভাবিক সংকেত সনাক্ত!",
    submit: "যাচাই করুন",
    reset: "পুনরায় সেট করুন",
    close: "টার্মিনাল বন্ধ করুন",
    clue_unlocked: "গুরুত্বপূর্ণ সূত্র উদঘাটিত হয়েছে",

    // Hub / Index
    hub_badge: "হেমায়েতপুর প্যারানরমাল নজরদারি ইউনিট // ১৯৫৭",
    hub_title: "দ্য পাবনা হন্টিং",
    hub_subtitle: "পাবনা মানসিক হাসপাতাল ও ইছামতী নদী সংলগ্ন রহস্যময় অলৌকিক তদন্ত",
    hub_lore_heading: "ঐতিহাসিক নথিপত্র ও নদী তীরের লোকগাথা",
    hub_lore_p1: "১৯৫৭ সালে পাবনার হেমায়েতপুরে কুয়াশাচ্ছন্ন ইছামতী নদীর বাঁকে তৎকালীন পূর্ববঙ্গের বৃহত্তম মানসিক হাসপাতাল প্রতিষ্ঠিত হয়। কিন্তু স্থানীয় প্রবীণদের বিশ্বাস, আধুনিক ভবন তৈরির বহু পূর্বেই এই ভূমি ছিল এক প্রাচীন পরিত্যক্ত জমিদার শ্মশান এবং ব্রিটিশ টেলিগ্রাফ রিলে পোস্ট।",
    hub_lore_p2: "বর্ষার রাতে যখন পদ্মা নদী ফুসে উঠে এবং পাকশীর হার্ডিঞ্জ ব্রিজের ইস্পাতের পাটাতনে গর্জন তোলে, তখন এই হাসপাতালের খালি বারান্দায় কান্নার আওয়াজ প্রতিধ্বনিত হয়। ৭ নম্বর ওয়ার্ডের রোগীরা প্রায়ই ইছামতী তীরের ডোবা টেলিগ্রাফিস্ট এবং তাড়াশ জমিদার বাড়ি ও চাটমোহর শাহী মসজিদের ছায়া অবয়ব দেখার দাবি করত।",
    hub_lore_p3: "গত মধ্যরাতে ৩:১৭ মিনিটে হাসপাতালের সমস্ত অভ্যন্তরীণ রেডিও যোগাযোগ বিচ্ছিন্ন হয়ে যায়। স্বয়ংক্রিয় ইমার্জেন্সি লকডাউনে পুরো চত্বর সিলগালা হয়ে গেছে। আপনি একজন প্যারানরমাল ইনভেস্টিগেটর; সিসিটিভি ক্যামেরা পর্যবেক্ষণ করুন, ঐতিহাসিক ধাঁধা সমাধান করুন এবং চিরতরে আটকে পড়ার পূর্বে উদ্ধার পান!",
    hub_login_title: "নিরাপত্তা টার্মিনাল লগইন",
    hub_login_desc: "অনুমোদিত তদন্তকারী পরিচয় প্রবেশ করান অথবা নিচের কমান্ড কনসোল ব্যবহার করুন।",
    hub_field_id: "তদন্তকারী কোডনেম",
    hub_field_pass: "নিরাপত্তা সাইফার / পাসকোড",
    hub_pass_hint: "সূত্র: হেমায়েতপুর ঘেঁষা নদীর নাম ও হাসপাতাল প্রতিষ্ঠার সাল (যেমন: ICHAMATI1957)",
    hub_btn_enter: "হাসপাতালের প্রধান ফটক আনলক করুন",
    hub_terminal_prompt: "পাবনা_ওএস v৪.১৯ >> কমান্ডের জন্য টাইপ করুন 'HELP'",
    hub_telegraph_shortcut: "ঐচ্ছিক প্রোটোকল: প্রাথমিক টেলিমেট্রি আনলক করতে ইছামতী টেলিগ্রাফ গ্রিড মেরামত করুন",
    hub_btn_play_telegraph: "টেলিগ্রাফ তার মেরামত ইন্টারফেস খুলুন",

    // Surveillance / CCTV
    cctv_heading: "হেমায়েতপুর সিসিটিভি সার্ভেইল্যান্স ম্যাট্রিক্স",
    cctv_sub: "পরিত্যক্ত হাসপাতাল ও ইছামতী রিভারফ্রন্টের সরাসরি ক্যামেরা ফিড",
    cctv_warning: "সতর্কতা: দীর্ঘক্ষণ অবলোকনে দৃষ্টিবিভ্রম ও আত্মিক অসংলগ্নতা তৈরি হতে পারে।",
    cam_1_name: "ক্যাম-০১: প্রধান ফটক ও ইছামতী নদী",
    cam_2_name: "ক্যাম-০২: ৭ নং নির্জন কারাকক্ষ",
    cam_3_name: "ক্যাম-০৩: ইলেক্ট্রো-শক থেরাপি উইং",
    cam_4_name: "ক্যাম-০৪: মর্গ সাব-বেইসমেন্ট",
    cam_5_name: "ক্যাম-০৫: হেমায়েতপুর আগাছাচ্ছন্ন প্রাঙ্গণ",
    cam_6_name: "ক্যাম-০৬: পরিচালকের কক্ষ ও টেলিগ্রাফ ডেস্ক",
    cctv_feed_active: "অনলাইন // ১২.৪ এফপিএস",
    cctv_feed_glitch: "সংকেত বিকৃতি: ৯৪.২%",
    cctv_inspect: "ক্যামেরা ফোকাস করুন",
    cctv_night_vision: "নাইট ভিশন ফিল্টার",
    cctv_thermal: "থার্মাল সেন্সর",
    cctv_glitch_btn: "সিগন্যাল রিফ্রেশ করুন",
    cctv_entity_spotted: "ক্যামেরায় অলৌকিক অবয়ব সনাক্ত হয়েছে!",
    cctv_clue_hint: "ক্যামেরা ২ এবং ৪ নম্বর রুমে দেওয়ালে খোদাই করা গোপন সংকেত লক্ষ্য করুন।",

    // Archive / Ciphers
    archive_heading: "মানসিক রোগী আর্কাইভ ও ঐতিহাসিক সাইফার ভল্ট",
    archive_sub: "ডিক্লাসিফায়েড নথিপত্র (১৯৫৮ - ১৯৭১) ও ঐতিহাসিক নিদর্শন",
    archive_search_placeholder: "রোগীর নাম, আইডি বা উপসর্গ দিয়ে খুঁজুন...",
    archive_filter_all: "সকল রেকর্ড",
    archive_filter_ward7: "৭ নং ওয়ার্ডের উচ্চ-ঝুঁকিপূর্ণ",
    archive_filter_cured: "মৃত / নিখোঁজ",
    cipher_sec_title: "পাবনা আঞ্চলিক ক্রিপ্টোগ্রাফিক ধাঁধাসমূহ",
    cipher_sec_desc: "লকডাউন গেট উন্মোচন করতে পাবনার তিনটি ঐতিহাসিক নিদর্শনের সাইফার সমাধান বাধ্যতামূলক:",
    
    // Landmark 1: Tarash
    cipher_1_title: "নিদর্শন ১: তাড়াশ ভবনের গুপ্ত ধাঁধা",
    cipher_1_desc: "পাবনার ঐতিহ্যবাহী তাড়াশ জমিদার ভবন ইউরোপীয় ও মুঘল স্থাপত্যরীতির অপূর্ব মিশ্রণ। ১৯৬২ সালে এক রোগী তার ধাতব থালায় এই ধাঁধা খোদাই করে:",
    cipher_1_riddle: "আমি ৭টি রাজকীয় পিলারের উপর দাঁড়িয়ে। আমার আর্চ সংখ্যাকে দ্বিগুণ করে ৩ বিয়োগ করো এবং জমিদার বংশের ইংরেজি নামের সাথে হাইফেন দিয়ে সংখ্যাটি লেখ (যেমন: TARASH-11)। মূল আর্চ সংখ্যা = ৩৮৭।",
    cipher_1_placeholder: "সাইফার কি প্রবেশ করান (যেমন: TARASH-###)",
    cipher_1_btn: "তাড়াশ সাইফার যাচাই করুন",

    // Landmark 2: Chatmohar
    cipher_2_title: "নিদর্শন ২: চাটমোহর শাহী মসজিদের পবিত্র ফ্রিকোয়েন্সি",
    cipher_2_desc: "১৫৮১-১৫৮২ খ্রিস্টাব্দে মাসুম খান কাবুলি কর্তৃক নির্মিত তিন গম্বুজবিশিষ্ট ঐতিহাসিক মসজিদ। মসজিদের ভেতরে অদ্ভুত প্রতিধ্বনি স্পন্দিত হয়।",
    cipher_2_riddle: "মসজিদটির হিজরি সালকে (৯৮৯) গম্বুজ সংখ্যা (৩) দিয়ে গুণ করে ৩ দিয়ে ভাগ করুন, এবং মাসুম খানের শিলালিপির খ্রিস্টাব্দ (১৫৮২) যুক্ত করে কোডটি লিখুন: SHAHI-????",
    cipher_2_placeholder: "পবিত্র কোড লিখুন (যেমন: SHAHI-1582)",
    cipher_2_btn: "ফ্রিকোয়েন্সি সঞ্চালন করুন",

    // Landmark 3: Hardinge
    cipher_3_title: "নিদর্শন ৩: হার্ডিঞ্জ ব্রিজের ইস্পাত রিভেট সাইফার",
    cipher_3_desc: "পাকশীর পদ্মা নদীর উপর ১৯১৫ সালে উন্মুক্ত ১৬ স্প্যানের বিখ্যাত রেল সেতু, যা ৫২ হাজারের বেশি উত্তপ্ত ইস্পাত রিভেট দ্বারা জোড়া লাগানো।",
    cipher_3_riddle: "সমীকরণ: [সেতু উদ্বোধনের সাল (১৯১৫)] + [প্রধান স্প্যান সংখ্যা (১৫)] - [মোট পিলার সংখ্যা (১৬)] = RIVET-????",
    cipher_3_placeholder: "ইস্পাত টোকেন লিখুন (যেমন: RIVET-1914)",
    cipher_3_btn: "ইস্পাত কি ডিক্রিপ্ট করুন",

    // Escape / Lockdown
    escape_heading: "জরুরি লকডাউন ও উদ্ধার পোর্টাল",
    escape_sub: "সেক্টর ৭ স্বয়ংক্রিয় সতর্কাবস্থা জারি // সম্পূর্ণ ভবন ধ্বংস প্রক্রিয়া শুরু",
    escape_timer_label: "হাসপাতাল সম্পূর্ণ কোয়ারেন্টিন হওয়ার অবশিষ্ট সময়:",
    escape_status_label: "প্রোটোকল স্থিতি: সকল ফটক অবরুদ্ধ",
    escape_req_title: "বাঁচার জরুরি প্রোটোকল শর্তাবলী",
    escape_req_1: "১. আর্কাইভ ভল্ট থেকে তিনটি ঐতিহাসিক সাইফার টোকেন",
    escape_req_2: "২. ইছামতী টেলিগ্রাফ তারের সফল মেরামত (বা ম্যানুয়াল বাইপাস)",
    escape_req_3: "৩. মাস্টার উদ্ধার কোড এন্ট্রি (পাবনা জিপিএস সমন্বয় থেকে প্রাপ্ত)",
    escape_code_placeholder: "মাস্টার উদ্ধার সংকেত প্রবেশ করান",
    escape_btn_override: "জরুরি উদ্ধার ব্যবস্থা সক্রিয় করুন",
    escape_btn_wire: "ইমার্জেন্সি টেলিগ্রাফ তার মেরামত",
    escape_success_title: "উদ্ধার বার্তা সফলভাবে প্রেরিত হয়েছে!",
    escape_success_p1: "ইছামতী ও পাকশী সামরিক চেকপোস্টে জরুরি উদ্ধার সংকেত পৌঁছে গেছে।",
    escape_success_p2: "ভারী হাইড্রলিক লোহার দরজাগুলো শব্দ করে খুলে গেল। ইছামতী নদীর শীতল ঘন কুয়াশা আপনাকে স্বাগত জানাল। ৭ নম্বর ওয়ার্ডের আর্তনাদ রাতের স্তব্ধতায় মিলিয়ে যাওয়ার সাথে সাথে আপনি নিরাপদে চত্বর পার হলেন।",
    escape_jumpscare_alert: "মারাত্মক লঙ্ঘন: ৭ নম্বর ওয়ার্ডের অতৃপ্ত আত্মা আপনাকে ঘিরে ফেলেছে!",
    escape_retry: "পুনরায় সিমুলেশন শুরু করুন"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = window.pabnaState ? window.pabnaState.get('language') : 'en';
  }

  setLanguage(lang) {
    if (translations[lang]) {
      this.currentLang = lang;
      if (window.pabnaState) {
        window.pabnaState.set('language', lang);
      }
      this.applyTranslations();
    }
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'bn' : 'en';
    this.setLanguage(newLang);
    return newLang;
  }

  t(key) {
    const dict = translations[this.currentLang] || translations.en;
    return dict[key] || translations.en[key] || key;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', translation);
        } else {
          el.innerHTML = translation;
        }
      }
    });

    // Update html lang attribute
    document.documentElement.lang = this.currentLang;
    
    // Dispatch event for specialized components
    window.dispatchEvent(new CustomEvent('pabna_language_changed', { detail: this.currentLang }));
  }
}

// Global I18n Instance
window.pabnaI18n = new I18nManager();

document.addEventListener('DOMContentLoaded', () => {
  window.pabnaI18n.applyTranslations();
});

