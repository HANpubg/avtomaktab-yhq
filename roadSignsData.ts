import { RoadSign } from '../types';

export const ROAD_SIGNS: RoadSign[] = [
  // 1. Ogohlantiruvchi belgilar (Warning)
  {
    id: 'sign-1-1',
    code: '1.1',
    name: "Shlagbaumli temir yo'l kesishmasi",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Shlagbaum bilan jihozlangan temir yo'l kesishmasiga yaqinlashayotganlik haqida ogohlantiradi. Aholi punktida 50-100m, tashqarida 150-300m masofada o'rnatiladi.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'fence'
  },
  {
    id: 'sign-1-2',
    code: '1.2',
    name: "Shlagbaumsiz temir yo'l kesishmasi",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Shlagbaum bilan jihozlanmagan temir yo'l kesishmasiga yaqinlashayotganlik haqida ogohlantiradi.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'locomotive'
  },
  {
    id: 'sign-1-8',
    code: '1.8',
    name: "Svetofor bilan tartibga solish",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Harakat svetofor bilan tartibga solinadigan chorraha yoki piyodalar o'tish joyiga yaqinlashayotganlik haqida ogohlantiradi.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'traffic-light'
  },
  {
    id: 'sign-1-11-1',
    code: '1.11.1',
    name: "Xavfli burilish (o'ngga)",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Kichik radiusli yoki ko'rinishi cheklangan o'ngga xavfli burilish.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'turn-right'
  },
  {
    id: 'sign-1-11-2',
    code: '1.11.2',
    name: "Xavfli burilish (chapga)",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Kichik radiusli yoki ko'rinishi cheklangan chapga xavfli burilish.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'turn-left'
  },
  {
    id: 'sign-1-20',
    code: '1.20',
    name: "Yo'lning torayishi",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Yo'lning qatnov qismi har ikki tomondan torayishi haqida ogohlantiradi.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'road-narrow'
  },
  {
    id: 'sign-1-21',
    code: '1.21',
    name: "Ikki tomonlama harakat",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Bir tomonlama yo'ldan qarama-qarshi harakatlanish boshlanadigan qismga yaqinlashish.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'two-way'
  },
  {
    id: 'sign-1-22',
    code: '1.22',
    name: "Piyodalar o'tish joyi (ogohlantiruvchi)",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Tartibga solinmagan piyodalar o'tish joyiga yaqinlashayotganlik haqida ogohlantiradi.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'pedestrian-warning'
  },
  {
    id: 'sign-1-23',
    code: '1.23',
    name: "Bolalar",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Maktab, bolalar maydonchasi yoki bog'cha yaqinidagi bolalar paydo bo'lishi mumkin bo'lgan yo'l qismi.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'children'
  },
  {
    id: 'sign-1-25',
    code: '1.25',
    name: "Yo'l ishlari",
    category: 'warning',
    categoryUz: 'Ogohlantiruvchi belgilar',
    description: "Yo'lda ta'mirlash yoki qurilish ishlari bajarilayotgan joy.",
    shape: 'triangle',
    bgColor: '#fffb00',
    borderColor: '#dc2626',
    iconSymbol: 'road-work'
  },

  // 2. Imtiyoz belgilari (Priority)
  {
    id: 'sign-2-1',
    code: '2.1',
    name: "Bosh yo'l",
    category: 'priority',
    categoryUz: 'Imtiyoz belgilari',
    description: "Tartibga solinmagan chorrahalardan birinchi navbatda o'tish imtiyozini beradi.",
    shape: 'diamond',
    bgColor: '#facc15',
    borderColor: '#ffffff',
    iconSymbol: 'main-road'
  },
  {
    id: 'sign-2-2',
    code: '2.2',
    name: "Bosh yo'lning oxiri",
    category: 'priority',
    categoryUz: 'Imtiyoz belgilari',
    description: "2.1 belgisi bilan berilgan ustunlik tugaganligini bildiradi.",
    shape: 'diamond',
    bgColor: '#facc15',
    borderColor: '#ffffff',
    iconSymbol: 'end-main-road'
  },
  {
    id: 'sign-2-4',
    code: '2.4',
    name: "Yo'l bering",
    category: 'priority',
    categoryUz: 'Imtiyoz belgilari',
    description: "Kesib o'tilayotgan yo'ldan kelayotgan transport vositalariga yo'l berish shartligini bildiradi.",
    shape: 'triangle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'give-way'
  },
  {
    id: 'sign-2-5',
    code: '2.5',
    name: "To'xtamasdan harakatlanish taqiqlangan (STOP)",
    category: 'priority',
    categoryUz: 'Imtiyoz belgilari',
    description: "To'xtash chizig'i yoki belgi oldida to'xtamasdan o'tish qat'iyan taqiqlanadi.",
    shape: 'octagon',
    bgColor: '#dc2626',
    borderColor: '#ffffff',
    iconSymbol: 'stop'
  },

  // 3. Ta'qiqlovchi belgilar (Prohibitory)
  {
    id: 'sign-3-1',
    code: '3.1',
    name: "Kirish taqiqlangan (G'isht)",
    category: 'prohibitory',
    categoryUz: "Ta'qiqlovchi belgilar",
    description: "Barcha transport vositalarining ushbu yo'nalishda kirishi qat'iyan taqiqlanadi.",
    shape: 'circle',
    bgColor: '#dc2626',
    borderColor: '#ffffff',
    iconSymbol: 'no-entry'
  },
  {
    id: 'sign-3-2',
    code: '3.2',
    name: "Harakatlanish taqiqlangan",
    category: 'prohibitory',
    categoryUz: "Ta'qiqlovchi belgilar",
    description: "Barcha transport vositalarining harakatlanishi taqiqlanadi (marshrutli va xizmat qiluvchilardan tashqari).",
    shape: 'circle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'no-traffic'
  },
  {
    id: 'sign-3-20',
    code: '3.20',
    name: "Quvib o'tish taqiqlangan",
    category: 'prohibitory',
    categoryUz: "Ta'qiqlovchi belgilar",
    description: "Barcha transport vositalarini quvib o'tish taqiqlanadi (soatiga 30 km dan kam tezlikdagi yakka transportlar bundan mustasno).",
    shape: 'circle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'no-overtaking'
  },
  {
    id: 'sign-3-24',
    code: '3.24',
    name: "Yuqori tezlik cheklangan (60 km/soat)",
    category: 'prohibitory',
    categoryUz: "Ta'qiqlovchi belgilar",
    description: "Belgida ko'rsatilgandan (60 km/soat) ortiq tezlikda harakatlanish taqiqlanadi.",
    shape: 'circle',
    bgColor: '#ffffff',
    borderColor: '#dc2626',
    iconSymbol: 'speed-60'
  },
  {
    id: 'sign-3-27',
    code: '3.27',
    name: "To'xtash taqiqlangan",
    category: 'prohibitory',
    categoryUz: "Ta'qiqlovchi belgilar",
    description: "Transport vositalarining har qanday to'xtashi va to'xtab turishi qat'iyan man etiladi.",
    shape: 'circle',
    bgColor: '#2563eb',
    borderColor: '#dc2626',
    iconSymbol: 'no-stopping'
  },
  {
    id: 'sign-3-28',
    code: '3.28',
    name: "To'xtab turish taqiqlangan",
    category: 'prohibitory',
    categoryUz: "Ta'qiqlovchi belgilar",
    description: "Transport vositalarining to'xtab turishi (5 daqiqadan ortiq) taqiqlanadi.",
    shape: 'circle',
    bgColor: '#2563eb',
    borderColor: '#dc2626',
    iconSymbol: 'no-parking'
  },

  // 4. Buyuruvchi belgilar (Mandatory)
  {
    id: 'sign-4-1-1',
    code: '4.1.1',
    name: "Harakatlanish to'g'riga",
    category: 'mandatory',
    categoryUz: 'Buyuruvchi belgilar',
    description: "Faqat to'g'riga harakatlanishga ruxsat beriladi.",
    shape: 'circle',
    bgColor: '#2563eb',
    borderColor: '#ffffff',
    iconSymbol: 'arrow-straight'
  },
  {
    id: 'sign-4-1-2',
    code: '4.1.2',
    name: "Harakatlanish o'ngga",
    category: 'mandatory',
    categoryUz: 'Buyuruvchi belgilar',
    description: "Faqat o'ngga burilishga ruxsat beriladi.",
    shape: 'circle',
    bgColor: '#2563eb',
    borderColor: '#ffffff',
    iconSymbol: 'arrow-right'
  },
  {
    id: 'sign-4-3',
    code: '4.3',
    name: "Aylanma harakat",
    category: 'mandatory',
    categoryUz: 'Buyuruvchi belgilar',
    description: "Strelkalar ko'rsatgan yo'nalishda aylanma harakatlanishga ruxsat etiladi.",
    shape: 'circle',
    bgColor: '#2563eb',
    borderColor: '#ffffff',
    iconSymbol: 'roundabout'
  },
  {
    id: 'sign-4-5',
    code: '4.5',
    name: "Piyodalar yo'lkasi",
    category: 'mandatory',
    categoryUz: 'Buyuruvchi belgilar',
    description: "Faqat piyodalarning harakatlanishiga ruxsat etilgan yo'lka.",
    shape: 'circle',
    bgColor: '#2563eb',
    borderColor: '#ffffff',
    iconSymbol: 'pedestrian-path'
  },

  // 5. Axborot-ko'rsatkich belgilari (Informational)
  {
    id: 'sign-5-1',
    code: '5.1',
    name: "Avtomagistral",
    category: 'informative',
    categoryUz: "Axborot-ko'rsatkich belgilari",
    description: "Avtomagistral qoidalari amal qiladigan eng yuqori darajadagi yo'l (maksimal tezlik 110 km/soat).",
    shape: 'rectangle',
    bgColor: '#15803d',
    borderColor: '#ffffff',
    iconSymbol: 'highway'
  },
  {
    id: 'sign-5-5',
    code: '5.5',
    name: "Bir tomonlama harakatli yo'l",
    category: 'informative',
    categoryUz: "Axborot-ko'rsatkich belgilari",
    description: "Butun kengligi bo'yicha bir yo'nalishda harakatlanadigan yo'l.",
    shape: 'rectangle',
    bgColor: '#2563eb',
    borderColor: '#ffffff',
    iconSymbol: 'one-way-road'
  },
  {
    id: 'sign-5-16-1',
    code: '5.16.1',
    name: "Piyodalar o'tish joyi (joy belgisi)",
    category: 'informative',
    categoryUz: "Axborot-ko'rsatkich belgilari",
    description: "Piyodalar o'tishi uchun ajratilgan qatnov qismi chegarasi.",
    shape: 'square',
    bgColor: '#2563eb',
    borderColor: '#ffffff',
    iconSymbol: 'crosswalk'
  },
  {
    id: 'sign-5-15',
    code: '5.15',
    name: "To'xtab turish joyi (P)",
    category: 'informative',
    categoryUz: "Axborot-ko'rsatkich belgilari",
    description: "Avtoturargoh, transport vositalari to'xtab turishi uchun maxsus maydoncha.",
    shape: 'square',
    bgColor: '#2563eb',
    borderColor: '#ffffff',
    iconSymbol: 'parking-sign'
  },

  // 6. Servis belgilari (Service)
  {
    id: 'sign-6-1',
    code: '6.1',
    name: "Tibbiy yordam punkti",
    category: 'service',
    categoryUz: 'Servis belgilari',
    description: "Shifoxona yoki birinchi tez tibbiy yordam ko'rsatish punkti joylashgan joy.",
    shape: 'rectangle',
    bgColor: '#ffffff',
    borderColor: '#2563eb',
    iconSymbol: 'medical-sign'
  },
  {
    id: 'sign-6-3',
    code: '6.3',
    name: "Yoqilg'i quyish shoxobchasi (AYQSh / Zapravka)",
    category: 'service',
    categoryUz: 'Servis belgilari',
    description: "Benzin, metan yoki propan yoqilg'isi quyish shoxobchasi.",
    shape: 'rectangle',
    bgColor: '#ffffff',
    borderColor: '#2563eb',
    iconSymbol: 'gas-station'
  }
];
