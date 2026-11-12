/**
 * THE PABNA HAUNTING - Patient Archive & Landmark Cipher Vault Controller
 * 10 Comprehensive Psychiatric Dossiers (1958 - 1971), Audio Cassette Player, and Ciphers.
 */

document.addEventListener('DOMContentLoaded', () => {
  const patientGrid = document.getElementById('patient-grid');
  const searchInput = document.getElementById('patient-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const dossierModal = document.getElementById('dossier-modal');
  const btnCloseDossier = document.getElementById('btn-close-dossier');
  const dossierContent = document.getElementById('dossier-content');
  const btnPlaySoundLog = document.getElementById('btn-play-soundlog');
  const spoolLeft = document.getElementById('spool-left');
  const spoolRight = document.getElementById('spool-right');
  const cassetteTimer = document.getElementById('cassette-timer-readout');

  // Landmark Cipher Inputs & Buttons
  const cipher1Input = document.getElementById('cipher-1-input');
  const cipher1Btn = document.getElementById('btn-cipher-1');
  const cipher1Status = document.getElementById('cipher-1-status');

  const cipher2Input = document.getElementById('cipher-2-input');
  const cipher2Btn = document.getElementById('btn-cipher-2');
  const cipher2Status = document.getElementById('cipher-2-status');

  const cipher3Input = document.getElementById('cipher-3-input');
  const cipher3Btn = document.getElementById('btn-cipher-3');
  const cipher3Status = document.getElementById('cipher-3-status');

  // 10 Comprehensive Psychiatric Patient Records
  const patients = [
    {
      id: 'PATIENT-004',
      name: 'Sofia Khatun',
      age: 33,
      admitted: '1958-01-10',
      status: 'Ward 7 High-Risk',
      isWard7: true,
      isDeceased: false,
      summaryEn: 'First inhabitant of Ward 7. Warned about the recurring 03:17 AM lockdown purge and Dr. Shamsuddin\'s sealed journals.',
      summaryBn: '৭ নম্বর ওয়ার্ডের প্রথম বাসিন্দা। ভোর ৩:১৭ মিনিটে লকডাউন ও ভবনের আত্মবিনাশ সম্পর্কে সতর্ক করত।',
      dossierEn: `ADMISSION LOG #004 // HEMAYETPUR SANATORIUM
Patient Name: Sofia Khatun
Diagnosis: Catatonic Clairvoyance & Nocturnal Hysteria
Attending: Dr. A. Shamsuddin (Superintendent)

Clinical Notes:
Sofia was the first individual admitted to the newly cast concrete block of Ward 7 in January 1958. During heavy rainstorms, she enters a rigid catatonic stupor, claiming that the Ichamati River swells with the voices of 19th-century laborers buried beneath the hospital foundations. 
Her journal contains repetitive scribbles: 'When the hands meet at 03:17, the automated valves close forever. Only uniting the three regional landmarks can disengage the quarantine locks.'`,
      dossierBn: `ভর্তি নথি #০০৪ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: সোফিয়া খাতুন
নির্ণয়: ক্যাটাটোনিক অতীন্দ্রিয় দর্শন ও নিশাচর উন্মাদনা
চিকিৎসক: ড. এ. শামসুদ্দিন

মনোচিকিৎসা বিবরণ:
১৯৫৮ সালের জানুয়ারিতে নবনির্মিত ৭ নম্বর ওয়ার্ডের প্রথম রোগী হিসেবে সোফিয়া ভর্তি হয়। প্রবল বর্ষার রাতে সে কাঠের মতো শক্ত হয়ে থাকত এবং দাবি করত হাসপাতালের ভিত্তিপ্রস্তরের নিচে সমাহিত ১৯ শতকের শ্রমিকদের আত্মা ইছামতীর পানিতে ভেসে আসে।
তার ডায়েরির পাতায় শতবার লেখা: 'রাত ৩:১৭ মিনিটে স্বয়ংক্রিয় কপাট চিরতরে বন্ধ হয়ে যাবে। কেবল পাবনার তিনটি প্রধান ঐতিহাসিক নিদর্শনকে একত্রিত করলেই লকডাউন খুলবে।`
    },
    {
      id: 'PATIENT-017',
      name: 'Kumar Birendra Ray',
      age: 44,
      admitted: '1959-04-12',
      status: 'Ward 7 High-Risk',
      isWard7: true,
      isDeceased: false,
      summaryEn: 'Descendant of Tarash estate. Carved architectural formulas into iron cutlery: 387 * 2 - 3 = 771.',
      summaryBn: 'তাড়াশ জমিদার বংশের বংশধর। চামচে খোদাই করত গুপ্ত সমীকরণ: ৩৮৭ * ২ - ৩ = ৭১১।',
      dossierEn: `ADMISSION LOG #017 // HEMAYETPUR SANATORIUM
Patient Name: Kumar Birendra Ray
Diagnosis: Paranoid Delusion of Aristocratic Sovereignty
Attending: Dr. M. Karim

Clinical Notes:
Subject was remanded from the historic Tarash Palace estate in Pabna town after barricading himself inside the subterranean colonnade. He believes the seven stone pillars of Tarash Palace support an acoustic anchor.
Forensic Clue: Patient obsessively scratches the Tarash Relic formula: 'My palace arches number 387. Double the arches, take away 3, and invoke the name in capitals.' (387 * 2 - 3 = 771 -> TARASH-771).`,
      dossierBn: `ভর্তি নথি #০১৭ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: কুমার বীরেন্দ্র রায়
নির্ণয়: বংশীয় পরাবাস্তব আভিজাত্য বিভ্রান্তি
চিকিৎসক: ড. এম. করিম

মনোচিকিৎসা বিবরণ:
পাবনা শহরের ঐতিহ্যবাহী তাড়াশ জমিদার ভবনের ভূগর্ভস্থ খিলানে নিজেকে অবরুদ্ধ করার পর তাকে হাসপাতালে আনা হয়। রোগী বিশ্বাস করে তাড়াশ ভবনের ৭টি পাথরের স্তম্ভ একটি ভৌতিক সংকেত ধরে রেখেছে।
সূত্র: রোগী তার থালায় তাড়াশ সাইফারের সূত্র খোদাই করেছে: 'আমার ভবনের আর্চ সংখ্যা ৩৮৭। আর্চকে দ্বিগুণ করে ৩ বিয়োগ করো এবং বংশের নাম বড়হাতে লেখো।' (৩৮৭ * ২ - ৩ = ৭১১ -> TARASH-771)।`
    },
    {
      id: 'PATIENT-023',
      name: 'Brojendranath Maitra',
      age: 57,
      admitted: '1959-09-03',
      status: 'Deceased / Unaccounted',
      isWard7: false,
      isDeceased: true,
      summaryEn: 'Antiquarian historian who mapped forgotten subterranean crypts beneath the Hemayetpur riverbend.',
      summaryBn: 'প্রাচীন ইতিহাসবিদ যিনি হেমায়েতপুরের নদীর বাঁকে মাটির নিচের সুরঙ্গ ও কবরের মানচিত্র তৈরি করেছিলেন।',
      dossierEn: `ADMISSION LOG #023 // HEMAYETPUR SANATORIUM
Patient Name: Brojendranath Maitra
Diagnosis: Schizoid Obsessive Cartography
Attending: Dr. A. Shamsuddin

Clinical Notes:
Maitra was discovered wandering the dense marshlands where the Ichamati River bends toward Hemayetpur, clutching 18th-century survey charts. He claimed the British East India Company buried a copper telegraph relay under the sanatorium's Director Office. 
Subject vanished without a trace during the total power outage of October 1963. His empty bed contained only a compass needle pointing permanently due North.`,
      dossierBn: `ভর্তি নথি #০২৩ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: ব্রজেন্দ্রনাথ মৈত্র
নির্ণয়: স্কিজয়েড অবসেসিভ কার্টোগ্রাফি (মানচিত্র বিভ্রান্তি)
চিকিৎসক: ড. এ. শামসুদ্দিন

মনোচিকিৎসা বিবরণ:
ইছামতী নদীর বাঁকে হেমায়েতপুরের জলাভূমিতে অষ্টাদশ শতকের ব্রিটিশ মানচিত্রসহ তাকে অপ্রকৃতিস্থ অবস্থায় পাওয়া যায়। তিনি দাবি করেছিলেন হাসপাতালের ডিরেক্টর রুমের নিচে ব্রিটিশ টেলিগ্রাফের একটি তামা তামার তারের রিলে পোঁতা আছে।
১৯৬৩ সালের অক্টোবরের ব্ল্যাকআউটের রাতে তিনি ওয়ার্ড থেকে চিরতরে উধাও হয়ে যান। তার শূন্য বিছানায় কেবল একটি কম্পাসের কাঁটা পড়ে ছিল যা সবসময় উত্তর দিকে স্থির থাকত।`
    },
    {
      id: 'PATIENT-051',
      name: 'Golam Mostafa',
      age: 61,
      admitted: '1960-07-22',
      status: 'Deceased / Unaccounted',
      isWard7: false,
      isDeceased: true,
      summaryEn: 'Horologist obsessed with chronometric reversal along the Ichamati basin.',
      summaryBn: 'ঘড়ি নির্মাতা যিনি বিশ্বাস করতেন ইছামতীর অববাহিকায় সময় বিপরীত দিকে মোড় নেয়।',
      dossierEn: `ADMISSION LOG #051 // HEMAYETPUR SANATORIUM
Patient Name: Golam Mostafa
Diagnosis: Chronometric Dyslexia & Temporal Fixation
Attending: Dr. H. Kabir

Clinical Notes:
Former clockmaker from Pabna bazaar. Collected hundreds of stopped antique watches. He repeatedly testified: 'The emergency containment system of Sector 7 operates on a 300-second cycle. Inputting the correct regional sequence halts the purge timer.'
Died under mysterious circumstances; cardiac arrest precisely at 03:17 AM.`,
      dossierBn: `ভর্তি নথি #০৫১ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: গোলাম মোস্তফা
নির্ণয়: ক্রোনোমেট্রিক ডিসলেক্সিয়া ও সময় বিভ্রান্তি
চিকিৎসক: ড. এইচ. কবির

মনোচিকিৎসা বিবরণ:
পাবনা বাজারের প্রবীণ ঘড়ি কারিগর। শত শত থেমে থাকা পকেট ঘড়ি সংগ্রহ করতেন। তিনি বারবার সতর্ক করতেন: 'সেক্টর ৭ এর ইমার্জেন্সি লকডাউন ঠিক ৩০০ সেকেন্ডের চক্রে কাজ করে। সঠিক সংকেত দিলে ধ্বংস প্রক্রিয়া থেমে যাবে।'
রহস্যজনকভাবে ঠিক ভোর ৩:১৭ মিনিটে হৃদরোগে আক্রান্ত হয়ে তিনি মারা যান।`
    },
    {
      id: 'PATIENT-066',
      name: 'Fatima Begum',
      age: 31,
      admitted: '1961-02-14',
      status: 'Ward 7 High-Risk',
      isWard7: true,
      isDeceased: false,
      summaryEn: 'Former sanatorium staff nurse who claimed apparitions manifest through electro-therapy mirrors.',
      summaryBn: 'হাসপাতালের প্রাক্তন স্টাফ নার্স; দাবি করতেন ইলেক্ট্রো-শক রুমের আয়নায় ছায়ারা ঘুরে বেড়ায়।',
      dossierEn: `ADMISSION LOG #066 // HEMAYETPUR SANATORIUM
Patient Name: Fatima Begum
Diagnosis: Dissociative Psychosis & Auditory Visual Flashbacks
Attending: Dr. M. Karim

Clinical Notes:
Fatima served on the sanatorium nursing staff from 1957 to 1960. While assisting in the electro-shock therapy wing (CAM-03), she reportedly witnessed electrical arcs coalescing into humanoid silhouettes. 
She refuses to look into glass surfaces, screaming that 'The drowned superintendent Dr. Shamsuddin watches through the cameras.'`,
      dossierBn: `ভর্তি নথি #০৬৬ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: ফাতেমা বেগম
নির্ণয়: ডিসোসিয়েটিভ সাইকোসিস ও ভিজ্যুয়াল ভীতি
চিকিৎসক: ড. এম. করিম

মনোচিকিৎসা বিবরণ:
১৯৫৭ থেকে ১৯৬০ পর্যন্ত এই হাসপাতালে নার্স হিসেবে কর্মরত ছিলেন। ৩ নম্বর ক্যামেরার ইলেক্ট্রো-শক উইংয়ে দায়িত্ব পালনকালে তিনি দাবি করেন অতিরিক্ত ভোল্টেজের ঝলকানিতে মানুষের আকৃতি দৃশ্যমান হয়।
তিনি আয়নার দিকে তাকাতে অস্বীকার করেন এবং আর্তনাদ করে বলেন: 'ইছামতীতে নিখোঁজ সুপারিন্টেন্ডেন্ট শামসুদ্দিন ক্যামেরার লেন্স দিয়ে আমাদের নজরদারি করছেন।'`
    },
    {
      id: 'PATIENT-072',
      name: 'Anisur Rahman',
      age: 29,
      admitted: '1965-11-20',
      status: 'Deceased / Unaccounted',
      isWard7: false,
      isDeceased: true,
      summaryEn: 'Telegraphist from the 1890 Ichamati line. Continuously keyed code: [WIRE-1890].',
      summaryBn: '১৮৯০ সালের ইছামতী টেলিগ্রাফ পোস্টের অপারেটর। অনবরত টেবিলে কোড পাঠাত: [WIRE-1890]।',
      dossierEn: `ADMISSION LOG #072 // HEMAYETPUR SANATORIUM
Patient Name: Anisur Rahman
Diagnosis: Traumatic Hysteria & Electromotive Shock
Attending: Dr. S. Ahmed

Clinical Notes:
Discovered drifting in a wooden dinghy near the Pabna telegraph relay tower on the Ichamati River. Subject repeatedly tapped the morse rhythm for: WIRE-1890.
He warned that reconnecting the 4 severed circuit wires between the River Relay and Sanatorium Grid provides emergency override clearance.`,
      dossierBn: `ভর্তি নথি #০৭২ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: আনিসুর রহমান
নির্ণয়: ট্রমাটিক হিস্টিরিয়া ও ইলেকট্রোম্যাগনেটিক শক
চিকিৎসক: ড. এস. আহমেদ

মনোচিকিৎসা বিবরণ:
ইছামতী নদীর তীরে ১৮৯০ সালের ব্রিটিশ টেলিগ্রাফ টাওয়ারের কাছে ভেসে থাকা ডিঙি নৌকায় তাকে উদ্ধার করা হয়। তিনি প্রতিনিয়ত টেবিলে টোকা দিয়ে সংকেত পাঠাতেন: WIRE-1890।
তিনি লিখে যান যে ইছামতী রিলে ও ওয়ার্ডের মধ্যকার ৪টি বিচ্ছিন্ন তার সঠিকভাবে জুড়লে ইমার্জেন্সি বাইপাস কোড পাওয়া যায়।`
    },
    {
      id: 'PATIENT-089',
      name: 'Meherun Nisa',
      age: 38,
      admitted: '1961-08-19',
      status: 'Deceased / Unaccounted',
      isWard7: false,
      isDeceased: true,
      summaryEn: 'Chanted the acoustic dome frequencies of Masum Khan Kabuli\'s 1582 CE Chatmohar Shahi Mosque.',
      summaryBn: '১৫৮২ খ্রিস্টাব্দে মাসুম খান কাবুলি নির্মিত চাটমোহর শাহী মসজিদের তিন গম্বুজের পবিত্র কম্পন পাঠ করত।',
      dossierEn: `ADMISSION LOG #089 // HEMAYETPUR SANATORIUM
Patient Name: Meherun Nisa
Diagnosis: Acoustic Clairaudience & Mystic Resonance
Attending: Dr. A. Shamsuddin

Clinical Notes:
Found in the central prayer chamber of the historic three-domed Chatmohar Shahi Mosque (built 1581-1582 CE / 989 AH by Masum Khan Kabuli). 
Subject proved that multiplying Hijri year 989 by 3 domes and dividing by 3 returns 989, and concatenating with Masum Khan's 1582 CE inscription yields the sacred resonance token: SHAHI-1582.`,
      dossierBn: `ভর্তি নথি #০৮৯ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: মেহেরুন নিসা
নির্ণয়: অতীন্দ্রিয় শব্দ শ্রবণ ও মরমী সুরকম্পন
চিকিৎসক: ড. এ. শামসুদ্দিন

মনোচিকিৎসা বিবরণ:
১৫৮১-১৫৮২ খ্রিস্টাব্দে (৯৮৯ হিজরি) মাসুম খান কাবুলি নির্মিত তিন গম্বুজবিশিষ্ট চাটমোহর শাহী মসজিদের কেন্দ্রীয় মেহরাবে তাকে পাওয়া যায়।
রোগী প্রমাণ করে যে হিজরি ৯৮৯ কে ৩ গম্বুজ দিয়ে গুণ ও ৩ দিয়ে ভাগ করলে ৯৮৯ থাকে, এবং শিলালিপির খ্রিস্টাব্দ ১৫৮২ যুক্ত হয়ে তৈরি হয় পবিত্র সুর সাইফার: SHAHI-1582।`
    },
    {
      id: 'PATIENT-104',
      name: 'Dr. Rafiqul Haque',
      age: 52,
      admitted: '1963-02-05',
      status: 'Ward 7 High-Risk',
      isWard7: true,
      isDeceased: false,
      summaryEn: 'Former civil engineer at Paksey. Derived the Hardinge Bridge steel rivet cipher: RIVET-1914.',
      summaryBn: 'পাকশীর প্রাক্তন সিভিল ইঞ্জিনিয়ার যিনি হার্ডিঞ্জ ব্রিজের ইস্পাত রিভেট সমীকরণ উন্মোচন করেন: RIVET-1914।',
      dossierEn: `ADMISSION LOG #104 // HEMAYETPUR SANATORIUM
Patient Name: Dr. Rafiqul Haque
Diagnosis: Mechanistic Obsessive Delusion
Attending: Dr. M. Karim

Clinical Notes:
Former bridge inspector who spent 14 years monitoring the 16 steel piers of Hardinge Bridge across the Padma River. 
He continuously calculated the structural formula: 1915 (Inauguration Year) + 15 (Main Steel Spans) - 16 (Pillars) = 1914. Token: RIVET-1914.`,
      dossierBn: `ভর্তি নথি #১০৪ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: ড. রফিকুল হক
নির্ণয়: মেকানিকাল অবসেসিভ বিভ্রান্তি
চিকিৎসক: ড. এম. করিম

মনোচিকিৎসা বিবরণ:
পদ্মা নদীর উপর হার্ডিঞ্জ ব্রিজের ১৬টি পিলারের তদারকিতে নিয়োজিত প্রবীণ প্রকৌশলী।
তিনি বারবার সেতুর গাঠনিক সমীকরণ লিখতেন: ১৯১৫ (উদ্বোধন সাল) + ১৫ (মূল স্টিল স্প্যান) - ১৬ (পিলার সংখ্যা) = ১৯১৪। রিভেট টোকেন: RIVET-1914।`
    },
    {
      id: 'PATIENT-119',
      name: 'Alimuddin Mollah',
      age: 49,
      admitted: '1967-05-18',
      status: 'Ward 7 High-Risk',
      isWard7: true,
      isDeceased: false,
      summaryEn: 'Padma fisherman who dredged up an unidentifiable rusted iron telegraph relay from the riverbed.',
      summaryBn: 'পদ্মা ও ইছামতীর মোহনার জেলে; নদীর তলদেশ থেকে একটি রহস্যময় ব্রিটিশ রিলে বাক্স জাল দিয়ে তুলেছিল।',
      dossierEn: `ADMISSION LOG #119 // HEMAYETPUR SANATORIUM
Patient Name: Alimuddin Mollah
Diagnosis: Somnambulism & Galvanic Hallucination
Attending: Dr. S. Ahmed

Clinical Notes:
Subject was fishing near the confluence of the Padma and Ichamati rivers during the 1967 monsoon when his net caught on heavy submerged steel. 
He claimed the box was glowing under the muddy water and transmitting electrical shocks that caused involuntary muscle spasms. He insists the riverbed is connected directly to Ward 7.`,
      dossierBn: `ভর্তি নথি #১১৯ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: আলিমুদ্দিন মোল্লা
নির্ণয়: ঘুমন্ত অবস্থায় হাঁটা ও গ্যালভানিক হ্যালুসিনেশন
চিকিৎসক: ড. এস. আহমেদ

মনোচিকিৎসা বিবরণ:
১৯৬৭ সালের বর্ষায় পদ্মা ও ইছামতীর মোহনায় মাছ ধরার সময় তার জালে একটি ভারী ইস্পাতের বাক্স আটকা পড়ে।
তিনি দাবি করেন কর্দমাক্ত নদীর নিচে বাক্সটি থেকে বৈদ্যুতিক স্ফুলিঙ্গ বের হচ্ছিল যা তার স্নায়ুকে কাঁপিয়ে তোলে। তিনি বারবার বলেন নদীর তলদেশটি সুরঙ্গের মাধ্যমে ৭ নম্বর ওয়ার্ডের সাথে যুক্ত।`
    },
    {
      id: 'PATIENT-138',
      name: 'Sister Clara Rozario',
      age: 41,
      admitted: '1969-10-30',
      status: 'Deceased / Unaccounted',
      isWard7: false,
      isDeceased: true,
      summaryEn: 'Missionary physician who recorded ultrasonic acoustic whispers vibrating between Chatmohar and Paksey.',
      summaryBn: 'মিশনারি চিকিৎসক যিনি চাটমোহর শাহী মসজিদ ও পাকশী হার্ডিঞ্জ ব্রিজের মধ্যে স্পন্দিত সুর রেকর্ড করেছিলেন।',
      dossierEn: `ADMISSION LOG #138 // HEMAYETPUR SANATORIUM
Patient Name: Sister Clara Rozario
Diagnosis: Acoustic Paranoia & Religious Ecstasy
Attending: Dr. H. Kabir

Clinical Notes:
Sister Clara served in remote clinics across Pabna district. She documented that the triangular geographic alignment between Tarash Palace, Chatmohar Mosque, and Hardinge Bridge forms a resonant acoustic corridor over the Ichamati River. 
Her audio field reels contain faint low-frequency chants matching the Ward 7 audio anomalies.`,
      dossierBn: `ভর্তি নথি #১৩৮ // হেমায়েতপুর মানসিক হাসপাতাল
রোগীর নাম: সিস্টার ক্লারা রোজারিও
নির্ণয়: অ্যাকোস্টিক প্যারানয়া ও অলৌকিক অনুরণন
চিকিৎসক: ড. এইচ. কবির

মনোচিকিৎসা বিবরণ:
পাবনার প্রত্যন্ত অঞ্চলে সেবামূলক ক্লিনিকে কাজ করতেন। তিনি নথিভুক্ত করেন যে তাড়াশ ভবন, চাটমোহর শাহী মসজিদ এবং হার্ডিঞ্জ ব্রিজের ভৌগোলিক ত্রিভুজটি ইছামতী নদীর উপর এক অদ্ভুত শব্দকম্পন তৈরি করে।
তার সংগৃহীত ক্যাসেট টেপগুলোতে ৭ নম্বর ওয়ার্ডের স্পন্দনের সাথে হুবহু মিল পাওয়া যায়।`
    }
  ];

  let currentFilter = 'all';

  // Render Patient Cards
  const renderPatients = () => {
    if (!patientGrid) return;
    patientGrid.innerHTML = '';

    const searchTerm = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const isBn = window.pabnaState.get('language') === 'bn';

    const filtered = patients.filter(p => {
      // Filter tab
      if (currentFilter === 'ward7' && !p.isWard7) return false;
      if (currentFilter === 'cured' && !p.isDeceased) return false;

      // Search term
      if (searchTerm) {
        const matchName = p.name.toLowerCase().includes(searchTerm);
        const matchId = p.id.toLowerCase().includes(searchTerm);
        const matchSum = (isBn ? p.summaryBn : p.summaryEn).toLowerCase().includes(searchTerm);
        return matchName || matchId || matchSum;
      }
      return true;
    });

    if (filtered.length === 0) {
      patientGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #ff5566; padding: 2rem;">NO PATIENT RECORDS MATCHING QUERY</div>`;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = `patient-card ${p.isWard7 ? 'ward7' : ''}`;
      card.innerHTML = `
        <div class="patient-id-badge">${p.id} // ${p.status}</div>
        <div class="patient-name">${p.name}</div>
        <div class="patient-meta">Admitted: ${p.admitted} // Age: ${p.age}</div>
        <div class="patient-excerpt">${isBn ? p.summaryBn : p.summaryEn}</div>
      `;

      card.addEventListener('click', () => {
        openDossierModal(p);
      });

      patientGrid.appendChild(card);
    });
  };

  renderPatients();

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', renderPatients);
  }

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(pl => pl.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
      renderPatients();
    });
  });

  // Open Dossier Modal
  let activePatient = null;
  const openDossierModal = (p) => {
    activePatient = p;
    const isBn = window.pabnaState.get('language') === 'bn';
    if (dossierContent) {
      dossierContent.innerHTML = `<pre style="white-space: pre-wrap; font-family: var(--font-mono); font-size: 0.9rem; color: #cfd8dc;">${isBn ? p.dossierBn : p.dossierEn}</pre>`;
    }
    if (dossierModal) {
      dossierModal.classList.add('active');
    }
    if (window.pabnaAudio) window.pabnaAudio.playKeyClick();
  };

  if (btnCloseDossier) {
    btnCloseDossier.addEventListener('click', () => {
      if (dossierModal) dossierModal.classList.remove('active');
      stopCassetteAnimation();
    });
  }

  // Sound log button in modal with Cassette Animation & Speech Synthesis
  let isPlayingCassette = false;

  const startCassetteAnimation = () => {
    isPlayingCassette = true;
    if (spoolLeft) spoolLeft.classList.add('spinning');
    if (spoolRight) spoolRight.classList.add('spinning');
    if (cassetteTimer) cassetteTimer.textContent = 'TAPE: PLAYING [SIDE A]';
    if (btnPlaySoundLog) btnPlaySoundLog.textContent = '■ STOP CASSETTE';
  };

  const stopCassetteAnimation = () => {
    isPlayingCassette = false;
    if (spoolLeft) spoolLeft.classList.remove('spinning');
    if (spoolRight) spoolRight.classList.remove('spinning');
    if (cassetteTimer) cassetteTimer.textContent = 'TAPE: STOPPED';
    if (btnPlaySoundLog) btnPlaySoundLog.textContent = '▶ PLAY AUDIO CASSETTE';
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  if (btnPlaySoundLog) {
    btnPlaySoundLog.addEventListener('click', () => {
      if (isPlayingCassette) {
        stopCassetteAnimation();
        return;
      }

      startCassetteAnimation();

      if (window.pabnaAudio) {
        window.pabnaAudio.playStaticBurst(0.5);
        setTimeout(() => {
          window.pabnaAudio.playGlitchWhisper();
        }, 300);
      }

      // Eerie Speech Synthesis Playback of Clinical Notes
      if ('speechSynthesis' in window && activePatient) {
        const isBn = window.pabnaState.get('language') === 'bn';
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = isBn 
          ? `পাবনা হেমায়েতপুর হাসপাতাল। রোগী ${activePatient.name}। ${activePatient.summaryBn}`
          : `Hemayetpur Sanatorium recording. Patient ${activePatient.name}. ${activePatient.summaryEn}`;
        utterance.pitch = 0.65;
        utterance.rate = 0.85;

        utterance.onend = () => {
          stopCassetteAnimation();
        };

        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(stopCassetteAnimation, 4500);
      }
    });
  }

  // --- Landmark Cipher Verification Logic ---
  const updateCipherUI = () => {
    const solved = window.pabnaState.get('ciphersSolved');

    // Cipher 1: Tarash
    if (solved.tarash) {
      cipher1Status.className = 'cipher-status-indicator unlocked';
      cipher1Status.textContent = '✓ UNLOCKED: TARASH-771';
      cipher1Input.value = 'TARASH-771';
      cipher1Input.disabled = true;
      cipher1Btn.disabled = true;
    }

    // Cipher 2: Mosque
    if (solved.mosque) {
      cipher2Status.className = 'cipher-status-indicator unlocked';
      cipher2Status.textContent = '✓ UNLOCKED: SHAHI-1582';
      cipher2Input.value = 'SHAHI-1582';
      cipher2Input.disabled = true;
      cipher2Btn.disabled = true;
    }

    // Cipher 3: Hardinge
    if (solved.hardinge) {
      cipher3Status.className = 'cipher-status-indicator unlocked';
      cipher3Status.textContent = '✓ UNLOCKED: RIVET-1914';
      cipher3Input.value = 'RIVET-1914';
      cipher3Input.disabled = true;
      cipher3Btn.disabled = true;
    }
  };

  updateCipherUI();

  // 1. Tarash Cipher (387 * 2 - 3 = 771) -> TARASH-771
  if (cipher1Btn) {
    cipher1Btn.addEventListener('click', () => {
      const val = (cipher1Input.value || '').trim().toUpperCase();
      if (val === 'TARASH-771' || val === '771') {
        window.pabnaState.solveCipher('tarash');
        if (window.pabnaAudio) window.pabnaAudio.playCipherSuccess();
        alert('✓ TARASH CIPHER DECRYPTED: Token [TARASH-771] recorded.');
        updateCipherUI();
      } else {
        if (window.pabnaAudio) window.pabnaAudio.playCipherError();
        alert('✗ INVALID CIPHER: Check calculation (387 * 2 - 3) and format TARASH-###.');
      }
    });
  }

  // 2. Chatmohar Shahi Mosque Frequency -> SHAHI-1582
  if (cipher2Btn) {
    cipher2Btn.addEventListener('click', () => {
      const val = (cipher2Input.value || '').trim().toUpperCase();
      if (val === 'SHAHI-1582' || val === '1582' || val === 'SHAHI-989-1582') {
        window.pabnaState.solveCipher('mosque');
        if (window.pabnaAudio) window.pabnaAudio.playCipherSuccess();
        alert('✓ SHAHI MOSQUE FREQUENCY HARMONIZED: Token [SHAHI-1582] recorded.');
        updateCipherUI();
      } else {
        if (window.pabnaAudio) window.pabnaAudio.playCipherError();
        alert('✗ INVALID FREQUENCY: Enter code in format SHAHI-1582.');
      }
    });
  }

  // 3. Hardinge Bridge Steel Rivet Cipher (1915 + 15 - 16 = 1914) -> RIVET-1914
  if (cipher3Btn) {
    cipher3Btn.addEventListener('click', () => {
      const val = (cipher3Input.value || '').trim().toUpperCase();
      if (val === 'RIVET-1914' || val === '1914') {
        window.pabnaState.solveCipher('hardinge');
        if (window.pabnaAudio) window.pabnaAudio.playCipherSuccess();
        alert('✓ HARDINGE BRIDGE STEEL CIPHER CRACKED: Token [RIVET-1914] recorded.');
        updateCipherUI();
      } else {
        if (window.pabnaAudio) window.pabnaAudio.playCipherError();
        alert('✗ INVALID TOKEN: Compute (1915 + 15 - 16) and enter RIVET-1914.');
      }
    });
  }

  window.addEventListener('pabna_language_changed', renderPatients);
});
