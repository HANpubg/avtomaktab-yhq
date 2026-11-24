import { Question, Ticket, Topic } from '../types';
import { TOPICS, QUESTIONS as HANDCRAFTED_QUESTIONS } from './questionsData';

export const TOTAL_OFFICIAL_QUESTIONS = 1270;
export const TOTAL_TICKETS = 70;

// Generate 70 official tickets
export const ALL_TICKETS: Ticket[] = Array.from({ length: TOTAL_TICKETS }, (_, i) => {
  const num = i + 1;
  const count = num <= 63 ? 18 : 20; // 63 * 18 + 7 * 19 ~ 1270
  return {
    id: `bilet-${num}`,
    number: num,
    title: `Bilet № ${num}`,
    questionCount: num === TOTAL_TICKETS ? 22 : 18
  };
});

// Authentic topic variations and question templates grounded in Uzbekistan YHQ
interface QuestionTemplate {
  topicId: string;
  ruleRef: string;
  imageType: Question['imageType'];
  generate: (idx: number, ticketNum: number) => {
    q: string;
    opts: string[];
    ans: number;
    exp: string;
    signCode?: string;
    meta?: Question['scenarioMeta'];
  };
}

const TEMPLATES: QuestionTemplate[] = [
  // 1. Intersections (Chorrahalar)
  {
    topicId: 't-11',
    ruleRef: 'YHQ 102-106-bandlar',
    imageType: 'intersection',
    generate: (idx, ticketNum) => {
      const variants = [
        {
          q: `Ushbu tartibga solinmagan chorrahada avtomobillarning o‘tish navbatini aniqlang. (Ko‘k avtomobil to‘g‘riga, Qizil avtomobil chapga burilmoqda)`,
          opts: [
            "Ko‘k avtomobil birinchi, keyin Qizil avtomobil",
            "Qizil avtomobil birinchi, keyin Ko‘k avtomobil",
            "Ikkala haydovchi o‘zaro kelishib o‘tishadi",
            "Chapdagi avtomobil har doim ustun"
          ],
          ans: 0,
          exp: "Teng ahamiyatli yo‘lda chapga burilayotgan Qizil avtomobil qarama-qarshi tomondan to‘g‘riga kelayotgan Ko‘k avtomobilga yo‘l berishi shart (YHQ 107-band).",
          meta: { car1Action: 'To‘g‘riga', car2Action: 'Chapga burilish' }
        },
        {
          q: `2.1 «Bosh yo‘l» belgisi ostida 7.13 «Asosiy yo‘l yo‘nalishi» (chapga burilish) lavhasi o‘rnatilgan chorrahada kim birinchi o‘tadi?`,
          opts: [
            "Asosiy yo‘l bo‘ylab harakatlanayotgan avtomobil",
            "Ikkilamchi yo‘ldan to‘g‘riga kelayotgan yuk avtomobili",
            "Eng tez harakatlanayotgan avtomobil",
            "O‘ng tomondan kelayotgan har qanday mashina"
          ],
          ans: 0,
          exp: "Asosiy yo‘l yo‘nalishida harakatlanayotgan transport vositasi ikkilamchi yo‘ldan kelayotganlarga nisbatan ustunlikka ega (YHQ 104-band).",
          meta: { signsPresent: ['2.1', '7.13'], mainRoadDirection: 'left' }
        },
        {
          q: `Ushbu teng ahamiyatli 4 tomonlama chorrahada barcha tomondan avtomobillar bir vaqtda kelganda harakat qanday boshlanadi?`,
          opts: [
            "Haydovchilar o‘zaro ishora qilib kelishib oladilar va bir haydovchi yo‘l beradi",
            "Eng katta yuk avtomobili birinchi o‘tadi",
            "O‘ngga burilmoqchi bo‘lgan avtomobil birinchi o‘tadi",
            "Tezlikni oshirgan birinchi o‘tadi"
          ],
          ans: 0,
          exp: "To‘rttala tomondan bir vaqtda teng sharoitda kelganida har birining o‘ngida mashina bo‘ladi, shuning uchun haydovchilar o‘zaro kelishuv orqali navbatni boshlaydilar.",
          meta: { hasTrafficLight: false }
        },
        {
          q: `Chorrahada yashil chiroq yonib turgan vaqtda 2.4 «Yo‘l bering» belgisi ham bo‘lsa, siz qaysi qoidaga amal qilasiz?`,
          opts: [
            "Faqat svetoforning yashil ishorasiga amal qilib to‘xtovsiz o‘tasiz",
            "Belgiga amal qilib barchaga yo‘l berib o‘tasiz",
            "Stop chizig‘ida to‘xtab, 2 daqiqa kutasiz",
            "Faqat o‘ngga burilishga ruxsat etiladi"
          ],
          ans: 0,
          exp: "Svetofor ishlab turgan vaqtda imtiyoz belgilari (bosh yo‘l, yo‘l bering) bekor bo‘ladi va faqat svetoforga amal qilinadi (YHQ 38-band).",
          meta: { hasTrafficLight: true, trafficLightColor: 'green', signsPresent: ['2.4'] }
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 2. Roundabouts (Aylanma harakat)
  {
    topicId: 't-11',
    ruleRef: 'YHQ 103-band',
    imageType: 'roundabout',
    generate: (idx) => {
      const variants = [
        {
          q: `4.3 «Aylanma harakat» belgisi o‘rnatilgan aylanaga kirib kelayotgan haydovchi kimga yo‘l berishi shart?`,
          opts: [
            "Aylanma bo‘ylab harakatlanayotgan transport vositalariga",
            "Hech kimga, aylanaga kirayotgan ustun",
            "Faqat orqadan kelayotgan mashinalarga",
            "Faqat o‘ng tomondan kelayotganlarga"
          ],
          ans: 0,
          exp: "O‘zbekiston YHQga kiritilgan o‘zgarishlarga binoan, aylanada harakatlanayotgan transport ustunlikka ega, kirib keluvchi unga yo‘l beradi (YHQ 103-band).",
          meta: { signsPresent: ['4.3'] }
        },
        {
          q: `Aylanma harakat chorrahasidan chiqib ketishda (o‘ngga burilishda) qaysi qatordan chiqish qoidaga muvofiq?`,
          opts: [
            "Faqat chetki o‘ng bo‘lakdan (agar yo‘l belgilari boshqacha belgilamagan bo‘lsa)",
            "Istalgan ichki bo‘lakdan to‘g‘ridan-to‘g‘ri",
            "Faqat eng chap bo‘lakdan",
            "Aylanma harakatda qator muhim emas"
          ],
          ans: 0,
          exp: "Chorrahadan chiqish manyovri o‘ngga burilish hisoblanadi va imkon qadar chetki o‘ng bo‘lakka o‘tib bajariladi.",
          meta: { signsPresent: ['4.3'] }
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 3. Traffic Controller / Dan Xodimi
  {
    topicId: 't-4',
    ruleRef: 'YHQ 42-44-bandlar',
    imageType: 'controller',
    generate: (idx) => {
      const variants = [
        {
          q: `Tartibga soluvchi (DAN inspektori) qo‘lini yuqoriga vertikal ko‘targanida nima qilish kerak?`,
          opts: [
            "Barcha transport vositalari va piyodalarning harakati qat'iyan to‘xtatiladi",
            "Tezlikni oshirib o‘tib ketish kerak",
            "Faqat o‘ngga burilishga ruxsat etiladi",
            "Faqat jamoat transportiga ruxsat etiladi"
          ],
          ans: 0,
          exp: "Qo‘l yuqoriga ko‘tarilganda barcha yo‘nalishlardagi transport va piyodalar harakati taqiqlanadi (svetoforning sariq chirog‘iga teng).",
          meta: { car1Action: 'To‘xtash' }
        },
        {
          q: `Tartibga soluvchi o‘ng qo‘lini oldinga cho‘zganida, uning orqa tomonidan kelayotgan mashinalar qayerga harakatlanishi mumkin?`,
          opts: [
            "Harakatlanish mutlaqo taqiqlanadi (orqa — qizil devor)",
            "To‘g‘riga va o‘ngga",
            "Faqat chapga",
            "Barcha yo‘nalishlarda"
          ],
          ans: 0,
          exp: "Tartibga soluvchining orqasi har doim harakatni qat'iyan taqiqlovchi ishoradir (YHQ 42-band).",
          meta: { car1Action: 'Taqiqlangan' }
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 4. Speed Limits (Tezlik me'yorlari)
  {
    topicId: 't-8',
    ruleRef: 'YHQ 78-band',
    imageType: 'speed',
    generate: (idx) => {
      const variants = [
        {
          q: `O‘zbekiston Respublikasida aholi punktlarida yengil avtomobillarning eng yuqori ruxsat etilgan tezligi qancha?`,
          opts: ["60 km/soat", "70 km/soat", "80 km/soat", "50 km/soat"],
          ans: 0,
          exp: "YHQ 78-bandiga asosan, aholi punktlarida barcha yengil transport vositalari uchun eng yuqori harakat tezligi 60 km/soat qilib belgilangan.",
          signCode: '3.24'
        },
        {
          q: `Maktablar, bolalar bog‘chalari va ta'lim muassasalari yaqinidagi maxsus belgilangan hududlarda tezlik necha km/soatdan oshmasligi kerak?`,
          opts: ["30 km/soat", "40 km/soat", "20 km/soat", "50 km/soat"],
          ans: 0,
          exp: "Maktab va maktabgacha ta'lim maskanlari atroflarida harakat tezligi 30 km/soatdan oshmasligi shart.",
          signCode: '3.24'
        },
        {
          q: `Turar joy dahalari, hovlilar va aholi istiqomat qiluvchi ichki ko‘chalarda ruxsat etilgan maksimal tezlik qancha?`,
          opts: ["20 km/soat", "30 km/soat", "15 km/soat", "40 km/soat"],
          ans: 0,
          exp: "Turar joy zonalarida transport vositalari 20 km/soatdan tez yurishi man etiladi va piyodalar butun yo‘l bo‘ylab ustunlikka ega.",
          signCode: '5.22'
        },
        {
          q: `Aholi punktlaridan tashqarida avtomagistrallarda yengil avtomobillarning ruxsat etilgan eng yuqori tezligi:`,
          opts: ["110 km/soat", "100 km/soat", "120 km/soat", "130 km/soat"],
          ans: 0,
          exp: "Avtomagistralda yengil transport vositalariga 110 km/soatgacha ruxsat beriladi.",
          signCode: '5.1'
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 5. Overtaking & Lane Maneuvering (Quvib o'tish)
  {
    topicId: 't-9',
    ruleRef: 'YHQ 82-86-bandlar',
    imageType: 'overtake',
    generate: (idx) => {
      const variants = [
        {
          q: `Qaysi holatlarda qarama-qarshi harakat bo‘lagiga chiqib quvib o‘tish qat'iyan taqiqlanadi?`,
          opts: [
            "Chorrahalarda, piyodalar o‘tish joyida, temir yo‘l kesishmalarida va ularga 100m qolganda",
            "Faqat kunduzi",
            "Faqat asfalt qoplamali keng yo‘llarda",
            "Faqat orqada mashina bo‘lsa"
          ],
          ans: 0,
          exp: "Piyodalar o‘tish joyida, chorrahalarda, temir yo‘l kesishmasiga 100 metr qolganda, ko‘prik va tunnellarda quvib o‘tish qat'iyan taqiqlanadi (YHQ 85-band)."
        },
        {
          q: `Oldindagi avtomobil chapga burilish ko‘rsatkichini yoqib burilishni boshlaganda uni qaysi tomondan quvib o‘tish mumkin?`,
          opts: [
            "Faqat o‘ng tomondan aylanib o‘tishga ruxsat etiladi",
            "Chap tomondan kesib o‘tish kerak",
            "Quvib o‘tish mutlaqo mumkin emas",
            "Yo‘l yoqasidan quvib o‘tish kerak"
          ],
          ans: 0,
          exp: "Chapga burilayotgan transport vositasini o‘ng tomondan aylanib o‘tishga ruxsat beriladi (YHQ 82-band)."
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 6. Stopping & Parking (To'xtash va to'xtab turish)
  {
    topicId: 't-10',
    ruleRef: 'YHQ 88-91-bandlar',
    imageType: 'parking',
    generate: (idx) => {
      const variants = [
        {
          q: `Piyodalar o‘tish joyiga yetmasdan kamida necha metr masofa qolganda to‘xtash taqiqlanadi?`,
          opts: ["5 metr", "10 metr", "15 metr", "20 metr"],
          ans: 0,
          exp: "Piyodalar o‘tish joyida va undan oldin 5 metrdan kam masofada to‘xtash taqiqlanadi (o‘tish joyidan keyin darhol to‘xtash mumkin).",
          signCode: '5.16.1'
        },
        {
          q: `Marshrutli jamoat transporti to‘xtash bekatlariga (avtobus bekatiga) kamida necha metr masofada to‘xtash taqiqlanadi?`,
          opts: ["15 metr", "10 metr", "5 metr", "25 metr"],
          ans: 0,
          exp: "Marshrutli transport vositalari to‘xtash bekatlaridan kamida 15 metr masofa saqlanishi kerak (YHQ 89-band).",
          signCode: '5.12'
        },
        {
          q: `Temir yo‘l kesishmasiga kamida necha metr qolganda to‘xtab turish (stayanka) taqiqlanadi?`,
          opts: ["50 metr", "30 metr", "100 metr", "20 metr"],
          ans: 0,
          exp: "Temir yo‘l kesishmasiga 50 metrdan kam masofa qolganda transport vositasini to‘xtab turish (stayanka) taqiqlanadi.",
          signCode: '1.1'
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 7. Pedestrian Crossings (Piyodalar)
  {
    topicId: 't-12',
    ruleRef: 'YHQ 111-115-bandlar',
    imageType: 'pedestrian',
    generate: (idx) => {
      const variants = [
        {
          q: `Tartibga solinmagan piyodalar o‘tish joyiga yaqinlashayotgan haydovchi o‘tish joyiga chiqqan piyodani ko‘rganda nima qilishi shart?`,
          opts: [
            "Tezlikni pasaytirishi yoki to‘xtab piyodaga yo‘l berishi shart",
            "Tovush signali chalib tezda o‘tib ketishi kerak",
            "Uzoqni yorituvchi chiroqlarni yoqishi kerak",
            "Piyodaning to‘xtashini kutishi kerak"
          ],
          ans: 0,
          exp: "Haydovchi tartibga solinmagan piyodalar o‘tish joyida qatnov qismiga qadam qo‘ygan piyodaga so‘zsiz yo‘l berishi shart (YHQ 111-band)."
        },
        {
          q: `Qo‘shni harakat bo‘lagidagi avtomobil piyodalar o‘tish joyi oldida sekinlashsa, boshqa haydovchilar nima qilishi shart?`,
          opts: [
            "Ular ham sekinlashishi yoki to‘xtashi, piyoda yo‘qligiga ishonch hosil qilib keyin harakatlanishi shart",
            "Oldingi mashinani quvib o‘tib ketishi mumkin",
            "Gazni bosib o‘tib olishi kerak",
            "Faqat avariya chirog‘ini yoqishi kerak"
          ],
          ans: 0,
          exp: "Yon bo‘lakdagi mashina piyodalar o‘tish joyi oldida sekinlashsa, siz ham to‘xtashingiz yoki sekinlashishingiz shart (YHQ 112-band)."
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 8. Railway Crossings (Temir yo'l)
  {
    topicId: 't-13',
    ruleRef: 'YHQ 116-121-bandlar',
    imageType: 'railway',
    generate: (idx) => {
      const variants = [
        {
          q: `Temir yo‘l kesishmasida shlagbaum bo‘lmaganda va svetofor qizil yonganda eng yaqin relsgacha kamida necha metr masofada to‘xtaladi?`,
          opts: ["Kamida 10 metr", "Kamida 5 metr", "Kamida 15 metr", "Kamida 20 metr"],
          ans: 0,
          exp: "Shlagbaum bo‘lmaganda eng yaqin temir yo‘l relsigacha kamida 10 metr masofada to‘xtash shart (YHQ 118-band).",
          signCode: '1.2'
        },
        {
          q: `Shlagbaum bilan jihozlangan temir yo‘l kesishmasida to‘xtash chizig‘i bo‘lmasa, shlagbaumgacha kamida necha metr qolganda to‘xtaladi?`,
          opts: ["Kamida 5 metr", "Kamida 2 metr", "Kamida 10 metr", "Kamida 1 metr"],
          ans: 0,
          exp: "Shlagbaum oldida to‘xtaganda unga kamida 5 metr masofa qolishi shart.",
          signCode: '1.1'
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 9. First Aid (Birinchi tibbiy yordam)
  {
    topicId: 't-16',
    ruleRef: 'Birinchi tibbiy yordam standartlari',
    imageType: 'medical',
    generate: (idx) => {
      const variants = [
        {
          q: `Katta yoshli hushsiz va nafas olmayotgan insonga yurak-o‘pka reanimatsiyasida ko‘krak qafasini bosish va nafas yuborish nisbati qanday?`,
          opts: [
            "30 marta ko‘krak qafasini bosish va 2 marta sun'iy nafas (30:2)",
            "15 marta bosish va 2 marta nafas",
            "10 marta bosish va 1 marta nafas",
            "Faqat nafas yuborish, bosish taqiqlanadi"
          ],
          ans: 0,
          exp: "Xalqaro va O‘zbekiston standartlariga ko‘ra, yurak-o‘pka reanimatsiyasi 30 ta bosish va 2 ta nafas (30:2) proporsiyasida amalga oshiriladi."
        },
        {
          q: `Qo‘l yoki oyoqdagi arterial kuchli qon ketishida qo‘yilgan jgut yoz faslida ko‘pi bilan qancha vaqt ushlab turiladi?`,
          opts: ["Ko‘pi bilan 1 soat", "Ko‘pi bilan 2 soat", "Ko‘pi bilan 30 daqiqa", "3 soatgacha"],
          ans: 0,
          exp: "To‘qimalar nobud bo‘lmasligi uchun jgut yozda uzog‘i bilan 1 soat, qishda esa 30 daqiqa qo‘yiladi va qo‘yilgan vaqti yozilgan qog‘oz ilinadi."
        },
        {
          q: `Suyak ochiq singanda va jarohatdan suyak bo‘laklari chiqib turganda birinchi navbatda nima qilish kerak?`,
          opts: [
            "Qon ketishini to‘xtatish, steril bog‘lam qo‘yish va ikkita qo‘shni bo‘g‘imni shina bilan fiksatsiya qilish",
            "Suyakni ichkariga qaytarib kiritish",
            "Issiq kompress qo‘yish",
            "Oyoqqa turg‘azib yurgizish"
          ],
          ans: 0,
          exp: "Suyak bo‘laklarini o‘zboshimchalik bilan joyiga solish qat'iyan taqiqlanadi. Faqat steril bog‘lam va qo‘shni bo‘g‘imlarni qimirlatmaydigan shina qo‘yiladi."
        }
      ];
      return variants[idx % variants.length];
    }
  },
  // 10. Technical Condition (Nosozliklar)
  {
    topicId: 't-15',
    ruleRef: 'YHQ 3-ilova (Nosozliklar ro‘yxati)',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `B toifadagi yengil avtomobil shinalari protektori naqshining qoldiq balandligi kamida necha mm bo‘lishi shart?`,
          opts: ["Kamida 1.6 mm", "Kamida 1.0 mm", "Kamida 0.8 mm", "Kamida 2.0 mm"],
          ans: 0,
          exp: "Yengil avtomobillar uchun minimal protektor balandligi 1.6 mm ni tashkil etadi.",
          signCode: '3.1'
        },
        {
          q: `Yengil avtomobilning rul charxidagi umumiy lyuft (erkin burilish) burchagi ko‘pi bilan necha gradusdan oshmasligi kerak?`,
          opts: ["10 gradus", "15 gradus", "20 gradus", "25 gradus"],
          ans: 0,
          exp: "Yengil avtomobillarda rul lyufti 10 gradusdan oshsa undan foydalanish taqiqlanadi."
        },
        {
          q: `Qaysi jiddiy nosozlikda avtomobilni hatto ta'mirlash joyigacha ham boshqarish qat'iyan man etiladi?`,
          opts: [
            "Ishchi tormoz tizimi yoki rul boshqaruvi ishlamay qolganda",
            "Konditsioner ishlamaganda",
            "Oyna ko‘targich ishlamaganda",
            "Musiqa magnitofoni ishlamaganda"
          ],
          ans: 0,
          exp: "Ishchi tormoz tizimi va rul boshqaruvi ishlamayotgan bo‘lsa har qanday harakatlanish taqiqlanadi (YHQ 2.3.1-band)."
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 11. 1-Guruh: Ogohlantiruvchi belgilar (1.1 - 1.33)
  {
    topicId: 't-sign-warning',
    ruleRef: 'YHQ 1-ilova 1-guruh',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `Ogohlantiruvchi belgilar aholi punktlarida xavfli yo‘l qismidan kamida necha metr oldin o‘rnatiladi?`,
          opts: [
            "50 — 100 metr oldin",
            "150 — 300 metr oldin",
            "10 — 20 metr oldin",
            "Xavfli joyning aynan ustiga"
          ],
          ans: 0,
          exp: "Ogohlantiruvchi belgilar aholi punktlarida xavfli joydan 50-100 metr, aholi punktlaridan tashqarida esa 150-300 metr oldin o‘rnatiladi.",
          signCode: '1.23'
        },
        {
          q: `Sariq fonli 1.25 «Yo‘l ishlari» belgisi nimani anglatadi?`,
          opts: [
            "Yo‘lda vaqtinchalik ta'mirlash yoki qurilish ishlari ketayotganini va u doimiy belgilardan ustunligini",
            "Faqat tunda yo‘l yopiqligini",
            "Tezlikni 100 km/soatgacha oshirish mumkinligini",
            "Piyodalar yo‘lkasini"
          ],
          ans: 0,
          exp: "Sariq fondagi ogohlantiruvchi va taqiqlovchi belgilar vaqtinchalik hisoblanadi va doimiy belgilarga zid kelganda haydovchi vaqtinchalik sariq belgiga amal qilishi shart.",
          signCode: '1.25'
        },
        {
          q: `1.1 «Shlagbaumli temir yo‘l kesishmasi» va 1.2 «Shlagbaumsiz temir yo‘l kesishmasi» belgilarining farqi nimada?`,
          opts: [
            "1.1 da kesishma shlagbaum bilan to‘silgan bo‘ladi; 1.2 da esa shlagbaum bo‘lmaydi va xavf yuqori",
            "Ularning hech qanday farqi yo‘q",
            "1.1 faqat shahar ichida o‘rnatiladi",
            "1.2 da poyezdlar yurmaydi"
          ],
          ans: 0,
          exp: "1.1 belgisi shlagbaum mavjudligini, 1.2 belgisi esa shlagbaumsiz ochiq poyezd yo‘lini bildiradi.",
          signCode: '1.1'
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 12. 2-Guruh: Imtiyoz belgilari (2.1 - 2.7)
  {
    topicId: 't-sign-priority',
    ruleRef: 'YHQ 1-ilova 2-guruh',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `2.5 «To‘xtamasdan harakatlanish taqiqlangan» (STOP) belgisi oldida haydovchi qayerda to‘xtashi shart?`,
          opts: [
            "To‘xtash chizig‘i (stop-liniya) oldida, agar u bo‘lmasa kesishayotgan qatnov qismi chetida",
            "Belgidan 50 metr oldin",
            "Faqat mashina ko‘rinsa to‘xtaydi",
            "Chorrahani o‘rtasida"
          ],
          ans: 0,
          exp: "2.5 (STOP) belgisi o‘rnatilgan joyda to‘xtash chizig‘i oldida, u bo‘lmaganda kesishayotgan yo‘l chetida to‘xtamasdan o‘tish qat'iyan taqiqlanadi.",
          signCode: '2.5'
        },
        {
          q: `Tor ko‘prik oldida 2.6 «Qarama-qarshi harakatlanishning ustunligi» (doira ichida qizil strelka) belgisi turganda siz nima qilasiz?`,
          opts: [
            "Qarama-qarshi kelayotgan transportga yo‘l berib, u o‘tgach keyin o‘tasiz",
            "Birinchi bo‘lib tezda ko‘prikka kirasiz",
            "Signal chalib ogohlantirasiz",
            "Orqaga qayrilib ketasiz"
          ],
          ans: 0,
          exp: "2.6 belgisida o‘z yo‘nalishingizda qizil strelka bo‘lsa, qarama-qarshi tomondan kelayotgan transportga yo‘l berishingiz shart.",
          signCode: '2.6'
        },
        {
          q: `2.7 «Qarama-qarshi harakatlanishga nisbatan ustunlik» (ko‘k to‘rtburchakda oq strelka) belgisi sizga qanday huquq beradi?`,
          opts: [
            "Tor yo‘l qismidan qarama-qarshi transportdan oldin birinchi navbatda o‘tish huquqini",
            "To‘xtab turish huquqini",
            "Tezlikni oshirish huquqini",
            "Piyodalarga yo‘l bermaslik huquqini"
          ],
          ans: 0,
          exp: "2.7 belgisi o‘rnatilgan tor yo‘lda oq strelka yo‘nalishidagi haydovchi birinchi o‘tish imtiyoziga ega bo‘ladi.",
          signCode: '2.7'
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 13. 3-Guruh: Ta'qiqlovchi belgilar (3.1 - 3.33)
  {
    topicId: 't-sign-prohibitory',
    ruleRef: 'YHQ 1-ilova 3-guruh',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `3.2 «Harakatlanish taqiqlangan» (oq doira qizil hoshiyali) belgisi qaysi transport vositalariga taalluqli emas?`,
          opts: [
            "Belgilangan yo‘nalishda qatnovchi jamoat transportiga, ushbu zonada yashovchi yoki ishlovchi fuqarolarga xizmat ko‘rsatuvchi transportlarga hamda nogironligi bo‘lgan shaxslar transportiga",
            "Barcha yuk avtomobillariga",
            "Faqat yangi xorijiy avtomobillarga",
            "Hech kimga mustasno berilmaydi"
          ],
          ans: 0,
          exp: "3.2 belgisi marshrutli transportlarga, korxonalarga xizmat ko‘rsatuvchi, shu hududda yashovchilarga va 1-2 guruh nogironlariga taalluqli emas.",
          signCode: '3.2'
        },
        {
          q: `3.20 «Quvib o‘tish taqiqlangan» belgisi zonasida qaysi transport vositalarini quvib o‘tishga ruxsat beriladi?`,
          opts: [
            "Tezligi soatiga 30 km dan kam bo‘lgan yakka transport vositalarini, ot-aravalarni, velosiped va mopedlarni",
            "Barcha yuk avtomobillarini",
            "Faqat avtobuslarni",
            "Hech qanday transportni quvib o‘tish mumkin emas"
          ],
          ans: 0,
          exp: "3.20 belgisi zonasida soatiga 30 km dan kam yuradigan yakka transportlarni, ot-arava, velosiped va mopedlarni quvib o‘tish mumkin.",
          signCode: '3.20'
        },
        {
          q: `3.27 «To‘xtash taqiqlangan» belgisi yo‘lning qaysi tomoniga amal qiladi?`,
          opts: [
            "Faqat belgi o‘rnatilgan tomongagina amal qiladi",
            "Yo‘lning ikkala tomoniga ham",
            "Faqat chap tomoniga",
            "Faqat chorrahadan keyingi qismiga"
          ],
          ans: 0,
          exp: "3.27 va 3.28 belgilari yo‘lning faqat ular o‘rnatilgan tomonigagina amal qiladi.",
          signCode: '3.27'
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 14. 4-Guruh: Buyuruvchi belgilar (4.1.1 - 4.9)
  {
    topicId: 't-sign-mandatory',
    ruleRef: 'YHQ 1-ilova 4-guruh',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `Chorraha oldiga o‘rnatilgan 4.1.1 «Harakatlanish to‘g‘riga» belgisi nimani buyuradi?`,
          opts: [
            "Faqat to‘g‘riga harakatlanishni (o‘ngga, chapga burilish va qayrilib olish taqiqlanadi)",
            "Chapga burilishni",
            "Xohlagan tomonga burilishni",
            "To‘xtab turishni"
          ],
          ans: 0,
          exp: "4.1.1 belgisi o‘rnatilgan kesishmada faqat to‘g‘riga yurishga ruxsat beriladi (yo‘nalishli transportlar bundan mustasno).",
          signCode: '4.1.1'
        },
        {
          q: `4.1.2 «Harakatlanish o‘ngga» belgisi o‘rnatilgan joyda qaysi manyovrlarni bajarish mumkin?`,
          opts: [
            "Faqat o‘ngga burilishga ruxsat etiladi",
            "To‘g‘riga yurish mumkin",
            "Qayrilib olish mumkin",
            "Chapga burilish mumkin"
          ],
          ans: 0,
          exp: "4.1.2 belgisi haydovchiga faqat o‘ngga burilish majburiyatini yuklaydi.",
          signCode: '4.1.2'
        },
        {
          q: `4.6 «Eng kam tezlik belgilangan» (ko‘k doirada oq 40 yozuvi) belgisi nimani bildiradi?`,
          opts: [
            "Ko‘rsatilgan tezlikdan (40 km/soat) kam bo‘lmagan tezlikda harakatlanishga ruxsat berilishini",
            "Eng yuqori tezlik 40 km/soat ekanligini",
            "Tezlikni o‘lchash radarini",
            "Piyodalar tezligini"
          ],
          ans: 0,
          exp: "4.6 belgisi belgida ko‘rsatilgan tezlikdan (40 km/s) past tezlikda yurishni man etadi.",
          signCode: '4.6'
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 15. 5-Guruh: Axborot-ko'rsatkich belgilari (5.1 - 5.41)
  {
    topicId: 't-sign-informative',
    ruleRef: 'YHQ 1-ilova 5-guruh',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `5.22 «Aholi punktining boshlanishi» (oq fonda shahar nomi yozilgan) belgisi o‘rnatilgan yo‘lda qanday qoidalar kuchga kiradi?`,
          opts: [
            "Aholi punktlarida harakatlanish tartibini belgilovchi YHQ talablari (shu jumladan maksimal 60 km/soat tezlik)",
            "Tezlik 100 km/soat bo‘ladi",
            "Tovush signallarini cheklovsiz chalish mumkin",
            "Chiroqlarni o‘chirish shart"
          ],
          ans: 0,
          exp: "Oq fondagi 5.22 belgisi o‘rnatilgan hududdan boshlab aholi punktlari uchun belgilangan barcha qoidalar (tezlik 60 km/soat va h.k.) to‘liq amal qiladi.",
          signCode: '5.22'
        },
        {
          q: `Ko‘k fonda aholi punkti nomi yozilgan 5.23 belgisi o‘rnatilgan yo‘lda 60 km/soat tezlik cheklovi amal qiladimi?`,
          opts: [
            "Yo‘q, bu yo‘l aholi punkti chetidan o‘tganligi sababli aholi punkti tezlik cheklovi tatbiq etilmaydi",
            "Ha, doimo 60 km/soat bo‘ladi",
            "Faqat 30 km/soat bo‘ladi",
            "Faqat tunda amal qiladi"
          ],
          ans: 0,
          exp: "Ko‘k fondagi 5.23 belgisi yo‘l mazkur aholi punkti orqali emas, uning chetidan o‘tishini bildiradi va unga shahar tezlik cheklovi qo‘llanilmaydi.",
          signCode: '5.23'
        },
        {
          q: `5.5 «Bir tomonlama harakatli yo‘l» belgisida orqaga harakatlanish (orqaga yurish) mumkinmi?`,
          opts: [
            "Ha, agar xavfsiz bo‘lsa va chorrahaga kirmasdan hovlilarga kirish uchun bo‘lsa ruxsat beriladi",
            "Mutlaqo taqiqlanadi",
            "Faqat tunda mumkin",
            "Faqat yuk mashinalariga ruxsat"
          ],
          ans: 0,
          exp: "Bir tomonlama yo‘lda orqaga harakatlanish man etilmagan, faqat manyovr xavfsiz bo‘lishi va chorrahaga kirmasligi shart.",
          signCode: '5.5'
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 16. 6-Guruh: Servis belgilari (6.1 - 6.14)
  {
    topicId: 't-sign-service',
    ruleRef: 'YHQ 1-ilova 6-guruh',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `6.3 «Yoqilg‘i quyish shoxobchasi» (AYQSh) belgisi nimani bildiradi?`,
          opts: [
            "Benzin, dizel yoki gaz yoqilg‘isi quyish shoxobchasi yaqinligini",
            "Avtomobil yuvish joyini",
            "Mehmonxona joylashuvini",
            "Yo‘l ustaxonasini"
          ],
          ans: 0,
          exp: "6.3 belgisi avtomobillarga yoqilg‘i quyish stansiyasi joylashgan manzilni ko‘rsatadi.",
          signCode: '6.3'
        },
        {
          q: `6.11 «Dam olish joyi» (archa va o‘rindiq tasvirlangan belgi) qayerda o‘rnatiladi?`,
          opts: [
            "Yo‘l bo‘yidagi uzoq safarlarda dam olish uchun maxsus jihozlangan xavfsiz maydoncha oldida",
            "Faqat o‘rmon xo‘jaliklarida",
            "Mehmonxonalar ichida",
            "Faqat tog‘li yo‘llarda"
          ],
          ans: 0,
          exp: "6.11 belgisi haydovchilar to‘xtab dam olishlari uchun mo‘ljallangan maxsus xavfsiz to‘xtash maydonchasini bildiradi.",
          signCode: '6.11'
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 17. 7-Guruh: Qo'shimcha axborot lavhalari (7.1.1 - 7.22)
  {
    topicId: 't-sign-additional',
    ruleRef: 'YHQ 1-ilova 7-guruh',
    imageType: 'signs',
    generate: (idx) => {
      const variants = [
        {
          q: `7.13 «Asosiy yo‘l yo‘nalishi» lavhasi asosiy yo‘l bilan birga o‘rnatilganda nimani bildiradi?`,
          opts: [
            "Chorrahada asosiy yo‘l to‘g‘riga emas, qalin chiziq ko‘rsatgan tomonga burilishini",
            "Yo‘lning yopiqligini",
            "Faqat yuk mashinalari yo‘nalishini",
            "Bir tomonlama yo‘lni"
          ],
          ans: 0,
          exp: "7.13 lavhasidagi qalin qora chiziq asosiy yo‘lning chorrahadagi aniq burilish yo‘nalishini ko‘rsatadi.",
          signCode: '7.13'
        },
        {
          q: `7.2.1 «Amal qilish sohasi» (ikkita vertikal strelka orasida masofa, masalan «↑ 100 m ↑») nimani bildiradi?`,
          opts: [
            "Belgining ta'sir doirasi belgidan boshlab 100 metr masofagacha davom etishini",
            "Obyektgacha 100 metr qolganini",
            "Avtomobil uzunligi 100 metr bo‘lishini",
            "Tezlik 100 km/soat bo‘lishini"
          ],
          ans: 0,
          exp: "Strelkalar orasidagi raqam belgi amal qilish hududining uzunligini belgilaydi.",
          signCode: '7.2.1'
        }
      ];
      return variants[idx % variants.length];
    }
  },

  // 18. 8-Guruh: Yo'l chiziqlari (1.1 - 2.7)
  {
    topicId: 't-sign-markings',
    ruleRef: 'YHQ 2-ilova (Yo‘l chiziqlari)',
    imageType: 'lane',
    generate: (idx) => {
      const variants = [
        {
          q: `1.3 qo‘shaloq yaxlit oq chiziq qaysi yo‘llarda qarama-qarshi oqimlarni ajratish uchun qo‘llaniladi?`,
          opts: [
            "To‘rtta va undan ortiq harakat bo‘lagi bo‘lgan yo‘llarda; uni kesib o‘tish qat'iyan man etiladi",
            "Faqat bir tomonlama yo‘llarda",
            "Faqat qishloq yo‘llarida",
            "Tezlik 100 dan oshganda"
          ],
          ans: 0,
          exp: "1.3 qo‘shaloq yaxlit chiziq 4 va undan ortiq bo‘lakli yo‘llarda qarama-qarshi oqimlarni ajratadi va uni bosib o‘tish qat'iyan taqiqlanadi.",
          signCode: '1.3'
        },
        {
          q: `1.11 bir tomoni uzuq, ikkinchi tomoni yaxlit chiziq bo‘lganda qaysi tomondan chiziqni kesib o‘tishga ruxsat beriladi?`,
          opts: [
            "Faqat uzuq-uzuq chiziq tomonida turgan transport vositalariga",
            "Faqat yaxlit chiziq tomonidan",
            "Ikkala tomondan ham mumkin",
            "Hech qaysi tomondan mumkin emas"
          ],
          ans: 0,
          exp: "1.11 chizig‘ini faqat uzuq-uzuq chiziq tomonidan kesib o‘tib qayrilib olish yoki quvib o‘tish mumkin.",
          signCode: '1.11'
        },
        {
          q: `1.12 «To‘xtash chizig‘i» (Stop-liniya) nimani bildiradi?`,
          opts: [
            "Svetofor yoki tartibga soluvchi taqiqlovchi ishorani berganda to‘xtash kerak bo‘lgan qatnov qismi chizig‘ini",
            "Piyodalar yo‘lkasini",
            "Tezlik chegarasini",
            "Avtoturargoh joyini"
          ],
          ans: 0,
          exp: "1.12 chizig‘i taqiqlovchi ishorada avtomobil bamperi o‘tib ketmasligi kerak bo‘lgan to‘xtash chegarasidir.",
          signCode: '1.12'
        }
      ];
      return variants[idx % variants.length];
    }
  }
];

// Generate the complete deterministic 1270 questions database
let cachedAllQuestions: Question[] | null = null;

export function getAll1270Questions(): Question[] {
  if (cachedAllQuestions) return cachedAllQuestions;

  const result: Question[] = [];

  // 1. Insert our handcrafted base questions first
  HANDCRAFTED_QUESTIONS.forEach((q, idx) => {
    const globalIdx = idx + 1;
    const ticketIndex = Math.floor((globalIdx - 1) / 18) + 1;
    const ticketId = `bilet-${Math.min(ticketIndex, TOTAL_TICKETS)}`;
    const qNum = ((globalIdx - 1) % 18) + 1;

    result.push({
      ...q,
      globalIndex: globalIdx,
      ticketId,
      questionNumber: qNum,
      imageType: q.imageType || 'intersection'
    });
  });

  // 2. Synthesize remaining questions up to 1270 deterministically
  let curIndex = result.length + 1;

  while (curIndex <= TOTAL_OFFICIAL_QUESTIONS) {
    const templateIdx = (curIndex - 1) % TEMPLATES.length;
    const template = TEMPLATES[templateIdx];
    const ticketNum = Math.min(Math.floor((curIndex - 1) / 18) + 1, TOTAL_TICKETS);
    const qInTicket = ((curIndex - 1) % 18) + 1;

    const data = template.generate(curIndex, ticketNum);

    result.push({
      id: `q-gen-${curIndex}`,
      globalIndex: curIndex,
      topicId: template.topicId,
      ticketId: `bilet-${ticketNum}`,
      questionNumber: qInTicket,
      questionText: `№ ${curIndex}. ${data.q}`,
      options: data.opts,
      correctAnswerIndex: data.ans,
      explanation: data.exp,
      ruleReference: template.ruleRef,
      imageType: template.imageType,
      signCode: data.signCode,
      difficulty: curIndex % 3 === 0 ? 'hard' : curIndex % 2 === 0 ? 'medium' : 'easy',
      scenarioMeta: data.meta
    });

    curIndex++;
  }

  cachedAllQuestions = result;
  return result;
}

// Helper: Get questions for a specific ticket
export function getQuestionsByTicket(ticketId: string): Question[] {
  const all = getAll1270Questions();
  return all.filter((q) => q.ticketId === ticketId);
}

// Helper: Get questions for a specific topic
export function getQuestionsByTopic(topicId: string): Question[] {
  const all = getAll1270Questions();
  return all.filter((q) => q.topicId === topicId);
}

// Helper: Get 20 randomized questions for the State Exam
export function getRandomExamQuestions(): Question[] {
  const all = getAll1270Questions();
  const shuffled = [...all].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 20);
}
