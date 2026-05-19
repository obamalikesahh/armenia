// Tour data for Armenian Tours SaaS platform
// Based on onewaytour.com tour listings

export interface Translation {
  en: string;
  ru: string;
  de: string;
}

export interface RouteStop {
  name: string;
  description: string;
}

export interface StreetViewLocation {
  name: string;
  lat: number;
  lng: number;
  heading?: number;
  pitch?: number;
}

export interface LuxuryItineraryDay {
  day: number;
  title: Translation;
  description: Translation;
  highlights: string[];
  meals?: string[];
  accommodation?: string;
  route?: Translation;
}

export interface PriceTier {
  pax: number;
  superior: number;
  standard: number;
}

export interface Tour {
  id: number;
  slug: string;
  name: Translation;
  description: Translation;
  shortDescription: Translation;
  image: string;
  images: string[];
  duration: string;
  startTime: string;
  endTime: string;
  startEndPoint: string;
  language: string[];
  priceEUR: number;
  priceForeignEUR: number;
  category: string;
  region: string;
  route: RouteStop[];
  included: string[];
  excluded: string[];
  availableDays: string[];
  bestPeriod: string;
  groupSize: string;
  featured: boolean;
  streetViewUrl: string;
  streetViewLocations: StreetViewLocation[];
  luxuryItinerary?: LuxuryItineraryDay[];
  priceTiers?: PriceTier[];
  singleSupplementSuperior?: number;
  singleSupplementStandard?: number;
}

// Price formatting
export function formatPrice(eur: number): string {
  return `€${eur}`;
}

export const TOUR_CATEGORIES = [
  'Historical',
  'Nature',
  'Adventure',
  'Cultural',
  'Wine',
  'Multi-day',
  'Wellness',
  'Luxury',
] as const;

export const TOUR_REGIONS = [
  'Gegharkunik',
  'Vayots Dzor',
  'Tavush',
  'Lori',
  'Aragatsotn',
  'Kotayk',
  'Armavir',
  'Syunik',
  'Ararat',
  'Shirak',
  'Yerevan',
  'Georgia',
  'Multiple',
] as const;

export const tours: Tour[] = [
  // 1. Sevan, Dilijan, Haghartsin, Goshavank, Lake Parz
  {
    id: 1,
    slug: 'sevan-dilijan-haghartsin-goshavank-lake-parz',
    name: {
      en: 'Sevan, Dilijan, Haghartsin, Goshavank & Lake Parz',
      ru: 'Севан, Дилижан, Ахарцин, Гошаванк и озеро Парз',
      de: 'Sewan, Dilidschan, Chaghazdin, Goschawank & Parz-See',
    },
    description: {
      en: 'Discover the breathtaking beauty of Lake Sevan and the lush forests of Dilijan on this unforgettable full-day tour. Visit the medieval masterpieces of Haghartsin and Goshavank monasteries nestled in pristine mountain settings, and end your journey at the serene Lake Parz surrounded by dense woodlands. This tour perfectly combines natural wonders with Armenia\'s rich spiritual heritage.',
      ru: 'Откройте для себя захватывающую красоту озера Севан и пышные леса Дилижана в этой незабываемой однодневной экскурсии. Посетите средневековые шедевры монастырей Ахарцин и Гошаванк, расположенные в нетронутых горных условиях, и завершите путешествие у спокойного озера Парз в окружении густых лесов. Эта экскурсия идеально сочетает природные чудеса с богатым духовным наследием Армении.',
      de: 'Entdecken Sie die atemberaubende Schönheit des Sewansees und die üppigen Wälder von Dilidschan auf dieser unvergesslichen Ganztagestour. Besuchen Sie die mittelalterlichen Meisterwerke der Klöster Chaghazdin und Goschawank in unberührter Bergkulisse und beenden Sie Ihre Reise am friedlichen Parz-See, umgeben von dichten Wäldern. Diese Tour verbindet perfekt Naturwunder mit Armeniens reichem spirituellem Erbe.',
    },
    shortDescription: {
      en: 'Explore Lake Sevan, medieval monasteries, and the enchanting Lake Parz in one incredible day.',
      ru: 'Исследуйте озеро Севан, средневековые монастыри и очаровательное озеро Парз за один невероятный день.',
      de: 'Erkunden Sie den Sewansee, mittelalterliche Klöster und den zauberhaften Parz-See an einem unglaublichen Tag.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69cb896fa10cb-image-590x500-2026-03-31t124423430.jpg',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69cb896fa10cb-image-590x500-2026-03-31t124423430.jpg',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/6749ba2d28b9a-old-dilijan3.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672dc8807b86d-66e41ce5756b7-sevan2-672dc7dceee0b-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b431fc-dil1.png',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 20,
    priceForeignEUR: 31,
    category: 'Nature',
    region: 'Gegharkunik',
    route: [
      { name: 'Lake Sevan', description: 'The "Blue Pearl" of Armenia — one of the largest high-altitude freshwater lakes in the world' },
      { name: 'Sevanavank Monastery', description: '9th-century monastery perched on the Sevan peninsula with stunning lake views' },
      { name: 'Haghartsin Monastery', description: '10th-13th century monastic complex hidden in the lush forests of Dilijan' },
      { name: 'Goshavank Monastery', description: '12th-13th century monastery famed for its intricate khachkars and scholarly heritage' },
      { name: 'Old Dilijan Complex', description: 'Charming reconstructed 19th-century street preserving traditional Armenian architecture' },
      { name: 'Lake Parz', description: 'A pristine mountain lake surrounded by dense forests — perfect for peaceful walks' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=40.3495,45.3315&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Lake Sevan', lat: 40.3495, lng: 45.3315, heading: 90, pitch: 10 },
      { name: 'Dilijan', lat: 40.7403, lng: 44.8615, heading: 45, pitch: 5 },
      { name: 'Haghartsin Monastery', lat: 40.7767, lng: 44.8792, heading: 180, pitch: 15 },
      { name: 'Goshavank Monastery', lat: 40.7233, lng: 44.8717, heading: 120, pitch: 10 },
      { name: 'Lake Parz', lat: 40.7567, lng: 44.8450, heading: 270, pitch: 5 },
    ],
  },

  // 2. Khor Virap, Noravank, Areni, Birds Cave
  {
    id: 2,
    slug: 'khor-virap-noravank-areni-birds-cave',
    name: {
      en: 'Khor Virap, Noravank, Areni & Birds Cave',
      ru: 'Хор Вирап, Нораванк, Арени и Пещера Птиц',
      de: 'Chor Wirap, Norawank, Areni & Vogelhöhle',
    },
    description: {
      en: 'Journey through Armenia\'s biblical heartland starting at Khor Virap, where the nation\'s Christian faith was born. Marvel at the stunning red cliffs surrounding Noravank Monastery, explore the ancient Birds Cave where the world\'s oldest wine was discovered, and taste traditional Armenian wines at the Areni Winery. A perfect blend of history, archaeology, and viticulture.',
      ru: 'Путешествие по библейским землям Армении, начиная с Хор Вирапа, где родилась христианская вера нации. Восхищайтесь потрясающими красными скалами, окружающими монастырь Нораванк, исследуйте древнюю Пещеру Птиц, где было обнаружено самое старое вино в мире, и попробуйте традиционные армянские вина на винодельне Арени. Идеальное сочетание истории, археологии и виноделия.',
      de: 'Reisen Sie durch Armeniens biblisches Kernland, beginnend mit Chor Wirap, wo der christliche Glaube der Nation geboren wurde. Bewundern Sie die atemberaubenden roten Klippen rund um das Norawank-Kloster, erkunden Sie die antike Vogelhöhle, in der der älteste Wein der Welt entdeckt wurde, und probieren Sie traditionelle armenische Weine in der Areni-Weinkellerei. Eine perfekte Mischung aus Geschichte, Archäologie und Weinbau.',
    },
    shortDescription: {
      en: 'From the birthplace of Armenian Christianity to ancient caves and world-class wine tasting.',
      ru: 'От колыбели армянского христианства до древних пещер и дегустации мирового класса.',
      de: 'Von der Wiege des armenischen Christentums bis zu antiken Höhlen und erstklassiger Weinverkostung.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae5abd5384-bird3.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 20,
    priceForeignEUR: 31,
    category: 'Historical',
    region: 'Ararat',
    route: [
      { name: 'Khor Virap Monastery', description: 'The sacred site where Gregory the Illuminator was imprisoned for 13 years, with iconic views of Mount Ararat' },
      { name: 'Noravank', description: 'Stunning 13th-century monastery complex surrounded by dramatic red rock formations' },
      { name: 'Birds Cave', description: 'Archaeological site where the world\'s oldest winery (6,100 years old) was discovered' },
      { name: 'Areni Winery', description: 'Taste locally produced wines in the village that gives its name to Armenia\'s premier wine region' },
    ],
    included: ['Guide service', 'Transportation', 'Wine tasting'],
    excluded: ['Birds Cave entrance fee — €4'],
    availableDays: ['Sunday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=39.8842,44.5767&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Khor Virap Monastery', lat: 39.8842, lng: 44.5767, heading: 340, pitch: 10 },
      { name: 'Noravank', lat: 39.6850, lng: 45.2317, heading: 180, pitch: 15 },
      { name: 'Areni', lat: 39.7228, lng: 45.1817, heading: 90, pitch: 5 },
      { name: 'Birds Cave', lat: 39.7183, lng: 45.1833, heading: 45, pitch: 10 },
    ],
  },

  // 3. Garni, Geghard
  {
    id: 3,
    slug: 'garni-geghard',
    name: {
      en: 'Garni Temple & Geghard Monastery',
      ru: 'Храм Гарни и монастырь Гегард',
      de: 'Garni-Tempel & Geghard-Kloster',
    },
    description: {
      en: 'Step back millennia at the only surviving pagan temple in the former Soviet Union — the magnificent Garni Temple, a Hellenistic masterpiece perched above the Azat River Gorge. Continue to Geghard Monastery, a UNESCO World Heritage Site carved directly into the mountainside, where sacred springs and ancient khachkars create an atmosphere of profound spirituality.',
      ru: 'Перенеситесь на тысячелетия назад к единственному сохранившемуся языческому храму на территории бывшего СССР — великолепному Храму Гарни, эллинистическому шедевру, возвышающемуся над ущельем реки Азат. Продолжите путешествие к монастырю Гегард, объекту Всемирного наследия ЮНЕСКО, высеченному прямо в скале, где священные источники и древние хачкары создают атмосферу глубокой духовности.',
      de: 'Reisen Sie Jahrtausende zurück zum einzigen erhaltenen heidnischen Tempel der ehemaligen Sowjetunion — dem magnifizienten Garni-Tempel, einem hellenistischen Meisterwerk über der Azat-Schlucht. Besuchen Sie das Geghard-Kloster, ein UNESCO-Weltkulturerbe, das direkt in den Berg gehauen wurde, wo heilige Quellen und alte Chatschkare eine Atmosphäre tiefer Spiritualität schaffen.',
    },
    shortDescription: {
      en: 'Visit Armenia\'s iconic pagan temple and the UNESCO-listed rock-carved Geghard Monastery.',
      ru: 'Посетите знаменитый языческий храм Армении и вырубленный в скале монастырь Гегард из списка ЮНЕСКО.',
      de: 'Besuchen Sie Armeniens ikonischen heidnischen Tempel und das in Fels gehauene Geghard-Kloster (UNESCO).',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672dcadfa2afa-66deb0ade3dfc-gar3-672dca4cd43e1-1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672dcadfa2afa-66deb0ade3dfc-gar3-672dca4cd43e1-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a5da73d8e-gar5.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672dcadf98a1d-66e41caf5c745-gar9-672dca4d803a9-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68a821577bd9a-gar10.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/6853c44fec07a-giqor.webp',
    ],
    duration: 'half day',
    startTime: '10:00',
    endTime: '15:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 13,
    priceForeignEUR: 26,
    category: 'Historical',
    region: 'Kotayk',
    route: [
      { name: 'Garni Temple', description: '1st-century Hellenistic temple dedicated to Mihr, the sun god — the only surviving pagan temple in Armenia' },
      { name: 'Geghard Monastery', description: 'UNESCO World Heritage Site — a 4th-century monastery partially carved out of the adjacent mountain' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: ['Entrance fees'],
    availableDays: ['Saturday'],
    bestPeriod: 'Year round',
    groupSize: 'Up to 20 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=40.1150,44.7250&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Garni Temple', lat: 40.1150, lng: 44.7250, heading: 180, pitch: 10 },
      { name: 'Geghard Monastery', lat: 40.1417, lng: 44.7975, heading: 90, pitch: 15 },
    ],
  },

  // 4. Tatev Monastery, Wings of Tatev
  {
    id: 4,
    slug: 'tatev-monastery-wings-of-tatev',
    name: {
      en: 'Tatev Monastery & Wings of Tatev',
      ru: 'Монастырь Татев и Крылья Татева',
      de: 'Tatev-Kloster & Flügel von Tatev',
    },
    description: {
      en: 'Soar above the dramatic Vorotan Gorge on the world\'s longest reversible aerial tramway — the Wings of Tatev — before arriving at the breathtaking 9th-century Tatev Monastery perched on the edge of a precipice. This tour offers one of Armenia\'s most spectacular visual experiences, combining adrenaline-pumping views with profound historical significance in the country\'s southernmost region.',
      ru: 'Пролетите над захватывающим ущельем Ворота на самой длинной в мире обратимой канатной дороге — Крыльях Татева — прежде чем прибыть к потрясающему монастырю Татев IX века, расположенному на краю обрыва. Эта экскурсия предлагает одно из самых зрелищных впечатлений Армении, сочетая захватывающие дух виды с глубокой исторической значимостью в самом южном регионе страны.',
      de: 'Schweben Sie über der dramatischen Vorotan-Schlucht mit der längsten umkehrbaren Seilbahn der Welt — den Flügeln von Tatev — bevor Sie das atemberaubende Tatev-Kloster aus dem 9. Jahrhundert erreichen, das am Rand einer Klippe thront. Diese Tour bietet eines der spektakulärsten visuellen Erlebnisse Armeniens und verbindet atemberaubende Ausblicke mit tiefgreifender historischer Bedeutung.',
    },
    shortDescription: {
      en: 'Ride the world\'s longest ropeway to the majestic Tatev Monastery atop a dramatic gorge.',
      ru: 'Прокатитесь на самой длинной канатной дороге мира к величественному монастырю Татев на краю ущелья.',
      de: 'Fahren Sie mit der längsten Seilbahn der Welt zum majestätischen Tatev-Kloster über einer dramatischen Schlucht.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f008900f-tatev1.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f008900f-tatev1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f0093afd-tatev2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f10003ec-tatev3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69fa427abbfb8-tatev-base-jump-2.jpg',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69fa426b31056-khndzoresk-swinging-bridge.jpg',
    ],
    duration: 'full day',
    startTime: '08:00',
    endTime: '20:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 30,
    priceForeignEUR: 55,
    category: 'Historical',
    region: 'Syunik',
    route: [
      { name: 'Wings of Tatev (ropeway)', description: 'Guinness World Record-holding 5.7 km aerial tramway offering spectacular views of the Vorotan Gorge' },
      { name: 'Tatev Monastery', description: '9th-century fortress-monastery complex perched on a basalt plateau above the Vorotan River' },
      { name: "Devil's Bridge", description: 'Natural rock formation spanning the Vorotan River with thermal springs flowing beneath' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: ['Ropeway ticket'],
    availableDays: ['Saturday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=39.3928,46.2475&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Tatev Monastery', lat: 39.3928, lng: 46.2475, heading: 180, pitch: 15 },
      { name: 'Wings of Tatev', lat: 39.3850, lng: 46.2317, heading: 270, pitch: 20 },
      { name: "Devil's Bridge", lat: 39.4050, lng: 46.2733, heading: 90, pitch: 10 },
    ],
  },

  // 5. Haghpat, Sanahin, Akhtala
  {
    id: 5,
    slug: 'haghpat-sanahin-akhtala',
    name: {
      en: 'Haghpat, Sanahin & Akhtala Monasteries',
      ru: 'Монастыри Ахпат, Санаин и Ахтала',
      de: 'Klöster Chachpat, Sanahin & Achtala',
    },
    description: {
      en: 'Explore three of Armenia\'s most significant monastic complexes in the lush Lori region. Haghpat and Sanahin, both UNESCO World Heritage Sites, represent the pinnacle of medieval Armenian architecture with their intricate stone carvings and ancient scriptoria. Complete your journey at Akhtala, a stunning 10th-century fortress monastery renowned for its remarkably preserved frescoes.',
      ru: 'Исследуйте три самых значимых монастырских комплекса Армении в пышном Лорийском регионе. Ахпат и Санаин, оба включённые в список Всемирного наследия ЮНЕСКО, представляют вершину средневековой армянской архитектуры со своими изысканными каменными резьбами и древними скрипториями. Завершите путешествие в Ахтале — потрясающем монастыре-крепости X века, известном своими замечательно сохранившимися фресками.',
      de: 'Erkunden Sie drei der bedeutendsten Klosterkomplexe Armeniens in der üppigen Lori-Region. Chachpat und Sanahin, beide UNESCO-Weltkulturerbestätten, stellen den Höhepunkt der mittelalterlichen armenischen Architektur dar. Vervollständigen Sie Ihre Reise in Achtala, einer atemberaubenden Festungskirche aus dem 10. Jahrhundert mit bemerkenswert gut erhaltenen Fresken.',
    },
    shortDescription: {
      en: 'Two UNESCO sites and stunning frescoes — the best of Lori\'s medieval monasteries.',
      ru: 'Два объекта ЮНЕСКО и потрясающие фрески — лучшее из средневековых монастырей Лори.',
      de: 'Zwei UNESCO-Stätten und atemberaubende Fresken — das Beste aus Loris mittelalterlichen Klöstern.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8caa29d8-sanahin4.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8cb317ee-sanahin3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8ee46465-haghpat2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8ee5f553-haghpat.png',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 26,
    priceForeignEUR: 43,
    category: 'Historical',
    region: 'Lori',
    route: [
      { name: 'Haghpat Monastery', description: 'UNESCO World Heritage Site — 10th-century monastery with remarkable architectural details and ancient manuscripts' },
      { name: 'Sanahin Monastery', description: 'UNESCO World Heritage Site — older than Haghpat, famous for its intricate stone carvings and medieval academy' },
      { name: 'Akhtala Monastery', description: '10th-century fortress monastery with beautifully preserved Byzantine-style frescoes' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=41.0947,44.7217&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Haghpat Monastery', lat: 41.0947, lng: 44.7217, heading: 135, pitch: 10 },
      { name: 'Sanahin Monastery', lat: 41.0917, lng: 44.6750, heading: 90, pitch: 10 },
      { name: 'Akhtala Monastery', lat: 41.1533, lng: 44.7817, heading: 200, pitch: 15 },
    ],
  },

  // 6. Sevan, Haghartsin, Goshavank, Ijevan Winery
  {
    id: 6,
    slug: 'sevan-haghartsin-goshavank-ijevan-winery',
    name: {
      en: 'Sevan, Haghartsin, Goshavank & Ijevan Winery',
      ru: 'Севан, Ахарцин, Гошаванк и Иджеванский винный завод',
      de: 'Sewan, Chaghazdin, Goschawank & Ijewan-Weinkellerei',
    },
    description: {
      en: 'Combine the spiritual grandeur of Lake Sevan and its monasteries with the artisan winemaking traditions of Tavush province. After exploring the medieval wonders of Haghartsin and Goshavank, unwind at the Ijevan Winery — one of Armenia\'s oldest — where you\'ll sample exceptional local wines surrounded by the lush landscapes of northern Armenia.',
      ru: 'Сочетайте духовное великолепие озера Севан и его монастырей с ремесленными винодельческими традициями Тавушской области. После исследования средневековых чудес Ахарцина и Гошаванка, отдохните на Иджеванском винном заводе — одном из старейших в Армении, где вы попробуете исключительные местные вина в окружении пышных пейзажей северной Армении.',
      de: 'Verbinden Sie die spirituelle Größe des Sewansees und seiner Klöster mit den handwerklichen Weinbautraditionen der Provinz Tawusch. Nach der Erkundung der mittelalterlichen Wunder von Chaghazdin und Goschawank entspannen Sie in der Ijewan-Weinkellerei — einer der ältesten Armeniens — und probieren außergewöhnliche lokale Weine.',
    },
    shortDescription: {
      en: 'Monasteries, mountain scenery, and wine tasting in Armenia\'s green north.',
      ru: 'Монастыри, горные пейзажи и дегустация вин в зелёном севере Армении.',
      de: 'Klöster, Berglandschaften und Weinverkostung in Armeniens grünem Norden.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69c77f764a854-image-590x500-2026-03-28t110736415.jpg',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69c77f764a854-image-590x500-2026-03-28t110736415.jpg',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69c77f7695d58-image-590x500-2026-03-28t110707131.jpg',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69c77f7608fca-image-590x500-2026-03-28t110439090.jpg',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69c77f76b978c-image-590x500-2026-03-28t110613951.jpg',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69c77f7674030-image-590x500-2026-03-28t110431361.jpg',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 21,
    priceForeignEUR: 34,
    category: 'Wine',
    region: 'Gegharkunik',
    route: [
      { name: 'Lake Sevan', description: 'Armenia\'s majestic "Blue Pearl" — one of the world\'s largest high-altitude freshwater lakes' },
      { name: 'Sevanavank', description: 'Historic 9th-century monastery on the Sevan peninsula with panoramic lake views' },
      { name: 'Haghartsin', description: 'Medieval monastic complex set in the enchanting forests of Dilijan National Park' },
      { name: 'Goshavank', description: '12th-century monastery renowned for its ornate khachkars and medieval university' },
      { name: 'Ijevan Winery', description: 'One of Armenia\'s oldest wineries offering tastings of distinctive Tavush region wines' },
    ],
    included: ['Guide service', 'Transportation', 'Wine tasting'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.3495,45.3315&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Lake Sevan', lat: 40.3495, lng: 45.3315, heading: 90, pitch: 10 },
      { name: 'Haghartsin', lat: 40.7767, lng: 44.8792, heading: 180, pitch: 15 },
      { name: 'Goshavank', lat: 40.7233, lng: 44.8717, heading: 120, pitch: 10 },
      { name: 'Ijevan Winery', lat: 40.9300, lng: 45.1467, heading: 45, pitch: 5 },
    ],
  },

  // 7. Dendropark, Lori Fortress, Hovhannavank
  {
    id: 7,
    slug: 'dendropark-lori-fortress-hovhannavank',
    name: {
      en: 'Dendropark, Lori Fortress & Hovhannavank',
      ru: 'Дендропарк, Лорийская крепость и Ованаванк',
      de: 'Dendropark, Lori-Festung & Howannawank',
    },
    description: {
      en: 'Wander through the botanical paradise of Stepanavan Dendropark, home to over 500 species of trees from around the world, before exploring the impressive ruins of Lori Fortress — a medieval royal capital. Complete your day at Hovhannavank Monastery, perched dramatically above the Kasakh Gorge, where centuries of Armenian craftsmanship await.',
      ru: 'Прогуляйтесь по ботаническому раю Степанаванского Дендропарка, где произрастает более 500 видов деревьев со всего мира, перед тем как исследовать впечатляющие руины Лорийской крепости — средневековой королевской столицы. Завершите день в монастыре Ованаванк, живописно расположенном над Касахским ущельем, где вас ждут века армянского мастерства.',
      de: 'Schlendern Sie durch das botanische Paradies des Stepanawan-Dendroparks mit über 500 Baumarten aus aller Welt, bevor Sie die beeindruckenden Ruinen der Lori-Festung erkunden. Vervollständigen Sie Ihren Tag im Howannawank-Kloster, das dramatisch über der Kasakh-Schlucht thront.',
    },
    shortDescription: {
      en: 'Botanical gardens, medieval fortress ruins, and a gorge-top monastery in one scenic day.',
      ru: 'Ботанические сады, руины средневековой крепости и монастырь над ущельем за один живописный день.',
      de: 'Botanische Gärten, mittelalterliche Festungsruinen und ein Schluchten-Kloster an einem malerischen Tag.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/66e3f9e235428_Դենդրոպարկ.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/66e3f9e235428_Դենդրոպարկ.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/66e3f9e728440_Լոռի բերդ2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/66e3f9ec99f1b_Դենդրոպարկ2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69f4b2d09de73-image-590x500-2026-05-01t180135947.jpg',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 20,
    priceForeignEUR: 31,
    category: 'Nature',
    region: 'Lori',
    route: [
      { name: 'Dendropark (Stepanavan)', description: 'Lush botanical garden with over 500 tree species from around the world, perfect for peaceful walks' },
      { name: 'Lori Fortress', description: '11th-century royal fortress — once the capital of the Lori Kingdom, now atmospheric ruins' },
      { name: 'Hovhannavank Monastery', description: '5th-13th century monastery dramatically perched above the Kasakh Gorge' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=41.0150,44.3717&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Dendropark', lat: 41.0150, lng: 44.3717, heading: 90, pitch: 5 },
      { name: 'Lori Fortress', lat: 41.0133, lng: 44.6283, heading: 180, pitch: 15 },
      { name: 'Hovhannavank Monastery', lat: 40.3617, lng: 44.3317, heading: 135, pitch: 10 },
    ],
  },

  // 8. Tbilisi, Jvari, Mtskheta (Georgia)
  {
    id: 8,
    slug: 'tbilisi-jvari-mtskheta',
    name: {
      en: 'Tbilisi, Jvari & Mtskheta (Georgia)',
      ru: 'Тбилиси, Джвари и Мцхета (Грузия)',
      de: 'Tiflis, Dschwari & Mzcheta (Georgien)',
    },
    description: {
      en: 'Cross into neighboring Georgia for a full-day cultural immersion. Explore vibrant Tbilisi with its blend of old and new architecture, visit the iconic Jvari Monastery overlooking the confluence of two rivers, and discover Mtskheta — one of the oldest cities in Georgia and a UNESCO World Heritage Site. A perfect introduction to the Caucasus region.',
      ru: 'Пересеките границу с соседней Грузией для полного культурного погружения. Исследуйте яркий Тбилиси с его смесью старой и новой архитектуры, посетите знаменитый монастырь Джвари с видом на слияние двух рек и откройте для себя Мцхету — один из старейших городов Грузии и объект Всемирного наследия ЮНЕСКО. Отличное знакомство с регионом Кавказа.',
      de: 'Überqueren Sie die Grenze ins Nachbarland Georgien für einen ganztägigen Kulturtauchgang. Erkunden Sie das lebendige Tiflis mit seiner Mischung aus alter und neuer Architektur, besuchen Sie das ikonische Dschwari-Kloster und entdecken Sie Mzcheta — eine der ältesten Städte Georgiens und UNESCO-Weltkulturerbe.',
    },
    shortDescription: {
      en: 'A cross-border adventure to Georgia\'s vibrant capital and its ancient spiritual heart.',
      ru: 'Приграничное приключение в яркую столицу Грузии и её древнее духовное сердце.',
      de: 'Ein grenzüberschreitendes Abenteuer in Georgiens lebendige Hauptstadt und sein antikes spirituelles Herz.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8aec700-66e133f769eb9-thbilisi4-672dd31e37062-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8b05bd6-66e133fe17bc1-thbilisi2-672dd31d314eb-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67a0a41009772-38.jpg',
    ],
    duration: 'full day',
    startTime: '07:00',
    endTime: '22:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 78,
    priceForeignEUR: 104,
    category: 'Cultural',
    region: 'Georgia',
    route: [
      { name: 'Tbilisi city tour', description: 'Explore the Georgian capital\'s charming old town, sulfur baths district, and modern landmarks' },
      { name: 'Jvari Monastery', description: '6th-century monastery atop a hill with breathtaking views of the Mtkvari and Aragvi river confluence' },
      { name: 'Mtskheta (old capital)', description: 'UNESCO-listed ancient capital of Georgia, home to the majestic Svetitskhoveli Cathedral' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'Year round',
    groupSize: 'Up to 20 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=41.6938,44.8014&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Tbilisi', lat: 41.6938, lng: 44.8014, heading: 180, pitch: 10 },
      { name: 'Jvari Monastery', lat: 41.8386, lng: 44.7269, heading: 270, pitch: 15 },
      { name: 'Mtskheta', lat: 41.8436, lng: 44.7078, heading: 90, pitch: 10 },
    ],
  },

  // 9. 1 Day in Georgia
  {
    id: 9,
    slug: 'one-day-in-georgia',
    name: {
      en: 'One Day in Georgia',
      ru: 'Один день в Грузии',
      de: 'Ein Tag in Georgien',
    },
    description: {
      en: 'Experience the best of Tbilisi in a single day. Wander through the cobblestone streets of Old Tbilisi, ride the cable car to the ancient Narikala Fortress overlooking the city, and soak in the vibrant atmosphere of Georgia\'s cosmopolitan capital. A day filled with history, culture, and unforgettable views.',
      ru: 'Почувствуйте лучшее из Тбилиси за один день. Прогуляйтесь по мощёным улицам Старого Тбилиси, прокатитесь на канатной дороге до древней крепости Нарикала с видом на город, и впитайте в себя живую атмосферу космополитической столицы Грузии. День, наполненный историей, культурой и незабываемыми видами.',
      de: 'Erleben Sie das Beste von Tiflis an einem einzigen Tag. Schlendern Sie durch die kopfsteingepflasterten Straßen der Altstadt, fahren Sie mit der Seilbahn zur antiken Narikala-Festung und tauchen Sie ein in die lebendige Atmosphäre von Georgiens kosmopolitischer Hauptstadt.',
    },
    shortDescription: {
      en: 'Discover Tbilisi\'s old town, ancient fortress, and vibrant culture in one unforgettable day.',
      ru: 'Откройте старый город Тбилиси, древнюю крепость и живую культуру за один незабываемый день.',
      de: 'Entdecken Sie Tiflis\' Altstadt, antike Festung und lebendige Kultur an einem unvergesslichen Tag.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0da234173-6728b72ceeef3-tbilisi1-672e0d6643aa6-1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0da234173-6728b72ceeef3-tbilisi1-672e0d6643aa6-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0dc0d6967-66e133fe17bc1-thbilisi2-672dd31d314eb-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0da22eaa8-6728b741b88e1-tbilisi3-672e0d6643af7-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0dc0d3a55-66e133f769eb9-thbilisi4-672dd31e37062-1.webp',
    ],
    duration: 'full day',
    startTime: '07:00',
    endTime: '22:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 88,
    priceForeignEUR: 122,
    category: 'Cultural',
    region: 'Georgia',
    route: [
      { name: 'Tbilisi sightseeing', description: 'Comprehensive tour of Tbilisi\'s main landmarks and hidden gems' },
      { name: 'Old Tbilisi', description: 'Charming historic district with colorful houses, narrow streets, and traditional sulfur baths' },
      { name: 'Narikala Fortress', description: '4th-century fortress offering panoramic views over Tbilisi and the Mtkvari River' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'Year round',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=41.6938,44.8014&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Tbilisi', lat: 41.6938, lng: 44.8014, heading: 180, pitch: 10 },
      { name: 'Narikala Fortress', lat: 41.6883, lng: 44.8094, heading: 270, pitch: 15 },
    ],
  },

  // 10. Two Days Javakhk, Borjomi, Rabat, Vardzia
  {
    id: 10,
    slug: 'two-days-javakhk-borjomi-rabat-vardzia',
    name: {
      en: 'Two Days: Javakhk, Borjomi, Rabat & Vardzia (Georgia)',
      ru: 'Два дня: Джавахк, Боржоми, Рабат и Вардзия (Грузия)',
      de: 'Zwei Tage: Dschawachetien, Bordschomi, Rabat & Vardzia (Georgien)',
    },
    description: {
      en: 'Embark on a two-day adventure through southern Georgia. Day one takes you through the Armenian-populated Javakhk region and the famous spa town of Borjomi. Day two reveals the magnificent Rabat Fortress and the extraordinary cave city of Vardzia — a sprawling 12th-century monastic complex carved into an entire mountainside. Includes hotel accommodation and breakfast.',
      ru: 'Отправьтесь в двухдневное приключение по южной Грузии. Первый день проведёт вас через населённый армянами регион Джавахк и знаменитый курортный город Боржоми. Во второй день откроются великолепная крепость Рабат и необыкновенный пещерный город Вардзия — обширный монастырский комплекс XII века, высеченный в целом склоне горы. Включает проживание в отеле и завтрак.',
      de: 'Begeben Sie sich auf ein zweitägiges Abenteuer durch Südgeorgien. Tag eins führt Sie durch die armenisch besiedelte Dschawachetien-Region und den berühmten Kurort Bordschomi. Tag zwei enthüllt die magnifiziente Rabat-Festung und die außerordentliche Höhlenstadt Vardzia — einen weitläufigen Klosterkomplex aus dem 12. Jahrhundert, der in einen ganzen Berg gehauen wurde.',
    },
    shortDescription: {
      en: 'A two-day journey through Georgia\'s south — from spa towns to an ancient cave city.',
      ru: 'Двухдневное путешествие по югу Грузии — от курортов до древнего пещерного города.',
      de: 'Eine zweitägige Reise durch Südgeorgien — von Kurorten bis zur antiken Höhlenstadt.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69ca37c65f8bd-jv2.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69ca37c65f8bd-jv2.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69ca37c629670-jv4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69ca37c64e33a-jv6.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69ca37c648bbd-jv8.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69ca37c64288d-jv7.webp',
    ],
    duration: '2 days',
    startTime: '07:00',
    endTime: '22:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 187,
    priceForeignEUR: 278,
    category: 'Multi-day',
    region: 'Georgia',
    route: [
      { name: 'Day 1: Javakhk', description: 'Scenic drive through the Armenian-populated highlands of southern Georgia' },
      { name: 'Day 1: Borjomi', description: 'Famous Georgian spa town known for its mineral water and beautiful national park' },
      { name: 'Day 2: Rabat Fortress', description: 'Magnificently restored medieval fortress complex with mosque, church, and palace' },
      { name: 'Day 2: Vardzia Cave City', description: 'Extraordinary 12th-century cave monastery complex with over 600 rooms carved into the mountainside' },
    ],
    included: ['Guide service', 'Transportation', 'Hotel (1 night)', 'Breakfast'],
    excluded: [],
    availableDays: ['Saturday', 'Sunday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=41.8425,43.3864&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Borjomi', lat: 41.8425, lng: 43.3864, heading: 90, pitch: 10 },
      { name: 'Rabat Fortress', lat: 41.6381, lng: 42.9714, heading: 180, pitch: 15 },
      { name: 'Vardzia Cave City', lat: 41.3758, lng: 43.2831, heading: 45, pitch: 10 },
    ],
  },

  // 11. Three Hawks Trail
  {
    id: 11,
    slug: 'three-hawks-trail',
    name: {
      en: 'Three Hawks Trail Hike',
      ru: 'Тропа Трёх Ястребов',
      de: 'Drei-Falken-Wanderweg',
    },
    description: {
      en: 'Challenge yourself on one of Armenia\'s most rewarding hiking trails. The Three Hawks Trail takes you through dramatic mountain terrain above the Azat Reservoir, with stops at the ruins of Havuts Tar Monastery. Panoramic views of the surrounding peaks and valleys make every step worthwhile — an ideal adventure for nature lovers and active travelers.',
      ru: 'Испытайте себя на одной из самых полезных пешеходных троп Армении. Тропа Трёх Ястребов проведёт вас через драматичный горный рельеф над Азатским водохранилищем с остановками у руин монастыря Хавуц Тар. Панорамные виды окружающих вершин и долин стоят каждого шага — идеальное приключение для любителей природы и активных путешественников.',
      de: 'Stellen Sie sich auf einem der lohnendsten Wanderwege Armeniens der Herausforderung. Der Drei-Falken-Wanderweg führt Sie durch dramatisches Berggelände über dem Azat-Stausee mit Stopps an den Ruinen des Hawuz-Tar-Klosters. Panoramablicke auf die umliegenden Gipfel und Täler machen jeden Schritt lohnenswert.',
    },
    shortDescription: {
      en: 'An exhilarating mountain hike with monastery ruins and panoramic reservoir views.',
      ru: 'Захватывающий горный поход с руинами монастыря и панорамными видами на водохранилище.',
      de: 'Ein aufregender Bergwanderausflug mit Klosterruinen und Panoramablicken auf den Stausee.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb3a9b71-3-hawksss.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/6713605a42460-hovq.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/6713605e9a808-3-hawkss.png',
    ],
    duration: 'full day',
    startTime: '08:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 23,
    priceForeignEUR: 36,
    category: 'Adventure',
    region: 'Kotayk',
    route: [
      { name: 'Three Hawks Trail hike', description: 'A scenic mountain trail offering dramatic views and rewarding challenges for hikers' },
      { name: 'Azat Reservoir', description: 'Beautiful reservoir surrounded by mountain slopes, reflecting the sky and peaks' },
      { name: 'Havuts Tar Monastery', description: '11th-13th century monastery ruins perched on a hilltop with commanding views of the Azat Valley' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 15 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=40.1450,44.8050&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Azat Reservoir', lat: 40.1450, lng: 44.8050, heading: 180, pitch: 15 },
      { name: 'Havuts Tar Monastery', lat: 40.1383, lng: 44.8150, heading: 270, pitch: 10 },
    ],
  },

  // 12. Horseriding in Dimats
  {
    id: 12,
    slug: 'horseriding-dimats',
    name: {
      en: 'Horseriding in Dimats Valley',
      ru: 'Конная прогулка в долине Димац',
      de: 'Reiten im Dimats-Tal',
    },
    description: {
      en: 'Saddle up for an unforgettable horseback riding adventure through the wild and beautiful Dimats Valley in Vayots Dzor. Ride along mountain trails with spectacular views, traverse lush meadows, and experience Armenia\'s rugged landscape from a unique perspective. Suitable for riders of all experience levels, with gentle horses and expert guides.',
      ru: 'Оседлайте лошадь для незабываемого конного приключения через дикую и красивую долину Димац в Вайоц Дзоре. Прокатитесь по горным тропам со спектакулярными видами, пересеките пышные луга и испытайте суровый пейзаж Армении с уникальной перспективы. Подходит для наездников любого уровня подготовки.',
      de: 'Steigen Sie in den Sattel für ein unvergessliches Reitabenteuer durch das wilde und schöne Dimats-Tal in Wajoz Dsor. Reiten Sie auf Bergpfaden mit spektakulären Ausblicken und erleben Sie Armeniens raue Landschaft aus einer einzigartigen Perspektive. Geeignet für Reiter aller Erfahrungsstufen.',
    },
    shortDescription: {
      en: 'Ride through Armenia\'s stunning mountain valleys on horseback — adventure for all levels.',
      ru: 'Прокатитесь верхом через потрясающие горные долины Армении — приключение для любого уровня.',
      de: 'Reiten Sie durch Armeniens atemberaubende Bergtäler — Abenteuer für alle Stufen.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d57003ec-dimats2.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/6802414e81197-horse2.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d5700647-dimats1.webp',
    ],
    duration: 'full day',
    startTime: '08:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 61,
    priceForeignEUR: 88,
    category: 'Adventure',
    region: 'Vayots Dzor',
    route: [
      { name: 'Horseriding through Dimats valley', description: 'Scenic horseback ride through the stunning Dimats valley with its dramatic rock formations and alpine meadows' },
      { name: 'Mountain trails', description: 'Ride along mountain paths with breathtaking panoramic views of the Vayots Dzor highlands' },
    ],
    included: ['Guide service', 'Horse rental', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 10 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=39.8800,45.3200&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Dimats Valley', lat: 39.8800, lng: 45.3200, heading: 90, pitch: 10 },
      { name: 'Mountain trails', lat: 39.8700, lng: 45.3350, heading: 180, pitch: 15 },
    ],
  },

  // 13. Yerevan City Tour
  {
    id: 13,
    slug: 'yerevan-city-tour',
    name: {
      en: 'Yerevan City Tour',
      ru: 'Обзорная экскурсия по Еревану',
      de: 'Stadtrundfahrt Jerevan',
    },
    description: {
      en: 'Get to know Armenia\'s vibrant capital on this comprehensive half-day tour. From the grand Republic Square and the monumental Cascade Complex to the ancient manuscripts of Matenadaran and the elegant Opera House, discover why Yerevan is one of the world\'s oldest continuously inhabited cities. Finish at Victory Park for sweeping views of Mount Ararat.',
      ru: 'Познакомьтесь с живой столицей Армении в этой подробной полудневной экскурсии. От величественной Площади Республики и монументального Каскада до древних рукописей Матенадарана и элегантного Театра Оперы — узнайте, почему Ереван является одним из старейших непрерывно населённых городов мира. Завершите экскурсию в Парке Победы с панорамными видами на гору Арарат.',
      de: 'Lernen Sie Armeniens lebendige Hauptstadt auf dieser umfassenden Halbtagestour kennen. Von der großartigen Republikplatz und dem monumentalen Kaskadenkomplex bis zu den antiken Manuskripten des Matenadaran — entdecken Sie, warum Jerevan eine der ältesten durchgehend bewohnten Städte der Welt ist.',
    },
    shortDescription: {
      en: 'Discover the pink city — from grand squares to ancient manuscripts and Ararat views.',
      ru: 'Откройте розовый город — от величественных площадей до древних рукописей и видов на Арарат.',
      de: 'Entdecken Sie die rosafarbene Stadt — von grandiosen Plätzen bis zu antiken Manuskripten und Ararat-Blicken.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b431fc-dil1.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b431fc-dil1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
    ],
    duration: 'half day',
    startTime: '10:00',
    endTime: '14:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 16,
    priceForeignEUR: 26,
    category: 'Cultural',
    region: 'Yerevan',
    route: [
      { name: 'Republic Square', description: 'The heart of Yerevan, famous for its pink tuff stone buildings and singing fountains' },
      { name: 'Cascade Complex', description: 'A giant stairway art complex connecting downtown to the hills, with sculptures and city views' },
      { name: 'Matenadaran', description: 'World-renowned repository of ancient manuscripts — one of the richest collections globally' },
      { name: 'Opera House', description: 'Elegant 20th-century opera and ballet theatre, a symbol of Yerevan\'s cultural life' },
      { name: 'Victory Park', description: 'Hilltop park with the Mother Armenia statue and panoramic views of Mount Ararat' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'Year round',
    groupSize: 'Up to 20 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=40.1792,44.4991&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Republic Square', lat: 40.1792, lng: 44.4991, heading: 180, pitch: 10 },
      { name: 'Cascade Complex', lat: 40.1792, lng: 44.5083, heading: 270, pitch: 15 },
      { name: 'Matenadaran', lat: 40.1933, lng: 44.5233, heading: 90, pitch: 10 },
      { name: 'Opera House', lat: 40.1883, lng: 44.5100, heading: 180, pitch: 5 },
      { name: 'Victory Park', lat: 40.1983, lng: 44.5250, heading: 270, pitch: 10 },
    ],
  },

  // 14. Echmiadzin, Zvartnots
  {
    id: 14,
    slug: 'echmiadzin-zvartnots',
    name: {
      en: 'Echmiadzin & Zvartnots',
      ru: 'Эчмиадзин и Звартноц',
      de: 'Etschmiadsin & Swartnoz',
    },
    description: {
      en: 'Visit the spiritual center of the Armenian Apostolic Church at Echmiadzin — the oldest cathedral in the world, founded in 301 AD. Explore the complex including the churches of St. Gayane and St. Hripsime, and marvel at the ruins of Zvartnots, a 7th-century architectural masterpiece and UNESCO World Heritage Site that once soared to extraordinary heights.',
      ru: 'Посетите духовный центр Армянской Апостольской Церкви в Эчмиадзине — самый старый собор в мире, основанный в 301 году. Исследуйте комплекс, включая церкви Святой Гаянэ и Святой Рипсимэ, и восхититесь руинами Звартноца — архитектурного шедевра VII века и объекта Всемирного наследия ЮНЕСКО.',
      de: 'Besuchen Sie das spirituelle Zentrum der Armenisch-Apostolischen Kirche in Etschmiadsin — die älteste Kathedrale der Welt, gegründet 301 n. Chr. Erkunden Sie den Komplex mit den Kirchen der Heiligen Gayane und Hripsime und bewundern Sie die Ruinen von Swartnoz, einem architektonischen Meisterwerk des 7. Jahrhunderts und UNESCO-Weltkulturerbe.',
    },
    shortDescription: {
      en: 'The Vatican of Armenia — the world\'s oldest cathedral and a UNESCO-listed temple.',
      ru: 'Ватикан Армении — самый старый собор в мире и храм из списка ЮНЕСКО.',
      de: 'Das Vatikan Armeniens — die älteste Kathedrale der Welt und ein UNESCO-Tempel.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
    ],
    duration: 'half day',
    startTime: '10:00',
    endTime: '15:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 16,
    priceForeignEUR: 29,
    category: 'Historical',
    region: 'Armavir',
    route: [
      { name: 'Echmiadzin Cathedral', description: 'The mother church of the Armenian Apostolic Church — the world\'s oldest state-built cathedral (301 AD)' },
      { name: 'St. Gayane Church', description: '7th-century church dedicated to St. Gayane, one of the Christian martyrs of Armenia' },
      { name: 'St. Hripsime Church', description: 'One of the finest surviving examples of Armenian church architecture, dating to 618 AD' },
      { name: 'Zvartnots Temple', description: 'UNESCO-listed ruins of a 7th-century circular temple — an architectural marvel of early medieval Armenia' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'Year round',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.1653,44.3417&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Echmiadzin Cathedral', lat: 40.1653, lng: 44.3417, heading: 180, pitch: 10 },
      { name: 'St. Gayane Church', lat: 40.1617, lng: 44.3433, heading: 90, pitch: 5 },
      { name: 'St. Hripsime Church', lat: 40.1692, lng: 44.3453, heading: 135, pitch: 10 },
      { name: 'Zvartnots Temple', lat: 40.1633, lng: 44.3300, heading: 270, pitch: 15 },
    ],
  },

  // 15. Amberd Fortress
  {
    id: 15,
    slug: 'amberd-fortress',
    name: {
      en: 'Amberd Fortress',
      ru: 'Крепость Амберд',
      de: 'Festung Amberd',
    },
    description: {
      en: 'Ascend to the slopes of Mount Aragats to discover Amberd — a stunning 7th-century fortress perched at 2,300 meters above sea level. Surrounded by alpine meadows and dramatic mountain scenery, this well-preserved complex includes a castle, church, and bathhouse. The tour also passes through Byurakan, home to Armenia\'s famous astronomical observatory.',
      ru: 'Поднимитесь на склоны горы Арагац, чтобы открыть для себя Амберд — потрясающую крепость VII века, расположенную на высоте 2 300 метров над уровнем моря. В окружении альпийских лугов и драматического горного пейзажа, этот хорошо сохранившийся комплекс включает замок, церковь и баню. Экскурсия также проходит через Бюракан, где находится знаменитая армянская астрономическая обсерватория.',
      de: 'Steigen Sie zu den Hängen des Berges Aragaz auf und entdecken Sie Amberd — eine atemberaubende Festung aus dem 7. Jahrhundert auf 2.300 Metern Höhe. Umgeben von Almwiesen und dramatischer Berglandschaft umfasst dieser gut erhaltene Komplex eine Burg, Kirche und ein Badehaus.',
    },
    shortDescription: {
      en: 'A 7th-century mountain fortress at 2,300m with breathtaking alpine scenery.',
      ru: 'Горная крепость VII века на высоте 2300 м с захватывающими альпийскими пейзажами.',
      de: 'Eine Bergfestung aus dem 7. Jahrhundert auf 2.300 m mit atemberaubender Alpenlandschaft.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
    ],
    duration: 'half day',
    startTime: '10:00',
    endTime: '15:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 18,
    priceForeignEUR: 29,
    category: 'Historical',
    region: 'Aragatsotn',
    route: [
      { name: 'Amberd Fortress', description: '7th-century hilltop fortress at 2,300m elevation with spectacular mountain views' },
      { name: 'Aragats Mountain slopes', description: 'Scenic drive through the alpine landscapes of Armenia\'s highest peak (4,090m)' },
      { name: 'Byurakan Observatory', description: 'World-renowned astronomical observatory on the southern slopes of Mount Aragats' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.3875,44.2583&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Amberd Fortress', lat: 40.3875, lng: 44.2583, heading: 180, pitch: 15 },
      { name: 'Mount Aragats', lat: 40.4167, lng: 44.2167, heading: 270, pitch: 10 },
      { name: 'Byurakan Observatory', lat: 40.3383, lng: 44.2633, heading: 90, pitch: 5 },
    ],
  },

  // 16. Tsaghkadzor, Kecharis
  {
    id: 16,
    slug: 'tsaghkadzor-kecharis',
    name: {
      en: 'Tsaghkadzor & Kecharis Monastery',
      ru: 'Цахкадзор и монастырь Кечарис',
      de: 'Zaghkadsor & Ketscharis-Kloster',
    },
    description: {
      en: 'Escape to Tsaghkadzor — the "Valley of Flowers" — one of Armenia\'s most popular resort towns. Visit the elegant Kecharis Monastery, a significant medieval spiritual center, and enjoy an optional ride on the Tsaghkadzor ropeway for stunning mountain panoramas. In summer, wildflowers carpet the hillsides; in winter, the town transforms into a ski paradise.',
      ru: 'Сбегите в Цахкадзор — «Долину Цветов» — один из самых популярных курортных городов Армении. Посетите элегантный монастырь Кечарис, значимый средневековый духовный центр, и насладитесьoptionalной поездкой на канатной дороге Цахкадзора с потрясающими горными панорамами. Летом склоны покрыты полевыми цветами, зимой город превращается в лыжный рай.',
      de: 'Flüchten Sie nach Zaghkadsor — dem „Tal der Blumen" — einem der beliebtesten Ferienorte Armeniens. Besuchen Sie das elegante Ketscharis-Kloster und genießen Sie eine optionale Fahrt mit der Zaghkadsor-Seilbahn für atemberaubende Bergpanoramen.',
    },
    shortDescription: {
      en: 'Armenia\'s "Valley of Flowers" — monastery, mountains, and optional ropeway ride.',
      ru: '«Долина Цветов» Армении — монастырь, горы иoptionalная поездка на канатной дороге.',
      de: 'Armeniens „Tal der Blumen" — Kloster, Berge und optionale Seilbahnfahrt.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 20,
    priceForeignEUR: 31,
    category: 'Nature',
    region: 'Kotayk',
    route: [
      { name: 'Tsaghkadzor town', description: 'Charming mountain resort town known as the "Valley of Flowers"' },
      { name: 'Kecharis Monastery', description: '11th-13th century monastic complex — one of Armenia\'s significant medieval religious centers' },
      { name: 'Ropeway', description: 'Scenic cable car ride offering panoramic views of the surrounding mountain ranges' },
      { name: 'Lake Sevan (optional)', description: 'Optional stop at Armenia\'s iconic blue lake on the return journey' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: ['Ropeway ticket'],
    availableDays: ['Sunday'],
    bestPeriod: 'Year round',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.5317,44.7017&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Tsaghkadzor', lat: 40.5317, lng: 44.7017, heading: 180, pitch: 10 },
      { name: 'Kecharis Monastery', lat: 40.5333, lng: 44.7033, heading: 90, pitch: 15 },
      { name: 'Tsaghkadzor Ropeway', lat: 40.5267, lng: 44.6950, heading: 270, pitch: 10 },
    ],
  },

  // 17. Gyumri City Tour
  {
    id: 17,
    slug: 'gyumri-city-tour',
    name: {
      en: 'Gyumri City Tour',
      ru: 'Обзорная экскурсия по Гюмри',
      de: 'Stadtrundfahrt Gjumri',
    },
    description: {
      en: 'Discover Armenia\'s second city — Gyumri — the cultural capital of the country, known for its distinctive black and red tuff stone architecture, vibrant arts scene, and resilient spirit. Explore the charming old town, visit the iconic Mother Armenia statue, the Seven Wounds Church, and the Dzitoghtsyan Museum of Social Life. A journey into the soul of Armenian culture.',
      ru: 'Откройте для себя второй город Армении — Гюмри — культурную столицу страны, известную своей характерной архитектурой из чёрного и красного туфа, яркой художественной сценой и стойким духом. Исследуйте очаровательный старый город, посетите знаменитую статую Мать Армения, Церковь Семи Ран и Музей общественной жизни Дзитогцян. Путешествие в душу армянской культуры.',
      de: 'Entdecken Sie Armeniens zweitgrößte Stadt — Gjumri — die Kulturhauptstadt des Landes, bekannt für ihre unverwechselbare Architektur aus schwarzem und rotem Tuffstein. Erkunden Sie die charmante Altstadt, besuchen Sie die ikonische Mutter-Armenien-Statue und das Dsithoghtsyan-Museum für soziales Leben.',
    },
    shortDescription: {
      en: 'Explore Armenia\'s cultural capital — black stone architecture and living traditions.',
      ru: 'Исследуйте культурную столицу Армении — архитектуру из чёрного камня и живые традиции.',
      de: 'Erkunden Sie Armeniens Kulturhauptstadt — schwarze Steinarchitektur und lebendige Traditionen.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 22,
    priceForeignEUR: 38,
    category: 'Cultural',
    region: 'Shirak',
    route: [
      { name: 'Gyumri old town', description: 'Atmospheric historic district with unique black and red tuff stone buildings and ornate balconies' },
      { name: 'Mother Armenia', description: 'Iconic statue and memorial complex honoring Armenian soldiers' },
      { name: 'Seven Wounds Church', description: '19th-century church — a symbol of Gyumri\'s resilience and spiritual strength' },
      { name: 'Dzitoghtsyan Museum', description: 'Fascinating museum preserving the traditional lifestyle and crafts of 19th-century Gyumri' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'Year round',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.7925,43.8450&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Gyumri Old Town', lat: 40.7925, lng: 43.8450, heading: 180, pitch: 10 },
      { name: 'Mother Armenia', lat: 40.7950, lng: 43.8483, heading: 270, pitch: 15 },
      { name: 'Seven Wounds Church', lat: 40.7883, lng: 43.8417, heading: 90, pitch: 10 },
    ],
  },

  // 18. Saghmosavank, Amberd
  {
    id: 18,
    slug: 'saghmosavank-amberd',
    name: {
      en: 'Saghmosavank & Amberd Fortress',
      ru: 'Сагмосаванк и крепость Амберд',
      de: 'Saghmosawank & Festung Amberd',
    },
    description: {
      en: 'Visit two of Aragatsotn\'s most impressive landmarks in one tour. Saghmosavank Monastery sits dramatically above the deep Kasakh Gorge, its name meaning "Monastery of Psalms." Then ascend to Amberd Fortress, a 7th-century stronghold on the slopes of Mount Aragats, where alpine meadows and ancient stone walls create a hauntingly beautiful landscape.',
      ru: 'Посетите два самых впечатляющих достопримечательности Арагацотна за одну экскурсию. Монастырь Сагмосаванк живописно расположен над глубоким Касахским ущельем, его название означает «Монастырь Псалмов». Затем поднимитесь к крепости Амберд, укреплению VII века на склонах горы Арагац, где альпийские луга и древние каменные стены создают завораживающий пейзаж.',
      de: 'Besuchen Sie zwei der beeindruckendsten Wahrzeichen von Aragazotn in einer Tour. Das Saghmosawank-Kloster thront dramatisch über der tiefen Kasakh-Schlucht, dann steigen Sie zur Amberd-Festung auf, einer Befestigung aus dem 7. Jahrhundert an den Hängen des Berges Aragaz.',
    },
    shortDescription: {
      en: 'A gorge-top monastery and a mountain fortress — two Aragatsotn gems in one trip.',
      ru: 'Монастырь над ущельем и горная крепость — два сокровища Арагацотна за одну поездку.',
      de: 'Ein Schluchten-Kloster und eine Bergfestung — zwei Aragazotn-Juwelen in einer Reise.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
    ],
    duration: 'half day',
    startTime: '10:00',
    endTime: '15:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 18,
    priceForeignEUR: 30,
    category: 'Historical',
    region: 'Aragatsotn',
    route: [
      { name: 'Saghmosavank Monastery', description: '13th-century monastery perched above the dramatic Kasakh Gorge — "Monastery of Psalms"' },
      { name: 'Amberd Fortress', description: '7th-century mountain fortress at 2,300m on the slopes of Mount Aragats' },
      { name: 'Kasakh Gorge', description: 'Deep river gorge with stunning geological formations and panoramic viewpoints' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.3450,44.3967&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Saghmosavank Monastery', lat: 40.3450, lng: 44.3967, heading: 180, pitch: 15 },
      { name: 'Amberd Fortress', lat: 40.3875, lng: 44.2583, heading: 90, pitch: 10 },
      { name: 'Kasakh Gorge', lat: 40.3433, lng: 44.3933, heading: 270, pitch: 15 },
    ],
  },

  // 19. Sevanavank, Hayravank
  {
    id: 19,
    slug: 'sevanavank-hayravank',
    name: {
      en: 'Sevanavank & Hayravank',
      ru: 'Севанаванк и Айраванк',
      de: 'Sewanawank & Hajrawank',
    },
    description: {
      en: 'A relaxing half-day trip to the shores of Lake Sevan, visiting two historic monasteries with stunning lake views. Sevanavank on the peninsula offers panoramic vistas of Armenia\'s largest lake, while Hayravank on the eastern shore provides a more intimate and mystical atmosphere with its 9th-12th century architecture and legends of a magical key.',
      ru: 'Расслабляющая полудневная поездка на берега озера Севан с посещением двух исторических монастырей с потрясающими видами на озеро. Севанаванк на полуострове предлагает панорамные виды на крупнейшее озеро Армении, а Айраванк на восточном берегу создаёт более интимную и мистическую атмосферу.',
      de: 'Ein entspannter Halbtagesausflug an die Ufer des Sewansees mit Besuch zweier historischer Klöster mit atemberaubendem Seeblick. Sewanawank auf der Halbinsel bietet Panoramablicke, während Hajrawank am östlichen Ufer eine intimerе und mystischere Atmosphäre bietet.',
    },
    shortDescription: {
      en: 'Two lakeside monasteries and the endless blue of Lake Sevan in a relaxing half day.',
      ru: 'Два прибрежных монастыря и бескрайняя синева озера Севан за расслабляющий полдня.',
      de: 'Zwei Seenklöster und das endlose Blau des Sewansees an einem entspannten halben Tag.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
    ],
    duration: 'half day',
    startTime: '10:00',
    endTime: '15:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 14,
    priceForeignEUR: 23,
    category: 'Historical',
    region: 'Gegharkunik',
    route: [
      { name: 'Sevanavank Monastery', description: '9th-century monastery on the Sevan peninsula with sweeping views of the lake and mountains' },
      { name: 'Hayravank Monastery', description: '9th-12th century monastery on the eastern shore, shrouded in legends of a magical key' },
      { name: 'Lake Sevan', description: 'One of the world\'s largest high-altitude freshwater lakes — Armenia\'s "Blue Pearl"' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.3400,45.0500&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Sevanavank Monastery', lat: 40.3400, lng: 45.0500, heading: 180, pitch: 10 },
      { name: 'Hayravank Monastery', lat: 40.3233, lng: 45.1083, heading: 90, pitch: 15 },
      { name: 'Lake Sevan', lat: 40.3495, lng: 45.3315, heading: 270, pitch: 5 },
    ],
  },

  // 20. Jermuk, Waterfall
  {
    id: 20,
    slug: 'jermuk-waterfall',
    name: {
      en: 'Jermuk & Waterfall',
      ru: 'Джермук и Водопад',
      de: 'Dschermuk & Wasserfall',
    },
    description: {
      en: 'Journey to Armenia\'s premier spa town, famous for its healing mineral waters and stunning natural beauty. See the magnificent Jermuk Waterfall cascading 72 meters down a sheer cliff face, taste the famous mineral springs, and enjoy an optional ride on the Jermuk ropeway for breathtaking views. A rejuvenating escape into wellness and nature.',
      ru: 'Отправьтесь в главный курортный город Армении, знаменитый своими целебными минеральными водами и потрясающей природной красотой. Увидьте великолепный Джермукский водопад, низвергающийся с 72-метровой отвесной скалы, попробуйте знаменитые минеральные источники и насладитесьoptionalной поездкой на канатной дороге Джермука.',
      de: 'Reisen Sie in Armeniens führenden Kurort, berühmt für seine heilenden Mineralwässer und atemberaubende Naturschönheit. Sehen Sie den magnifizienten Dschermuk-Wasserfall, der 72 Meter eine Klippe hinabstürzt, probieren Sie die berühmten Mineralquellen und genießen Sie eine optionale Seilbahnfahrt.',
    },
    shortDescription: {
      en: 'Mineral springs, a 72m waterfall, and mountain panoramas at Armenia\'s spa capital.',
      ru: 'Минеральные источники, 72-метровый водопад и горные панорамы в курортной столице Армении.',
      de: 'Mineralquellen, ein 72m-Wasserfall und Bergpanoramen in Armeniens Kurhauptstadt.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 26,
    priceForeignEUR: 42,
    category: 'Wellness',
    region: 'Vayots Dzor',
    route: [
      { name: 'Jermuk town', description: 'Armenia\'s premier spa town, famous for its healing mineral waters and sanatoriums' },
      { name: 'Jermuk Waterfall', description: 'Magnificent 72-meter waterfall — one of Armenia\'s tallest — cascading down a sheer cliff' },
      { name: 'Mineral water springs', description: 'Natural mineral springs where you can taste the famous Jermuk water directly from the source' },
      { name: 'Jermuk Ropeway', description: 'Scenic cable car ride offering panoramic views of the surrounding mountains and valleys' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: ['Ropeway ticket'],
    availableDays: ['Saturday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=39.8383,45.6717&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Jermuk Town', lat: 39.8383, lng: 45.6717, heading: 180, pitch: 10 },
      { name: 'Jermuk Waterfall', lat: 39.8417, lng: 45.6633, heading: 90, pitch: 15 },
      { name: 'Mineral Springs', lat: 39.8350, lng: 45.6683, heading: 270, pitch: 5 },
    ],
  },

  // 21. Lake Parz, Dendropark
  {
    id: 21,
    slug: 'lake-parz-dendropark',
    name: {
      en: 'Lake Parz & Dendropark',
      ru: 'Озеро Парз и Дендропарк',
      de: 'Parz-See & Dendropark',
    },
    description: {
      en: 'Immerse yourself in the greenest corners of northern Armenia. Start at Lake Parz, a crystal-clear mountain lake hidden in the forests of Dilijan National Park, then travel to Stepanavan Dendropark — a botanical wonderland with over 500 tree species from around the world. A perfect tour for nature lovers seeking tranquility and natural beauty.',
      ru: 'Погрузитесь в самые зелёные уголки северной Армении. Начните с озера Парз, кристально чистого горного озера, скрытого в лесах Дилижанского национального парка, затем отправьтесь в Степанаванский Дендропарк — ботаническое чудо с более чем 500 видами деревьев со всего мира. Идеальная экскурсия для любителей природы.',
      de: 'Tauchen Sie ein in die grünsten Ecken Nordarmeniens. Beginnen Sie am Parz-See, einem kristallklaren Bergsee in den Wäldern des Dilidschan-Nationalparks, und reisen Sie dann zum Stepanawan-Dendropark — einem botanischen Wunderland mit über 500 Baumarten aus aller Welt.',
    },
    shortDescription: {
      en: 'A forest lake and botanical garden — northern Armenia\'s nature at its finest.',
      ru: 'Лесное озеро и ботанический сад — природа северной Армении во всей красе.',
      de: 'Ein Waldsee und Botanischer Garten — Nordarmeniens Natur vom Feinsten.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 22,
    priceForeignEUR: 35,
    category: 'Nature',
    region: 'Tavush',
    route: [
      { name: 'Lake Parz', description: 'Crystal-clear mountain lake surrounded by dense forests in Dilijan National Park' },
      { name: 'Dendropark Stepanavan', description: 'Lush botanical garden with over 500 tree species from around the world' },
      { name: 'Stepanavan', description: 'Charming provincial town surrounded by green hills and forests' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.7567,44.8450&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Lake Parz', lat: 40.7567, lng: 44.8450, heading: 180, pitch: 10 },
      { name: 'Dendropark Stepanavan', lat: 41.0150, lng: 44.3717, heading: 90, pitch: 5 },
      { name: 'Stepanavan', lat: 41.0100, lng: 44.3750, heading: 270, pitch: 10 },
    ],
  },

  // 22. Goshavank, Haghartsin, Dilijan
  {
    id: 22,
    slug: 'goshavank-haghartsin-dilijan',
    name: {
      en: 'Goshavank, Haghartsin & Dilijan',
      ru: 'Гошаванк, Ахарцин и Дилижан',
      de: 'Goschawank, Chaghazdin & Dilidschan',
    },
    description: {
      en: 'Explore the enchanting Tavush region with its forested mountains and medieval treasures. Visit Goshavank, a 12th-century monastery famous for its intricate khachkars, and Haghartsin, a monastic complex hidden in the verdant Dilijan forests. Wander through the Old Dilijan Complex to experience traditional Armenian town life from centuries past.',
      ru: 'Исследуйте очаровательный Тавушский регион с его лесистыми горами и средневековыми сокровищами. Посетите Гошаванк — монастырь XII века, известный своими изысканными хачкарами, и Ахарцин — монастырский комплекс, скрытый в зелёных лесах Дилижана. Прогуляйтесь по Старому Дилижанскому комплексу, чтобы испытать традиционный армянский городской быт прошлых веков.',
      de: 'Erkunden Sie die bezaubernde Region Tawusch mit ihren bewaldeten Bergen und mittelalterlichen Schätzen. Besuchen Sie Goschawank, ein Kloster aus dem 12. Jahrhundert mit berühmten Chatschkaren, und Chaghazdin, einen Klosterkomplex in den grünen Wäldern von Dilidschan.',
    },
    shortDescription: {
      en: 'Forest monasteries and old town charm in Armenia\'s lush Tavush region.',
      ru: 'Лесные монастыри и очарование старого города в пышном Тавушском регионе Армении.',
      de: 'Waldklöster und Altstadt-Charme in Armeniens üppiger Tawusch-Region.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 18,
    priceForeignEUR: 30,
    category: 'Historical',
    region: 'Tavush',
    route: [
      { name: 'Goshavank Monastery', description: '12th-13th century monastery famous for its masterfully carved khachkars and medieval university' },
      { name: 'Haghartsin Monastery', description: '10th-13th century monastic complex nestled in the dense forests of Dilijan' },
      { name: 'Old Dilijan Complex', description: 'Reconstructed 19th-century street preserving the traditional architecture and atmosphere of old Dilijan' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.7233,44.8717&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Goshavank Monastery', lat: 40.7233, lng: 44.8717, heading: 120, pitch: 10 },
      { name: 'Haghartsin Monastery', lat: 40.7767, lng: 44.8792, heading: 180, pitch: 15 },
      { name: 'Old Dilijan Complex', lat: 40.7403, lng: 44.8615, heading: 90, pitch: 5 },
    ],
  },

  // 23. Byurakan, Amberd
  {
    id: 23,
    slug: 'byurakan-amberd',
    name: {
      en: 'Byurakan & Amberd',
      ru: 'Бюракан и Амберд',
      de: 'Bjurakan & Amberd',
    },
    description: {
      en: 'Combine natural beauty with historical wonder on this half-day tour to the slopes of Mount Aragats. Pass through the picturesque village of Byurakan before reaching Amberd Fortress, the 7th-century stronghold perched at 2,300 meters. The alpine scenery and ancient stone walls create an unforgettable contrast between Armenia\'s wild nature and its rich past.',
      ru: 'Сочетайте природную красоту с историческим чудом в этой полудневной экскурсии на склоны горы Арагац. Проедьте через живописное село Бюракан, прежде чем добраться до крепости Амберд — укрепления VII века на высоте 2 300 метров. Альпийский пейзаж и древние каменные стены создают незабываемый контраст.',
      de: 'Kombinieren Sie Naturschönheit mit historischem Wunder auf dieser Halbtagestour zu den Hängen des Berges Aragaz. Durchqueren Sie das malerische Dorf Bjurakan, bevor Sie die Amberd-Festung erreichen — eine Befestigung aus dem 7. Jahrhundert auf 2.300 Metern Höhe.',
    },
    shortDescription: {
      en: 'Village charm and mountain fortress on the slopes of Armenia\'s highest peak.',
      ru: 'Сельское обаяние и горная крепость на склонах высочайшей вершины Армении.',
      de: 'Dorf-Charme und Bergfestung an den Hängen von Armeniens höchstem Gipfel.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
    ],
    duration: 'half day',
    startTime: '10:00',
    endTime: '15:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 16,
    priceForeignEUR: 27,
    category: 'Nature',
    region: 'Aragatsotn',
    route: [
      { name: 'Byurakan village', description: 'Scenic village on the slopes of Mount Aragats, known for its observatory and apricot orchards' },
      { name: 'Amberd Fortress', description: '7th-century mountain fortress at 2,300m with sweeping views and ancient stone walls' },
      { name: 'Aragats slopes', description: 'Alpine landscapes on the flanks of Armenia\'s highest mountain (4,090m)' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.3383,44.2633&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Byurakan Village', lat: 40.3383, lng: 44.2633, heading: 90, pitch: 5 },
      { name: 'Amberd Fortress', lat: 40.3875, lng: 44.2583, heading: 180, pitch: 15 },
      { name: 'Mount Aragats Slopes', lat: 40.4167, lng: 44.2167, heading: 270, pitch: 10 },
    ],
  },

  // 24. Makaravank, Aghnavank
  {
    id: 24,
    slug: 'makaravank-aghnavank',
    name: {
      en: 'Makaravank & Aghnavank Monasteries',
      ru: 'Монастыри Макраванк и Агнаванк',
      de: 'Makarawank & Aghnawank Klöster',
    },
    description: {
      en: 'Venture into the lesser-explored corners of Tavush to discover two hidden gems of Armenian medieval architecture. Makaravank, perched on a forested hillside, is renowned for its exquisite stone carvings and spiritual atmosphere. Aghnavank, a modest but charming monastery, sits within Dilijan National Park. A peaceful journey far from the tourist crowds.',
      ru: 'Отправьтесь в менее исследованные уголки Тавуша, чтобы открыть два скрытых сокровища армянской средневековой архитектуры. Макраванк, расположенный на лесистом холме, славится своими изысканными каменными резьбами и духовной атмосферой. Агнаванк — скромный, но очаровательный монастырь в Дилижанском национальном парке.',
      de: 'Begeben Sie sich in die weniger erkundeten Ecken von Tawusch, um zwei verborgene Juwelen der armenischen mittelalterlichen Architektur zu entdecken. Makarawank, auf einem bewaldeten Hügel gelegen, ist berühmt für seine exquisiten Steinmetzarbeiten und spirituelle Atmosphäre.',
    },
    shortDescription: {
      en: 'Hidden medieval gems in the forested hills of Tavush — off the beaten path.',
      ru: 'Скрытые средневековые жемчужины в лесистых холмах Тавуша — вдали от проторённых дорог.',
      de: 'Verborgene mittelalterliche Juwelen in den bewaldeten Hügeln von Tawusch — abseits der Touristenpfade.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 23,
    priceForeignEUR: 38,
    category: 'Historical',
    region: 'Tavush',
    route: [
      { name: 'Makaravank Monastery', description: '10th-13th century monastery on a forested hillside, famous for its exquisite stone carvings' },
      { name: 'Aghnavank Monastery', description: 'Small but charming medieval monastery set within the lush forests of Dilijan National Park' },
      { name: 'Dilijan National Park', description: 'Armenia\'s lush northern national park — forests, mountains, and crystal-clear streams' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.7417,44.8850&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Makaravank Monastery', lat: 40.7417, lng: 44.8850, heading: 180, pitch: 10 },
      { name: 'Aghnavank Monastery', lat: 40.7400, lng: 44.9000, heading: 90, pitch: 15 },
      { name: 'Dilijan National Park', lat: 40.7500, lng: 44.8700, heading: 270, pitch: 5 },
    ],
  },

  // 25. Khor Virap, Areni, Noravank (with lunch)
  {
    id: 25,
    slug: 'khor-virap-areni-noravank-lunch',
    name: {
      en: 'Khor Virap, Areni, Noravank (with Lunch)',
      ru: 'Хор Вирап, Арени, Нораванк (с обедом)',
      de: 'Chor Wirap, Areni, Norawank (mit Mittagessen)',
    },
    description: {
      en: 'The premium version of our most popular southern Armenia route — now with a delicious included lunch! Starting at Khor Virap with its legendary views of Mount Ararat, continuing to the Areni wine region for tastings, and finishing at the spectacular Noravank Monastery nestled in red cliffs. An optional visit to the mysterious Mozrov Cave adds an adventurous twist.',
      ru: 'Премиальная версия самого популярного маршрута по южной Армении — теперь с вкусным обедом! Начиная с Хор Вирапа с его легендарными видами на гору Арарат, продолжая в винном регионе Арени для дегустации и завершая в потрясающем монастыре Нораванк среди красных скал. Optionalный визит в таинственную пещеру Мозров добавит приключенческую нотку.',
      de: 'Die Premium-Version unserer beliebtesten Südarmenien-Route — jetzt mit köstlichem Mittagessen! Beginnend mit Chor Wirap und seinem legendären Blick auf den Berg Ararat, Weiterfahrt in die Areni-Weinregion und Abschluss beim spektakulären Norawank-Kloster in roten Klippen. Ein optionaler Besuch der mysteriösen Mozrov-Höhle sorgt für Abenteuer.',
    },
    shortDescription: {
      en: 'Ararat views, wine tasting, red-cliff monastery, and lunch — our premium southern tour.',
      ru: 'Виды на Арарат, дегустация вина, монастырь в красных скалах и обед — наша премиальная южная экскурсия.',
      de: 'Ararat-Blicke, Weinverkostung, Rotklippen-Kloster und Mittagessen — unsere Premium-Südtour.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 26,
    priceForeignEUR: 42,
    category: 'Wine',
    region: 'Ararat',
    route: [
      { name: 'Khor Virap', description: 'Sacred pilgrimage site with the most iconic view of Mount Ararat in all of Armenia' },
      { name: 'Areni Winery', description: 'Sample distinctive Armenian wines in the heart of the country\'s premier wine region' },
      { name: 'Noravank', description: 'Breathtaking 13th-century monastery surrounded by towering red rock formations' },
      { name: 'Mozrov Cave', description: 'Mysterious limestone cave with stunning stalactite and stalagmite formations' },
    ],
    included: ['Guide service', 'Transportation', 'Wine tasting', 'Lunch'],
    excluded: [],
    availableDays: ['Saturday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 20 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=39.8842,44.5767&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Khor Virap', lat: 39.8842, lng: 44.5767, heading: 340, pitch: 10 },
      { name: 'Areni Winery', lat: 39.7228, lng: 45.1817, heading: 90, pitch: 5 },
      { name: 'Noravank', lat: 39.6850, lng: 45.2317, heading: 180, pitch: 15 },
      { name: 'Mozrov Cave', lat: 39.7150, lng: 45.1900, heading: 45, pitch: 10 },
    ],
  },

  // 26. Tatev, Karahunj, Noravank (2 days)
  {
    id: 26,
    slug: 'tatev-karahunj-noravank-two-days',
    name: {
      en: 'Tatev, Karahunj & Noravank (2 Days)',
      ru: 'Татев, Караундж и Нораванк (2 дня)',
      de: 'Tatev, Karahundsch & Norawank (2 Tage)',
    },
    description: {
      en: 'An immersive two-day journey through southern Armenia\'s most spectacular sites. Day one takes you to the mysterious Karahunj — Armenia\'s Stonehenge — and the breathtaking Tatev Monastery via the Wings of Tatev ropeway. Day two reveals the red-cliff beauty of Noravank and the winemaking traditions of Areni. Includes hotel, breakfast, and ropeway tickets.',
      ru: 'Погружающее двухдневное путешествие по самым зрелищным местам южной Армении. В первый день вы посетите таинственный Караундж — армянский Стоунхендж — и потрясающий монастырь Татев через канатную дорогу Крылья Татева. Во второй день откроется красота Нораванка в красных скалах и винодельческие традиции Арени. Включает отель, завтрак и билеты на канатную дорогу.',
      de: 'Eine intensive zweitägige Reise durch die spektakulärsten Stätten Südarmeniens. Tag eins bringt Sie zum mysteriösen Karahundsch — Armeniens Stonehenge — und zum atemberaubenden Tatev-Kloster. Tag zwei enthüllt die Rotklippen-Schönheit von Norawank und die Weinbautraditionen von Areni. Inklusive Hotel, Frühstück und Seilbahn-Tickets.',
    },
    shortDescription: {
      en: 'Armenia\'s Stonehenge, the Wings of Tatev, and red-cliff Noravank over two epic days.',
      ru: 'Армянский Стоунхендж, Крылья Татева и Нораванк за два эпических дня.',
      de: 'Armeniens Stonehenge, die Flügel von Tatev und Rotklippen-Norawank an zwei epischen Tagen.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
    ],
    duration: '2 days',
    startTime: '08:00',
    endTime: '21:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 403,
    priceForeignEUR: 515,
    category: 'Multi-day',
    region: 'Syunik',
    route: [
      { name: 'Day 1: Karahunj (Stonehenge)', description: 'Ancient observatory of standing stones — predating England\'s Stonehenge by 3,500 years' },
      { name: 'Day 1: Tatev', description: 'The "Wings of Tatev" aerial tramway and the spectacular 9th-century Tatev Monastery' },
      { name: 'Day 2: Noravank', description: 'Stunning 13th-century monastery in a dramatic red rock canyon' },
      { name: 'Day 2: Areni', description: 'Wine tasting in Armenia\'s premier winemaking village' },
    ],
    included: ['Guide service', 'Transportation', 'Hotel (1 night)', 'Breakfast', 'Ropeway ticket'],
    excluded: [],
    availableDays: ['Saturday', 'Sunday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 16 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=39.5800,46.3500&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Karahunj (Stonehenge)', lat: 39.5800, lng: 46.3500, heading: 180, pitch: 10 },
      { name: 'Tatev Monastery', lat: 39.3928, lng: 46.2475, heading: 90, pitch: 15 },
      { name: 'Noravank', lat: 39.6850, lng: 45.2317, heading: 270, pitch: 15 },
      { name: 'Areni', lat: 39.7228, lng: 45.1817, heading: 45, pitch: 5 },
    ],
  },

  // 27. Armenia Discovery (3 days)
  {
    id: 27,
    slug: 'armenia-discovery-three-days',
    name: {
      en: 'Armenia Discovery (3 Days)',
      ru: 'Открытие Армении (3 дня)',
      de: 'Armenien Entdeckung (3 Tage)',
    },
    description: {
      en: 'The ultimate Armenian experience — three unforgettable days covering the country\'s most iconic destinations. Day one: the pagan temple of Garni, the rock-carved Geghard, and the blue expanse of Lake Sevan. Day two: the world\'s longest ropeway to Tatev Monastery. Day three: the biblical Khor Virap and the stunning Noravank. Includes hotels, breakfast, and entrance fees.',
      ru: 'Непревзойдённый армянский опыт — три незабываемых дня, охватывающие самые знаковые направления страны. День первый: языческий храм Гарни, высеченный в скале Гегард и голубые просторы озера Севан. День второй: самая длинная канатная дорога в мире к монастырю Татев. День третий: библейский Хор Вирап и потрясающий Нораванк. Включает отели, завтрак и входные билеты.',
      de: 'Das ultimative Armenien-Erlebnis — drei unvergessliche Tage mit den ikonischsten Zielen des Landes. Tag eins: der heidnische Garni-Tempel, das in Fels gehauene Geghard und der blaue Sewansee. Tag zwei: die längste Seilbahn der Welt zum Tatev-Kloster. Tag drei: das biblische Chor Wirap und das atemberaubende Norawank. Inklusive Hotels, Frühstück und Eintrittsgelder.',
    },
    shortDescription: {
      en: 'Three days, three regions, all of Armenia\'s greatest hits — the ultimate discovery tour.',
      ru: 'Три дня, три региона, все главные хиты Армении — незабываемый тур-открытие.',
      de: 'Drei Tage, drei Regionen, alle Highlights Armeniens — die ultimative Entdeckungstour.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
    ],
    duration: '3 days',
    startTime: '08:00',
    endTime: '21:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 265,
    priceForeignEUR: 374,
    category: 'Multi-day',
    region: 'Kotayk',
    route: [
      { name: 'Day 1: Garni', description: '1st-century Hellenistic temple — the only surviving pagan temple in the former Soviet Union' },
      { name: 'Day 1: Geghard', description: 'UNESCO World Heritage rock-carved monastery with sacred springs' },
      { name: 'Day 1: Sevan', description: 'Armenia\'s iconic "Blue Pearl" — one of the world\'s largest high-altitude lakes' },
      { name: 'Day 2: Tatev', description: 'The Wings of Tatev aerial tramway and the spectacular 9th-century monastery' },
      { name: 'Day 2: Wings of Tatev', description: 'World\'s longest reversible aerial tramway — 5.7 km over the Vorotan Gorge' },
      { name: 'Day 3: Khor Virap', description: 'The birthplace of Armenian Christianity with legendary views of Mount Ararat' },
      { name: 'Day 3: Noravank', description: 'Breathtaking 13th-century monastery surrounded by red rock cliffs' },
    ],
    included: ['Guide service', 'Transportation', 'Hotel (2 nights)', 'Breakfast', 'Entrance fees'],
    excluded: [],
    availableDays: ['Friday', 'Saturday', 'Sunday'],
    bestPeriod: 'May - October',
    groupSize: 'Up to 16 people',
    featured: true,
    streetViewUrl: 'https://maps.google.com/maps?q=40.1150,44.7250&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Garni Temple', lat: 40.1150, lng: 44.7250, heading: 180, pitch: 10 },
      { name: 'Geghard Monastery', lat: 40.1417, lng: 44.7975, heading: 90, pitch: 15 },
      { name: 'Lake Sevan', lat: 40.3495, lng: 45.3315, heading: 270, pitch: 5 },
      { name: 'Tatev Monastery', lat: 39.3928, lng: 46.2475, heading: 180, pitch: 15 },
      { name: 'Khor Virap', lat: 39.8842, lng: 44.5767, heading: 340, pitch: 10 },
      { name: 'Noravank', lat: 39.6850, lng: 45.2317, heading: 180, pitch: 15 },
    ],
  },

  // 28. Mount Aragats Climbing
  {
    id: 28,
    slug: 'mount-aragats-climbing',
    name: {
      en: 'Mount Aragats Southern Summit Climb',
      ru: 'Восхождение на Южную вершину горы Арагац',
      de: 'Besteigung des Südgrats des Berges Aragaz',
    },
    description: {
      en: 'Conquer Armenia\'s highest peak on this exhilarating climbing adventure. The Southern Summit of Mount Aragats (3,887m) is the most accessible of the four summits, offering a challenging but achievable climb for fit hikers. Pass by the stunning Kari Lake on your ascent and be rewarded with 360-degree views stretching from Turkey to the Caucasus range.',
      ru: 'Покорите высочайшую вершину Армении в этом захватывающем восхождении. Южная вершина горы Арагац (3 887 м) — самая доступная из четырёх вершин, предлагающая сложное, но достижимое восхождение для подготовленных туристов. Пройдите мимо потрясающего озера Кари на подъёме и будете вознаграждены 360-градусными видами.',
      de: 'Erobern Sie Armeniens höchsten Gipfel auf diesem aufregenden Kletterabenteuer. Der Südgipfel des Berges Aragaz (3.887m) ist der zugänglichste der vier Gipfel und bietet eine anspruchsvolle, aber erreichbare Besteigung. Passieren Sie den atemberaubenden Kari-See und belohnen Sie sich mit 360-Grad-Blicken.',
    },
    shortDescription: {
      en: 'Summit Armenia\'s highest peak at 3,887m — a challenging but achievable mountain adventure.',
      ru: 'Взойдите на высочайшую вершину Армении на высоте 3 887 м — сложное, но достижимое горное приключение.',
      de: 'Erklimmen Sie Armeniens höchsten Gipfel auf 3.887m — ein herausforderndes aber erreichbares Bergabenteuer.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67135eb4460eb-3-hawks.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a60b14687-dil3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/683ff8b7b1df8-sanahin2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/67e2a645707cc-sevan1.png',
    ],
    duration: 'full day',
    startTime: '06:00',
    endTime: '19:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 47,
    priceForeignEUR: 69,
    category: 'Adventure',
    region: 'Aragatsotn',
    route: [
      { name: 'Mount Aragats (Southern Summit)', description: 'The most accessible of Mount Aragats\' four summits at 3,887m — a challenging but rewarding climb' },
      { name: 'Kari Lake', description: 'Stunning high-altitude lake at 3,190m — the starting point for the summit attempt' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: ['Warm clothing rental'],
    availableDays: ['Saturday'],
    bestPeriod: 'June - September',
    groupSize: 'Up to 12 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.4167,44.2167&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Mount Aragats Southern Summit', lat: 40.4167, lng: 44.2167, heading: 180, pitch: 15 },
      { name: 'Kari Lake', lat: 40.4633, lng: 44.1833, heading: 270, pitch: 10 },
    ],
  },

  // 29. Parz Lake to Goshavank Trail
  {
    id: 29,
    slug: 'parz-lake-to-goshavank-trail',
    name: {
      en: 'Parz Lake to Goshavank Trail',
      ru: 'Тропа от озера Парз до Гошаванка',
      de: 'Wanderweg vom Parz-See nach Goschawank',
    },
    description: {
      en: 'Hike through the pristine forests of Dilijan National Park on this scenic trail connecting Lake Parz to Goshavank Monastery. The path winds through ancient woodlands, crossing streams and meadows with the chance to spot local wildlife. Arriving at the medieval Goshavank Monastery feels like stepping back in time — a perfect reward after a day on the trail.',
      ru: 'Пройдите по первозданным лесам Дилижанского национального парка по этой живописной тропе, соединяющей озеро Парз с монастырём Гошаванк. Путь извивается через древние леса, пересекая ручьи и луга с возможностью увидеть местную фауну. Прибытие в средневековый монастырь Гошаванк — как путешествие во времени.',
      de: 'Wandern Sie durch die unberührten Wälder des Dilidschan-Nationalparks auf diesem malerischen Weg, der den Parz-See mit dem Goschawank-Kloster verbindet. Der Pfad windet sich durch alte Wälder, überquert Bäche und Wiesen. Die Ankunft am mittelalterlichen Goschawank-Kloster fühlt sich an wie eine Zeitreise.',
    },
    shortDescription: {
      en: 'A forest trail from a mountain lake to a medieval monastery — hiking at its best.',
      ru: 'Лесная тропа от горного озера до средневекового монастыря — поход в лучшем виде.',
      de: 'Ein Waldweg vom Bergsee zum mittelalterlichen Kloster — Wandern vom Feinsten.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/68511d6043e30-dimats4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae267a1d2d-areni1.webp',
    ],
    duration: 'full day',
    startTime: '09:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['Armenian', 'English', 'Russian'],
    priceEUR: 20,
    priceForeignEUR: 31,
    category: 'Adventure',
    region: 'Tavush',
    route: [
      { name: 'Parz Lake', description: 'Crystal-clear mountain lake surrounded by ancient forests — the trailhead' },
      { name: 'Trail through Dilijan National Park', description: 'Scenic hiking path winding through dense woodlands, meadows, and stream crossings' },
      { name: 'Goshavank Monastery', description: '12th-13th century monastery with masterfully carved khachkars — the trail\'s rewarding destination' },
    ],
    included: ['Guide service', 'Transportation'],
    excluded: [],
    availableDays: ['Sunday'],
    bestPeriod: 'April - October',
    groupSize: 'Up to 15 people',
    featured: false,
    streetViewUrl: 'https://maps.google.com/maps?q=40.7567,44.8450&t=k&z=15&ie=UTF8&iwloc=&output=embed',
    streetViewLocations: [
      { name: 'Parz Lake', lat: 40.7567, lng: 44.8450, heading: 180, pitch: 10 },
      { name: 'Goshavank Monastery', lat: 40.7233, lng: 44.8717, heading: 120, pitch: 15 },
    ],
  },
];

// Helper: get featured tours
export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}

// Helper: get tours by category
export function getToursByCategory(category: string): Tour[] {
  return tours.filter((tour) => tour.category === category);
}

// Helper: get tours by region
export function getToursByRegion(region: string): Tour[] {
  return tours.filter((tour) => tour.region === region);
}

// Helper: get tour by slug
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

// Helper: get tour by id
export function getTourById(id: number): Tour | undefined {
  return tours.find((tour) => tour.id === id);
}

// Helper: search tours
export function searchTours(query: string): Tour[] {
  const lowerQuery = query.toLowerCase();
  return tours.filter(
    (tour) =>
      tour.name.en.toLowerCase().includes(lowerQuery) ||
      tour.name.ru.toLowerCase().includes(lowerQuery) ||
      tour.description.en.toLowerCase().includes(lowerQuery) ||
      tour.region.toLowerCase().includes(lowerQuery) ||
      tour.category.toLowerCase().includes(lowerQuery)
  );
}
