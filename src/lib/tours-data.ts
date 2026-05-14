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
      de: 'Tatwew-Kloster & Flügel von Tatew',
    },
    description: {
      en: 'Soar above the dramatic Vorotan Gorge on the world\'s longest reversible aerial tramway — the Wings of Tatev — before arriving at the breathtaking 9th-century Tatev Monastery perched on the edge of a precipice. This tour offers one of Armenia\'s most spectacular visual experiences, combining adrenaline-pumping views with profound historical significance in the country\'s southernmost region.',
      ru: 'Пролетите над захватывающим ущельем Ворота на самой длинной в мире обратимой канатной дороге — Крыльях Татева — прежде чем прибыть к потрясающему монастырю Татев IX века, расположенному на краю обрыва. Эта экскурсия предлагает одно из самых зрелищных впечатлений Армении, сочетая захватывающие дух виды с глубокой исторической значимостью в самом южном регионе страны.',
      de: 'Schweben Sie über der dramatischen Vorotan-Schlucht mit der längsten umkehrbaren Seilbahn der Welt — den Flügeln von Tatew — bevor Sie das atemberaubende Tatwew-Kloster aus dem 9. Jahrhundert erreichen, das am Rand einer Klippe thront. Diese Tour bietet eines der spektakulärsten visuellen Erlebnisse Armeniens und verbindet atemberaubende Ausblicke mit tiefgreifender historischer Bedeutung.',
    },
    shortDescription: {
      en: 'Ride the world\'s longest ropeway to the majestic Tatev Monastery atop a dramatic gorge.',
      ru: 'Прокатитесь на самой длинной канатной дороге мира к величественному монастырю Татев на краю ущелья.',
      de: 'Fahren Sie mit der längsten Seilbahn der Welt zum majestätischen Tatew-Kloster über einer dramatischen Schlucht.',
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
      de: 'Stadtrundfahrt Eriwan',
    },
    description: {
      en: 'Get to know Armenia\'s vibrant capital on this comprehensive half-day tour. From the grand Republic Square and the monumental Cascade Complex to the ancient manuscripts of Matenadaran and the elegant Opera House, discover why Yerevan is one of the world\'s oldest continuously inhabited cities. Finish at Victory Park for sweeping views of Mount Ararat.',
      ru: 'Познакомьтесь с живой столицей Армении в этой подробной полудневной экскурсии. От величественной Площади Республики и монументального Каскада до древних рукописей Матенадарана и элегантного Театра Оперы — узнайте, почему Ереван является одним из старейших непрерывно населённых городов мира. Завершите экскурсию в Парке Победы с панорамными видами на гору Арарат.',
      de: 'Lernen Sie Armeniens lebendige Hauptstadt auf dieser umfassenden Halbtagestour kennen. Von der großartigen Republikplatz und dem monumentalen Kaskadenkomplex bis zu den antiken Manuskripten des Matenadaran — entdecken Sie, warum Eriwan eine der ältesten durchgehend bewohnten Städte der Welt ist.',
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
      de: 'Tatew, Karahundsch & Norawank (2 Tage)',
    },
    description: {
      en: 'An immersive two-day journey through southern Armenia\'s most spectacular sites. Day one takes you to the mysterious Karahunj — Armenia\'s Stonehenge — and the breathtaking Tatev Monastery via the Wings of Tatev ropeway. Day two reveals the red-cliff beauty of Noravank and the winemaking traditions of Areni. Includes hotel, breakfast, and ropeway tickets.',
      ru: 'Погружающее двухдневное путешествие по самым зрелищным местам южной Армении. В первый день вы посетите таинственный Караундж — армянский Стоунхендж — и потрясающий монастырь Татев через канатную дорогу Крылья Татева. Во второй день откроется красота Нораванка в красных скалах и винодельческие традиции Арени. Включает отель, завтрак и билеты на канатную дорогу.',
      de: 'Eine intensive zweitägige Reise durch die spektakulärsten Stätten Südarmeniens. Tag eins bringt Sie zum mysteriösen Karahundsch — Armeniens Stonehenge — und zum atemberaubenden Tatew-Kloster. Tag zwei enthüllt die Rotklippen-Schönheit von Norawank und die Weinbautraditionen von Areni. Inklusive Hotel, Frühstück und Seilbahn-Tickets.',
    },
    shortDescription: {
      en: 'Armenia\'s Stonehenge, the Wings of Tatev, and red-cliff Noravank over two epic days.',
      ru: 'Армянский Стоунхендж, Крылья Татева и Нораванк за два эпических дня.',
      de: 'Armeniens Stonehenge, die Flügel von Tatew und Rotklippen-Norawank an zwei epischen Tagen.',
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
      de: 'Das ultimative Armenien-Erlebnis — drei unvergessliche Tage mit den ikonischsten Zielen des Landes. Tag eins: der heidnische Garni-Tempel, das in Fels gehauene Geghard und der blaue Sewansee. Tag zwei: die längste Seilbahn der Welt zum Tatew-Kloster. Tag drei: das biblische Chor Wirap und das atemberaubende Norawank. Inklusive Hotels, Frühstück und Eintrittsgelder.',
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

  // 101. Discover Armenia & Georgia: A Journey Through the Caucasus (Luxury 14D)
  {
    id: 101,
    slug: 'discover-armenia-georgia-caucasus-14d',
    name: {
      en: 'Discover Armenia & Georgia: A Journey Through the Caucasus',
      ru: 'Откройте Армению и Грузию: Путешествие по Кавказу',
      de: 'Entdecken Sie Armenien & Georgien: Eine Reise durch den Kaukasus',
    },
    description: {
      en: 'Embark on an unforgettable 14-day journey through the heart of the Caucasus, where the ancient kingdoms of Georgia and Armenia reveal their most treasured secrets. From the cobbled streets of Tbilisi to the alpine heights of Stepantsminda, from the cave cities of Uplistsikhe and Vardzia to the sacred monasteries of Armenia, this tour weaves together breathtaking landscapes, millennia-old Christian heritage, and vibrant living traditions. Savour the flavours of both nations through hands-on culinary masterclasses, taste wines from the world\'s oldest winemaking region, and experience the warmth of Caucasian hospitality in hand-picked hotels. With a German-speaking guide by your side, every church, fortress, and mountain pass becomes a story — and every meal a celebration.',
      ru: 'Отправьтесь в незабываемое 14-дневное путешествие через сердце Кавказа, где древние королевства Грузии и Армении раскрывают свои самые драгоценные тайны. От мощёных улиц Тбилиси до альпийских высот Степанцминды, от пещерных городов Уплисцихе и Вардзи до священных монастырей Армении — этот тур сплетает захватывающие дух пейзажи, тысячелетнее христианское наследие и яркие живые традиции. Попробуйте блюда обеих стран на кулинарных мастер-классах, вкушайте вина из древнейшего винодельческого региона мира и ощутите тепло кавказского гостеприимства в тщательно подобранных отелях. С немецкоговорящим гидом рядом каждая церковь, крепость и горный перевал становятся историей, а каждая трапеза — праздником.',
      de: 'Begeben Sie sich auf eine unvergessliche 14-tägige Reise durch das Herz des Kaukasus, wo die antiken Königreiche Georgiens und Armeniens ihre kostbarsten Geheimnisse offenbaren. Von den kopfsteingepflasterten Straßen Tiflis bis zu den alpinen Höhen von Stepanzminda, von den Höhlenstädten Uplisziche und Wardsia bis zu den heiligen Klöstern Armeniens — diese Tour verwebt atemberaubende Landschaften, jahrtausendealtes christliches Erbe und lebendige Traditionen. Kosten Sie die Aromen beider Nationen bei kulinarischen Meisterkursen, probieren Sie Weine aus der ältesten Weinbauregion der Welt und erleben Sie die Wärme kaukasischer Gastfreundschaft in handverlesenen Hotels. Mit einem deutschsprachigen Guide an Ihrer Seite wird jede Kirche, Festung und jeder Bergpass zu einer Geschichte — und jede Mahlzeit zu einem Fest.',
    },
    shortDescription: {
      en: '14 days across Armenia & Georgia — monasteries, wine, mountains and two ancient capitals.',
      ru: '14 дней по Армении и Грузии — монастыри, вино, горы и две древние столицы.',
      de: '14 Tage durch Armenien & Georgien — Klöster, Wein, Berge und zwei antike Hauptstädte.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f008900f-tatev1.png',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f008900f-tatev1.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f0093afd-tatev2.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f10003ec-tatev3.png',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/672e0b8ad8fdb-66e41e2a52537-mckhetha2-672dd31d07282-1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/69ca37c65f8bd-jv2.webp',
    ],
    duration: '14 days',
    startTime: '09:00',
    endTime: '18:00',
    startEndPoint: 'Tbilisi',
    language: ['German'],
    priceEUR: 2200,
    priceForeignEUR: 2200,
    category: 'Luxury',
    region: 'Multiple',
    route: [
      { name: 'Day 1: Arrival in Tbilisi', description: 'Private airport transfer, check-in at Mercure Tbilisi Old Town' },
      { name: 'Day 2: Tbilisi City Tour', description: 'Metekhi, Narikala Fortress, sulfur baths, Shardeni Street, Bridge of Peace, National Museum' },
      { name: 'Day 3: Kakheti Wine Region', description: 'Bodbe Monastery, Sighnaghi "City of Love", Tsinandali estate & winery' },
      { name: 'Day 4: Mtskheta & Kazbegi', description: 'Jvari Monastery, Svetitskhoveli Cathedral, Cross Pass 2395m, Gergeti Trinity Church 2170m' },
      { name: 'Day 5: Juta Village & Chiukhi Hike', description: 'Sno Valley 4x4, Juta village 2150m, Chiukhi mountains 3842m hike' },
      { name: 'Day 6: Uplistsikhe & Rabat', description: 'Ananuri complex, Uplistsikhe cave town 1st millennium BC, Rabati castle' },
      { name: 'Day 7: Vardzia Cave Complex', description: 'Khertvisi Fortress 10th c., Vardzia 12th c. cave city, Poka convent' },
      { name: 'Day 8: Cross Border — Haghpat & Dilijan', description: 'Sadakhlo border, UNESCO Haghpat Monastery, Dilijan "Armenian Switzerland"' },
      { name: 'Day 9: Dilijan National Park', description: 'Gosh Lake, Goshavank 12th c., Haghartsin, Tolma masterclass' },
      { name: 'Day 10: Sevan, Garni & Geghard', description: 'Lake Sevan boat ride, Geghard UNESCO, Garni pagan temple, Lavash masterclass' },
      { name: 'Day 11: Yerevan City Tour', description: 'Tsitsernakaberd, ARARAT brandy tasting, Republic Square, Cascade, folk music dinner' },
      { name: 'Day 12: Khor Virap, Noravank & Jermuk', description: 'Khor Virap, Mt Ararat views, Areni Cave, Areni Winery, Jermuk waterfall & spa' },
      { name: 'Day 13: Etchmiadzin & Zvartnots', description: 'Etchmiadzin oldest Christian church, Machanents House lunch, Zvartnots Cathedral' },
      { name: 'Day 14: Departure', description: 'Transfer to Zvartnots International Airport' },
    ],
    included: ['Transportation with hotel pick-up and drop-off throughout the tour', 'Professional German-speaking guide for the entire duration', 'All entrance fees as per itinerary', '4x4 vehicle transport in Juta (Day 5)', '4x4 vehicle transport to Gergeti Trinity Church (Day 4)', 'Welcome dinner with Armenian folk music (Day 11)', 'Wine tasting at Areni Winery (Day 12)', 'Wine tasting at Tsinandali (Day 3)', 'Brandy tasting at ARARAT Brandy Factory (Day 11)', 'Lavash-making masterclass in Garni (Day 10)', 'Tolma-making masterclass in Dilijan (Day 9)', 'Boat ride on Lake Sevan (Day 10)', 'Accommodation in Twin/Double rooms as specified', 'Full board (all meals from Day 2 onwards; no dinner on Day 1)', 'Bottled water throughout the tour'],
    excluded: ['International flight tickets', 'Travel insurance', 'Single room supplement (€650 / €450)', 'Additional fees not mentioned in the itinerary', 'Personal expenses and gratuities'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    bestPeriod: 'May - October',
    groupSize: '2-12 people',
    featured: true,
    streetViewUrl: '',
    streetViewLocations: [],
    luxuryItinerary: [
      { day: 1, title: { en: 'Arrival in Tbilisi', ru: 'Прибытие в Тбилиси', de: 'Ankunft in Tiflis' }, description: { en: 'Welcome to Georgia! Upon arrival at Tbilisi International Airport, you will be greeted by your guide and transferred to your hotel in the heart of the Old Town. Tbilisi — the name derives from the Georgian word for "warm," a reference to the legendary sulphur hot springs that have drawn settlers here since the 5th century — is a city where East genuinely meets West. The evening is yours to rest after your journey, perhaps take a gentle stroll along the Mtkvari River, or simply enjoy the ambiance of this captivating capital from the comfort of your hotel.', ru: 'Добро пожаловать в Грузию! По прибытии в международный аэропорт Тбилиси вас встретит гид и доставит в ваш отель в самом сердце Старого города. Тбилиси — название происходит от грузинского слова «тёплый», что отсылает к легендарным серным горячим источникам, привлекающим сюда поселенцев с V века — это город, где Восток по-настоящему встречается с Западом. Вечер в вашем распоряжении — отдохните после путешествия или насладитесь атмосферой этой захватывающей столицы.', de: 'Willkommen in Georgien! Bei Ihrer Ankunft am Flughafen Tiflis werden Sie von Ihrem Guide begrüßt und zu Ihrem Hotel im Herzen der Altstadt gebracht. Tiflis — der Name leitet sich vom georgischen Wort für „warm" ab — ist eine Stadt, in der Ost und West echt aufeinandertreffen. Der Abend gehört Ihnen, um sich nach der Reise auszuruhen.' }, highlights: ['Airport meet-and-greet with private transfer', 'First glimpses of Tbilisi\'s Old Town skyline'], meals: [], accommodation: 'Mercure Tbilisi Old Town', route: { en: 'Tbilisi', ru: 'Тбилиси', de: 'Tiflis' } },
      { day: 2, title: { en: 'Tbilisi City Tour', ru: 'Обзорная экскурсия по Тбилиси', de: 'Stadtrundfahrt Tiflis' }, description: { en: 'A full day immersed in the many layers of Tbilisi. Begin on the Metekhi Plateau, where a dramatic equestrian statue of King Vakhtang Gorgasali surveys the river valley below. Cross by cable car to the ancient Narikala Fortress, perched on the clifftop since the 4th century, and take in the panoramic sweep of the Old Town. Descend past the iconic sulphur bathhouses and wander through the charming Shardeni Street. Visit the Great Synagogue, the majestic Sioni Cathedral, and Anchiskhati Basilica — the oldest surviving church in Tbilisi, dating to the 6th century. Cross the futuristic Bridge of Peace before concluding the day at the National Museum of Georgia.', ru: 'Целый день, погружённый в многогранность Тбилиси. Начните на плато Метехи, где конная статуя царя Вахтанга Горгасали обозревает речную долину. Переправьтесь на канатной дороге в крепость Нарикала, венчающую скалу с IV века. Спуститесь мимо знаменитых серных бань и прогуляйтесь по улице Шардени. Посетите Большую синагогу, собор Сиони и базилику Анчисхати — старейшую церковь Тбилиси VI века. Перейдите по футуристическому Мосту мира и завершите день в Национальном музее Грузии.', de: 'Ein ganzer Tag, eingetaucht in die vielen Schichten Tiflis. Beginnen Sie auf dem Metechi-Plateau mit der Reiterstatue von König Wachtang Gorgassali. Fahren Sie mit der Seilbahn zur antiken Narikala-Festung und genießen Sie den Panoramablick. Steigen Sie vorbei an den Schwefelbädern und schlendern Sie durch die Schardeni-Straße. Besuchen Sie die Große Synagoge, die Sioni-Kathedrale und die Anschischati-Basilika aus dem 6. Jahrhundert. Überqueren Sie die Friedensbrücke und besuchen Sie das Nationalmuseum.' }, highlights: ['Metekhi Plateau & King Vakhtang Gorgasali statue', 'Narikala Fortress with panoramic Old Town views', 'Sulphur baths district', 'Shardeni Street', 'Bridge of Peace', 'National Museum of Georgia'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Mercure Tbilisi Old Town', route: { en: 'Tbilisi', ru: 'Тбилиси', de: 'Tiflis' } },
      { day: 3, title: { en: 'Bodbe, Sighnaghi & Tsinandali', ru: 'Бодбе, Сигнахи и Цинандали', de: 'Bodbe, Sighnaghi & Tsinandali' }, description: { en: 'Journey east into Georgia\'s celebrated wine region of Kakheti. Your first stop is the Monastery of Bodbe, where Saint Nino — the 4th-century evangelist who brought Christianity to Georgia — is buried. A short drive brings you to Sighnaghi, the "City of Love," a beautifully restored hilltop town with sweeping views of the Alazani Valley and the snow-capped Caucasus Mountains. Continue to the Tsinandali estate, the former residence of the poet Alexander Chavchavadze, where a guided tour reveals the lifestyle of 19th-century Georgian aristocracy, and the adjacent winery offers a tasting of celebrated vintages.', ru: 'Отправляйтесь на восток в знаменитый винодельческий регион Кахетию. Первая остановка — монастырь Бодбе, где похоронена святая Нино. Короткая поездка приведёт в Сигнахи, «Город любви», с захватывающими видами на Алазанскую долину и Кавказ. Продолжите в поместье Цинандали — бывшую резиденцию поэта Александра Чавчавадзе с дегустацией знаменитых вин.', de: 'Reisen Sie in das berühmte Weinanbaugebiet Kachetien. Erster Halt: das Bodbe-Kloster, wo die heilige Nino begraben liegt. Kurze Fahrt nach Sighnaghi, der „Stadt der Liebe", mit Blick auf das Alazani-Tal und die Kaukasusberge. Weiter zum Tsinandali-Anwesen mit Weinverkostung.' }, highlights: ['Monastery of Bodbe — tomb of Saint Nino', 'Sighnaghi — the "City of Love" with Caucasus panoramas', 'Tsinandali estate & winery tour & tasting'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Mercure Tbilisi Old Town', route: { en: 'Tbilisi – Bodbe – Sighnaghi – Tsinandali – Tbilisi', ru: 'Тбилиси – Бодбе – Сигнахи – Цинандали – Тбилиси', de: 'Tiflis – Bodbe – Sighnaghi – Tsinandali – Tiflis' } },
      { day: 4, title: { en: 'Mtskheta, Kazbegi & Gergeti Trinity Church', ru: 'Мцхета, Казбеги и церковь Гергети', de: 'Mzcheta, Kasbegi & Gergeti-Dreifaltigkeitskirche' }, description: { en: 'Drive north along the Georgian Military Highway toward the towering peaks of the Greater Caucasus. Begin in Mtskheta, the ancient capital and UNESCO World Heritage Site. Visit the Jvari Monastery, a 6th-century masterpiece perched on a cliff at the confluence of two rivers. Continue to Svetitskhoveli Cathedral, the 11th-century spiritual heart of the nation. Pass through the dramatic Cross Pass at 2,395 metres before a 4x4 vehicle ascends to the Gergeti Holy Trinity Church at 2,170 metres with the glaciated summit of Mount Kazbegi (5,047 m) rising behind it — one of the most photographed scenes in the entire Caucasus.', ru: 'Двигайтесь на север по Военно-Грузинской дороге к вершинам Большого Кавказа. Начните в Мцхете — древней столице и объекте ЮНЕСКО. Посетите монастырь Джвари VI века и собор Светицховели XI века. Пересеките Крестовый перевал на высоте 2395 м. Автомобиль 4x4 поднимется к церкви Гергети на высоте 2170 м с видом на Казбек (5047 м) — одну из самых фотографируемых сцен Кавказа.', de: 'Fahren Sie nach Norden auf der Georgischen Heerstraße zu den Gipfeln des Großen Kaukasus. Beginnen Sie in Mzcheta, der antiken Hauptstadt und UNESCO-Weltkulturerbe. Besuchen Sie das Dschwari-Kloster und die Swetizchoweli-Kathedrale. Durchqueren Sie den Kreuzpass auf 2.395 m. Ein 4x4 fährt zur Gergeti-Dreifaltigkeitskirche auf 2.170 m mit dem Kasbek (5.047 m) dahinter.' }, highlights: ['Jvari Monastery (6th c.) — UNESCO site', 'Svetitskhoveli Cathedral (11th c.)', 'Georgian Military Highway', 'Cross Pass at 2,395 m', 'Gergeti Holy Trinity Church at 2,170 m', 'Mount Kazbegi (5,047 m) views'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Porta Caucasia Stepantsminda', route: { en: 'Tbilisi – Mtskheta – Kazbegi – Gergeti – Stepantsminda', ru: 'Тбилиси – Мцхета – Казбеги – Гергети – Степанцминда', de: 'Tiflis – Mzcheta – Kasbegi – Gergeti – Stepanzminda' } },
      { day: 5, title: { en: 'Juta Village & Chiukhi Mountains Hike', ru: 'Деревня Джута и поход к горам Чиухи', de: 'Dorf Juta & Tschjuchi-Bergwanderung' }, description: { en: 'After breakfast, a 4x4 vehicle takes you into the remote Sno Valley, climbing to the village of Juta at 2,150 metres — one of the highest settlements in Georgia. Set out on a guided hike toward the dramatic Chiukhi mountain massif, whose jagged peaks reach 3,842 metres. The trail meanders through alpine meadows carpeted with wildflowers, alongside crystal-clear streams. A picnic lunch is served amid this extraordinary mountain scenery — a moment of pure serenity far from any crowd. After the hike, drive back to Tbilisi.', ru: 'После завтрака автомобиль 4x4 доставит вас в удалённую долину Сно, к деревне Джута на высоте 2150 м. Отправляйтесь в поход к горному массиву Чиухи с зубчатыми вершинами до 3842 м. Тропа петирает через альпийские луга, усеянные полевыми цветами. Пикник на лоне горной природы — момент чистого спокойствия. После похода — возвращение в Тбилиси.', de: 'Nach dem Frühstück bringt Sie ein 4x4 in das abgelegene Sno-Tal zum Dorf Juta auf 2.150 m. Geführte Wanderung zum Tschjuchi-Bergmassiv mit zerklüfteten Gipfeln bis 3.842 m. Der Weg schlängelt sich durch Almwiesen mit Wildblumen. Picknick in der Berglandschaft. Rückfahrt nach Tiflis.' }, highlights: ['4x4 drive through Sno Valley to Juta (2,150 m)', 'Guided hike toward Chiukhi mountains (3,842 m)', 'Alpine meadows & wildflower landscapes', 'Scenic picnic lunch in the mountains'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Mercure Tbilisi Old Town', route: { en: 'Stepantsminda – Juta – Tbilisi', ru: 'Степанцминда – Джута – Тбилиси', de: 'Stepanzminda – Juta – Tiflis' } },
      { day: 6, title: { en: 'Uplistsikhe Cave Town, Gori & Akhaltsikhe', ru: 'Пещерный город Уплисцихе, Гори и Ахалцихе', de: 'Höhlenstadt Uplisziche, Gori & Achalziche' }, description: { en: 'Head west into the heartland of Georgia. The first stop is the Ananuri architectural complex on the Zhinvali Reservoir. Continue to Uplistsikhe — the "Fortress of the Lord" — one of the oldest urban settlements in Georgia, carved into the sandstone cliffs as early as the 1st millennium BC. Explore its labyrinth of tunnels, pagan temples, and a vast wine cellar. A brief photo-stop in Gori, the birthplace of Stalin. The day concludes in Akhaltsikhe, where the imposing Rabati Castle dominates the skyline — a testament to the region\'s multicultural past.', ru: 'Направляйтесь на запад в сердце Грузии. Первая остановка — архитектурный комплекс Ананури на Жинвальском водохранилище. Далее — Уплисцихе, «Крепость Господня», высеченная в песчаных скалах в I тысячелетии до н.э. Исследуйте лабиринт туннелей и языческих храмов. Короткая остановка в Гори. День завершается в Ахалцихе с крепостью Рабати.', de: 'Reisen Sie in das Herzland Georgiens. Erster Halt: der Architekturkomplex Ananuri am Schinvili-Stausee. Weiter nach Uplisziche, der „Festung des Herrn", im 1. Jahrtausend v. Chr. in die Felsen gehauen. Erkunden Sie das Labyrinth aus Tunneln und Tempeln. Fotostopp in Gori. Der Tag endet in Achalziche mit der Rabati-Festung.' }, highlights: ['Ananuri architectural complex on Zhinvali Reservoir', 'Uplistsikhe cave town — 1st millennium BC', 'Gori — Stalin Museum photo-stop', 'Rabati Castle — multicultural fortress complex'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Akhaltsikhe Inn', route: { en: 'Tbilisi – Uplistsikhe – Gori – Akhaltsikhe', ru: 'Тбилиси – Уплисцихе – Гори – Ахалцихе', de: 'Tiflis – Uplisziche – Gori – Achalziche' } },
      { day: 7, title: { en: 'Vardzia Cave Complex & Return to Tbilisi', ru: 'Пещерный комплекс Вардзиа и возвращение в Тбилиси', de: 'Höhlenkomplex Wardsia & Rückkehr nach Tiflis' }, description: { en: 'Journey deeper into southern Georgia to explore one of the Caucasus\'s most astonishing monuments. Pause at the 10th-century Khertvisi Fortress. The highlight is Vardzia, a monumental cave city carved into the eroded slopes of Mount Erusheti by Queen Tamar in the 12th century — stretching over 500 metres along the cliff face, once housing up to 50,000 people with over 3,000 rooms across 13 levels. The Church of the Dormition, with remarkably preserved frescoes depicting Queen Tamar, is a masterpiece of medieval Georgian art. After visiting the Poka convent, return to Tbilisi.', ru: 'Отправьтесь глубже в южную Грузию. Остановка у крепости Хертвиси X века. Главное впечатление — Вардзиа, монументальный пещерный город XII века царицы Тамары, простирающийся на 500 м вдоль скалы, вмещавший до 50 000 человек с более чем 3000 помещений на 13 уровнях. Фрески церкви Успения с изображением царицы Тамары — шедевр средневекового грузинского искусства. После монастыря Пока — возвращение в Тбилиси.', de: 'Reisen Sie tiefer in den Süden Georgiens. Halt an der Chertwisi-Festung aus dem 10. Jahrhundert. Das Highlight: Wardsia, eine monumentale Höhlenstadt des 12. Jahrhunderts von Königin Tamar, über 500 m lang, einst 50.000 Menschen beherbergend. Die Fresken der Dormitionskirche sind ein Meisterwerk mittelalterlicher georgischer Kunst. Nach dem Poka-Kloster Rückkehr nach Tiflis.' }, highlights: ['Khertvisi Fortress (10th c.)', 'Vardzia cave complex — 500 m of carved cliffs', 'Church of the Dormition frescoes (Queen Tamar)', 'Poka convent'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Mercure Tbilisi Old Town', route: { en: 'Akhaltsikhe – Vardzia – Poka – Tbilisi', ru: 'Ахалцихе – Вардзиа – Пока – Тбилиси', de: 'Achalziche – Wardsia – Poka – Tiflis' } },
      { day: 8, title: { en: 'Border Crossing — Haghpat & Dilijan', ru: 'Пересечение границы — Ахпат и Дилижан', de: 'Grenzüberquerung — Haghpat & Dilidschan' }, description: { en: 'Bid farewell to Georgia as you cross the border at Sadakhlo into Armenia. Your first Armenian treasure awaits: the UNESCO-listed Haghpat Monastery, a 10th-century monastic complex perched on a hillside overlooking the Debed River gorge. Founded by Queen Khosrovanuysh, Haghpat was a major centre of learning and manuscript illumination. Continue to Dilijan, often called the "Armenian Switzerland" for its lush alpine forests and charming 19th-century Sharambeyan Street lined with artisan workshops.', ru: 'Попрощайтесь с Грузией при переходе границы в Садахло. Первая армянская ценность — монастырь Ахпат из списка ЮНЕСКО, монашеский комплекс X века на склоне холма над ущельем реки Дебед. Ахпат был крупным центром учёности и книжной миниатюры. Продолжите в Дилижан, «Армянскую Швейцарию», с пышными альпийскими лесами и очаровательной улицей Шарамбеян.', de: 'Verabschieden Sie sich von Georgien an der Grenze Sadakhlo und überqueren Sie nach Armenien. Ihr erster armenischer Schatz: das UNESCO-Kloster Haghpat, ein Klosterkomplex des 10. Jahrhunderts über der Debed-Schlucht. Weiter nach Dilidschan, der „Armenischen Schweiz", mit üppigen Alpenwäldern und der charmanten Scharambejan-Straße.' }, highlights: ['Border crossing at Sadakhlo', 'Haghpat Monastery — UNESCO World Heritage Site', 'Dilijan — "Armenian Switzerland"', 'Sharambeyan Street artisan quarter'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Dilijazz Hotel', route: { en: 'Sadakhlo Border – Haghpat – Dilijan', ru: 'Граница Садахло – Ахпат – Дилижан', de: 'Grenzübergang Sadakhlo – Haghpat – Dilidschan' } },
      { day: 9, title: { en: 'Dilijan National Park — Goshavank & Haghartsin', ru: 'Национальный парк Дилижан — Гошаванк и Ахарцин', de: 'Dilidschan-Nationalpark — Goschawank & Chaghazdin' }, description: { en: 'Hike through Dilijan National Park to the serene Gosh Lake, then visit the 12th-century Goshavank Monastery, renowned for its intricate khachkars. Continue to Haghartsin Monastery, hidden in the lush forests, and enjoy a hands-on Tolma-making masterclass — learn to prepare one of Armenia\'s most beloved traditional dishes from a local chef.', ru: 'Трекинг через национальный парк Дилижан к безмятежному озеру Гош, затем монастырь Гошаванк XII века, знаменитый своими хачкарами. Продолжите к монастырю Ахарцин в пышных лесах и насладитесь мастер-классом по приготовлению толмы — одного из любимых армянских блюд.', de: 'Wanderung durch den Dilidschan-Nationalpark zum friedlichen Gosch-See, dann Besuch des Goschawank-Klosters aus dem 12. Jahrhundert. Weiter zum Chaghazdin-Kloster in den üppigen Wäldern und ein Tolma-Kochkurs — lernen Sie eines der beliebtesten armenischen Gerichte zuzubereiten.' }, highlights: ['Gosh Lake hike', 'Goshavank 12th c. monastery', 'Haghartsin Monastery', 'Tolma-making masterclass'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Dilijazz Hotel', route: { en: 'Dilijan – Gosh Lake – Goshavank – Haghartsin – Dilijan', ru: 'Дилижан – Озеро Гош – Гошаванк – Ахарцин – Дилижан', de: 'Dilidschan – Gosch-See – Goschawank – Chaghazdin – Dilidschan' } },
      { day: 10, title: { en: 'Lake Sevan, Geghard & Garni Temple', ru: 'Озеро Севан, Гегард и храм Гарни', de: 'Sewansee, Geghard & Garni-Tempel' }, description: { en: 'Start the day at the majestic Lake Sevan — the "Blue Pearl" of Armenia — with an optional boat ride. Visit the UNESCO-listed Geghard Monastery, partially carved into the mountainside where sacred springs flow. At the only surviving pagan temple in the former Soviet Union — the magnificent Garni Temple — enjoy a Lavash-making masterclass, learning the ancient art of baking Armenia\'s iconic flatbread in a traditional tondir oven.', ru: 'Начните день у величественного озера Севан — «Жемчужины Армении» — с катанием на лодке. Посетите монастырь Гегард из списка ЮНЕСКО, частично высеченный в скале. У единственного сохранившегося языческого храма на территории бывшего СССР — великолепного храма Гарни — насладитесь мастер-классом по приготовлению лаваша в традиционном тондыре.', de: 'Beginnen Sie den Tag am majestätischen Sewansee — der „Blauen Perle" Armeniens — mit einer Bootsfahrt. Besuchen Sie das UNESCO-Kloster Geghard, teilweise in den Berg gehauen. Am einzigen erhaltenen heidnischen Tempel der ehemaligen Sowjetunion — dem Garni-Tempel — genießen Sie einen Lavash-Kochkurs im traditionellen Tondir-Ofen.' }, highlights: ['Lake Sevan boat ride', 'Geghard Monastery — UNESCO World Heritage Site', 'Garni pagan Temple', 'Lavash-making masterclass'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Hotel Yerevan', route: { en: 'Dilijan – Lake Sevan – Geghard – Garni – Yerevan', ru: 'Дилижан – Севан – Гегард – Гарни – Ереван', de: 'Dilidschan – Sewansee – Geghard – Garni – Eriwan' } },
      { day: 11, title: { en: 'Yerevan City Tour & ARARAT Brandy', ru: 'Обзорная экскурсия по Еревану и коньяк АРАРАТ', de: 'Eriwan-Stadtrundfahrt & ARARAT-Weinbrand' }, description: { en: 'Discover Armenia\'s vibrant capital: visit the Tsitsernakaberd Genocide Memorial, taste world-renowned brandy at the ARARAT Brandy Factory, explore Republic Square and the Cascade Complex with its sweeping city views. The evening culminates in a Welcome Dinner featuring live Armenian folk music and traditional dances — a celebration of the culture you\'ve been immersed in.', ru: 'Откройте для себя яркую столицу Армении: мемориал Цицернакаберд, дегустация всемирно известного коньяка на заводе АРАРАТ, площадь Республики и Каскад. Вечер завершится приветственным ужином с живой армянской народной музыкой и традиционными танцами — праздником культуры.', de: 'Entdecken Sie Armeniens lebendige Hauptstadt: Besuch des Völkermord-Mahnmals Zizernakaberd, Verkostung des weltberühmten Weinbrands in der ARARAT-Fabrik, Republikplatz und Kaskadenkomplex. Der Abend gipfelt in einem Willkommensessen mit armenischer Volksmusik und traditionellen Tänzen.' }, highlights: ['Tsitsernakaberd Genocide Memorial', 'ARARAT brandy factory tasting', 'Republic Square & Cascade Complex', 'Welcome dinner with folk music & dance'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Hotel Yerevan', route: { en: 'Yerevan', ru: 'Ереван', de: 'Eriwan' } },
      { day: 12, title: { en: 'Khor Virap, Noravank, Areni & Jermuk', ru: 'Хор Вирап, Нораванк, Арени и Джермук', de: 'Chor Wirap, Norawank, Areni & Jermuk' }, description: { en: 'Visit the legendary Khor Virap dungeon where Gregory the Illuminator was imprisoned for 13 years, with iconic views of Mount Ararat. Marvel at the stunning red cliffs surrounding Noravank Monastery. Explore the ancient Areni Cave where the world\'s oldest winery (6,100 years old) was discovered, and taste wines at Areni Winery. End the day at Jermuk — a charming spa town famous for its waterfall and mineral waters.', ru: 'Посетите легендарную темницу Хор Вирап, где Григорий Просветитель был заточён на 13 лет, с культовыми видами на Арарат. Восхититесь красными скалами Нораванка. Исследуйте пещеру Арени с древнейшей винодельней (6100 лет) и продегустируйте вина. Завершите день в Джермуке — курортном городе с водопадом и минеральными водами.', de: 'Besuchen Sie das Chor-Wirap-Verlies, wo Gregor der Erleuchter 13 Jahre eingesperrt war, mit ikonischen Ararat-Blicken. Bewundern Sie die roten Klippen von Norawank. Erkunden Sie die Areni-Höhle mit der ältesten Weinkellerei der Welt (6.100 Jahre) und probieren Sie Weine. Tag endet in Jermuk — einem Kurort mit Wasserfall und Mineralwässern.' }, highlights: ['Khor Virap dungeon with Mt Ararat views', 'Noravank Monastery & red cliffs', 'Areni Cave — world\'s oldest winery (6,100 yrs)', 'Areni Winery tasting', 'Jermuk waterfall & spa town'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Jermuk Hotel', route: { en: 'Yerevan – Khor Virap – Noravank – Areni – Jermuk', ru: 'Ереван – Хор Вирап – Нораванк – Арени – Джермук', de: 'Eriwan – Chor Wirap – Norawank – Areni – Jermuk' } },
      { day: 13, title: { en: 'Etchmiadzin & Zvartnots', ru: 'Эчмиадзин и Звартноц', de: 'Etschmiadzin & Swartnoz' }, description: { en: 'Visit Etchmiadzin — the spiritual centre of the Armenian Apostolic Church and the oldest Christian cathedral in the world, originally built in 301-303 AD. Enjoy a memorable lunch at the Machanents House cultural centre, experiencing traditional Armenian hospitality. Explore the majestic ruins of Zvartnots Cathedral, a 7th-century architectural masterpiece and UNESCO World Heritage Site that once rivalled the greatest churches of Christendom.', ru: 'Посетите Эчмиадзин — духовный центр Армянской Апостольской церкви и старейший христианский собор в мире, построенный в 301-303 гг. Насладитесь незабываемым обедом в культурном центре Маханенц. Исследуйте величественные руины собора Звартноц — архитектурного шедевра VII века и объекта ЮНЕСКО.', de: 'Besuchen Sie Etschmiadzin — das spirituelle Zentrum der Armenischen Apostolischen Kirche und die älteste christliche Kathedrale der Welt, erbaut 301-303 n. Chr. Genießen Sie ein unvergessliches Mittagessen im Machanents-Kulturzentrum. Erkunden Sie die majestätischen Ruinen der Swartnoz-Kathedrale, einem architektonischen Meisterwerk des 7. Jahrhunderts und UNESCO-Weltkulturerbe.' }, highlights: ['Etchmiadzin Cathedral — oldest Christian church', 'Machanents House traditional lunch', 'Zvartnots Cathedral — UNESCO site'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Hotel Yerevan', route: { en: 'Jermuk – Etchmiadzin – Zvartnots – Yerevan', ru: 'Джермук – Эчмиадзин – Звартноц – Ереван', de: 'Jermuk – Etschmiadzin – Swartnoz – Eriwan' } },
      { day: 14, title: { en: 'Departure', ru: 'Отбытие', de: 'Abreise' }, description: { en: 'After breakfast, transfer to Zvartnots International Airport for your departure flight. As you leave, carry with you the memories of ancient monasteries carved into mountains, the taste of wines older than recorded history, and the warmth of Caucasian hospitality — until next time.', ru: 'После завтрака — трансфер в международный аэропорт Звартноц к вашему вылету. Увозите с собой воспоминания о древних монастырях, вкус вин старше письменной истории и тепло кавказского гостеприимства — до новой встречи.', de: 'Nach dem Frühstück Transfer zum Flughafen Swartnoz für Ihren Abflug. Nehmen Sie die Erinnerungen an alte Felsenklöster, den Geschmack von Weinen, die älter sind als die Geschichte, und die Wärme kaukasischer Gastfreundschaft mit — bis zum nächsten Mal.' }, highlights: ['Private airport transfer'], meals: ['Breakfast'], accommodation: undefined, route: { en: 'Yerevan – Zvartnots Airport', ru: 'Ереван – Аэропорт Звартноц', de: 'Eriwan – Flughafen Swartnoz' } },
    ],
    priceTiers: [
      { pax: 2, superior: 4200, standard: 3600 },
      { pax: 3, superior: 3500, standard: 2900 },
      { pax: 4, superior: 3100, standard: 2500 },
      { pax: 5, superior: 2800, standard: 2200 },
      { pax: 6, superior: 2500, standard: 1900 },
      { pax: 7, superior: 2200, standard: 1700 },
    ],
    singleSupplementSuperior: 650,
    singleSupplementStandard: 450,
  },

  // 102. Reise durch Armenien: Kultur, Küche & Begegnungen (Luxury)
  {
    id: 102,
    slug: 'reise-durch-armenien-kultur-kuche-begegnungen',
    name: {
      en: 'Journey Through Armenia: Culture, Cuisine & Encounters',
      ru: 'Путешествие по Армении: Культура, кухня и встречи',
      de: 'Reise durch Armenien: Kultur, Küche & Begegnungen',
    },
    description: {
      en: 'A 10-day luxury tour through Armenia exploring ancient monasteries, culinary traditions, and cultural encounters. From Yerevan to the mountains of Dimats, experience masterclasses in Armenian cuisine, wine tastings, and the warm hospitality of local families.',
      ru: '10-дневный люкс-тур по Армении: древние монастыри, кулинарные традиции и культурные встречи. От Еревана до гор Димац — мастер-классы армянской кухни, дегустации вин и гостеприимство местных семей.',
      de: 'Eine 10-tägige Luxusreise durch Armenien mit antiken Klöstern, kulinarischen Traditionen und kulturellen Begegnungen. Von Eriwan bis zum Dimats-Berg — Kochkurse der armenischen Küche, Weinverkostungen und die Gastfreundschaft einheimischer Familien.',
    },
    shortDescription: {
      en: '10 days of Armenian culture, cuisine & encounters — from Yerevan to mountain peaks.',
      ru: '10 дней армянской культуры, кухни и встреч — от Еревана до горных вершин.',
      de: '10 Tage armenische Kultur, Küche & Begegnungen — von Eriwan bis zu den Berggipfeln.',
    },
    image: 'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
    images: [
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/674ae25564851-khorvirap4.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/tour/images/680b7b5875053-noravank1.webp',
      'https://d23etkghwwc7sj.cloudfront.net/uploads/sightseeing/images/68904f008900f-tatev1.png',
    ],
    duration: '10 days',
    startTime: '09:00',
    endTime: '18:00',
    startEndPoint: 'Yerevan',
    language: ['German'],
    priceEUR: 2980,
    priceForeignEUR: 2980,
    category: 'Luxury',
    region: 'Multiple',
    route: [
      { name: 'Day 1: Arrival – Yerevan City Tour', description: 'Airport pickup, Tsitsernakaberd Genocide memorial, ARARAT brandy factory, Republic Square, Cascade, Welcome dinner with folk music' },
      { name: 'Day 2: Khor Virap – Noravank – Areni – Goris', description: 'Khor Virap dungeon, Mt Ararat views, Noravank, Areni Cave, Areni Winery tasting, Lunch at Matevosyan House, Overnight Goris' },
      { name: 'Day 3: Wings of Tatev – Carahunge – Goris City', description: 'Wings of Tatev ropeway, Tatev Monastery, Devil\'s Bridge, Carahunge "Armenian Stonehenge", Goris city walk' },
      { name: 'Day 4: Khndzoresk – Jermuk', description: 'Khndzoresk swinging bridge, Jermuk spa town, Jermuk waterfall, city walk' },
      { name: 'Day 5: Shatin – Selim Pass – Dilijan', description: 'Shatin Bezoar goat observation, Orbelian caravanserai, Mikayelyan family farm, Tsaghkunq Chef House fish grill masterclass, Dilijan' },
      { name: 'Day 6: Dimats Mountain – Dilijan', description: 'Off-road to Mt Dimats 2378m, Ijevan mountain range views, Haghartsin Monastery, free time Dilijan' },
      { name: 'Day 7: Sevan Lake – Garni – Geghard', description: 'Lake Sevan, optional boat ride, Geghard UNESCO, Lavash masterclass, Garni pagan temple, Dinner in Yerevan' },
      { name: 'Day 8: Amberd Fortress – Byurakan', description: 'Aragats mountain, Amberd fortress hike 3-4h, Sujukh masterclass, Byurakan Observatory 1-m Schmidt telescope, Dinner in Byurakan' },
      { name: 'Day 9: Etchmiadzin – Zvartnots', description: 'Etchmiadzin oldest Christian church, Machanents House lunch, Zvartnots Cathedral' },
      { name: 'Day 10: Departure', description: 'Transfer to airport and departure' },
    ],
    included: ['Airport transfers (arrival and departure)', 'Transportation throughout the tour', 'Professional German-speaking guide for the entire duration', 'All entrance fees as per itinerary', 'Welcome dinner with Armenian folk music (Day 1)', 'Wine tasting at Areni Winery (Day 2)', 'Cheese tasting in Noratus', 'Brandy tasting at ARARAT Brandy Factory (Day 1)', 'Fish BBQ masterclass at Tsaghkunk Chef House (Day 5)', 'Offroad adventure to Mount Dimats (Day 6)', 'Lavash-making masterclass in Garni (Day 7)', 'Bezoar goat observation at Shatin (Day 5)', 'Sujukh-making masterclass at Chir\'s House (Day 8)', 'Boat ride on Lake Sevan (Day 7)', 'Accommodation in Double rooms as specified', 'Full board (all meals throughout the tour)', 'Bottled water throughout the tour'],
    excluded: ['International flight tickets', 'Visa fees (if applicable)', 'Single room supplement (€450 / €300)', 'Additional fees not mentioned in the itinerary', 'Personal expenses and gratuities'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    bestPeriod: 'May - October',
    groupSize: '2-12 people',
    featured: true,
    streetViewUrl: '',
    streetViewLocations: [],
    luxuryItinerary: [
      { day: 1, title: { en: 'Arrival & Yerevan City Tour', ru: 'Прибытие и обзорная экскурсия по Еревану', de: 'Ankunft & Stadtrundfahrt Eriwan' }, description: { en: 'Arrive at Zvartnots International Airport, where your guide and driver will be waiting to welcome you to Armenia. Transfer to your hotel, then set out to discover the Armenian capital. Begin at Tsitsernakaberd, the solemn Armenian Genocide Memorial. Continue to the ARARAT Brandy Factory for a tour and tasting. Stroll through Republic Square and explore the Cascade Complex. The evening culminates in a welcome dinner accompanied by live Armenian folk music.', ru: 'Прибытие в аэропорт Звартноц, где вас встретят гид и водитель. Трансфер в отель, затем — знакомство с армянской столицей. Начало — Цицернакаберд, пронзительный Мемориал геноцида армян. Продолжение — коньячный завод ARARAT с экскурсией и дегустацией. Прогулка по площади Республики и комплексу Каскад. Вечер завершается приветственным ужином под живую армянскую народную музыку.', de: 'Ankunft am Flughafen Swartnoz, wo Ihr Guide und Fahrer Sie in Armenien willkommen heißen. Transfer zum Hotel, dann entdecken Sie die armenische Hauptstadt. Beginn am Zizernakaberd, der feierlichen Gedenkstätte des Völkermords. Weiter zur ARARAT-Brandy-Fabrik für Führung und Verkostung. Schlendern Sie über den Republikplatz und erkunden Sie die Kaskade. Der Abend gipfelt in einem Willkommensabendessen mit armenischer Volksmusik.' }, highlights: ['Airport meet-and-greet with private transfer', 'Tsitsernakaberd Memorial', 'ARARAT Brandy Factory tour & tasting', 'Republic Square — pink tuff architecture', 'Cascade Complex & sculpture garden', 'Welcome dinner with Armenian folk music'], meals: ['Lunch', 'Dinner'], accommodation: 'Yerevan', route: { en: 'Yerevan', ru: 'Ереван', de: 'Eriwan' } },
      { day: 2, title: { en: 'Khor Virap, Noravank & Areni', ru: 'Хор Вирап, Нораванк и Арени', de: 'Chor Wirap, Norawank & Areni' }, description: { en: 'Journey south through the fertile Ararat Plain, with the magnificent silhouette of Mount Ararat as your constant companion. Your first destination is Khor Virap Monastery, the most sacred site in Armenian Christianity — where Gregory the Illuminator was imprisoned for 13 years. Continue through a spectacular red-rock gorge to Noravank Monastery. Visit Areni Cave, where the world\'s oldest winery (6,100 years old) was discovered, and taste wines at a local winery before lunch at Matevosyan House.', ru: 'Путешествие на юг через плодородную Араратскую равнину с величественным силуэтом горы Арарат. Первая остановка — монастырь Хор Вирап, самая священная святыня армянского христианства, где Григорий Просветитель был заточён на 13 лет. Далее через живописное ущелье из красного камня к монастырю Нораванк. Посещение пещеры Арени с древнейшей винодельней (6100 лет) и дегустация вин перед обедом в доме Матеvoсянов.', de: 'Reise nach Süden durch die fruchtbare Ararat-Ebene mit der majestätischen Silhouette des Berges Ararat als ständigen Begleiter. Ihr erstes Ziel ist das Chor-Wirap-Kloster, die heiligste Stätte des armenischen Christentums. Weiter durch eine spektakuläre Rotstein-Schlucht zum Norawank-Kloster. Besuch der Areni-Höhle und Weinverkostung vor dem Mittagessen im Haus Matewosjan.' }, highlights: ['Khor Virap Monastery — underground dungeon & Mt Ararat views', 'Noravank Monastery — crimson cliff setting', 'Areni Cave — 6,000-year-old wine press', 'Areni Winery tasting', 'Lunch at Matevosyan House'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Goris', route: { en: 'Yerevan – Khor Virap – Noravank – Areni – Goris', ru: 'Ереван – Хор Вирап – Нораванк – Арени – Горис', de: 'Eriwan – Chor Wirap – Norawank – Areni – Goris' } },
      { day: 3, title: { en: 'Wings of Tatev & Carahunge', ru: 'Крылья Татева и Караундж', de: 'Flügel von Tatew & Karahundsch' }, description: { en: 'Take the Wings of Tatev, the world\'s longest reversible aerial tramway (5.7 km), which glides above the spectacular Vorotan River gorge. At the far end awaits the Tatev Monastery, a 9th-century fortress-like complex that was once one of Armenia\'s most important scholarly centres. Drive to Carahunge, the "Armenian Stonehenge" — a mysterious arrangement of over 200 basalt stones dating back 7,500 years, possibly one of the oldest astronomical observatories in the world. Return to Goris for a city walk.', ru: 'Прокатитесь на «Крыльях Татева» — самой длинной в мире обратимой канатной дороге (5,7 км), парящей над впечатляющим ущельем реки Воротан. На другом конце — монастырь Татев, комплекс IX века, похожий на крепость и бывший одним из важнейших научных центров Армении. Поездка к Караунджу — «армянскому Стоунхенджу», таинственному сооружению из более чем 200 базальтовых камней возрастом 7500 лет. Возвращение в Горис на прогулку по городу.', de: 'Nehmen Sie die Flügel von Tatew, die längste reversible Seilbahn der Welt (5,7 km), die über die spektakuläre Vorotan-Schlucht gleitet. Am anderen Ende erwartet Sie das Tatew-Kloster, eine festungsähnliche Anlage des 9. Jahrhunderts. Fahrt nach Karahundsch, dem „armenischen Stonehenge" — eine mysteriöse Anordnung von über 200 Basaltsteinen, die 7.500 Jahre alt sind. Rückkehr nach Goris für einen Stadtrundgang.' }, highlights: ['Wings of Tatev — world\'s longest cable car (5.7 km)', 'Tatev Monastery — 9th-century scholarly centre', 'Carahunge — "Armenian Stonehenge" (7,500 years old)', 'Goris city walk'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Goris', route: { en: 'Goris – Tatev – Carahunge – Goris', ru: 'Горис – Татев – Караундж – Горис', de: 'Goris – Tatew – Karahundsch – Goris' } },
      { day: 4, title: { en: 'Khndzoresk & Jermuk Spa Town', ru: 'Хндзореск и курорт Джермук', de: 'Chndsoresk & Kurort Dschermuk' }, description: { en: 'Begin at Khndzoresk, a vast network of cave dwellings carved into the hillside, accessible via a 160-metre swinging suspension bridge that offers thrilling views of the gorge below. Continue to Jermuk, Armenia\'s premier spa town, famous for its mineral springs and the spectacular 68-metre Jermuk Waterfall. Take a city walk and visit the mineral water gallery to taste the different varieties of Jermuk\'s renowned mineral waters.', ru: 'Начните с Хндзореска — обширной сети пещерных жилищ, высеченных в склоне холма, доступных через 160-метровый подвесной мост с захватывающими видами на ущелье. Продолжите в Джермук — главный курорт Армении, знаменитый минеральными источниками и великолепным 68-метровым водопадом. Прогулка по городу и визит в галерею минеральных вод.', de: 'Beginnen Sie in Chndsoresk, einem weitläufigen Netz von Höhlenwohnungen, die über eine 160 Meter lange Hängebrücke erreichbar sind. Weiter nach Dschermuk, dem führenden Kurort Armeniens, bekannt für seine Mineralquellen und den spektakulären 68 Meter hohen Dschermuk-Wasserfall. Stadtrundgang und Besuch der Mineralwassergalerie.' }, highlights: ['Khndzoresk cave village & swinging bridge (160 m)', 'Jermuk spa town — mineral springs', 'Jermuk Waterfall — 68-metre cascade', 'Jermuk city walk & mineral water gallery'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Jermuk', route: { en: 'Goris – Khndzoresk – Jermuk', ru: 'Горис – Хндзореск – Джермук', de: 'Goris – Chndsoresk – Dschermuk' } },
      { day: 5, title: { en: 'Selim Pass, Farm Visit & Fish BBQ Masterclass', ru: 'Селимский перевал, визит на ферму и мастер-класс BBQ из рыбы', de: 'Selim-Pass, Hofbesuch & Fisch-BBQ-Kochkurs' }, description: { en: 'Stop at the Shatin Bezoar Goat Observation Point to spot the rare Bezoar ibex in its natural habitat. Continue over the Selim Pass to the Orbelian Caravanserai (1332), a beautifully preserved Silk Road inn. Visit the Mikayelyan family farm for an authentic encounter with Armenian rural life, then enjoy a fish BBQ masterclass at Tsaghkunk Chef House — learning to grill fish the Armenian way with local herbs and spices.', ru: 'Остановка на смотровой площадке безоаровых козлов в Шатине, чтобы увидеть редкого безоарового козла в его естественной среде. Пересечение Селимского перевала и посещение караван-сарая Орбелянов (1332) — прекрасно сохранившегося постоялого двора Шёлкового пути. Визит на семейную ферму Микаелянов для аутентичного знакомства с армянской сельской жизнью, затем мастер-класс по приготовлению рыбы на гриле в доме шеф-повара Цагкунк.', de: 'Halt am Bezoar-Ziegen-Beobachtungspunkt in Schatin, um die seltene Bezoar-Steinbockziege zu erspähen. Weiter über den Selim-Pass zum Orbelian-Karawanserei (1332), einem schön erhaltenen Seidenstraße-Gasthof. Besuch der Mikajelan-Familienfarm für authentische Einblicke, dann ein Fisch-BBQ-Kochkurs im Tsaghkunk-Chef-Haus.' }, highlights: ['Shatin Bezoar goat observation point', 'Orbelian Caravanserai (1332) — Silk Road relic', 'Mikayelyan family farm visit', 'Fish BBQ masterclass at Tsaghkunk Chef House'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Dilijan', route: { en: 'Jermuk – Shatin – Selim Pass – Dilijan', ru: 'Джермук – Шатин – Селимский перевал – Дилижан', de: 'Dschermuk – Schatin – Selim-Pass – Dilidschan' } },
      { day: 6, title: { en: 'Mount Dimats Offroad Adventure', ru: 'Внедорожное приключение на гору Димац', de: 'Offroad-Abenteuer Berg Dimaz' }, description: { en: 'An exhilarating offroad adventure as 4x4 vehicles take you up Mount Dimats, reaching 2,378 metres with breathtaking panoramic views of the Ijevan mountain range. Enjoy a picnic at the summit amid alpine meadows before descending to visit the Haghartsin Monastery, a 13th-century complex nestled in a forested valley — one of the most serene and beautiful monastic sites in Armenia.', ru: 'Захватывающее внедорожное приключение: автомобили 4x4 поднимут вас на гору Димац на высоту 2378 метров с захватывающими панорамными видами на Иджеванский хребет. Пикник на вершине среди альпийских лугов перед спуском к монастырю Ахарцин — комплексу XIII века в лесистой долине, одному из самых безмятежных и красивых монашеских мест Армении.', de: 'Ein atemberaubendes Offroad-Abenteuer: 4x4-Fahrzeuge bringen Sie auf den Berg Dimaz bis 2.378 Meter mit Panoramablick auf das Idschewan-Gebirge. Picknick auf dem Gipfel auf Almwiesen, bevor Sie zum Haghartsin-Kloster hinabsteigen, einem Komplex des 13. Jahrhunderts in einem bewaldeten Tal.' }, highlights: ['Offroad adventure to Mount Dimats (2,378 m)', 'Ijevan mountain range panoramic views', 'Alpine meadow picnic', 'Haghartsin Monastery — forest sanctuary'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Dilijan', route: { en: 'Dilijan – Mount Dimats – Haghartsin – Dilijan', ru: 'Дилижан – Гора Димац – Ахарцин – Дилижан', de: 'Dilidschan – Berg Dimaz – Haghartsin – Dilidschan' } },
      { day: 7, title: { en: 'Lake Sevan, Garni & Geghard', ru: 'Озеро Севан, Гарни и Гегард', de: 'Sewan-See, Garni & Geghard' }, description: { en: 'Drive to Lake Sevan, the "Jewel of Armenia" — one of the world\'s largest high-altitude freshwater lakes. A boat ride offers breathtaking views of the surrounding mountains. Visit the Geghard Monastery, a UNESCO World Heritage Site partly carved out of the adjacent mountain, where sacred springs flow. In the village of Garni, participate in a Lavash-making masterclass and visit the 1st-century pagan temple — the only surviving Hellenistic temple in the former Soviet Union. Return to Yerevan.', ru: 'Поездка к озеру Севан — «Жемчужине Армении», одному из крупнейших высокогорных пресноводных озёр мира. Катание на лодке открывает захватывающие виды. Посещение монастыря Гегард, объекта Всемирного наследия ЮНЕСКО, частично высеченного в скале, где текут священные источники. В деревне Гарни — мастер-класс по выпечке лаваша и посещение языческого храма I века — единственного сохранившегося эллинистического храма на территории бывшего СССР. Возвращение в Ереван.', de: 'Fahrt zum Sewan-See, dem „Juwel Armeniens", einem der größten hochgelegenen Süßwasserseen der Welt. Eine Bootsfahrt bietet atemberaubende Ausblicke. Besuch des Geghard-Klosters, eines UNESCO-Weltkulturerbes, teilweise in den Berg gehauen. In Garni nehmen Sie an einem Lawasch-Kochkurs teil und besuchen den heidnischen Tempel aus dem 1. Jahrhundert. Rückkehr nach Eriwan.' }, highlights: ['Lake Sevan — "Jewel of Armenia"', 'Boat ride on Lake Sevan', 'Geghard Monastery — UNESCO World Heritage Site', 'Lavash-making masterclass in Garni', 'Garni pagan temple — 1st century AD'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Yerevan', route: { en: 'Dilijan – Sevan Lake – Garni – Geghard – Yerevan', ru: 'Дилижан – Севан – Гарни – Гегард – Ереван', de: 'Dilidschan – Sewan-See – Garni – Geghard – Eriwan' } },
      { day: 8, title: { en: 'Amberd Fortress & Byurakan Observatory', ru: 'Крепость Амберд и Бюраканская обсерватория', de: 'Festung Amberd & Bjurakan-Observatorium' }, description: { en: 'A day of elevation. Drive to Mount Aragats for a hike to Amberd Fortress, perched at 2,300 metres — the "fortress in the clouds," a 7th-century stronghold built by the Kamsarakan princes. Participate in a Sujukh-making masterclass at Chir\'s House, learning the art of preparing this traditional Armenian sweet. In the evening, visit the Byurakan Observatory, one of the world\'s premier astronomical research centres, and gaze through the 1-metre Schmidt telescope before dinner under the stars.', ru: 'День высоты. Поездка на гору Арагац для похода к крепости Амберд на высоте 2300 м — «крепость в облаках», укрепление VII века, построенное князьями Камаракан. Мастер-класс по приготовлению суджука в доме Чира — искусство создания традиционной армянской сладости. Вечером — посещение Бюраканской обсерватории, одного из ведущих астрономических исследовательских центров мира, и наблюдение через 1-метровый телескоп Шмидта перед ужином под звёздами.', de: 'Ein Tag der Höhe. Fahrt zum Berg Aragaz für eine Wanderung zur Festung Amberd auf 2.300 Metern — „Festung in den Wolken", eine Festung des 7. Jahrhunderts. Teilnahme an einem Sudschnukh-Kochkurs im Haus von Tschir. Am Abend Besuch des Bjurakan-Observatoriums, eines der führenden astronomischen Forschungszentren der Welt, und Blick durch das 1-m-Schmidt-Teleskop vor dem Abendessen unter den Sternen.' }, highlights: ['Hike to Amberd Fortress on Mt Aragats (3–4 hours)', 'Amberd — "Fortress in the Clouds" (7th c.)', 'Sujukh-making masterclass at Chir\'s House', 'Byurakan Observatory — 1-m Schmidt telescope', 'Dinner under the stars in Byurakan'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Yerevan', route: { en: 'Yerevan – Amberd – Byurakan – Yerevan', ru: 'Ереван – Амберд – Бюракан – Ереван', de: 'Eriwan – Amberd – Bjurakan – Eriwan' } },
      { day: 9, title: { en: 'Etchmiadzin & Zvartnots', ru: 'Эчмиадзин и Звартноц', de: 'Etschmiadzin & Swartnoz' }, description: { en: 'Visit the spiritual heart of Armenia at Etchmiadzin — the oldest state-built Christian cathedral in the world, originally constructed in 301–303 AD. The treasury houses the Holy Lance and a fragment of Noah\'s Ark. Enjoy a memorable lunch at Machanents House cultural centre, experiencing traditional Armenian hospitality. Conclude at Zvartnots Cathedral, a 7th-century architectural marvel and UNESCO World Heritage Site — a circular masterpiece that once rivalled the greatest churches of Christendom.', ru: 'Посетите духовное сердце Армении — Эчмиадзин, старейший в мире христианский кафедральный собор, построенный в 301–303 гг. Сокровищница хранит Святое Копьё и фрагмент Ноева Ковчега. Насладитесь незабываемым обедом в культурном центре Мачаненц. Завершение у собора Звартноц — архитектурного чуда VII века и объекта Всемирного наследия ЮНЕСКО — кругового шедевра, соперничавшего с величайшими храмами христианского мира.', de: 'Besuchen Sie das spirituelle Herz Armeniens in Etschmiadzin, der ältesten staatlich erbauten christlichen Kathedrale der Welt (301–303 n. Chr.). Die Schatzkammer birgt die Heilige Lanze und ein Fragment der Arche Noah. Genießen Sie das Mittagessen im Machanents-Kulturzentrum. Abschluss mit der Swartnoz-Kathedrale, einem architektonischen Wunder des 7. Jahrhunderts und UNESCO-Weltkulturerbe.' }, highlights: ['Etchmiadzin Cathedral — oldest Christian cathedral (301–303 AD)', 'Treasury with Holy Lance & Noah\'s Ark fragment', 'Lunch at Machanents House', 'Zvartnots Cathedral — 7th-century circular masterpiece'], meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Yerevan', route: { en: 'Yerevan – Etchmiadzin – Zvartnots – Yerevan', ru: 'Ереван – Эчмиадзин – Звартноц – Ереван', de: 'Eriwan – Etschmiadzin – Swartnoz – Eriwan' } },
      { day: 10, title: { en: 'Departure', ru: 'Отбытие', de: 'Abreise' }, description: { en: 'After breakfast, transfer to Zvartnots International Airport for your departure flight. As you leave Armenia, carry with you the flavours of Lavash and Tolma, the echoes of folk songs, the majesty of Mount Ararat, and the warmth of the people who shared their homeland with you — until we meet again.', ru: 'После завтрака — трансфер в международный аэропорт Звартноц к вашему вылету. Увозите с собой вкус лаваша и толмы, отзвуки народных песен, величие горы Арарат и тепло людей, разделивших с вами свою родину — до новой встречи.', de: 'Nach dem Frühstück Transfer zum Flughafen Swartnoz für Ihren Abflug. Nehmen Sie die Aromen von Lawasch und Tolma mit, das Echo von Volksliedern, die Majestät des Berges Ararat und die Wärme der Menschen, die ihre Heimat mit Ihnen geteilt haben — bis wir uns wiedersehen.' }, highlights: ['Private airport transfer'], meals: ['Breakfast'], accommodation: undefined, route: { en: 'Yerevan – Zvartnots Airport', ru: 'Ереван – Аэропорт Звартноц', de: 'Eriwan – Flughafen Swartnoz' } },
    ],
    priceTiers: [
      { pax: 2, superior: 2800, standard: 2400 },
      { pax: 3, superior: 2300, standard: 1900 },
      { pax: 4, superior: 2000, standard: 1600 },
      { pax: 5, superior: 1800, standard: 1400 },
      { pax: 6, superior: 1600, standard: 1200 },
      { pax: 7, superior: 1400, standard: 1000 },
    ],
    singleSupplementSuperior: 450,
    singleSupplementStandard: 300,
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
