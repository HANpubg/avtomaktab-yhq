import { Question, Topic, Ticket } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 't-1',
    number: 1,
    title: "1. Umumiy qoidalar va asosiy tushunchalar",
    description: "Yo'l harakati qatnashchilari, yo'l qismlari, asosiy atamalar va tamoyillar",
    iconName: 'BookOpen',
    questionCount: 8
  },
  {
    id: 't-2',
    number: 2,
    title: "2. Haydovchilarning umumiy majburiyatlari",
    description: "Hujjatlar, xavfsizlik kamari, tibbiy ko'rik, tekshiruvlar va taqiqlar",
    iconName: 'ShieldCheck',
    questionCount: 6
  },
  {
    id: 't-3',
    number: 3,
    title: "3. Maxsus signallarni qo'llash",
    description: "Yaltiroq mayoqcha va maxsus tovushli signallar, operativ transportlar",
    iconName: 'Siren',
    questionCount: 4
  },
  {
    id: 't-4',
    number: 4,
    title: "4. Svetofor va tartibga soluvchining ishoralari",
    description: "Svetofor chiroqlari, qo'shimcha seksiyalar, DAN xodimi ishoralari",
    iconName: 'TrafficCone',
    questionCount: 8
  },
  {
    id: 't-5',
    number: 5,
    title: "5. Ogohlantiruvchi va favqulodda signallar",
    description: "Burilish ko'rsatkichlari, avariya chiroqlari, avariya to'xtash belgisi",
    iconName: 'AlertTriangle',
    questionCount: 5
  },
  {
    id: 't-6',
    number: 6,
    title: "6. Harakatlanishni boshlash va manyovr qilish",
    description: "Qatorni o'zgartirish, burilish, qayrilib olish, orqaga harakatlanish",
    iconName: 'CornerUpRight',
    questionCount: 8
  },
  {
    id: 't-7',
    number: 7,
    title: "7. Qatnov qismida transportlarning joylashuvi",
    description: "Bo'laklar bo'ylab harakat, oraliq va yonlama masofa, chap qator qoidalari",
    iconName: 'MoveHorizontal',
    questionCount: 6
  },
  {
    id: 't-8',
    number: 8,
    title: "8. Harakat tezligi va tezlik cheklovlari",
    description: "Aholi punktida (60 km/soat), tashqarida (70-100 km/soat), maktab va bog'cha oldi (30 km/soat)",
    iconName: 'Gauge',
    questionCount: 7
  },
  {
    id: 't-9',
    number: 9,
    title: "9. Quvib o'tish va qarama-qarshi o'tish",
    description: "Quvib o'tish qoidalari, man etilgan joylar, xavfsizlik shartlari",
    iconName: 'Zap',
    questionCount: 6
  },
  {
    id: 't-10',
    number: 10,
    title: "10. To'xtash va to'xtab turish",
    description: "Qatnov qismida to'xtash joylari, to'xtash taqiqlangan joylar (5m, 15m, 50m qoidalari)",
    iconName: 'ParkingSquare',
    questionCount: 8
  },
  {
    id: 't-11',
    number: 11,
    title: "11. Chorrahalarda harakatlanish",
    description: "Tartibga solingan va tartibga solinmagan chorrahalar, aylanma harakat, o'ng qo'l qoidasi",
    iconName: 'Compass',
    questionCount: 10
  },
  {
    id: 't-12',
    number: 12,
    title: "12. Piyodalar o'tish joylari va bekatlar",
    description: "Piyodalarga yo'l berish majburiyati, bekatdagi avtobus va tramvaylar",
    iconName: 'Footprints',
    questionCount: 5
  },
  {
    id: 't-13',
    number: 13,
    title: "13. Temir yo'l kesishmalari orqali harakatlanish",
    description: "Shlagbaum, svetofor signallari, kesishmada to'xtash va man etilgan harakatlar",
    iconName: 'TrainTrack',
    questionCount: 5
  },
  {
    id: 't-14',
    number: 14,
    title: "14. Tashqi yoritish asboblari va tovush signallari",
    description: "Faralar, gabarit chiroqlar, tuman chiroqlari, signal berish cheklovlari",
    iconName: 'Sun',
    questionCount: 5
  },
  {
    id: 't-15',
    number: 15,
    title: "15. Transport vositalarining nosozliklari",
    description: "Boshqarish taqiqlanadigan xavfli nosozliklar, shinalar, tormoz va rul boshqaruvi",
    iconName: 'Wrench',
    questionCount: 7
  },
  {
    id: 't-16',
    number: 16,
    title: "16. Birinchi tibbiy yordam ko'rsatish",
    description: "YTHda jarohatlanganlarga yordam, jgut qo'yish, yurak-o'pka reanimatsiyasi",
    iconName: 'HeartPulse',
    questionCount: 6
  }
];

export const SIGN_TOPICS: Topic[] = [
  {
    id: 't-sign-warning',
    number: 1,
    title: "1-guruh. Ogohlantiruvchi belgilar",
    description: "Yo'lning xavfli qismlariga yaqinlashayotganlik haqida ogohlantiruvchi belgilar (1.1 - 1.33)",
    iconName: 'AlertTriangle',
    questionCount: 20
  },
  {
    id: 't-sign-priority',
    number: 2,
    title: "2-guruh. Imtiyoz belgilari",
    description: "Chorrahalar va tor yo'l qismlaridan o'tish navbatini belgilovchi belgilar (2.1 - 2.7)",
    iconName: 'Diamond',
    questionCount: 16
  },
  {
    id: 't-sign-prohibitory',
    number: 3,
    title: "3-guruh. Ta'qiqlovchi belgilar",
    description: "Harakatlanishga muayyan cheklovlar kirituvchi yoki ularni bekor qiluvchi belgilar (3.1 - 3.33)",
    iconName: 'Ban',
    questionCount: 25
  },
  {
    id: 't-sign-mandatory',
    number: 4,
    title: "4-guruh. Buyuruvchi belgilar",
    description: "Faqat ko'rsatilgan yo'nalishlarda harakatlanishga ruxsat beruvchi belgilar (4.1.1 - 4.9)",
    iconName: 'Compass',
    questionCount: 18
  },
  {
    id: 't-sign-informative',
    number: 5,
    title: "5-guruh. Axborot-ko'rsatkich belgilari",
    description: "Harakatlanish tartibi xususiyatlari va aholi punktlari haqida axborot beruvchi belgilar (5.1 - 5.41)",
    iconName: 'Info',
    questionCount: 22
  },
  {
    id: 't-sign-service',
    number: 6,
    title: "6-guruh. Servis belgilari",
    description: "Tegishli xizmat ko'rsatish obyektlari joylashuvi haqida ma'lumot beruvchi belgilar (6.1 - 6.14)",
    iconName: 'HelpCircle',
    questionCount: 12
  },
  {
    id: 't-sign-additional',
    number: 7,
    title: "7-guruh. Qo'shimcha axborot lavhalari",
    description: "Belgilar bilan birga qo'llanib, ularning amal qilishini aniqlashtiruvchi lavhalar (7.1.1 - 7.22)",
    iconName: 'Layers',
    questionCount: 15
  },
  {
    id: 't-sign-markings',
    number: 8,
    title: "8-guruh. Yo'l chiziqlari (Gorizontal va Vertikal)",
    description: "Qatnov qismidagi chiziqlar, stop-liniya, o'qlar va yo'l inshootlari belgilari (1.1 - 2.7)",
    iconName: 'MoveHorizontal',
    questionCount: 15
  }
];

export const TICKETS: Ticket[] = [
  { id: 'bilet-1', number: 1, title: 'Bilet № 1', questionCount: 10 },
  { id: 'bilet-2', number: 2, title: 'Bilet № 2', questionCount: 10 },
  { id: 'bilet-3', number: 3, title: 'Bilet № 3', questionCount: 10 },
  { id: 'bilet-4', number: 4, title: 'Bilet № 4', questionCount: 10 },
  { id: 'bilet-5', number: 5, title: 'Bilet № 5', questionCount: 10 },
  { id: 'bilet-6', number: 6, title: 'Bilet № 6', questionCount: 10 },
  { id: 'bilet-7', number: 7, title: 'Bilet № 7', questionCount: 10 },
  { id: 'bilet-8', number: 8, title: 'Bilet № 8', questionCount: 10 },
  { id: 'bilet-9', number: 9, title: 'Bilet № 9', questionCount: 10 },
  { id: 'bilet-10', number: 10, title: 'Bilet № 10', questionCount: 10 }
];

export const QUESTIONS: Question[] = [
  // --- BILET 1 ---
  {
    id: 'q-101',
    topicId: 't-8',
    ticketId: 'bilet-1',
    questionNumber: 1,
    questionText: "O'zbekiston Respublikasida aholi punktlarida barcha yengil transport vositalari uchun ruxsat etilgan eng yuqori harakat tezligi qancha?",
    options: [
      "70 km/soat",
      "60 km/soat",
      "80 km/soat",
      "50 km/soat"
    ],
    correctAnswerIndex: 1,
    explanation: "2023-yilgi YHQ o'zgartirishlariga asosan, O'zbekiston Respublikasi aholi punktlarida transport vositalarining ruxsat etilgan eng yuqori tezligi 60 km/soat qilib belgilangan (ilgari 70 km/soat edi).",
    ruleReference: "YHQ 78-band",
    imageType: 'speed',
    difficulty: 'easy'
  },
  {
    id: 'q-102',
    topicId: 't-11',
    ticketId: 'bilet-1',
    questionNumber: 2,
    questionText: "Aylanma harakat tashkil etilgan chorrahaga kirib kelayotgan haydovchi qaysi transport vositasiga yo'l berishi shart?",
    options: [
      "Faqat o'ng tomondan yaqinlashayotgan transport vositasiga",
      "Aylanma bo'ylab harakatlanayotgan barcha transport vositalariga",
      "Faqat yuk avtomobillari va avtobuslarga",
      "Hech kimga yo'l bermaydi, aylanaga kiruvchi doim ustunlikka ega"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQning yangilangan qoidalariga ko'ra, 4.3 «Aylanma harakat» belgisi bilan belgilangan chorrahaga kirayotgan haydovchi aylanma bo'ylab harakatlanayotgan transport vositalariga yo'l berishi shart.",
    ruleReference: "YHQ 103-band",
    imageType: 'intersection',
    difficulty: 'medium'
  },
  {
    id: 'q-103',
    topicId: 't-2',
    ticketId: 'bilet-1',
    questionNumber: 3,
    questionText: "Harakatlanish paytida qaysi shaxslar xavfsizlik kamarini taqmasliklariga ruxsat etiladi?",
    options: [
      "Faqat taksi haydovchilari",
      "Faqat avtomobilni o'rgatuvchi instruktorlar",
      "Aholi punktida operativ xizmatlar avtomobili haydovchilari hamda orqa o'rindiqdagi yo'lovchilar",
      "Aholi punktlarida faqat 9.1-bandda ko'rsatilgan operativ xizmatlar xodimlari va o'quv mashg'uloti o'tkazayotgan amaliy boshqaruv o'rgatuvchi",
      "Hech kimga ruxsat etilmaydi, barcha taqishi shart"
    ],
    correctAnswerIndex: 3,
    explanation: "YHQ 9-bandiga binoan, konstruksiyasida xavfsizlik kamari ko'zda tutilgan avtomobilda harakatlanayotgan barcha shaxslar kamarni taqishi shart. Faqat operativ va maxsus xizmat avtomobillari xodimlari (ko'k mayoqcha yoqilganda) va o'rganuvchi avtomobilni boshqarayotganda o'rgatuvchi shaxsga taqmaslikka ruxsat etiladi.",
    ruleReference: "YHQ 9-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-104',
    topicId: 't-4',
    ticketId: 'bilet-1',
    questionNumber: 4,
    questionText: "Svetoforning asosiy yashil chirog'ida qora yo'nalishli strelkalar tasvirlangan bo'lsa, bu nimani bildiradi?",
    options: [
      "Harakatlanish barcha yo'nalishlarda taqiqlanganligini",
      "Faqat strelkalar ko'rsatgan yo'nalishlarda harakatlanishga ruxsat berilishini va qo'shimcha tarmoq (seksiya) mavjudligini",
      "Tezlikni oshirish mumkinligini",
      "Faqat jamoat transporti harakatlanishini"
    ],
    correctAnswerIndex: 1,
    explanation: "Yashil chiroqdagi strelkalar haydovchiga ruxsat etilgan yo'nalishlarni bildiradi va boshqa yo'nalishlar uchun maxsus qo'shimcha seksiya mavjudligidan ogohlantiradi.",
    ruleReference: "YHQ 39-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-105',
    topicId: 't-10',
    ticketId: 'bilet-1',
    questionNumber: 5,
    questionText: "Piyodalar o'tish joyiga va undan keyingi masofaga nisbatan to'xtash qaysi holatda taqiqlanadi?",
    options: [
      "Piyodalar o'tish joyida va undan oldin 5 metrdan kam masofada",
      "Piyodalar o'tish joyida va undan keyin 15 metr masofada",
      "Faqat piyodalar o'tish joyining o'zida, oldida esa to'xtash mumkin",
      "Piyodalar o'tish joyidan 50 metr oldin"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 89-bandiga ko'ra, piyodalar o'tish joyida hamda undan oldin 5 metrdan kam masofada to'xtash taqiqlanadi (chunki to'xtagan mashina piyodani boshqa haydovchilardan to'sib qo'yadi). O'tish joyidan keyin darhol to'xtash taqiqlanmaydi.",
    ruleReference: "YHQ 89-band",
    imageType: 'pedestrian',
    difficulty: 'medium'
  },
  {
    id: 'q-106',
    topicId: 't-9',
    ticketId: 'bilet-1',
    questionNumber: 6,
    questionText: "Qaysi holatlarda quvib o'tish qat'iyan taqiqlanadi?",
    options: [
      "Chorrahalarda, temir yo'l kesishmalarida va ularga 100 metrdan kam qolganda, piyodalar o'tish joylarida",
      "Faqat tunda",
      "Faqat yomg'ir yoqqanda",
      "Faqat yuk mashinalarini quvib o'tishda"
    ],
    correctAnswerIndex: 0,
    explanation: "Quvib o'tish tartibga solinadigan va bosh yo'lda bo'lmagan chorrahalarda, piyodalar o'tish joyida, temir yo'l kesishmasida va ularga 100 metrdan kam masofa qolganda, ko'prik, yo'l o'tkazgich va estakadalarda taqiqlanadi.",
    ruleReference: "YHQ 85-band",
    imageType: 'overtake',
    difficulty: 'hard'
  },
  {
    id: 'q-107',
    topicId: 't-8',
    ticketId: 'bilet-1',
    questionNumber: 7,
    questionText: "Maktab va maktabgacha ta'lim muassasalari atrofidagi yo'llarda eng yuqori harakat tezligi qancha qilib belgilangan?",
    options: [
      "40 km/soat",
      "30 km/soat",
      "20 km/soat",
      "50 km/soat"
    ],
    correctAnswerIndex: 1,
    explanation: "O'zbekiston YHQga kiritilgan me'yorlarga binoan, maktablar va bolalar bog'chalari oldidagi tegishli yo'l belgisi o'rnatilgan hududlarda tezlik 30 km/soatdan oshmasligi shart.",
    ruleReference: "YHQ 78-band qo'shimchasi",
    imageType: 'speed',
    difficulty: 'easy'
  },
  {
    id: 'q-108',
    topicId: 't-11',
    ticketId: 'bilet-1',
    questionNumber: 8,
    questionText: "Teng ahamiyatli yo'llar chorrahasida bir vaqtda kirib kelayotgan ikkita yengil avtomobildan qaysi biri birinchi o'tadi?",
    options: [
      "Tezroq kelayotgani",
      "O'ng tomonida to'siq bo'lmagan (o'ng tarafdan hech kim kelmayotgan) haydovchi",
      "Chapga burilmoqchi bo'lgan haydovchi",
      "Kattaroq avtomobil haydovchisi"
    ],
    correctAnswerIndex: 1,
    explanation: "Teng ahamiyatli yo'llar kesishmasida 'o'ng qo'l qoidasi' amal qiladi: haydovchi o'ng tomonidan yaqinlashayotgan transport vositasiga yo'l berishi shart.",
    ruleReference: "YHQ 106-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-109',
    topicId: 't-15',
    ticketId: 'bilet-1',
    questionNumber: 9,
    questionText: "Yengil avtomobillar shinalari protektorining qoldiq balandligi kamida necha millimetr bo'lishi kerak?",
    options: [
      "0.8 mm",
      "1.0 mm",
      "1.6 mm",
      "2.0 mm"
    ],
    correctAnswerIndex: 2,
    explanation: "Yengil avtomobillar (B toifasi) uchun shinalar protektori naqshining qoldiq balandligi kamida 1.6 mm bo'lishi talab etiladi. Mototsikllar uchun 0.8 mm, yuk avtomobillari uchun 1.0 mm, avtobuslar uchun 2.0 mm.",
    ruleReference: "YHQ 3-ilova (Nosozliklar ro'yxati 5.1-band)",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-110',
    topicId: 't-16',
    ticketId: 'bilet-1',
    questionNumber: 10,
    questionText: "Arterial qon ketishida qon ketishini to'xtatuvchi jgut (bog'lam) yoz faslida ko'pi bilan qancha vaqtga qo'yilishi mumkin?",
    options: [
      "30 daqiqagacha",
      "1 soatgacha",
      "2 soatgacha",
      "3 soatgacha"
    ],
    correctAnswerIndex: 1,
    explanation: "Arterial qon ketishida qo'yilgan jgut to'qimalarning nobud bo'lishining oldini olish uchun yoz vaqtida uzog'i bilan 1 soat, qish faslida esa 30 daqiqagacha qo'yiladi va ostiga qo'yilgan vaqt yozilgan qog'oz qistiriladi.",
    ruleReference: "Birinchi tibbiy yordam ko'rsatish yo'riqnomasi",
    imageType: 'medical',
    difficulty: 'medium'
  },

  // --- BILET 2 ---
  {
    id: 'q-201',
    topicId: 't-6',
    ticketId: 'bilet-2',
    questionNumber: 1,
    questionText: "Harakat yo'nalishini o'zgartirishdan oldin haydovchi qachon burilish ko'rsatkichini yoqishi shart?",
    options: [
      "Manyovrni boshlash bilan bir vaqtda",
      "Manyovrni boshlashdan oldinroq, boshqa harakat qatnashchilarini chalg'itmaydigan tarzda",
      "Faqat orqadan mashina kelayotgan bo'lsa",
      "Faqat qorong'i vaqtda"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 54-bandiga ko'ra, burilish ishorasi manyovr boshlanishidan oldinroq berilishi va u tugallanishi bilan darhol to'xtatilishi shart.",
    ruleReference: "YHQ 54-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-202',
    topicId: 't-11',
    ticketId: 'bilet-2',
    questionNumber: 2,
    questionText: "Chorrahada asosiy yo'ldan kelayotgan avtomobil bilan yondosh (ikkilamchi) yo'ldan kelayotgan avtomobil to'qnashish xavfi tug'ilganda, kim yo'l berishi kerak?",
    options: [
      "Asosiy yo'ldagi avtomobil",
      "Ikkilamchi yo'ldan kelayotgan avtomobil",
      "Tezroq kelayotgan avtomobil",
      "O'ng tomondagi avtomobil"
    ],
    correctAnswerIndex: 1,
    explanation: "Teng bo'lmagan yo'llar chorrahasida ikkilamchi yo'lda harakatlanayotgan haydovchi asosiy yo'ldan yaqinlashayotgan transport vositasiga, uning keyingi harakat yo'nalishidan qat'i nazar, yo'l berishi shart.",
    ruleReference: "YHQ 102-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-203',
    topicId: 't-10',
    ticketId: 'bilet-2',
    questionNumber: 3,
    questionText: "Chorrahaga yetmasdan va chorrahadan keyin kamida necha metr masofada to'xtash taqiqlanadi?",
    options: [
      "3 metr",
      "5 metr",
      "10 metr",
      "15 metr"
    ],
    correctAnswerIndex: 1,
    explanation: "Qatnov qismlari kesishmasida va kesishayotgan qatnov qismi chetidan 5 metrdan kam masofada to'xtash taqiqlanadi.",
    ruleReference: "YHQ 89-band",
    imageType: 'parking',
    difficulty: 'medium'
  },
  {
    id: 'q-204',
    topicId: 't-3',
    ticketId: 'bilet-2',
    questionNumber: 4,
    questionText: "Ko'k rangli yaltiroq mayoqcha va maxsus tovush signali yoqilgan operativ transport vositasi orqasidan kelayotganda qanday harakat qilish kerak?",
    options: [
      "Darhol tezlikni oshirib o'tib ketish kerak",
      "Ushbu transport vositasiga va u kuzatib borayotgan transport vositalariga to'siqsiz o'tib ketish uchun yo'l berish kerak",
      "Ovozli signal chalib to'xtatish kerak",
      "Uning oldiga tushib yo'l ko'rsatish kerak"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 25-bandiga asosan, ko'k (yoki ko'k va qizil) chiroqli mayoqcha va tovushli maxsus signal yoqilgan transport vositasi yaqinlashganda haydovchilar unga va uning kuzatuvidagi transportlarga to'siqsiz o'tish uchun yo'l berishlari kerak.",
    ruleReference: "YHQ 25-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-205',
    topicId: 't-13',
    ticketId: 'bilet-2',
    questionNumber: 5,
    questionText: "Temir yo'l kesishmasida navbatchi xodim yoki svetoforning qizil chirog'i yonib turganda to'xtash qayerda amalga oshiriladi?",
    options: [
      "To'xtash chizig'i (stop-liniya), 2.5 belgisi oldida, agar ular bo'lmasa shlagbaumga kamida 5 metr, eng yaqin relsgacha esa kamida 10 metr qolganda",
      "To'g'ridan-to'g'ri relsning ustida",
      "Relsga 1 metr qolganda",
      "Shlagbaum tagida"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 118-band: To'xtash chizig'i oldida, u bo'lmasa shlagbaumga kamida 5 metr, shlagbaum bo'lmaganda esa eng yaqin relsgacha kamida 10 metr masofada to'xtaladi.",
    ruleReference: "YHQ 118-band",
    imageType: 'railway',
    difficulty: 'medium'
  },
  {
    id: 'q-206',
    topicId: 't-14',
    ticketId: 'bilet-2',
    questionNumber: 6,
    questionText: "Aholi punktlarida tovush signali (klakson) chalishga qaysi holatda ruxsat beriladi?",
    options: [
      "Faqat yo'l-transport hodisasining (avariya) oldini olish zarur bo'lgan hollarda",
      "Tanish haydovchi bilan salomlashish uchun",
      "Oldindagi mashina svetofor yashil yonganda yurmay tursa shoshiltirish uchun",
      "Istalgan vaqtda haydovchining xohishiga ko'ra"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 138-band: Aholi punktlarida tovushli signallardan faqat bitta maqsadda — yo'l-transport hodisasining oldini olish uchungina foydalanishga ruxsat beriladi.",
    ruleReference: "YHQ 138-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-207',
    topicId: 't-8',
    ticketId: 'bilet-2',
    questionNumber: 7,
    questionText: "Turar-joy dahalari va hovli hududlarida (jiloy zona) ruxsat etilgan eng yuqori harakat tezligi qancha?",
    options: [
      "10 km/soat",
      "20 km/soat",
      "30 km/soat",
      "40 km/soat"
    ],
    correctAnswerIndex: 1,
    explanation: "Turar-joy zonalarida va hovlilarda harakat tezligi 20 km/soatdan oshmasligi shart. Bu hududlarda piyodalar qatnov qismida ham ustunlikka ega.",
    ruleReference: "YHQ 78-band va 126-band",
    imageType: 'speed',
    difficulty: 'easy'
  },
  {
    id: 'q-208',
    topicId: 't-15',
    ticketId: 'bilet-2',
    questionNumber: 8,
    questionText: "Tormoz tizimining samaradorligi buzilgan avtomobilni qanday holatda boshqarish mumkin?",
    options: [
      "Sekin, avariya chiroqlarini yoqib",
      "Faqat ustaxonagacha borish uchun",
      "Boshqarish mutlaqo taqiqlanadi",
      "Faqat tunda"
    ],
    correctAnswerIndex: 2,
    explanation: "YHQ 1-ilovasiga ko'ra, ishchi tormoz tizimi yoki rul boshqaruvi ishlamayotgan transport vositasini har qanday holatda boshqarish qat'iyan man etiladi.",
    ruleReference: "YHQ 2.3.1-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-209',
    topicId: 't-7',
    ticketId: 'bilet-2',
    questionNumber: 9,
    questionText: "Aholi punktlaridan tashqaridagi yo'llarda ikki va undan ortiq bo'lakli bo'lsa, haydovchilar qaysi bo'lak bo'ylab harakatlanishlari shart?",
    options: [
      "Istalgan bo'lak bo'ylab",
      "Imkon qadar o'ng bo'lak bo'ylab, o'ng bo'lak bo'sh bo'lganda chap bo'lakda yurish taqiqlanadi",
      "Faqat eng chap bo'lak bo'ylab",
      "O'rta bo'lak bo'ylab"
    ],
    correctAnswerIndex: 1,
    explanation: "Aholi punktidan tashqarida o'ng bo'lak bo'sh turganda chap bo'laklarda harakatlanish taqiqlanadi. Haydovchi imkon qadar o'ng bo'lakka o'tishi shart.",
    ruleReference: "YHQ 67-band",
    imageType: 'speed',
    difficulty: 'medium'
  },
  {
    id: 'q-210',
    topicId: 't-16',
    ticketId: 'bilet-2',
    questionNumber: 10,
    questionText: "Nafas olmayotgan va hushsiz holatdagi jarohatlangan shaxsga yurak-o'pka reanimatsiyasi o'tkazilganda yurakni bosish va nafas berish nisbati qanday?",
    options: [
      "15 marta bosish va 1 marta nafas",
      "30 marta ko'krak qafasini bosish va 2 marta o'pkaga havo yuborish (30:2)",
      "10 marta bosish va 5 marta nafas",
      "50 marta bosish va nafas bermaslik"
    ],
    correctAnswerIndex: 1,
    explanation: "Xalqaro standart va O'zbekiston tibbiy yordam ko'rsatish qoidalariga binoan, yurak-o'pka reanimatsiyasi kattalar uchun 30 ta ko'krak qafasini bosish va 2 ta sun'iy nafas yuborish (30:2) ketma-ketligida bajariladi.",
    ruleReference: "Birinchi tibbiy yordam standartlari",
    imageType: 'medical',
    difficulty: 'medium'
  },

  // --- BILET 3 ---
  {
    id: 'q-301',
    topicId: 't-1',
    ticketId: 'bilet-3',
    questionNumber: 1,
    questionText: "«Bosh yo'l» tushunchasiga qaysi yo'llar kiradi?",
    options: [
      "2.1, 2.2, 2.3.1-2.3.3 belgilari bilan belgilangan yo'l yoki tuproq yo'lga nisbatan qattiq qoplamali (asfalt, beton) yo'l",
      "Faqat kengligi 10 metrdan ortiq yo'llar",
      "Faqat shahar markazidagi yo'llar",
      "Svetofor o'rnatilgan har qanday yo'l"
    ],
    correctAnswerIndex: 0,
    explanation: "Bosh yo'l — 2.1, 2.2 yoki 2.3.1-2.3.3 belgilari o'rnatilgan yo'l, shuningdek tuproqli yo'lga nisbatan qattiq qoplamali (asfalt, sement-beton, tosh) yo'ldir.",
    ruleReference: "YHQ 1.2-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-302',
    topicId: 't-4',
    ticketId: 'bilet-3',
    questionNumber: 2,
    questionText: "Tartibga soluvchi (DAN xodimi) qo'llarini ikki yonga yozgan yoki tushirgan holatda tursa, uning ko'kragi va orqasi tomondan qanday harakatlanish mumkin?",
    options: [
      "To'g'riga va o'ngga",
      "Faqat chapga",
      "Barcha transport vositalarining harakati man etiladi",
      "Barcha yo'nalishlarda harakatlanish mumkin"
    ],
    correctAnswerIndex: 2,
    explanation: "Tartibga soluvchining ko'kragi yoki orqasi oldidagi haydovchilar uchun harakatlanish qat'iyan taqiqlanadi (Ko'krak va orqa — qizil chiroqqa teng).",
    ruleReference: "YHQ 42-band",
    imageType: 'intersection',
    difficulty: 'medium'
  },
  {
    id: 'q-303',
    topicId: 't-11',
    ticketId: 'bilet-3',
    questionNumber: 3,
    questionText: "Chorrahada chapga burilayotgan yoki qayrilib olayotgan haydovchi qarama-qarshi yo'nalishdan to'g'riga va o'ngga harakatlanayotgan transportga yo'l berishi shartmi?",
    options: [
      "Yo'q, burilayotgan ustunlikka ega",
      "Ha, ularga yo'l berishi shart",
      "Faqat yuk avtomobillariga yo'l beradi",
      "Faqat svetofor bo'lmaganda yo'l beradi"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 101 va 107-bandlari: Yashil chiroqda yoki teng yo'lda chapga burilish yoki qayrilib olishda qarama-qarshi tomondan to'g'riga va o'ngga burilayotgan transport vositalariga yo'l berilishi shart.",
    ruleReference: "YHQ 101-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-304',
    topicId: 't-12',
    ticketId: 'bilet-3',
    questionNumber: 4,
    questionText: "Tartibga solinmagan piyodalar o'tish joyiga yaqinlashayotgan haydovchi qatnov qismiga qadam qo'ygan piyodani ko'rganda nima qilishi shart?",
    options: [
      "Tezlikni oshirib piyodadan oldin o'tib ketishi kerak",
      "Signal chalib piyodani to'xtatishi kerak",
      "Tezlikni kamaytirishi yoki to'xtab, piyodaga yo'l berishi shart",
      "Chiroqlarni o'chirib-yoqib o'tib ketishi kerak"
    ],
    correctAnswerIndex: 2,
    explanation: "YHQ 111-bandiga binoan, tartibga solinmagan piyodalar o'tish joyida qatnov qismiga qadam qo'ygan yoki o'tayotgan piyodalarga yo'l berish majburiydir.",
    ruleReference: "YHQ 111-band",
    imageType: 'pedestrian',
    difficulty: 'easy'
  },
  {
    id: 'q-305',
    topicId: 't-5',
    ticketId: 'bilet-3',
    questionNumber: 5,
    questionText: "Aholi punktida majburiy to'xtab qolgan avtomobil orqasiga Avariya to'xtash belgisi kamida necha metr masofada o'rnatiladi?",
    options: [
      "Kamida 5 metr",
      "Kamida 15 metr",
      "Kamida 30 metr",
      "Kamida 50 metr"
    ],
    correctAnswerIndex: 1,
    explanation: "Avariya to'xtash belgisi aholi punktlarida avtomobildan kamida 15 metr, aholi punktlaridan tashqarida esa kamida 30 metr masofada o'rnatiladi.",
    ruleReference: "YHQ 52-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-306',
    topicId: 't-10',
    ticketId: 'bilet-3',
    questionNumber: 6,
    questionText: "Qatnov qismida avtobus va marshrutli taksi to'xtash bekatlari belgisi oldida va orqasida necha metr masofada to'xtash taqiqlanadi?",
    options: [
      "5 metr",
      "10 metr",
      "15 metr",
      "25 metr"
    ],
    correctAnswerIndex: 2,
    explanation: "YHQ 89-band: Yo'nalishli transport vositalari to'xtash bekatlariga 15 metrdan kam masofada to'xtash taqiqlanadi (yo'lovchi tushirish-chiqarishda ularga xalal bermaslik sharti bilan ruxsat berilishi mumkin).",
    ruleReference: "YHQ 89-band",
    imageType: 'parking',
    difficulty: 'medium'
  },
  {
    id: 'q-307',
    topicId: 't-6',
    ticketId: 'bilet-3',
    questionNumber: 7,
    questionText: "Qaysi joylarda orqaga harakatlanish (orqaga yurish) qat'iyan man etiladi?",
    options: [
      "Chorrahalarda, piyodalar o'tish joylarida, tunnellarda, ko'priklarda va temir yo'l kesishmalarida",
      "Faqat bir tomonlama harakat yo'lida",
      "Faqat keng ko'chalarda",
      "Faqat kunduzi"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 62-band: Chorrahalarda, shuningdek qayrilib olish taqiqlangan barcha joylarda (piyodalar o'tish joyi, tunnel, ko'prik, temir yo'l kesishmasi, bekatlar) orqaga harakatlanish qat'iyan taqiqlanadi.",
    ruleReference: "YHQ 62-band",
    imageType: 'intersection',
    difficulty: 'hard'
  },
  {
    id: 'q-308',
    topicId: 't-8',
    ticketId: 'bilet-3',
    questionNumber: 8,
    questionText: "Aholi punktlaridan tashqarida avtomagistral hisoblanmagan yo'llarda yengil avtomobillarning ruxsat etilgan maksimal tezligi qancha?",
    options: [
      "90 km/soat",
      "100 km/soat",
      "110 km/soat",
      "80 km/soat"
    ],
    correctAnswerIndex: 1,
    explanation: "O'zbekistonda aholi punktlaridan tashqarida barcha turdagi yengil avtomobillar uchun ruxsat etilgan yuqori tezlik 100 km/soatni tashkil etadi (avtomagistralda 110 km/soat).",
    ruleReference: "YHQ 78-band",
    imageType: 'speed',
    difficulty: 'medium'
  },
  {
    id: 'q-309',
    topicId: 't-2',
    ticketId: 'bilet-3',
    questionNumber: 9,
    questionText: "Haydovchiga transport vositasini qanday holatda boshqarish qat'iyan taqiqlanadi?",
    options: [
      "Mastlik holatida (alkogol, giyohvandlik va b.), charchoqlik va e'tiborni susaytiradigan dori vositalari ta'sirida",
      "Eshiklari yopiq holatda",
      "Konditsioner yoqilgan holatda",
      "Musiqa tinglagan holda"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 12-band: Alkogol, giyohvand moddalar, harakat xavfsizligiga tahdid soladigan dori-darmonlar ta'sirida yoki o'ta toliqqan holatda transport vositasini boshqarish qat'iyan man etiladi.",
    ruleReference: "YHQ 12-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-310',
    topicId: 't-16',
    ticketId: 'bilet-3',
    questionNumber: 10,
    questionText: "Suyak singanda jabrlanuvchiga birinchi yordam ko'rsatishda eng muhim qoida qaysi?",
    options: [
      "Suyakni joyiga kuch bilan solib qo'yish",
      "Singan suyakni va unga qo'shni kamida ikkita bo'g'imni qimirlamaydigan qilib shina bilan mahkamlash (immobilizatsiya)",
      "Darhol issiq kompress qo'yish",
      "Oyoqqa turg'azib yurgizib ko'rish"
    ],
    correctAnswerIndex: 1,
    explanation: "Singan sohani hech qachon o'zboshimchalik bilan to'g'rilash mumkin emas. Asosiy maqsad — sinish nuqtasiga qo'shni bo'lgan ikkita bo'g'imni shina yordamida qimirlamaydigan qilib fiksatsiya qilishdir.",
    ruleReference: "Birinchi tibbiy yordam ko'rsatish qoidalari",
    imageType: 'medical',
    difficulty: 'medium'
  },

  // --- BILET 4 ---
  {
    id: 'q-401',
    topicId: 't-11',
    ticketId: 'bilet-4',
    questionNumber: 1,
    questionText: "Svetofor va yo'l belgilari (imtiyoz belgilari) bir vaqtda mavjud bo'lganda va svetofor ishlab turganda haydovchi nimaga amal qilishi shart?",
    options: [
      "Imtiyoz belgilariga (2.1 «Bosh yo'l» yoki 2.4 «Yo'l bering»)",
      "Svetoforning ishoralariga",
      "O'ng tomondan kelayotgan mashinaga",
      "O'z xohishiga ko'ra"
    ],
    correctAnswerIndex: 1,
    explanation: "Svetofor ishlab turgan vaqtda imtiyoz belgilari (bosh yo'l, yo'l bering va h.k.) o'z kuchini yo'qotadi va haydovchilar faqat svetoforga amal qiladilar.",
    ruleReference: "YHQ 38-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-402',
    topicId: 't-4',
    ticketId: 'bilet-4',
    questionNumber: 2,
    questionText: "Svetoforning miltillovchi sariq chirog'i nimani bildiradi?",
    options: [
      "Harakatlanish mutlaqo taqiqlanganini",
      "Chorrahada yoki o'tish joyida harakatlanishga ruxsat berilishini va bu tartibga solinmagan xavfli joy ekanligini",
      "Tezlikni 100 km/soatgacha oshirish mumkinligini",
      "Poyezd kelayotganini"
    ],
    correctAnswerIndex: 1,
    explanation: "Miltillovchi sariq chiroq chorrahani tartibga solinmagan holatga o'tganligini bildiradi va ehtiyotkorlik bilan harakatlanishga ruxsat beradi.",
    ruleReference: "YHQ 39-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-403',
    topicId: 't-9',
    ticketId: 'bilet-4',
    questionNumber: 3,
    questionText: "Oldindagi transport vositasi chapga burilish ishorasini berib burilishni boshlagan bo'lsa, uni qaysi tomondan quvib o'tish mumkin?",
    options: [
      "Faqat chap tomondan",
      "O'ng tomondan aylanib o'tishga ruxsat beriladi",
      "Har qanday tomondan taqiqlanadi",
      "Piyodalar yo'lkasi orqali"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 82-band: Chapga burilish ishorasini yoqib burilishni boshlagan transport vositasini o'ng tomondan quvib o'tishga (aylanib o'tishga) ruxsat beriladi.",
    ruleReference: "YHQ 82-band",
    imageType: 'overtake',
    difficulty: 'medium'
  },
  {
    id: 'q-404',
    topicId: 't-10',
    ticketId: 'bilet-4',
    questionNumber: 4,
    questionText: "3.27 «To'xtash taqiqlangan» va 3.28 «To'xtab turish taqiqlangan» belgilarining farqi nimada?",
    options: [
      "3.27 da har qanday to'xtash taqiqlanadi; 3.28 da 5 daqiqagacha yoki yo'lovchi tushirish-chiqarish uchun to'xtashga ruxsat beriladi",
      "Ularning hech qanday farqi yo'q",
      "3.27 faqat yuk mashinalariga, 3.28 yengil mashinalarga tegishli",
      "3.28 faqat tunda amal qiladi"
    ],
    correctAnswerIndex: 0,
    explanation: "3.27 belgisi har qanday to'xtashni man etadi. 3.28 belgisi esa 5 daqiqadan ortiq muddatga transportni qoldirishni (to'xtab turishni) taqiqlaydi, lekin 5 daqiqagacha yoki yuk ortish/tushirish va yo'lovchi mindirish/tushirish uchun to'xtash taqiqlanmaydi.",
    ruleReference: "YHQ 3-guruh belgilari",
    imageType: 'parking',
    difficulty: 'medium'
  },
  {
    id: 'q-405',
    topicId: 't-6',
    ticketId: 'bilet-4',
    questionNumber: 5,
    questionText: "Chorrahada o'ngga burilayotgan haydovchi o'z harakatini qatnov qismining qaysi bo'lagiga yo'naltirishi kerak?",
    options: [
      "Istalgan bo'lakka",
      "Imkon qadar o'ng chetki bo'lakka",
      "Eng chap bo'lakka",
      "Qarama-qarshi qatorga"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 57-band: O'ngga burilish imkon qadar qatnov qismining chetki o'ng bo'lagiga amalga oshirilishi shart.",
    ruleReference: "YHQ 57-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-406',
    topicId: 't-14',
    ticketId: 'bilet-4',
    questionNumber: 6,
    questionText: "Tunda yoritilmagan yo'lda qarama-qarshi transport yaqinlashganda uzoqni yorituvchi chiroqlarni (dalniy) yaqinni yorituvchiga (blijniy) kamida necha metr qolganda almashtirish kerak?",
    options: [
      "Kamida 50 metr",
      "Kamida 100 metr",
      "Kamida 150 metr, shuningdek qarama-qarshi haydovchi chiroqni o'chirib-yoqib iltimos qilganda undan ham uzoqroq masofada",
      "Faqat mashinalar tenglashganda"
    ],
    correctAnswerIndex: 2,
    explanation: "YHQ 134-band: Uzoqni yorituvchi chiroqlar qarama-qarshi kelayotgan transport vositasigacha kamida 150 metr qolganda yaqinni yorituvchi chiroqlarga o'tkazilishi shart.",
    ruleReference: "YHQ 134-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-407',
    topicId: 't-15',
    ticketId: 'bilet-4',
    questionNumber: 7,
    questionText: "Yengil avtomobilning rul boshqaruvidagi lyust (erkin aylanish burchagi) ko'pi bilan necha gradusdan oshmasligi kerak?",
    options: [
      "10 gradus",
      "20 gradus",
      "25 gradus",
      "30 gradus"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ texnik holat talablariga binoan, yengil avtomobillarning rul charxidagi umumiy lyuft 10 gradusdan oshmasligi kerak.",
    ruleReference: "YHQ 2-ilova 2.1-band",
    imageType: 'signs',
    difficulty: 'hard'
  },
  {
    id: 'q-408',
    topicId: 't-1',
    ticketId: 'bilet-4',
    questionNumber: 8,
    questionText: "«Yetarli darajada ko'rinmaslik» tushunchasi nimani anglatadi?",
    options: [
      "Qorong'i tushgan vaqtni",
      "Yomg'ir, qor, tuman va boshqa sharoitlarda yo'lning ko'rinishi 300 metrdan kam bo'lishini",
      "Haydovchining ko'zoynaksiz qolishini",
      "Yo'lning 50 metrgacha ko'rinmasligini"
    ],
    correctAnswerIndex: 1,
    explanation: "Yetarlicha ko'rinmaslik — tuman, yomg'ir, qor yog'ishi va g'ira-shira vaqtda yo'lning ko'rinish masofasi 300 metrdan kam bo'lishidir.",
    ruleReference: "YHQ 1.2-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-409',
    topicId: 't-7',
    ticketId: 'bilet-4',
    questionNumber: 9,
    questionText: "Bir xil yo'nalishda uch va undan ortiq harakat bo'lagi bo'lgan yo'llarda to'la vazni 3.5 tonnadan ortiq yuk avtomobillariga eng chap bo'lakka chiqish qachon ruxsat etiladi?",
    options: [
      "Doimo ruxsat etiladi",
      "Faqat quvib o'tish uchun",
      "Faqat chapga burilish yoki qayrilib olish uchun",
      "Hech qachon ruxsat etilmaydi"
    ],
    correctAnswerIndex: 2,
    explanation: "3.5 tonnadan ortiq yuk avtomobillariga eng chap bo'lakka faqat chapga burilish yoki qayrilib olish uchun chiqishga ruxsat beriladi.",
    ruleReference: "YHQ 68-band",
    imageType: 'speed',
    difficulty: 'hard'
  },
  {
    id: 'q-410',
    topicId: 't-16',
    ticketId: 'bilet-4',
    questionNumber: 10,
    questionText: "Kuyish jarohati olgan kishiga birinchi yordam ko'rsatishda nima qilish qat'iyan taqiqlanadi?",
    options: [
      "Kuygan joyga o'simlik yog'i, yog'li malham surtish yoki hosil bo'lgan pufakchalarni yorish",
      "Sovuq toza suv bilan sovutish",
      "Steril toza doka bilan o'rash",
      "Og'riq qoldiruvchi dori berish"
    ],
    correctAnswerIndex: 0,
    explanation: "Kuygan joyga yog', yog'li maz surtish issiqlik ajralishini to'sib kuyish chuqurlashishiga va infeksiya tushishiga olib keladi. Pufakchalarni yorish ham taqiqlanadi.",
    ruleReference: "Birinchi tibbiy yordam ko'rsatish qoidalari",
    imageType: 'medical',
    difficulty: 'easy'
  },

  // --- BILET 5 ---
  {
    id: 'q-501',
    topicId: 't-11',
    ticketId: 'bilet-5',
    questionNumber: 1,
    questionText: "Teng ahamiyatli yo'llar chorrahasida tramvay bilan yengil avtomobil bir vaqtda teng sharoitda harakatlanayotgan bo'lsa, kim ustunlikka ega?",
    options: [
      "Yengil avtomobil",
      "Harakat yo'nalishidan qat'i nazar tramvay ustunlikka ega",
      "O'ng tomondan kelayotgani",
      "Tezroq kelayotgani"
    ],
    correctAnswerIndex: 1,
    explanation: "Teng ahamiyatli sharoitda tramvay o'zining harakat yo'nalishidan qat'i nazar reysiz transport vositalariga nisbatan doimo imtiyozga ega.",
    ruleReference: "YHQ 100 va 105-bandlari",
    imageType: 'intersection',
    difficulty: 'medium'
  },
  {
    id: 'q-502',
    topicId: 't-2',
    ticketId: 'bilet-5',
    questionNumber: 2,
    questionText: "Avtomobilni boshqarish paytida telefondan quloqchinlarsiz (hands-free siz) foydalanish qoidabuzarlik hisoblanadimi?",
    options: [
      "Yo'q, faqat SMS yozish taqiqlangan",
      "Ha, bu qat'iyan man etiladi va qonuniy javobgarlikka sabab bo'ladi",
      "Faqat tezlik 60 dan oshganda taqiqlanadi",
      "Faqat yangi haydovchilarga taqiqlanadi"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 12-band: Harakatlanish vaqtida telefondan qo'lda ushlab foydalanish taqiqlanadi. Faqat maxsus quloqchinlar va qo'lsiz boshqarish (hands-free) moslamalari orqali gaplashishga ruxsat beriladi.",
    ruleReference: "YHQ 12-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-503',
    topicId: 't-10',
    ticketId: 'bilet-5',
    questionNumber: 3,
    questionText: "Temir yo'l kesishmasiga necha metr qolganda to'xtab turish (stayanka) taqiqlanadi?",
    options: [
      "20 metr",
      "30 metr",
      "50 metr",
      "100 metr"
    ],
    correctAnswerIndex: 2,
    explanation: "YHQ 90-bandiga muvofiq, temir yo'l kesishmasiga 50 metrdan kam masofa qolganda to'xtab turish taqiqlanadi.",
    ruleReference: "YHQ 90-band",
    imageType: 'railway',
    difficulty: 'medium'
  },
  {
    id: 'q-504',
    topicId: 't-8',
    ticketId: 'bilet-5',
    questionNumber: 4,
    questionText: "Boshqa nosoz mexanik transport vositasini shatakka olib ketayotgan avtomobil uchun ruxsat etilgan maksimal tezlik qancha?",
    options: [
      "40 km/soat",
      "50 km/soat",
      "60 km/soat",
      "70 km/soat"
    ],
    correctAnswerIndex: 1,
    explanation: "Mexanik transport vositalarini shatakka olib ketayotganda tezlik 50 km/soatdan oshmasligi shart (har qanday yo'lda).",
    ruleReference: "YHQ 78-band",
    imageType: 'speed',
    difficulty: 'medium'
  },
  {
    id: 'q-505',
    topicId: 't-4',
    ticketId: 'bilet-5',
    questionNumber: 5,
    questionText: "Qo'shimcha seksiyali svetoforda asosiy qizil chiroq bilan birga yashil strelka yonib tursa, qanday harakatlanish kerak?",
    options: [
      "Harakatlanish taqiqlanadi",
      "Strelka yo'nalishida boshqa yo'nalishlardan harakatlanayotgan transport vositalariga yo'l bergan holda harakatlanish mumkin",
      "To'g'riga harakatlanish mumkin",
      "Barchadan ustun holda harakatlanish mumkin"
    ],
    correctAnswerIndex: 1,
    explanation: "Asosiy qizil bilan qo'shimcha yashil yonganda, strelka ko'rsatgan yo'nalishda burilish mumkin, lekin boshqa asosiy yashil chiroqda kelayotgan barcha mashinalarga yo'l berish sharti bilan.",
    ruleReference: "YHQ 40-band",
    imageType: 'intersection',
    difficulty: 'medium'
  },
  {
    id: 'q-506',
    topicId: 't-3',
    ticketId: 'bilet-5',
    questionNumber: 6,
    questionText: "Sariq yoki to'q sariq rangli miltillovchi mayoqchasi yoqilgan transport vositasi (masalan, yo'l tozalash mashinasi) harakatda ustunlikka egami?",
    options: [
      "Ha, doimo imtiyozga ega",
      "Yo'q, bu mayoqcha faqat ogohlantirish vazifasini bajaradi va harakatda ustunlik bermaydi",
      "Faqat avtobuslarga nisbatan ustunlikka ega",
      "Faqat tunda ustunlikka ega"
    ],
    correctAnswerIndex: 1,
    explanation: "Sariq va to'q sariq miltillovchi mayoqcha harakatda imtiyoz bermaydi, u faqat yo'lda xavf borligini ko'rsatuvchi ogohlantirish vositasi hisoblanadi.",
    ruleReference: "YHQ 27-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-507',
    topicId: 't-6',
    ticketId: 'bilet-5',
    questionNumber: 7,
    questionText: "Qayrilib olish (orqaga burilish) qaysi joylarda taqiqlanadi?",
    options: [
      "Piyodalar o'tish joyida, tunnellarda, ko'prik va estakadalarda, temir yo'l kesishmasida, ko'rinishi 100 metrdan kam joylarda",
      "Faqat chorrahalarda",
      "Faqat asfalt yo'llarda",
      "Faqat 3 bo'lakli yo'llarda"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 60-band: Piyodalar o'tish joylarida, tunnellarda, ko'priklarda, temir yo'l kesishmalarida, ko'rinishi 100 metrdan kam bo'lgan yo'l burilishlarida qayrilib olish man etiladi.",
    ruleReference: "YHQ 60-band",
    imageType: 'intersection',
    difficulty: 'hard'
  },
  {
    id: 'q-508',
    topicId: 't-12',
    ticketId: 'bilet-5',
    questionNumber: 8,
    questionText: "Oldindagi harakat bo'lagida piyodalar o'tish joyi oldida boshqa avtomobil sekinlashsa yoki to'xtasa, siz nima qilishingiz kerak?",
    options: [
      "Uning yonidan tezlikni pasaytirmasdan o'tib ketish kerak",
      "Faqat signal chalib o'tish kerak",
      "Siz ham sekinlashishingiz yoki to'xtashingiz, piyoda yo'qligiga to'liq ishonch hosil qilgandan keyingina harakatni davom ettirishingiz shart",
      "Gazni bosib o'tib olish kerak"
    ],
    correctAnswerIndex: 2,
    explanation: "YHQ 112-band: Agar piyodalar o'tish joyi oldida transport vositasi to'xtagan yoki sekinlashgan bo'lsa, yonidagi bo'lakdagi barcha haydovchilar ham to'xtashi/sekinlashishi shart.",
    ruleReference: "YHQ 112-band",
    imageType: 'pedestrian',
    difficulty: 'easy'
  },
  {
    id: 'q-509',
    topicId: 't-15',
    ticketId: 'bilet-5',
    questionNumber: 9,
    questionText: "Yomg'ir yoki qor yoqqanda old oyna tozalagich (dvornik) haydovchi tomonida ishlamasa, avtomobilni haydash mumkinmi?",
    options: [
      "Ha, faqat oynani artib-artib haydash mumkin",
      "Bunday noqulay ob-havo sharoitida harakatlanish taqiqlanadi",
      "Faqat kunduzi mumkin",
      "Avariya chirog'ini yoqib mumkin"
    ],
    correctAnswerIndex: 1,
    explanation: "Yomg'ir yoki qor yog'ayotgan vaqtda haydovchi tomonidagi old oyna tozalagich ishlamasa, transport vositasini boshqarish qat'iyan taqiqlanadi.",
    ruleReference: "YHQ 2.3.1-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-510',
    topicId: 't-16',
    ticketId: 'bilet-5',
    questionNumber: 10,
    questionText: "YTHda jarohatlangan odamning umurtqa pog'onasi shikastlangan bo'lishi ehtimoli bo'lsa, uni qanday ko'chirish yoki yotqizish lozim?",
    options: [
      "O'tirg'izib qo'yish kerak",
      "Qattiq tekis yuzaga orqasi bilan chalqancha yotqizib, bosh va bo'yin qismini qimirlamaydigan qilib fiksatsiya qilish",
      "Yumshoq ko'rpaga dumalatish",
      "Oyoqlarini ko'tarib osiltirib qo'yish"
    ],
    correctAnswerIndex: 1,
    explanation: "Umurtqa shikastlanganda bemor faqat qattiq tekis taxta/zambilda, boshi va tanasi bir tekis o'qda ushlangan holda ehtiyotkorlik bilan ko'chiriladi.",
    ruleReference: "Birinchi tibbiy yordam ko'rsatish yo'riqnomasi",
    imageType: 'medical',
    difficulty: 'medium'
  },

  // --- BILET 6 (Oson Prava / YHQ Davlat Standarti) ---
  {
    id: 'q-601',
    topicId: 't-1',
    ticketId: 'bilet-6',
    questionNumber: 1,
    questionText: "Yo'l harakati qoidalariga ko'ra, «Aholi punkti» tushunchasi qaysi belgilar bilan bildirilgan hududni anglatadi?",
    options: [
      "Faqat aholi soni 50 000 dan oshiq bo'lgan shaharlar",
      "5.22, 5.23 «Aholi punktining boshlanishi» va 5.24, 5.25 «Aholi punktining oxiri» belgilari bilan belgilangan hudud",
      "Faqat ko'p qavatli uylar qurilgan joylar",
      "Svetoforlar o'rnatilgan har qanday hudud"
    ],
    correctAnswerIndex: 1,
    explanation: "Aholi punkti — kirish va chiqish joylari 5.22 - 5.25 yo'l belgilari bilan belgilangan imoratlar joylashgan hududdir.",
    ruleReference: "YHQ 1.2-band",
    imageType: 'speed',
    difficulty: 'easy'
  },
  {
    id: 'q-602',
    topicId: 't-6',
    ticketId: 'bilet-6',
    questionNumber: 2,
    questionText: "Ikki transport vositasi bir vaqtda qatorlarini o'zaro almashtirayotganda (perekrestka oldida yonma-yon qatorga o'tishda) kim kimga yo'l berishi shart?",
    options: [
      "Chap tomondagi haydovchi o'ng tomondan kelayotgan transport vositasiga yo'l berishi shart",
      "O'ng tomondagi haydovchi chap tomondagiga yo'l beradi",
      "Tezroq kelayotgan birinchi o'tadi",
      "Kattaroq avtomobil birinchi o'tadi"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 56-band: Bir vaqtda o'zaro qator almashtirayotgan transport vositalari haydovchilari o'rtasida o'ng qo'l qoidasi amal qiladi — chapdagi haydovchi o'ng tomondan yaqinlashayotganga yo'l berishi shart.",
    ruleReference: "YHQ 56-band",
    imageType: 'overtake',
    difficulty: 'medium'
  },
  {
    id: 'q-603',
    topicId: 't-8',
    ticketId: 'bilet-6',
    questionNumber: 3,
    questionText: "Yengil avtomobil tirkama (pritsep) bilan harakatlanganda aholi punktlaridan tashqarida qanday tezlikda harakatlanishi mumkin?",
    options: [
      "100 km/soat",
      "80 km/soat",
      "70 km/soat",
      "60 km/soat"
    ],
    correctAnswerIndex: 1,
    explanation: "Aholi punktlaridan tashqarida yengil avtomobillarga tirkama bilan harakatlanishda tezlik 80 km/soatdan (avtomagistralda 90 km/soat) oshmasligi shart.",
    ruleReference: "YHQ 78-band",
    imageType: 'speed',
    difficulty: 'medium'
  },
  {
    id: 'q-604',
    topicId: 't-2',
    ticketId: 'bilet-6',
    questionNumber: 4,
    questionText: "12 yoshga to'lmagan bolalarni yengil avtomobilning old o'rindig'ida qanday tashishga ruxsat etiladi?",
    options: [
      "Katta yoshli odamning quchog'ida",
      "Faqat bolalarning bo'y va vazniga mos keladigan maxsus bolalar ushlab turuvchi moslamasi (avtokreslo)da",
      "Xavfsizlik kamarini oddiy taqqan holda",
      "Old o'rindiqda bolalarni tashish har qanday holatda qat'iyan taqiqlanadi"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 159-bandiga binoan, 12 yoshga to'lmagan bolalarni avtomobilning old o'rindig'ida faqat maxsus bolalar avtokreslosida tashishga ruxsat beriladi.",
    ruleReference: "YHQ 159-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-605',
    topicId: 't-11',
    ticketId: 'bilet-6',
    questionNumber: 5,
    questionText: "O'ng tomonga burilayotgan transport vositasi qatnov qismini kesib o'tayotgan piyodalar va velosipedchilarga yo'l berishi kerakmi?",
    options: [
      "Yo'q, chunki mashina asosiy qatnov qismida",
      "Ha, ularga yo'l berishi shart",
      "Faqat svetofor bo'lmaganda yo'l beradi",
      "Faqat piyodalar yugurib o'tayotgan bo'lsa"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 100-band: O'ngga yoki chapga burilishda haydovchi o'zi burilayotgan yo'lning qatnov qismini kesib o'tayotgan piyodalar va velosipedchilarga yo'l berishi shart.",
    ruleReference: "YHQ 100-band",
    imageType: 'pedestrian',
    difficulty: 'easy'
  },
  {
    id: 'q-606',
    topicId: 't-9',
    ticketId: 'bilet-6',
    questionNumber: 6,
    questionText: "Quvib o'tilayotgan transport vositasi haydovchisiga tezlikni oshirish yoki boshqa harakatlar bilan quvib o'tishga to'sqinlik qilish ruxsat etiladimi?",
    options: [
      "Ha, agar orqadagi mashina xalaqit berayotgan bo'lsa",
      "Ruxsat etilmaydi, to'sqinlik qilish qat'iyan taqiqlanadi",
      "Faqat shahar tashqarisida ruxsat etiladi",
      "Faqat quvib o'tayotgan haydovchi qoidani buzayotgan bo'lsa"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 83-band: Quvib o'tilayotgan transport vositasining haydovchisiga harakat tezligini oshirish yoki boshqa yo'llar bilan quvib o'tishga to'sqinlik qilish man etiladi.",
    ruleReference: "YHQ 83-band",
    imageType: 'overtake',
    difficulty: 'easy'
  },
  {
    id: 'q-607',
    topicId: 't-10',
    ticketId: 'bilet-6',
    questionNumber: 7,
    questionText: "Yo'lning qaysi qismlarida to'xtash taqiqlanadi?",
    options: [
      "Estakada, ko'prik va yo'l o'tkazgichlarda (agar harakat yo'nalishida 3 tadan kam bo'lak bo'lsa) hamda ularning tagida, tunnellarda",
      "Faqat shahar markazida",
      "Faqat yoqilg'i quyish shoxobchalari oldida",
      "Faqat kechasi"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 89-band: Ko'priklar, yo'l o'tkazgichlar va estakadalarda (ushbu yo'nalishda 3 tadan kam bo'lak bo'lganda) hamda ularning ostida, shuningdek tunnellarda to'xtash qat'iyan taqiqlanadi.",
    ruleReference: "YHQ 89-band",
    imageType: 'parking',
    difficulty: 'hard'
  },
  {
    id: 'q-608',
    topicId: 't-14',
    ticketId: 'bilet-6',
    questionNumber: 8,
    questionText: "Tuman chiroqlaridan (protivotumannik) qachon foydalanish mumkin?",
    options: [
      "Faqat kunduzi quyosh chiqqanda",
      "Yetarlicha ko'rinmaslik sharoitida (tuman, yomg'ir, qor) mustaqil yoki yaqin/uzoqni yorituvchi faralar bilan birgalikda, shuningdek qorong'i vaqtda yoritilmagan yo'llarda faralar bilan birga",
      "Har doim o'chirmasdan yurish shart",
      "Faqat orqaga harakatlanganda"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 136-band: Tuman chiroqlaridan yetarlicha ko'rinmaslik sharoitida, shuningdek qorong'i vaqtda yaqin yoki uzoqni yorituvchi chiroqlar bilan birgalikda foydalanishga ruxsat beriladi.",
    ruleReference: "YHQ 136-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-609',
    topicId: 't-15',
    ticketId: 'bilet-6',
    questionNumber: 9,
    questionText: "Gaz ballonli transport vositalarida gaz apparaturasining sinov (attestatsiya) muddati o'tgan bo'lsa ularni boshqarishga ruxsat beriladimi?",
    options: [
      "Ha, faqat gaz quyish shoxobchasigacha",
      "Qat'iyan taqiqlanadi",
      "Faqat benzin bilan yurganda mumkin",
      "Tezlikni 40 dan oshirmay mumkin"
    ],
    correctAnswerIndex: 1,
    explanation: "Gaz ballonli avtomobillarning balloni belgilangan muddatda texnik sinovdan o'tmagan yoki gaz sizib chiqayotgan bo'lsa, ularni boshqarish qat'iyan man etiladi.",
    ruleReference: "YHQ 3-ilova 7.14-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-610',
    topicId: 't-16',
    ticketId: 'bilet-6',
    questionNumber: 10,
    questionText: "Venoz qon ketishining asosiy belgisi va uni to'xtatish usuli qanday?",
    options: [
      "Qon ochiq qizil rangda va favvora bo'lib otiladi; jgut qo'yiladi",
      "Qon to'q qizil rangda, uzluksiz bir tekis oqadi; bosib turuvchi steril bog'lam (davilnaya povyazka) qo'yiladi",
      "Qon tomchilab oqadi; yod surtiladi",
      "Hech narsa qilinmaydi, o'zi to'xtaydi"
    ],
    correctAnswerIndex: 1,
    explanation: "Venoz qon ketishida to'q qizil qon bir maromda tinch oqadi. Uni to'xtatish uchun yaraga toza doka qo'yib, ustidan qattiq bosib turuvchi bog'lam bog'lanadi.",
    ruleReference: "Birinchi tibbiy yordam ko'rsatish qoidalari",
    imageType: 'medical',
    difficulty: 'medium'
  },

  // --- BILET 7 (Oson Prava / YHQ Amaliy Biletlar) ---
  {
    id: 'q-701',
    topicId: 't-7',
    ticketId: 'bilet-7',
    questionNumber: 1,
    questionText: "Yo'l chiziqlaridan 1.1 yaxlit oq chiziqni bosib o'tish yoki kesib o'tishga qaysi holatda ruxsat beriladi?",
    options: [
      "Istalgan vaqtda quvib o'tish uchun",
      "Hech qanday holatda ruxsat etilmaydi (qat'iy taqiqlanadi)",
      "Faqat tunda",
      "Oldindagi mashina sekin yurganda"
    ],
    correctAnswerIndex: 1,
    explanation: "1.1 yaxlit chiziq qarama-qarshi harakat oqimlarini yoki xavfli joylardagi bo'laklarni ajratadi. Uni kesib o'tish qat'iyan man etiladi.",
    ruleReference: "YHQ 2-ilova (Yo'l chiziqlari 1.1)",
    imageType: 'speed',
    difficulty: 'easy'
  },
  {
    id: 'q-702',
    topicId: 't-5',
    ticketId: 'bilet-7',
    questionNumber: 2,
    questionText: "Avariya xavfli to'xtash ishorasi (avariyka — barcha burilish chiroqlari miltillashi) qachon yoqilishi shart?",
    options: [
      "Yo'l-transport hodisasida, to'xtash taqiqlangan joylarda majburiy to'xtaganda, boshqa transport vositasini shatakka olishda va haydovchi faralardan ko'zi qamashganda",
      "Faqat do'konga kirib chiqish uchun to'xtaganda",
      "Faqat mashina yuvilayotganda",
      "Do'stlar bilan uchrashganda"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 49-band: Avariya signali YTH ro'y berganda, to'xtash taqiqlangan joyda majburiy to'xtab qolganda, fara nuri ko'zni qamashtirganda, shatakka olingan transportda va bolalar guruhini tushirish-mindirishda yoqiladi.",
    ruleReference: "YHQ 49-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-703',
    topicId: 't-11',
    ticketId: 'bilet-7',
    questionNumber: 3,
    questionText: "Chorrahada asosiy yo'l yo'nalishini o'zgartirsa (masalan, 7.13 qo'shimcha axborot lavhasi bilan o'ngga burilsa), asosiy yo'ldagi haydovchilar bir-birlari bilan qaysi qoida bo'yicha harakatlanishadi?",
    options: [
      "O'zaro teng ahamiyatli yo'llar qoidasi (o'ng qo'l qoidasi) bo'yicha",
      "Asosiy yo'lda birinchi kelgan mashina o'tadi",
      "Kattaroq transport birinchi o'tadi",
      "Ikkilamchi yo'ldagi kutib turadi"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 104-band: Asosiy yo'l yo'nalishini o'zgartirgan chorrahada asosiy yo'lda harakatlanayotgan haydovchilar o'zaro teng ahamiyatli yo'llar chorrahasida harakatlanish qoidalariga (o'ng qo'l qoidasiga) amal qiladilar.",
    ruleReference: "YHQ 104-band",
    imageType: 'intersection',
    difficulty: 'hard'
  },
  {
    id: 'q-704',
    topicId: 't-10',
    ticketId: 'bilet-7',
    questionNumber: 4,
    questionText: "Yo'lning keskin burilishlarida va ko'rinish masofasi 100 metrdan kam bo'lgan joylarda to'xtash qoidalari qanday?",
    options: [
      "Faqat yo'l chetida to'xtash mumkin",
      "Qatnov qismida to'xtash taqiqlanadi (faqat ajratilgan maxsus maydonchalarda yoki yo'l yoqasida ruxsat)",
      "Har qanday joyda to'xtash mumkin",
      "Avariya chirog'ini yoqib to'xtash mumkin"
    ],
    correctAnswerIndex: 1,
    explanation: "Ko'rinishi 100 metrdan kam bo'lgan xavfli burilishlarda va tepalik do'ngliklarida qatnov qismida to'xtash taqiqlanadi.",
    ruleReference: "YHQ 89-band",
    imageType: 'parking',
    difficulty: 'medium'
  },
  {
    id: 'q-705',
    topicId: 't-6',
    ticketId: 'bilet-7',
    questionNumber: 5,
    questionText: "Hovlidan yoki yoqilg'i quyish shoxobchasi (AYQSh) hududidan yo'lga chiqib kelayotgan haydovchi kimlarga yo'l berishi shart?",
    options: [
      "Faqat chapdan kelayotgan mashinalarga",
      "Yo'l bo'ylab harakatlanayotgan barcha transport vositalari va piyodalarga",
      "Hech kimga, chiqib keluvchi ustunlikka ega",
      "Faqat avtobuslarga"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 55-band: Yondosh hududdan yo'lga chiqayotgan haydovchi ushbu yo'lda harakatlanayotgan barcha transport vositalari va piyodalarga yo'l berishi shart.",
    ruleReference: "YHQ 55-band",
    imageType: 'intersection',
    difficulty: 'easy'
  },
  {
    id: 'q-706',
    topicId: 't-3',
    ticketId: 'bilet-7',
    questionNumber: 6,
    questionText: "Yaltiroq ko'k va qizil chiroq hamda maxsus tovushli signallari yoqilgan transport vositalari kolonnasi kelganda qarama-qarshi yo'nalishdagi haydovchilar nima qilishi kerak?",
    options: [
      "Tezlikni oshirib o'tib ketish kerak",
      "Ajratuvchi mintaqa bo'lmagan yo'llarda yo'l chetiga to'xtab yo'l berishlari shart",
      "Hech narsa qilish shart emas",
      "Signal chalib ogohlantirish kerak"
    ],
    correctAnswerIndex: 1,
    explanation: "Ajratuvchi mintaqasi bo'lmagan yo'llarda ko'k va qizil chiroqli kolonnalar yaqinlashganda qarama-qarshi yo'nalishdagi haydovchilar ham chetga chiqib to'xtashlari talab qilinadi.",
    ruleReference: "YHQ 25-band",
    imageType: 'signs',
    difficulty: 'hard'
  },
  {
    id: 'q-707',
    topicId: 't-8',
    ticketId: 'bilet-7',
    questionNumber: 7,
    questionText: "Avtomagistralda (5.1 belgisi bilan belgilangan yo'lda) yengil avtomobillarning eng yuqori harakat tezligi qancha?",
    options: [
      "100 km/soat",
      "110 km/soat",
      "120 km/soat",
      "130 km/soat"
    ],
    correctAnswerIndex: 1,
    explanation: "O'zbekistonda avtomagistrallarda yengil avtomobillarning eng yuqori tezligi 110 km/soat qilib belgilangan.",
    ruleReference: "YHQ 78-band",
    imageType: 'speed',
    difficulty: 'easy'
  },
  {
    id: 'q-708',
    topicId: 't-13',
    ticketId: 'bilet-7',
    questionNumber: 8,
    questionText: "Temir yo'l kesishmasida shlagbaum yopiq turgan yoki yopilayotgan bo'lsa, shlagbaumni aylanib o'tish mumkinmi?",
    options: [
      "Poyezd uzoqda bo'lsa mumkin",
      "Qat'iyan taqiqlanadi va og'ir qoidabuzarlik hisoblanadi",
      "Faqat mototsiklda mumkin",
      "Navbatchi xodim ruxsat bersa ham mumkin emas"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 117-band: Shlagbaumni o'zboshimchalik bilan ochish yoki yopiq shlagbaumni aylanib o'tish hayot uchun o'ta xavfli va qat'iyan taqiqlanadi.",
    ruleReference: "YHQ 117-band",
    imageType: 'railway',
    difficulty: 'easy'
  },
  {
    id: 'q-709',
    topicId: 't-15',
    ticketId: 'bilet-7',
    questionNumber: 9,
    questionText: "Bir o'qqa (bitta o'qqa o'rnatilgan g'ildiraklarga) har xil o'lchamdagi yoki har xil protektor naqshiga ega shinalarni o'rnatish mumkinmi?",
    options: [
      "Ha, faqat orqa o'qqa mumkin",
      "Taqiqlanadi, bir o'qdagi shinalar bir xil o'lcham, model va naqshga ega bo'lishi shart",
      "Faqat yoz faslida mumkin",
      "Faqat ehtiyot g'ildirak (zapas) bo'lmaganda mumkin"
    ],
    correctAnswerIndex: 1,
    explanation: "Transport vositasining bitta o'qiga turli o'lchamdagi, turli konstruksiyadagi yoki protektor naqshi har xil bo'lgan shinalarni o'rnatish qat'iyan taqiqlanadi.",
    ruleReference: "YHQ 3-ilova 5.5-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-710',
    topicId: 't-16',
    ticketId: 'bilet-7',
    questionNumber: 10,
    questionText: "Qorin bo'shlig'i jarohatlangan, qorni og'riyotgan jabrlanuvchiga qanday yordam ko'rsatiladi?",
    options: [
      "Ko'p miqdorda suv va og'riq qoldiruvchi dorilar ichiriladi",
      "Suv va ovqat berish qat'iyan man etiladi, qoringa sovuq narsa qo'yiladi va tizzalari bukilgan holatda yotqiziladi",
      "Qorniga issiq grelka qo'yiladi",
      "Oyoqqa turg'azib yurgiziladi"
    ],
    correctAnswerIndex: 1,
    explanation: "Qorin jarohatlarida ichki a'zolar yorilishi mumkinligi sababli ichishga suv va dori berish qat'iyan man etiladi. Tizzalarni bukib yotqiziladi va qoringa sovuq buyum qo'yiladi.",
    ruleReference: "Birinchi tibbiy yordam ko'rsatish qoidalari",
    imageType: 'medical',
    difficulty: 'hard'
  },

  // --- BILET 8 (Oson Prava / Davlat Imtihon Testlari) ---
  {
    id: 'q-801',
    topicId: 't-4',
    ticketId: 'bilet-8',
    questionNumber: 1,
    questionText: "Tartibga soluvchi o'ng qo'lini oldinga cho'zgan holatda tursa, uning chap yonidan kelayotgan yengil avtomobil qaysi yo'nalishlarda harakatlanishi mumkin?",
    options: [
      "Faqat to'g'riga",
      "Faqat o'ngga",
      "Barcha yo'nalishlarda (to'g'riga, o'ngga, chapga va qayrilib olishga)",
      "Harakatlanish taqiqlanadi"
    ],
    correctAnswerIndex: 2,
    explanation: "Tartibga soluvchining qo'li oldinga cho'zilgan holatida uning chap tomonidagi reysiz transport vositalariga barcha yo'nalishlarda harakatlanishga ruxsat beriladi.",
    ruleReference: "YHQ 42-band",
    imageType: 'intersection',
    difficulty: 'hard'
  },
  {
    id: 'q-802',
    topicId: 't-9',
    ticketId: 'bilet-8',
    questionNumber: 2,
    questionText: "Tepalikka ko'tarilishning oxirida quvib o'tishga ruxsat beriladimi?",
    options: [
      "Ha, tezlik yetarli bo'lsa",
      "Qat'iyan taqiqlanadi (chunki qarama-qarshi tomondan kelayotgan mashina ko'rinmaydi)",
      "Faqat yuk mashinalarini quvib o'tish mumkin",
      "Kunduzgi vaqtda mumkin"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 85-band: Tepalikning do'ng qismida va ko'rinishi cheklangan joylarda qarama-qarshi bo'lakka chiqib quvib o'tish qat'iyan taqiqlanadi.",
    ruleReference: "YHQ 85-band",
    imageType: 'overtake',
    difficulty: 'medium'
  },
  {
    id: 'q-803',
    topicId: 't-11',
    ticketId: 'bilet-8',
    questionNumber: 3,
    questionText: "Svetoforning sariq chirog'i yonganda qaysi haydovchilarga harakatni davom ettirishga ruxsat beriladi?",
    options: [
      "Barcha haydovchilarga",
      "Faqat favqulodda keskin tormoz bermasdan to'xtash chizig'i oldida to'xtashga ulgura olmaydigan haydovchilarga",
      "Faqat taksi haydovchilariga",
      "Hech kimga ruxsat berilmaydi"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 45-band: Sariq chiroq yonganda keskin tormoz bermasdan to'xtashga ulgura olmaydigan haydovchilarga harakatni davom ettirishga ruxsat beriladi.",
    ruleReference: "YHQ 45-band",
    imageType: 'intersection',
    difficulty: 'medium'
  },
  {
    id: 'q-804',
    topicId: 't-1',
    ticketId: 'bilet-8',
    questionNumber: 4,
    questionText: "«Majburiy to'xtash» nima?",
    options: [
      "Svetoforning qizil chirog'ida to'xtash",
      "Piyodani o'tkazib yuborish uchun to'xtash",
      "Texnik nosozlik, tashilayotgan yuk keltirib chiqargan xavf, haydovchi yoki yo'lovchining salomatligi tufayli harakatni to'xtatish",
      "Do'konga kirish uchun to'xtash"
    ],
    correctAnswerIndex: 2,
    explanation: "Majburiy to'xtash — texnik nosozlik, yuk xavfi, ob-havo to'siqlari yoki odamning sog'lig'i yomonlashishi tufayli harakatni to'xtatishdir.",
    ruleReference: "YHQ 1.2-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-805',
    topicId: 't-10',
    ticketId: 'bilet-8',
    questionNumber: 5,
    questionText: "Avtomobillar yo'l yoqasida yoki qatnov qismi chetida qanday joylashtirilishi kerak?",
    options: [
      "Yo'lga ko'ndalang holatda",
      "Qatnov qismi chetiga parallel ravishda, bir qatorda",
      "Istalgan burchak ostida",
      "Ikki qator qilib"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 88-band: Transport vositalarini qatnov qismi chetiga parallel qilib faqat bir qatorda to'xtash va to'xtab turishga ruxsat beriladi (yon aravachasiz ikki g'ildiraklilardan tashqari).",
    ruleReference: "YHQ 88-band",
    imageType: 'parking',
    difficulty: 'easy'
  },
  {
    id: 'q-806',
    topicId: 't-2',
    ticketId: 'bilet-8',
    questionNumber: 6,
    questionText: "Ichki ishlar organi xodimi (YPX inspektori) to'xtash talabini berganda haydovchi nima qilishi shart?",
    options: [
      "Faqat yaqin oradagi YPX postigacha borib to'xtash",
      "Ko'rsatilgan joyda to'xtash qoidalariga rioya qilgan holda darhol to'xtashi shart",
      "To'xtamasdan o'tib ketish",
      "Signal chalib yo'l berishni so'rash"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 11-bandiga binoan haydovchi vakolatli organ xodimining talabiga ko'ra ko'rsatilgan joyda darhol to'xtashi shart.",
    ruleReference: "YHQ 11-band",
    imageType: 'signs',
    difficulty: 'easy'
  },
  {
    id: 'q-807',
    topicId: 't-7',
    ticketId: 'bilet-8',
    questionNumber: 7,
    questionText: "Yo'l harakati xavfsizligini ta'minlash uchun haydovchi harakatlanayotganda oldindagi transportgacha qanday oraliq masofani (distansiya) saqlashi kerak?",
    options: [
      "Har doim 5 metr",
      "To'qnashuvning oldini olishga kafolat beradigan xavfsiz oraliq masofani saqlashi shart",
      "Faqat tunda masofa saqlanadi",
      "Tezlikdan qat'i nazar 10 metr"
    ],
    correctAnswerIndex: 1,
    explanation: "YHQ 72-band: Haydovchi tezlikka va yo'l holatiga qarab to'qnashuvning oldini oluvchi xavfsiz masofa va yonlama oraliqni saqlashi shart.",
    ruleReference: "YHQ 72-band",
    imageType: 'speed',
    difficulty: 'easy'
  },
  {
    id: 'q-808',
    topicId: 't-14',
    ticketId: 'bilet-8',
    questionNumber: 8,
    questionText: "Fara nuri qarama-qarshi haydovchining ko'zini qamashtirganda haydovchi qanday harakat qilishi kerak?",
    options: [
      "Avariya chiroqlarini yoqib, egallab turgan bo'lagidan chiqmasdan tezlikni pasaytirishi va to'xtashi kerak",
      "Darhol yo'l chetiga keskin burilishi kerak",
      "Uzoqni yorituvchi chiroqni yoqib o'ch olish kerak",
      "Tezlikni oshirib tezroq o'tib ketish kerak"
    ],
    correctAnswerIndex: 0,
    explanation: "YHQ 135-band: Ko'z qamashganda haydovchi darhol avariya chiroqlarini yoqishi va qatorni o'zgartirmasdan tezlikni pasaytirib to'xtashi shart.",
    ruleReference: "YHQ 135-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-809',
    topicId: 't-15',
    ticketId: 'bilet-8',
    questionNumber: 9,
    questionText: "Ovoz signali (klakson) ishlamayotgan transport vositasidan foydalanishga ruxsat etiladimi?",
    options: [
      "Ha, faqat aholi punktida mumkin",
      "Foydalanish taqiqlanadi",
      "Faqat kunduzi mumkin",
      "Faqat yengil avtomobillarga mumkin"
    ],
    correctAnswerIndex: 1,
    explanation: "Ovozli signalizatsiya moslamasi ishlamayotgan transport vositasidan foydalanish taqiqlanadi.",
    ruleReference: "YHQ 3-ilova 7.2-band",
    imageType: 'signs',
    difficulty: 'medium'
  },
  {
    id: 'q-810',
    topicId: 't-16',
    ticketId: 'bilet-8',
    questionNumber: 10,
    questionText: "Zarba oqibatida ko'krak qafasiga havo kiruvchi ochiq jarohatda (ochiq pnevmotoraks) birinchi yordam qanday?",
    options: [
      "Yaraga havo o'tmaydigan germetik bog'lam (plyonka, sellofan yoki maxsus okklyuzion bog'lam) qo'yish",
      "Yarani kengroq ochish",
      "Ko'p miqdorda kofe ichirish",
      "Bemorning qornini qattiq bog'lash"
    ],
    correctAnswerIndex: 0,
    explanation: "Ko'krak qafasi teshilganda o'pkaning tushib qolishining oldini olish uchun jarohat ustiga zudlik bilan havo o'tkazmaydigan germetik material (okklyuzion bog'lam) qo'yib bog'lanadi.",
    ruleReference: "Birinchi tibbiy yordam ko'rsatish qoidalari",
    imageType: 'medical',
    difficulty: 'hard'
  }
];

