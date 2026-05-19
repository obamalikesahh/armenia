// =============================================================================
// Luxury Tours Data — Extracted from PDF brochures
// Two premium guided tours across the Caucasus region
// =============================================================================

export type LocaleKey = 'en' | 'ru' | 'de'

export interface LuxuryTourDay {
  day: number
  title: string
  route: string
  duration: 'half' | 'full' | 'arrival' | 'departure'
  description: string
  highlights: string[]
  meals: string[]
  accommodation?: string
  image?: string
  included?: string[]
  // Localized fields
  titleLocalized?: { en: string; ru: string; de: string }
  descriptionLocalized?: { en: string; ru: string; de: string }
  highlightsLocalized?: { en: string[]; ru: string[]; de: string[] }
}

export interface LuxuryTourPriceTier {
  pax: number
  price4Star: number // EUR
  price3Star: number // EUR
}

export interface LuxuryTour {
  id: string
  title: string
  subtitle: string
  duration: string
  countries: string[]
  description: string
  days: LuxuryTourDay[]
  pricing: LuxuryTourPriceTier[]
  singleSupplement: { price4Star: number; price3Star: number }
  included: string[]
  excluded: string[]
  paymentPolicy: string[]
  cancellationPolicy: string[]
  images: string[]
  hotels: { category: string; hotels: { city: string; name: string }[] }[]
  // Localized fields
  titleLocalized: { en: string; ru: string; de: string }
  subtitleLocalized: { en: string; ru: string; de: string }
  descriptionLocalized: { en: string; ru: string; de: string }
  includedLocalized?: { en: string[]; ru: string[]; de: string[] }
  excludedLocalized?: { en: string[]; ru: string[]; de: string[] }
  paymentPolicyLocalized?: { en: string[]; ru: string[]; de: string[] }
  cancellationPolicyLocalized?: { en: string[]; ru: string[]; de: string[] }
}

/** Helper: get a localized string, falling back to the default (English) field value */
export function getLocalized(
  localized: { en: string; ru: string; de: string } | undefined,
  locale: LocaleKey,
  fallback: string
): string {
  if (!localized) return fallback
  return localized[locale] || localized.en || fallback
}

/** Helper: get a localized string array, falling back to the default field value */
export function getLocalizedArray(
  localized: { en: string[]; ru: string[]; de: string[] } | undefined,
  locale: LocaleKey,
  fallback: string[]
): string[] {
  if (!localized) return fallback
  return localized[locale] || localized.en || fallback
}

// =============================================================================
// TOUR 1 — Discover Armenia & Georgia: A Journey Through the Caucasus
// =============================================================================

const caucasusTour: LuxuryTour = {
  id: 'luxury-caucasus-14d',
  title: 'Discover Armenia & Georgia: A Journey Through the Caucasus',
  subtitle: 'A 14-day expedition through ancient lands, mountain monasteries, and living traditions',
  duration: '14 Days / 13 Nights',
  countries: ['Georgia', 'Armenia'],
  description:
    'Embark on an unforgettable 14-day journey through the heart of the Caucasus, where the ancient kingdoms of Georgia and Armenia reveal their most treasured secrets. From the cobbled streets of Tbilisi to the alpine heights of Stepantsminda, from the cave cities of Uplistsikhe and Vardzia to the sacred monasteries of Armenia, this tour weaves together breathtaking landscapes, millennia-old Christian heritage, and vibrant living traditions. Savour the flavours of both nations through hands-on culinary masterclasses, taste wines from the world\'s oldest winemaking region, and experience the warmth of Caucasian hospitality in hand-picked hotels. With a German-speaking guide by your side, every church, fortress, and mountain pass becomes a story — and every meal a celebration.',
  titleLocalized: {
    en: 'Discover Armenia & Georgia: A Journey Through the Caucasus',
    de: 'Entdecken Sie Armenien & Georgien: Eine Reise durch den Kaukasus',
    ru: 'Откройте Армению и Грузию: Путешествие по Кавказу',
  },
  subtitleLocalized: {
    en: 'A 14-day expedition through ancient lands, mountain monasteries, and living traditions',
    de: 'Eine 14-tägige Expedition durch antike Länder, Bergklöster und lebendige Traditionen',
    ru: '14-дневная экспедиция по древним землям, горным монастырям и живым традициям',
  },
  descriptionLocalized: {
    en: 'Embark on an unforgettable 14-day journey through the heart of the Caucasus, where the ancient kingdoms of Georgia and Armenia reveal their most treasured secrets. From the cobbled streets of Tbilisi to the alpine heights of Stepantsminda, from the cave cities of Uplistsikhe and Vardzia to the sacred monasteries of Armenia, this tour weaves together breathtaking landscapes, millennia-old Christian heritage, and vibrant living traditions. Savour the flavours of both nations through hands-on culinary masterclasses, taste wines from the world\'s oldest winemaking region, and experience the warmth of Caucasian hospitality in hand-picked hotels. With a German-speaking guide by your side, every church, fortress, and mountain pass becomes a story — and every meal a celebration.',
    de: 'Begeben Sie sich auf eine unvergessliche 14-tägige Reise durch das Herz des Kaukasus, wo die antiken Königreiche Georgiens und Armeniens ihre kostbarsten Geheimnisse offenbaren. Von den kopfsteingepflasterten Straßen Tiflis bis zu den alpinen Höhen von Stepanzminda, von den Höhlenstädten Uplisziche und Wardsia bis zu den heiligen Klöstern Armeniens — diese Tour verwebt atemberaubende Landschaften, jahrtausendealtes christliches Erbe und lebendige Traditionen. Kosten Sie die Aromen beider Nationen bei kulinarischen Meisterkursen, probieren Sie Weine aus der ältesten Weinbauregion der Welt und erleben Sie die Wärme kaukasischer Gastfreundschaft in handverlesenen Hotels. Mit einem deutschsprachigen Guide an Ihrer Seite wird jede Kirche, Festung und jeder Bergpass zu einer Geschichte — und jede Mahlzeit zu einem Fest.',
    ru: 'Отправьтесь в незабываемое 14-дневное путешествие через сердце Кавказа, где древние королевства Грузии и Армении раскрывают свои самые драгоценные тайны. От мощёных улиц Тбилиси до альпийских высот Степанцминды, от пещерных городов Уплисцихе и Вардзи до священных монастырей Армении — этот тур сплетает захватывающие дух пейзажи, тысячелетнее христианское наследие и яркие живые традиции. Попробуйте блюда обеих стран на кулинарных мастер-классах, вкушайте вина из древнейшего винодельческого региона мира и ощутите тепло кавказского гостеприимства в тщательно подобранных отелях. С немецкоговорящим гидом рядом каждая церковь, крепость и горный перевал становятся историей, а каждая трапеза — праздником.',
  },
  days: [
    {
      day: 1,
      title: 'Arrival in Tbilisi',
      route: 'Tbilisi',
      duration: 'arrival',
      description:
        'Welcome to Georgia! Upon arrival at Tbilisi International Airport, you will be greeted by your guide and transferred to your hotel in the heart of the Old Town. Tbilisi — the name derives from the Georgian word for "warm," a reference to the legendary sulphur hot springs that have drawn settlers here since the 5th century — is a city where East genuinely meets West. The evening is yours to rest after your journey, perhaps take a gentle stroll along the Mtkvari River, or simply enjoy the ambiance of this captivating capital from the comfort of your hotel. Tomorrow the adventure begins.',
      highlights: [
        'Airport meet-and-greet with private transfer',
        'First glimpses of Tbilisi\'s Old Town skyline',
      ],
      meals: [],
      accommodation: 'Mercure Tbilisi Old Town',
      image: '/images/luxury/caucasus_day1.jpg',
      included: ['Private airport transfer'],
      titleLocalized: {
        en: 'Arrival in Tbilisi',
        de: 'Ankunft in Tiflis',
        ru: 'Прибытие в Тбилиси',
      },
      descriptionLocalized: {
        en: 'Welcome to Georgia! Upon arrival at Tbilisi International Airport, you will be greeted by your guide and transferred to your hotel in the heart of the Old Town. Tbilisi — the name derives from the Georgian word for "warm," a reference to the legendary sulphur hot springs that have drawn settlers here since the 5th century — is a city where East genuinely meets West. The evening is yours to rest after your journey, perhaps take a gentle stroll along the Mtkvari River, or simply enjoy the ambiance of this captivating capital from the comfort of your hotel. Tomorrow the adventure begins.',
        de: 'Willkommen in Georgien! Bei Ihrer Ankunft am Flughafen Tiflis werden Sie von Ihrem Guide begrüßt und zu Ihrem Hotel im Herzen der Altstadt gebracht. Tiflis — der Name leitet sich vom georgischen Wort für „warm" ab, eine Anspielung auf die legendären Schwefelthermalquellen, die seit dem 5. Jahrhundert Siedler hierher gezogen haben — ist eine Stadt, in der Ost und West echt aufeinandertreffen. Der Abend gehört Ihnen, um sich nach der Reise auszuruhen, vielleicht einen sanften Spaziergang an der Mtkvari zu unternehmen oder einfach die Atmosphäre dieser faszinierenden Hauptstadt vom Hotel aus zu genießen. Morgen beginnt das Abenteuer.',
        ru: 'Добро пожаловать в Грузию! По прибытии в международный аэропорт Тбилиси вас встретит гид и доставит в ваш отель в самом сердце Старого города. Тбилиси — название происходит от грузинского слова «тёплый», что отсылает к легендарным серным горячим источникам, привлекающим сюда поселенцев с V века — это город, где Восток по-настоящему встречается с Западом. Вечер в вашем распоряжении — отдохните после путешествия, совершите неспешную прогулку вдоль реки Мтквари или насладитесь атмосферой этой захватывающей столицы из комфорта вашего отеля. Завтра начинаются приключения.',
      },
      highlightsLocalized: {
        en: ['Airport meet-and-greet with private transfer', 'First glimpses of Tbilisi\'s Old Town skyline'],
        de: ['Begrüßung am Flughafen mit privatem Transfer', 'Erste Blicke auf die Tifliser Altstadtsilhouette'],
        ru: ['Встреча в аэропорту с индивидуальным трансфером', 'Первые впечатления от силуэта Старого города Тбилиси'],
      },
    },
    {
      day: 2,
      title: 'Tbilisi City Tour',
      route: 'Tbilisi',
      duration: 'full',
      description:
        'A full day immersed in the many layers of Tbilisi. Begin on the Metekhi Plateau, where a dramatic equestrian statue of King Vakhtang Gorgasali — the founder of Tbilisi — surveys the river valley below. Cross by cable car to the ancient Narikala Fortress, perched on the clifftop since the 4th century, and take in the panoramic sweep of the Old Town. Descend past the iconic sulphur bathhouses, their domed roofs steaming along the riverbank, and wander through the charming Shardeni Street with its cafés, galleries, and cobblestone atmosphere. Visit the Great Synagogue, the majestic Sioni Cathedral (home to the sacred cross of St. Nino), and Anchiskhati Basilica — the oldest surviving church in Tbilisi, dating to the 6th century. Cross the futuristic Bridge of Peace, a stunning glass-and-steel pedestrian span designed by Italian architect Michele De Lucchi, before concluding the day at the National Museum of Georgia, where treasures from across the centuries tell the story of this resilient nation.',
      highlights: [
        'Metekhi Plateau & King Vakhtang Gorgasali statue',
        'Narikala Fortress with panoramic Old Town views',
        'Sulphur baths district',
        'Shardeni Street — Tbilisi\'s most atmospheric lane',
        'Great Synagogue, Sioni Cathedral & Anchiskhati Basilica',
        'Bridge of Peace',
        'National Museum of Georgia',
      ],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Mercure Tbilisi Old Town',
      image: '/images/luxury/caucasus_day2.jpg',
      titleLocalized: { en: 'Tbilisi City Tour', de: 'Stadtrundfahrt Tiflis', ru: 'Обзорная экскурсия по Тбилиси' },
      descriptionLocalized: {
        en: 'A full day immersed in the many layers of Tbilisi. Begin on the Metekhi Plateau, where a dramatic equestrian statue of King Vakhtang Gorgasali — the founder of Tbilisi — surveys the river valley below. Cross by cable car to the ancient Narikala Fortress, perched on the clifftop since the 4th century, and take in the panoramic sweep of the Old Town. Descend past the iconic sulphur bathhouses, their domed roofs steaming along the riverbank, and wander through the charming Shardeni Street with its cafés, galleries, and cobblestone atmosphere. Visit the Great Synagogue, the majestic Sioni Cathedral (home to the sacred cross of St. Nino), and Anchiskhati Basilica — the oldest surviving church in Tbilisi, dating to the 6th century. Cross the futuristic Bridge of Peace, a stunning glass-and-steel pedestrian span designed by Italian architect Michele De Lucchi, before concluding the day at the National Museum of Georgia, where treasures from across the centuries tell the story of this resilient nation.',
        de: 'Ein ganzer Tag, eingetaucht in die vielen Schichten Tiflis. Beginnen Sie auf dem Metechi-Plateau, wo eine dramatische Reiterstatue von König Wachtang Gorgassali — dem Gründer Tiflis — über das Flusstal hinabblickt. Fahren Sie mit der Seilbahn zur antiken Narikala-Festung, die seit dem 4. Jahrhundert auf dem Felsen thront, und genießen Sie den Panoramablick über die Altstadt. Steigen Sie vorbei an den ikonischen Schwefelbädern, deren Kuppeldächer am Ufer dampfen, und schlendern Sie durch die charmante Schardeni-Straße mit ihren Cafés, Galerien und Kopfsteinpflaster-Atmosphäre. Besuchen Sie die Große Synagoge, die majestätische Sioni-Kathedrale (Heim des heiligen Kreuzes der heiligen Nino) und die Anschischati-Basilika — die älteste erhaltene Kirche Tiflis aus dem 6. Jahrhundert. Überqueren Sie die futuristische Friedensbrücke, eine atemberaubende Glas-und-Stahl-Fußgängerbrücke des italienischen Architekten Michele De Lucchi, bevor Sie den Tag im Nationalmuseum Georgiens abschließen.',
        ru: 'Целый день, погружённый в многогранность Тбилиси. Начните на плато Метехи, где драматичная конная статуя царя Вахтанга Горгасали — основателя Тбилиси — обозревает речную долину внизу. Переправьтесь на канатной дороге в древнюю крепость Нарикала, венчающую скалу с IV века, и насладитесь панорамным обзором Старого города. Спуститесь мимо знаменитых серных бань, купола которых курятся вдоль берега, и прогуляйтесь по очаровательной улице Шардени с её кафе, галереями и атмосферой брусчатки. Посетите Большую синагогу, величественный собор Сиони (где хранится святой крест св. Нино) и базилику Анчисхати — старейшую сохранившуюся церковь Тбилиси, датируемую VI веком. Перейдите по футуристическому Мосту мира, созданному итальянским архитектором Микеле Де Люки, и завершите день в Национальном музее Грузии.',
      },
      highlightsLocalized: {
        en: ['Metekhi Plateau & King Vakhtang Gorgasali statue', 'Narikala Fortress with panoramic Old Town views', 'Sulphur baths district', 'Shardeni Street — Tbilisi\'s most atmospheric lane', 'Great Synagogue, Sioni Cathedral & Anchiskhati Basilica', 'Bridge of Peace', 'National Museum of Georgia'],
        de: ['Metechi-Plateau & König-Wachtang-Gorgassali-Statue', 'Narikala-Festung mit Panoramablick auf die Altstadt', 'Schwefelbäder-Viertel', 'Schardeni-Straße — Tiflis\' atmosphärischste Gasse', 'Große Synagoge, Sioni-Kathedrale & Anschischati-Basilika', 'Friedensbrücke', 'Nationalmuseum Georgiens'],
        ru: ['Плато Метехи и статуя царя Вахтанга Горгасали', 'Крепость Нарикала с панорамой Старого города', 'Район серных бань', 'Улица Шардени — самая атмосферная улица Тбилиси', 'Большая синагога, собор Сиони и базилика Анчисхати', 'Мост мира', 'Национальный музей Грузии'],
      },
    },
    {
      day: 3,
      title: 'Bodbe, Sighnaghi & Tsinandali',
      route: 'Tbilisi – Bodbe – Sighnaghi – Tsinandali – Tbilisi',
      duration: 'full',
      description:
        'Journey east into Georgia\'s celebrated wine region of Kakheti. Your first stop is the Monastery of Bodbe, a serene pilgrimage site set among cypress trees where Saint Nino — the 4th-century evangelist who brought Christianity to Georgia — is buried. A short drive brings you to Sighnaghi, the "City of Love," a beautifully restored hilltop town whose defensive walls and watchtowers offer sweeping views of the Alazani Valley and the snow-capped Caucasus Mountains beyond. Stroll its narrow streets lined with carved wooden balconies and artisan workshops. Continue to the Tsinandali estate, the former residence of the poet and diplomat Alexander Chavchavadze. Here, a guided tour of the beautifully preserved mansion reveals the lifestyle of 19th-century Georgian aristocracy, while the adjacent winery — where wine has been produced since 1886 — offers a tasting of the estate\'s celebrated vintages. Return to Tbilisi in the evening.',
      highlights: [
        'Monastery of Bodbe — tomb of Saint Nino',
        'Sighnaghi — the "City of Love" with Caucasus panoramas',
        'Tsinandali estate — Alexander Chavchavadze museum',
        'Tsinandali winery tour & tasting',
      ],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Mercure Tbilisi Old Town',
      image: '/images/luxury/caucasus_day3.jpg',
      included: ['Wine tasting at Tsinandali'],
      titleLocalized: { en: 'Bodbe, Sighnaghi & Tsinandali', de: 'Bodbe, Sighnaghi & Tsinandali', ru: 'Бодбе, Сигнахи и Цинандали' },
      descriptionLocalized: {
        en: 'Journey east into Georgia\'s celebrated wine region of Kakheti. Your first stop is the Monastery of Bodbe, a serene pilgrimage site set among cypress trees where Saint Nino — the 4th-century evangelist who brought Christianity to Georgia — is buried. A short drive brings you to Sighnaghi, the "City of Love," a beautifully restored hilltop town whose defensive walls and watchtowers offer sweeping views of the Alazani Valley and the snow-capped Caucasus Mountains beyond. Stroll its narrow streets lined with carved wooden balconies and artisan workshops. Continue to the Tsinandali estate, the former residence of the poet and diplomat Alexander Chavchavadze. Here, a guided tour of the beautifully preserved mansion reveals the lifestyle of 19th-century Georgian aristocracy, while the adjacent winery — where wine has been produced since 1886 — offers a tasting of the estate\'s celebrated vintages. Return to Tbilisi in the evening.',
        de: 'Reisen Sie in das berühmte Weinanbaugebiet Kachetien. Ihr erster Halt ist das Bodbe-Kloster, ein friedlicher Wallfahrtsort unter Zypressen, wo die heilige Nino — die Evangelistin des 4. Jahrhunderts, die das Christentum nach Georgien brachte — begraben liegt. Eine kurze Fahrt bringt Sie nach Sighnaghi, der „Stadt der Liebe", eine wunderschön restaurierte Bergstadt, deren Stadtmauern und Wachtürme weite Blicke über das Alazani-Tal und die schneebedeckten Kaukasusberge bieten. Schlendern Sie durch die engen Gassen mit geschnitzten Holzbalkonen und Kunsthandwerksbetrieben. Weiter geht es zum Tsinandali-Anwesen, dem ehemaligen Wohnsitz des Dichters und Diplomaten Alexander Tschawtschawadse. Eine Führung durch das wunderschön erhaltene Herrenhaus offenbart den Lebensstil der georgischen Aristokratie des 19. Jahrhunderts, während die angrenzende Kellerei — in der seit 1886 Wein produziert wird — eine Verkostung der gefeierten Jahrgänge des Gutes anbietet.',
        ru: 'Отправляйтесь на восток в знаменитый винодельческий регион Грузии — Кахетию. Первая остановка — монастырь Бодбе, безмятежное место паломничества среди кипарисов, где похоронена святая Нино — евангелистка IV века, принесшая христианство в Грузию. Короткая поездка приведёт вас в Сигнахи, «Город любви», прекрасно отреставрированный городок на холме, стены и сторожевые башни которого открывают захватывающие виды на Алазанскую долину и заснеженные вершины Кавказа. Прогуляйтесь по узким улочкам с резными деревянными балконами и мастерскими ремесленников. Продолжите в поместье Цинандали — бывшую резиденцию поэта и дипломата Александра Чавчавадзе. Экскурсия по прекрасно сохранившемуся особняку раскроет образ жизни грузинской аристократии XIX века, а соседняя винодельня, где вино производится с 1886 года, предложит дегустацию знаменитых вин поместья.',
      },
      highlightsLocalized: {
        en: ['Monastery of Bodbe — tomb of Saint Nino', 'Sighnaghi — the "City of Love" with Caucasus panoramas', 'Tsinandali estate — Alexander Chavchavadze museum', 'Tsinandali winery tour & tasting'],
        de: ['Bodbe-Kloster — Grab der heiligen Nino', 'Sighnaghi — die „Stadt der Liebe" mit Kaukasus-Panoramen', 'Tsinandali-Anwesen — Alexander-Tschawtschawadse-Museum', 'Tsinandali-Weingut-Führung & Verkostung'],
        ru: ['Монастырь Бодбе — гробница святой Нино', 'Сигнахи — «Город любви» с панорамами Кавказа', 'Поместье Цинандали — музей Александра Чавчавадзе', 'Экскурсия и дегустация на винодельне Цинандали'],
      },
    },
    {
      day: 4,
      title: 'Mtskheta, Kazbegi & Gergeti Trinity Church',
      route: 'Tbilisi – Mtskheta – Kazbegi – Gergeti – Stepantsminda',
      duration: 'full',
      description:
        'Drive north along one of the world\'s most spectacular mountain roads — the Georgian Military Highway — toward the towering peaks of the Greater Caucasus. Begin in Mtskheta, the ancient capital of Georgia and a UNESCO World Heritage Site. Visit the Jvari Monastery, a 6th-century masterpiece perched on a cliff at the confluence of the Mtkvari and Aragvi rivers, its silhouette one of the most iconic in all of Georgia. Continue to Svetitskhoveli Cathedral, the 11th-century spiritual heart of the nation, said to house the robe of Christ and revered as the burial place of Georgian kings. As the road climbs into the mountains, pass through the dramatic Cross Pass at 2,395 metres before arriving at Stepantsminda (Kazbegi). A 4x4 vehicle ascends the steep track to the Gergeti Holy Trinity Church, a 14th-century sanctuary perched at 2,170 metres with the glaciated summit of Mount Kazbegi (5,047 m) rising behind it — one of the most photographed scenes in the entire Caucasus. Overnight in Stepantsminda, where the mountain air is crisp and the stars impossibly bright.',
      highlights: [
        'Jvari Monastery (6th c.) — UNESCO site',
        'Svetitskhoveli Cathedral (11th c.) — Georgia\'s most sacred church',
        'Georgian Military Highway — legendary mountain road',
        'Cross Pass at 2,395 m',
        'Gergeti Holy Trinity Church at 2,170 m',
        'Mount Kazbegi (5,047 m) views',
      ],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Porta Caucasia Stepantsminda',
      image: '/images/luxury/caucasus_day4.jpg',
      included: ['4x4 transport to Gergeti Church'],
      titleLocalized: { en: 'Mtskheta, Kazbegi & Gergeti Trinity Church', de: 'Mzcheta, Kasbegi & Gergeti-Dreifaltigkeitskirche', ru: 'Мцхета, Казбеги и церковь Гергети' },
      descriptionLocalized: {
        en: 'Drive north along one of the world\'s most spectacular mountain roads — the Georgian Military Highway — toward the towering peaks of the Greater Caucasus. Begin in Mtskheta, the ancient capital of Georgia and a UNESCO World Heritage Site. Visit the Jvari Monastery, a 6th-century masterpiece perched on a cliff at the confluence of the Mtkvari and Aragvi rivers, its silhouette one of the most iconic in all of Georgia. Continue to Svetitskhoveli Cathedral, the 11th-century spiritual heart of the nation, said to house the robe of Christ and revered as the burial place of Georgian kings. As the road climbs into the mountains, pass through the dramatic Cross Pass at 2,395 metres before arriving at Stepantsminda (Kazbegi). A 4x4 vehicle ascends the steep track to the Gergeti Holy Trinity Church, a 14th-century sanctuary perched at 2,170 metres with the glaciated summit of Mount Kazbegi (5,047 m) rising behind it — one of the most photographed scenes in the entire Caucasus. Overnight in Stepantsminda, where the mountain air is crisp and the stars impossibly bright.',
        de: 'Fahren Sie nach Norden auf einer der spektakulärsten Bergstraßen der Welt — der Georgischen Heerstraße — zu den aufragenden Gipfeln des Großen Kaukasus. Beginnen Sie in Mzcheta, der antiken Hauptstadt Georgiens und UNESCO-Weltkulturerbe. Besuchen Sie das Dschwari-Kloster, ein Meisterwerk des 6. Jahrhunderts auf einer Klippe über dem Zusammenfluss von Mtkvari und Aragwi. Weiter zur Swetizchoweli-Kathedrale, dem spirituellen Herz der Nation aus dem 11. Jahrhundert. Wenn die Straße in die Berge steigt, durchqueren Sie den dramatischen Kreuzpass auf 2.395 Metern, bevor Sie Stepanzminda (Kasbegi) erreichen. Ein 4x4-Fahrzeug steigt die steile Piste zur Gergeti-Dreifaltigkeitskirche hinauf, einem Heiligtum des 14. Jahrhunderts auf 2.170 Metern mit dem vergletscherten Gipfel des Kasbek (5.047 m) dahinter — eines der meistfotografierten Motive im gesamten Kaukasus.',
        ru: 'Двигайтесь на север по одной из самых впечатляющих горных дорог мира — Военно-Грузинской дороге — к высочайшим вершинам Большого Кавказа. Начните в Мцхете, древней столице Грузии и объекте ЮНЕСКО. Посетите монастырь Джвари, шедевр VI века на скале при слиянии рек Мтквари и Арагви. Продолжите к собору Светицховели, духовному сердцу нации XI века. По мере подъёма в горы вы пересечёте Крестовый перевал на высоте 2395 метров и прибудете в Степанцминду (Казбеги). Автомобиль 4x4 поднимется по крутой тропе к церкви Гергети — святыне XIV века на высоте 2170 метров с ледяной вершиной Казбека (5047 м) на фоне — одной из самых фотографируемых сцен всего Кавказа.',
      },
      highlightsLocalized: {
        en: ['Jvari Monastery (6th c.) — UNESCO site', 'Svetitskhoveli Cathedral (11th c.) — Georgia\'s most sacred church', 'Georgian Military Highway — legendary mountain road', 'Cross Pass at 2,395 m', 'Gergeti Holy Trinity Church at 2,170 m', 'Mount Kazbegi (5,047 m) views'],
        de: ['Dschwari-Kloster (6. Jh.) — UNESCO-Stätte', 'Swetizchoweli-Kathedrale (11. Jh.) — Georgiens heiligste Kirche', 'Georgische Heerstraße — legendäre Bergstraße', 'Kreuzpass auf 2.395 m', 'Gergeti-Dreifaltigkeitskirche auf 2.170 m', 'Blick auf den Kasbek (5.047 m)'],
        ru: ['Монастырь Джвари (VI в.) — объект ЮНЕСКО', 'Собор Светицховели (XI в.) — священнейшая церковь Грузии', 'Военно-Грузинская дорога — легендарная горная трасса', 'Крестовый перевал на высоте 2395 м', 'Церковь Гергети на высоте 2170 м', 'Виды на гору Казбек (5047 м)'],
      },
    },
    {
      day: 5,
      title: 'Juta Village & Chiukhi Mountains Hike',
      route: 'Stepantsminda – Juta – Tbilisi',
      duration: 'full',
      description: 'After breakfast, a 4x4 vehicle takes you off the main road and into the remote Sno Valley, climbing to the village of Juta at 2,150 metres — one of the highest settlements in Georgia. From here, set out on a guided hike toward the dramatic Chiukhi mountain massif, whose jagged peaks reach 3,842 metres. The trail meanders through alpine meadows carpeted with wildflowers in summer, alongside crystal-clear streams, with ever-more-imposing views of the Caucasus ridgeline unfolding at every turn. A picnic lunch is served amid this extraordinary mountain scenery — a moment of pure serenity far from any crowd. After the hike, drive back to Tbilisi for a well-earned evening at leisure.',
      highlights: ['4x4 drive through Sno Valley to Juta village (2,150 m)', 'Guided hike toward Chiukhi mountains (3,842 m)', 'Alpine meadows & wildflower landscapes', 'Scenic picnic lunch in the mountains'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Mercure Tbilisi Old Town',
      image: '/images/luxury/caucasus_day5.jpg',
      included: ['4x4 transport to Juta', 'Picnic lunch'],
      titleLocalized: { en: 'Juta Village & Chiukhi Mountains Hike', de: 'Dorf Juta & Tschjuchi-Bergwanderung', ru: 'Деревня Джута и поход к горам Чиухи' },
      descriptionLocalized: {
        en: 'After breakfast, a 4x4 vehicle takes you off the main road and into the remote Sno Valley, climbing to the village of Juta at 2,150 metres — one of the highest settlements in Georgia. From here, set out on a guided hike toward the dramatic Chiukhi mountain massif, whose jagged peaks reach 3,842 metres. The trail meanders through alpine meadows carpeted with wildflowers in summer, alongside crystal-clear streams, with ever-more-imposing views of the Caucasus ridgeline unfolding at every turn. A picnic lunch is served amid this extraordinary mountain scenery — a moment of pure serenity far from any crowd. After the hike, drive back to Tbilisi for a well-earned evening at leisure.',
        de: 'Nach dem Frühstück bringt Sie ein 4x4-Fahrzeug von der Hauptstraße ab in das abgelegene Sno-Tal, hinauf zum Dorf Juta auf 2.150 Metern — einer der höchstgelegenen Siedlungen Georgiens. Von hier aus starten Sie eine geführte Wanderung zum dramatischen Tschjuchi-Bergmassiv, dessen zerklüftete Gipfel 3.842 Meter erreichen. Der Weg schlängelt sich durch Almwiesen, die im Sommer von Wildblumen übersät sind, entlang kristallklarer Bäche. Ein Picknick-Mittagessen wird in dieser außerordentlichen Berglandschaft serviert — ein Moment purer Ruhe fernab jeder Menschenmenge. Nach der Wanderung Fahrt zurück nach Tiflis.',
        ru: 'После завтрака автомобиль 4x4 доставит вас с основной дороги в удалённую долину Сно, поднимаясь к деревне Джута на высоте 2150 м — одному из самых высокогорных поселений Грузии. Отсюда отправляйтесь в сопровождении гида в поход к драматичному горному массиву Чиухи, чьи зубчатые вершины достигают 3842 м. Тропа петляет через альпийские луга, усеянные полевыми цветами, вдоль кристально чистых ручьёв. Пикник на лоне этой необыкновенной горной природы — момент чистого спокойствия вдали от толпы. После похода — возвращение в Тбилиси.',
      },
      highlightsLocalized: {
        en: ['4x4 drive through Sno Valley to Juta village (2,150 m)', 'Guided hike toward Chiukhi mountains (3,842 m)', 'Alpine meadows & wildflower landscapes', 'Scenic picnic lunch in the mountains'],
        de: ['4x4-Fahrt durch das Sno-Tal nach Juta (2.150 m)', 'Geführte Wanderung zu den Tschjuchi-Bergen (3.842 m)', 'Almwiesen & Wildblumenlandschaften', 'Panorama-Picknick in den Bergen'],
        ru: ['Проезд 4x4 через долину Сно в деревню Джута (2150 м)', 'Пеший поход к горам Чиухи (3842 м) с гидом', 'Альпийские луга и цветущие пейзажи', 'Пикник в горах с живописными видами'],
      },
    },
    {
      day: 6,
      title: 'Uplistsikhe Cave Town, Gori & Akhaltsikhe',
      route: 'Tbilisi – Uplistsikhe – Gori – Akhaltsikhe',
      duration: 'full',
      description: 'Head west into the heartland of Georgia. The first stop is the Ananuri architectural complex, a stunning fortified enclosure on the shores of the Zhinvali Reservoir, featuring two churches with beautifully carved façades and a defensive tower that speaks to centuries of turbulent history. Continue to Uplistsikhe — the "Fortress of the Lord" — one of the oldest urban settlements in Georgia, carved into the sandstone cliffs as early as the 1st millennium BC. Explore its labyrinth of tunnels, pagan temples, a Christian basilica, a pharmacy, and a vast wine cellar, all hewn from living rock. A brief photo-stop in Gori, the birthplace of Joseph Stalin, allows a glimpse of the Stalin Museum (entry optional). The day concludes in Akhaltsikhe, where the imposing Rabati Castle dominates the skyline. This recently restored fortress complex encompasses a mosque, a synagogue, a Catholic church, and the Ahmed Pasha Jaakeli Palace — a testament to the region\'s multicultural past.',
      highlights: ['Ananuri architectural complex on Zhinvali Reservoir', 'Uplistsikhe cave town — 1st millennium BC', 'Gori — Stalin Museum photo-stop', 'Rabati Castle — multicultural fortress complex'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Akhaltsikhe Inn',
      image: '/images/luxury/caucasus_day6.jpg',
      titleLocalized: { en: 'Uplistsikhe Cave Town, Gori & Akhaltsikhe', de: 'Höhlenstadt Uplisziche, Gori & Achalziche', ru: 'Пещерный город Уплисцихе, Гори и Ахалцихе' },
      descriptionLocalized: {
        en: 'Head west into the heartland of Georgia. The first stop is the Ananuri architectural complex, a stunning fortified enclosure on the shores of the Zhinvali Reservoir, featuring two churches with beautifully carved façades and a defensive tower that speaks to centuries of turbulent history. Continue to Uplistsikhe — the "Fortress of the Lord" — one of the oldest urban settlements in Georgia, carved into the sandstone cliffs as early as the 1st millennium BC. Explore its labyrinth of tunnels, pagan temples, a Christian basilica, a pharmacy, and a vast wine cellar, all hewn from living rock. A brief photo-stop in Gori, the birthplace of Joseph Stalin, allows a glimpse of the Stalin Museum (entry optional). The day concludes in Akhaltsikhe, where the imposing Rabati Castle dominates the skyline.',
        de: 'Reisen Sie in das Herzland Georgiens. Erster Halt: der Architekturkomplex Ananuri am Schinvili-Stausee. Weiter nach Uplisziche — der „Festung des Herrn" — einer der ältesten städtischen Siedlungen Georgiens, im 1. Jahrtausend v. Chr. in die Sandsteinfelsen gehauen. Erkunden Sie das Labyrinth aus Tunneln, heidnischen Tempeln, einer christlichen Basilika und einem riesigen Weinkeller. Kurzer Fotostopp in Gori, dem Geburtsort von Josef Stalin. Der Tag endet in Achalziche, wo die imposante Rabati-Festung die Skyline dominiert.',
        ru: 'Направляйтесь на запад в сердце Грузии. Первая остановка — архитектурный комплекс Ананури на берегу Жинвальского водохранилища. Далее — Уплисцихе, «Крепость Господня», одно из древнейших городищ Грузии, высеченное в песчаных скалах в I тысячелетии до н.э. Исследуйте лабиринт туннелей, языческих храмов, христианской базилики и огромного винного погреба. Короткая остановка для фото в Гори — родине Иосифа Сталина. День завершается в Ахалцихе, где возвышается впечатляющая крепость Рабати.',
      },
      highlightsLocalized: {
        en: ['Ananuri architectural complex on Zhinvali Reservoir', 'Uplistsikhe cave town — 1st millennium BC', 'Gori — Stalin Museum photo-stop', 'Rabati Castle — multicultural fortress complex'],
        de: ['Ananuri-Architekturkomplex am Schinvili-Stausee', 'Höhlenstadt Uplisziche — 1. Jahrtausend v. Chr.', 'Gori — Fotostopp am Stalin-Museum', 'Rabati-Festung — multikultureller Festungskomplex'],
        ru: ['Архитектурный комплекс Ананури на Жинвальском водохранилище', 'Пещерный город Уплисцихе — I тысячелетие до н.э.', 'Гори — фото-остановка у музея Сталина', 'Крепость Рабати — мультикультурный крепостной комплекс'],
      },
    },
    {
      day: 7,
      title: 'Vardzia Cave Complex & Return to Tbilisi',
      route: 'Akhaltsikhe – Vardzia – Poka – Tbilisi',
      duration: 'full',
      description: 'Journey deeper into southern Georgia to explore one of the Caucasus\'s most astonishing monuments. En route, pause at the 10th-century Khertvisi Fortress, dramatically situated at the confluence of the Mtkvari and Paravani rivers — one of the oldest fortresses in Georgia. The highlight of the day is Vardzia, a monumental cave city carved into the eroded slopes of Mount Erusheti by Queen Tamar in the 12th century. Stretching over 500 metres along the cliff face, this underground city once housed up to 50,000 people and comprised over 3,000 rooms across 13 levels, including churches, bakeries, a library, and an ingenious irrigation system. The Church of the Dormition, with its remarkably preserved frescoes depicting Queen Tamar herself, is a masterpiece of medieval Georgian art. After visiting the Poka convent, a peaceful spiritual community nestled in the countryside, return to Tbilisi for the evening.',
      highlights: ['Khertvisi Fortress (10th c.)', 'Vardzia cave complex — 500 m of carved cliffs', 'Church of the Dormition frescoes (Queen Tamar)', 'Poka convent'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Mercure Tbilisi Old Town',
      image: '/images/luxury/caucasus_day7.jpg',
      titleLocalized: { en: 'Vardzia Cave Complex & Return to Tbilisi', de: 'Höhlenkomplex Wardsia & Rückkehr nach Tiflis', ru: 'Пещерный комплекс Вардзиа и возвращение в Тбилиси' },
      descriptionLocalized: {
        en: 'Journey deeper into southern Georgia to explore one of the Caucasus\'s most astonishing monuments. En route, pause at the 10th-century Khertvisi Fortress, dramatically situated at the confluence of the Mtkvari and Paravani rivers. The highlight of the day is Vardzia, a monumental cave city carved into the eroded slopes of Mount Erusheti by Queen Tamar in the 12th century. Stretching over 500 metres along the cliff face, this underground city once housed up to 50,000 people and comprised over 3,000 rooms across 13 levels. After visiting the Poka convent, return to Tbilisi.',
        de: 'Reisen Sie tiefer in den Süden Georgiens, um eines der erstaunlichsten Denkmäler des Kaukasus zu erkunden. Unterwegs Halt an der Chertwisi-Festung aus dem 10. Jahrhundert. Das Highlight des Tages ist Wardsia, eine monumentale Höhlenstadt aus dem 12. Jahrhundert, von Königin Tamar in die Hänge des Berges Eruscheti gehauen. Über 500 Meter lang erstreckt sich diese unterirdische Stadt, die einst bis zu 50.000 Menschen beherbergte. Nach dem Besuch des Poka-Klosters Rückkehr nach Tiflis.',
        ru: 'Отправьтесь глубже в южную Грузию, чтобы исследовать один из самых удивительных памятников Кавказа. По пути — остановка у крепости Хертвиси X века. Главное впечатления дня — Вардзиа, монументальный пещерный город, высеченный царицей Тамарой в XII веке. Простираясь на 500 метров вдоль скалы, этот подземный город вмещал до 50 000 человек и включал более 3000 помещений на 13 уровнях. После посещения монастыря Пока — возвращение в Тбилиси.',
      },
      highlightsLocalized: {
        en: ['Khertvisi Fortress (10th c.)', 'Vardzia cave complex — 500 m of carved cliffs', 'Church of the Dormition frescoes (Queen Tamar)', 'Poka convent'],
        de: ['Chertwisi-Festung (10. Jh.)', 'Höhlenkomplex Wardsia — 500 m gehauene Felsen', 'Fresken der Dormitionskirche (Königin Tamar)', 'Poka-Kloster'],
        ru: ['Крепость Хертвиси (X в.)', 'Пещерный комплекс Вардзиа — 500 м высеченных скал', 'Фрески церкви Успения (царица Тамара)', 'Монастырь Пока'],
      },
    },
    {
      day: 8,
      title: 'Border Crossing — Haghpat & Dilijan',
      route: 'Sadakhlo Border – Haghpat – Dilijan',
      duration: 'full',
      description: 'Bid farewell to Georgia as you cross the border at Sadakhlo into Armenia. Your first Armenian treasure awaits: the UNESCO-listed Haghpat Monastery, a 10th-century monastic complex perched on a hillside overlooking the Debed River gorge. Founded by Queen Khosrovanuysh, Haghpat was a major centre of learning and manuscript illumination, and its churches, refectory, and bell tower represent the finest of medieval Armenian ecclesiastical architecture. Continue to Dilijan, often called the "Armenian Switzerland" for its lush alpine forests, clear mountain air, and charming 19th-century Sharambeyan Street lined with artisan workshops. The town\'s serene beauty has inspired artists and writers for generations, and its tranquil setting provides a perfect introduction to the Armenian leg of your journey.',
      highlights: ['Border crossing at Sadakhlo', 'Haghpat Monastery — UNESCO World Heritage Site', 'Dilijan — "Armenian Switzerland"', 'Sharambeyan Street artisan quarter'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Dilijazz Hotel',
      image: '/images/luxury/caucasus_day8.jpg',
      titleLocalized: { en: 'Border Crossing — Haghpat & Dilijan', de: 'Grenzüberquerung — Haghpat & Dilidschan', ru: 'Пересечение границы — Ахпат и Дилижан' },
      descriptionLocalized: {
        en: 'Bid farewell to Georgia as you cross the border at Sadakhlo into Armenia. Your first Armenian treasure awaits: the UNESCO-listed Haghpat Monastery, a 10th-century monastic complex perched on a hillside overlooking the Debed River gorge. Continue to Dilijan, often called the "Armenian Switzerland" for its lush alpine forests, clear mountain air, and charming 19th-century Sharambeyan Street lined with artisan workshops.',
        de: 'Verabschieden Sie sich von Georgien beim Überqueren der Grenze bei Sadachlo nach Armenien. Ihr erster armenischer Schatz erwartet Sie: das UNESCO-gelistete Haghpat-Kloster, ein Klosterkomplex des 10. Jahrhunderts auf einem Hang über der Debed-Schlucht. Weiter nach Dilidschan, oft als „armenische Schweiz" bezeichnet.',
        ru: 'Попрощайтесь с Грузией при пересечении границы в Сада́хло в Армению. Вас ждёт первая армянская жемчужина: монастырь Ахпат, объект ЮНЕСКО — монашеский комплекс X века на склоне над ущельем реки Дебед. Продолжение в Дилижан, часто называемый «армянской Швейцарией».',
      },
      highlightsLocalized: {
        en: ['Border crossing at Sadakhlo', 'Haghpat Monastery — UNESCO World Heritage Site', 'Dilijan — "Armenian Switzerland"', 'Sharambeyan Street artisan quarter'],
        de: ['Grenzüberquerung bei Sadachlo', 'Haghpat-Kloster — UNESCO-Weltkulturerbe', 'Dilidschan — „Armenische Schweiz"', 'Scharambejan-Straße Kunsthandwerksviertel'],
        ru: ['Пересечение границы в Сада́хло', 'Монастырь Ахпат — объект Всемирного наследия ЮНЕСКО', 'Дилижан — «Армянская Швейцария»', 'Улица Шарамбеян — квартал ремесленников'],
      },
    },
    {
      day: 9,
      title: 'Gosh Lake, Goshavank & Haghartsin',
      route: 'Dilijan – Gosh Lake – Goshavank – Haghartsin – Dilijan',
      duration: 'full',
      description: 'A day of gentle adventure in the Dilijan National Park. Begin with a hike to the secluded Gosh Lake, a small but enchanting body of water surrounded by dense forest. Visit the Goshavank Monastery, founded in 1188 by Mkhitar Gosh. Continue to the Haghartsin Monastery, a 13th-century complex nestled in a forested valley. The day concludes with a Tolma-making masterclass — learn the art of preparing Armenia\'s beloved stuffed grape leaves.',
      highlights: ['Dilijan National Park hiking', 'Gosh Lake & Parz Lake', 'Goshavank Monastery (12th c.) — Asemic khachkar', 'Haghartsin Monastery — forested valley sanctuary', 'Tolma-making masterclass'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Dilijazz Hotel',
      image: '/images/luxury/caucasus_day9.jpg',
      included: ['Tolma-making masterclass'],
      titleLocalized: { en: 'Gosh Lake, Goshavank & Haghartsin', de: 'Gosch-See, Goschawank & Haghartsin', ru: 'Озеро Гош, Гошаванк и Ахарцин' },
      descriptionLocalized: {
        en: 'A day of gentle adventure in the Dilijan National Park. Begin with a hike to the secluded Gosh Lake, a small but enchanting body of water surrounded by dense forest. Visit the Goshavank Monastery, founded in 1188 by Mkhitar Gosh. Continue to the Haghartsin Monastery, a 13th-century complex nestled in a forested valley. The day concludes with a Tolma-making masterclass — learn the art of preparing Armenia\'s beloved stuffed grape leaves.',
        de: 'Ein Tag sanften Abenteuers im Nationalpark Dilidschan. Beginnen Sie mit einer Wanderung zum abgelegenen Gosch-See. Besuchen Sie das Goschawank-Kloster, 1188 von Mchitar Gosch gegründet. Weiter zum Haghartsin-Kloster, einem Komplex des 13. Jahrhunderts in einem bewaldeten Tal. Der Tag endet mit einem Tolma-Kochkurs.',
        ru: 'День мягких приключений в национальном парке Дилижана. Начните с похода к уединённому озеру Гош. Посетите монастырь Гошаванк, основанный в 1188 году Мхитаром Гошем. Продолжите к монастырю Ахарцин — комплексу XIII века в лесистой долине. День завершается мастер-классом по приготовлению толмы.',
      },
      highlightsLocalized: {
        en: ['Dilijan National Park hiking', 'Gosh Lake & Parz Lake', 'Goshavank Monastery (12th c.) — Asemic khachkar', 'Haghartsin Monastery — forested valley sanctuary', 'Tolma-making masterclass'],
        de: ['Wandern im Nationalpark Dilidschan', 'Gosch-See & Parz-See', 'Goschawank-Kloster (12. Jh.) — Asemic-Chatschkar', 'Haghartsin-Kloster — Heiligtum im Waldtal', 'Tolma-Kochkurs'],
        ru: ['Пешие прогулки в национальном парке Дилижана', 'Озёра Гош и Парз', 'Монастырь Гошаванк (XII в.) — хачкар «Асемик»', 'Монастырь Ахарцин — святилище в лесной долине', 'Мастер-класс по приготовлению толмы'],
      },
    },
    {
      day: 10,
      title: 'Lake Sevan, Garni & Geghard',
      route: 'Dilijan – Sevan Lake – Garni – Geghard – Yerevan',
      duration: 'full',
      description: 'Drive to the shimmering expanse of Lake Sevan, one of the world\'s largest high-altitude freshwater lakes, sitting at 1,900 metres above sea level. A boat ride on the lake offers a unique perspective. Descend to visit the Geghard Monastery, a UNESCO World Heritage Site partly carved out of the adjacent mountain. In the village of Garni, participate in a Lavash-making masterclass and visit the Garni pagan temple, a remarkably preserved 1st-century AD Hellenistic temple. Arrive in Yerevan for dinner.',
      highlights: ['Lake Sevan — high-altitude alpine lake', 'Boat ride on Lake Sevan', 'Geghard Monastery — UNESCO, rock-cut churches', 'Lavash-making masterclass in Garni', 'Garni pagan temple — 1st century AD'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'ARARAT Opera Suite Hotel 4*',
      image: '/images/luxury/caucasus_day10.jpg',
      included: ['Boat ride Lake Sevan', 'Lavash-making masterclass'],
      titleLocalized: { en: 'Lake Sevan, Garni & Geghard', de: 'Sewan-See, Garni & Geghard', ru: 'Озеро Севан, Гарни и Гегард' },
      descriptionLocalized: {
        en: 'Drive to the shimmering expanse of Lake Sevan, one of the world\'s largest high-altitude freshwater lakes, sitting at 1,900 metres above sea level. A boat ride on the lake offers a unique perspective. Descend to visit the Geghard Monastery, a UNESCO World Heritage Site partly carved out of the adjacent mountain. In the village of Garni, participate in a Lavash-making masterclass and visit the Garni pagan temple, a remarkably preserved 1st-century AD Hellenistic temple. Arrive in Yerevan for dinner.',
        de: 'Fahrt zum glitzernden Sewan-See, einem der größten hochgelegenen Süßwasserseen der Welt auf 1.900 Metern. Eine Bootsfahrt bietet einzigartige Perspektiven. Besuchen Sie das Geghard-Kloster, ein UNESCO-Weltkulturerbe, teilweise in den Berg gehauen. Im Dorf Garni nehmen Sie an einem Lawasch-Kochkurs teil und besuchen den heidnischen Tempel von Garni aus dem 1. Jahrhundert n. Chr. Ankunft in Jerevan zum Abendessen.',
        ru: 'Отправление к сверкающим водам озера Севан — одного из крупнейших высокогорных пресноводных озёр мира на высоте 1900 м. Катание на лодке откроет уникальную перспективу. Спуск к монастырю Гегард, объекту ЮНЕСКО, частично высеченному в скале. В деревне Гарни — мастер-класс по выпечке лаваша и посещение языческого храма Гарни I века н.э. Прибытие в Ереван к ужину.',
      },
      highlightsLocalized: {
        en: ['Lake Sevan — high-altitude alpine lake', 'Boat ride on Lake Sevan', 'Geghard Monastery — UNESCO, rock-cut churches', 'Lavash-making masterclass in Garni', 'Garni pagan temple — 1st century AD'],
        de: ['Sewan-See — hochgelegener Alpensee', 'Bootsfahrt auf dem Sewan-See', 'Geghard-Kloster — UNESCO, Felskirchen', 'Lawasch-Kochkurs in Garni', 'Heidnischer Tempel von Garni — 1. Jahrhundert n. Chr.'],
        ru: ['Озеро Севан — высокогорное альпийское озеро', 'Катание на лодке по озеру Севан', 'Монастырь Гегард — ЮНЕСКО, скальные церкви', 'Мастер-класс по выпечке лаваша в Гарни', 'Языческий храм Гарни — I век н.э.'],
      },
    },
    {
      day: 11,
      title: 'Yerevan City Tour & Welcome Dinner',
      route: 'Yerevan',
      duration: 'full',
      description: 'Discover the Armenian capital in depth. Begin at Tsitsernakaberd, the powerful Armenian Genocide Memorial. Continue to the legendary ARARAT Brandy Factory for a guided tour and tasting. Stroll through Republic Square and explore the Cascade Complex. The evening culminates in a welcome dinner featuring live Armenian folk music.',
      highlights: ['Tsitsernakaberd Memorial — Armenian Genocide Memorial', 'ARARAT Brandy Factory tour & tasting', 'Republic Square — pink tuff neoclassical architecture', 'Cascade Complex & sculpture garden', 'Welcome dinner with live Armenian folk music'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'ARARAT Opera Suite Hotel 4*',
      image: '/images/luxury/caucasus_day11.jpg',
      included: ['ARARAT brandy tasting', 'Welcome dinner with folk music'],
      titleLocalized: { en: 'Yerevan City Tour & Welcome Dinner', de: 'Stadtrundfahrt Jerevan & Willkommensabendessen', ru: 'Обзорная экскурсия по Еревану и приветственный ужин' },
      descriptionLocalized: {
        en: 'Discover the Armenian capital in depth. Begin at Tsitsernakaberd, the powerful Armenian Genocide Memorial. Continue to the legendary ARARAT Brandy Factory for a guided tour and tasting. Stroll through Republic Square and explore the Cascade Complex. The evening culminates in a welcome dinner featuring live Armenian folk music.',
        de: 'Entdecken Sie die armenische Hauptstadt eingehend. Beginnen Sie am Zizernakaberd, dem eindrucksvollen Völkermord-Denkmal. Weiter zur legendären ARARAT-Brandy-Fabrik für eine Führung und Verkostung. Schlendern Sie über den Republikplatz und erkunden Sie die Kaskade. Der Abend gipfelt in einem Willkommensabendessen mit armenischer Volksmusik.',
        ru: 'Откройте для себя армянскую столицу. Начните с Цицернакаберда — пронзительного Мемориала геноцида армян. Продолжите на легендарном коньячном заводе ARARAT с экскурсией и дегустацией. Прогуляйтесь по площади Республики и исследуйте Каскад. Вечер увенчается приветственным ужином под живую армянскую народную музыку.',
      },
      highlightsLocalized: {
        en: ['Tsitsernakaberd Memorial — Armenian Genocide Memorial', 'ARARAT Brandy Factory tour & tasting', 'Republic Square — pink tuff neoclassical architecture', 'Cascade Complex & sculpture garden', 'Welcome dinner with live Armenian folk music'],
        de: ['Zizernakaberd-Denkmal — Armenischer Völkermord-Gedenkstätte', 'ARARAT-Brandy-Fabrik Führung & Verkostung', 'Republikplatz — rosa Tuffstein-Architektur', 'Kaskaden-Komplex & Skulpturengarten', 'Willkommensabendessen mit armenischer Volksmusik'],
        ru: ['Мемориал Цицернакаберд — памятник Геноцида армян', 'Экскурсия и дегустация на коньячном заводе ARARAT', 'Площадь Республики — архитектура из розового туфа', 'Комплекс Каскад и сад скульптур', 'Приветственный ужин с живой армянской народной музыкой'],
      },
    },
    {
      day: 12,
      title: 'Khor Virap, Noravank, Areni & Jermuk',
      route: 'Yerevan – Khor Virap – Noravank – Areni – Jermuk – Goris',
      duration: 'full',
      description: 'Head south through the Ararat Plain to Khor Virap Monastery, one of Armenia\'s most sacred pilgrimage sites. Continue through the dramatic red-rock gorge to Noravank Monastery. Visit Areni Cave and taste wines at a local winery. The day ends in Goris.',
      highlights: ['Khor Virap Monastery — underground dungeon & Mt Ararat views', 'Noravank Monastery — red-rock gorge setting', 'Areni Cave — 6,000-year-old wine press', 'Areni Winery tasting', 'Jermuk Waterfall & spa town'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Goris',
      image: '/images/luxury/caucasus_day12.jpg',
      included: ['Wine tasting at Areni'],
      titleLocalized: { en: 'Khor Virap, Noravank, Areni & Jermuk', de: 'Chor Wirap, Norawank, Areni & Dschermuk', ru: 'Хор Вирап, Нораванк, Арени и Джермук' },
      descriptionLocalized: {
        en: 'Head south through the Ararat Plain to Khor Virap Monastery, one of Armenia\'s most sacred pilgrimage sites. Continue through the dramatic red-rock gorge to Noravank Monastery. Visit Areni Cave and taste wines at a local winery. The day ends in Goris.',
        de: 'Fahrt nach Süden durch die Ararat-Ebene zum Chor-Wirap-Kloster, einem der heiligsten Wallfahrtsorte Armeniens. Weiter durch die dramatische Rotstein-Schlucht zum Norawank-Kloster. Besuch der Areni-Höhle und Weinverkostung in einem örtlichen Weingut. Der Tag endet in Goris.',
        ru: 'Отправление на юг через Араратскую равнину к монастырю Хор Вирап — одному из самых священных мест паломничества Армении. Продолжение через живописное ущелье из красного камня к монастырю Нораванк. Посещение пещеры Арени и дегустация вина на местной винодельне. День завершается в Горисе.',
      },
      highlightsLocalized: {
        en: ['Khor Virap Monastery — underground dungeon & Mt Ararat views', 'Noravank Monastery — red-rock gorge setting', 'Areni Cave — 6,000-year-old wine press', 'Areni Winery tasting', 'Jermuk Waterfall & spa town'],
        de: ['Chor-Wirap-Kloster — unterirdisches Verlies & Ararat-Blick', 'Norawank-Kloster — Rotstein-Schlucht', 'Areni-Höhle — 6.000 Jahre alte Weinpresse', 'Areni-Weinverkostung', 'Dschermuk-Wasserfall & Kurort'],
        ru: ['Монастырь Хор Вирап — подземелье и виды на Арарат', 'Монастырь Нораванк — ущелье из красного камня', 'Пещера Арени — 6000-летняя винодавильня', 'Дегустация вин в Арени', 'Водопад Джермука и курортный город'],
      },
    },
    {
      day: 13,
      title: 'Etchmiadzin & Zvartnots',
      route: 'Goris – Etchmiadzin – Zvartnots – Yerevan',
      duration: 'full',
      description: 'Return toward Yerevan, stopping at two of Armenia\'s most important UNESCO World Heritage Sites. Etchmiadzin Cathedral is the oldest state-built Christian cathedral in the world. Conclude at Zvartnots Cathedral, a 7th-century architectural marvel. Return to Yerevan for your final evening.',
      highlights: ['Etchmiadzin Cathedral — oldest Christian cathedral (301–303 AD)', 'Machanents House traditional lunch', 'Zvartnots Cathedral — 7th-century circular masterpiece'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'ARARAT Opera Suite Hotel 4*',
      image: '/images/luxury/caucasus_day13.jpg',
      titleLocalized: { en: 'Etchmiadzin & Zvartnots', de: 'Etschmiadsin & Swartnoz', ru: 'Эчмиадзин и Звартноц' },
      descriptionLocalized: {
        en: 'Return toward Yerevan, stopping at two of Armenia\'s most important UNESCO World Heritage Sites. Etchmiadzin Cathedral is the oldest state-built Christian cathedral in the world. Conclude at Zvartnots Cathedral, a 7th-century architectural marvel. Return to Yerevan for your final evening.',
        de: 'Rückfahrt nach Jerevan mit Stopps an zwei der wichtigsten UNESCO-Weltkulturerbestätten Armeniens. Die Etschmiadsin-Kathedrale ist die älteste staatlich erbaute christliche Kathedrale der Welt. Abschluss mit der Swartnoz-Kathedrale, einem architektonischen Wunder des 7. Jahrhunderts. Rückkehr nach Jerevan.',
        ru: 'Возвращение в Ереван с остановками у двух важнейших объектов Всемирного наследия ЮНЕСКО в Армении. Собор Эчмиадзин — старейший в мире христианский кафедральный собор, построенный государством. Завершение у собора Звартноц — архитектурного чуда VII века. Возвращение в Ереван на последний вечер.',
      },
      highlightsLocalized: {
        en: ['Etchmiadzin Cathedral — oldest Christian cathedral (301–303 AD)', 'Machanents House traditional lunch', 'Zvartnots Cathedral — 7th-century circular masterpiece'],
        de: ['Etschmiadsin-Kathedrale — älteste christliche Kathedrale (301–303 n. Chr.)', 'Traditionelles Mittagessen im Machanents-Haus', 'Swartnoz-Kathedrale — kreisförmiges Meisterwerk des 7. Jh.'],
        ru: ['Собор Эчмиадзин — старейший христианский собор (301–303 гг.)', 'Традиционный обед в доме Мачаненц', 'Собор Звартноц — круговой шедевр VII века'],
      },
    },
    {
      day: 14,
      title: 'Departure',
      route: 'Yerevan',
      duration: 'departure',
      description: 'After breakfast, transfer to Zvartnots International Airport for your departure flight. As you leave, carry with you the memories of ancient monasteries carved into mountains, the taste of wines older than recorded history, and the warmth of Caucasian hospitality — until next time.',
      highlights: ['Private airport transfer'],
      meals: ['Breakfast'],
      image: '/images/luxury/caucasus_day14.jpg',
      included: ['Private airport transfer'],
      titleLocalized: { en: 'Departure', de: 'Abreise', ru: 'Отбытие' },
      descriptionLocalized: {
        en: 'After breakfast, transfer to Zvartnots International Airport for your departure flight. As you leave, carry with you the memories of ancient monasteries carved into mountains, the taste of wines older than recorded history, and the warmth of Caucasian hospitality — until next time.',
        de: 'Nach dem Frühstück Transfer zum Flughafen Swartnoz für Ihren Abflug. Nehmen Sie die Erinnerungen an alte Felsenklöster, den Geschmack von Weinen, die älter sind als die aufgezeichnete Geschichte, und die Wärme kaukasischer Gastfreundschaft mit — bis zum nächsten Mal.',
        ru: 'После завтрака — трансфер в международный аэропорт Звартноц к вашему вылету. Увозите с собой воспоминания о древних монастырях, высеченных в горах, вкус вин старше письменной истории и тепло кавказского гостеприимства — до новой встречи.',
      },
      highlightsLocalized: {
        en: ['Private airport transfer'],
        de: ['Privater Flughafentransfer'],
        ru: ['Индивидуальный трансфер в аэропорт'],
      },
    },
  ],
  pricing: [
    { pax: 2, price4Star: 4280, price3Star: 4055 },
    { pax: 4, price4Star: 3285, price3Star: 3070 },
    { pax: 8, price4Star: 2840, price3Star: 2625 },
    { pax: 10, price4Star: 2695, price3Star: 2355 },
    { pax: 12, price4Star: 2590, price3Star: 2380 },
  ],
  singleSupplement: { price4Star: 975, price3Star: 785 },
  included: [
    'Transportation with hotel pick-up and drop-off throughout the tour',
    'Professional German-speaking guide for the entire duration',
    'All entrance fees as per itinerary',
    '4x4 vehicle transport in Juta (Day 5)',
    '4x4 vehicle transport to Gergeti Trinity Church (Day 4)',
    'Welcome dinner with Armenian folk music (Day 11)',
    'Wine tasting at Areni Winery (Day 12)',
    'Brandy tasting at ARARAT Brandy Factory (Day 11)',
    'Lavash-making masterclass in Garni (Day 10)',
    'Tolma-making masterclass in Dilijan (Day 9)',
    'Boat ride on Lake Sevan (Day 10)',
    'Accommodation in Twin/Double rooms as specified',
    'Full board (all meals from Day 2 onwards; no dinner on Day 1)',
    'Bottled water throughout the tour',
  ],
  excluded: [
    'International flight tickets',
    'Travel insurance',
    'Single room supplement (€975 / €785)',
    'Additional fees not mentioned in the itinerary',
    'Personal expenses and gratuities',
  ],
  paymentPolicy: [
    'A 30% deposit is required at the time of booking, plus a €18 transaction fee',
    'The remaining balance is due 5 days before the departure date',
    'Payments can be made by bank transfer or credit card',
  ],
  cancellationPolicy: [
    'More than 30 days before departure: full refund minus non-recoverable costs',
    '15 to 30 days before departure: 50% refund of the tour price',
    'Less than 15 days before departure: no refund',
    'In case of force majeure: rescheduling at no additional cost, or full refund minus non-recoverable costs',
  ],
  images: [
    '/images/luxury/caucasus-hero.jpg',
    '/images/luxury/caucasus_day1.jpg',
    '/images/luxury/caucasus_day2.jpg',
    '/images/luxury/caucasus_day3.jpg',
    '/images/luxury/caucasus_day4.jpg',
    '/images/luxury/caucasus_day5.jpg',
    '/images/luxury/caucasus_day6.jpg',
    '/images/luxury/caucasus_day7.jpg',
    '/images/luxury/caucasus_day8.jpg',
    '/images/luxury/caucasus_day9.jpg',
    '/images/luxury/caucasus_day10.jpg',
    '/images/luxury/caucasus_day11.jpg',
    '/images/luxury/caucasus_day12.jpg',
    '/images/luxury/caucasus_day13.jpg',
    '/images/luxury/caucasus_day14.jpg',
  ],
  hotels: [
    {
      category: '4* Superior',
      hotels: [
        { city: 'Tbilisi', name: 'Mercure Tbilisi Old Town' },
        { city: 'Stepantsminda', name: 'Porta Caucasia Stepantsminda' },
        { city: 'Akhaltsikhe', name: 'Akhaltsikhe Inn' },
        { city: 'Dilijan', name: 'Dilijazz Hotel' },
        { city: 'Yerevan', name: 'ARARAT Opera Suite Hotel 4*' },
        { city: 'Goris', name: 'Goris Hotel' },
      ],
    },
    {
      category: '3* & 4* Standard',
      hotels: [
        { city: 'Tbilisi', name: 'Mercure Tbilisi Old Town' },
        { city: 'Stepantsminda', name: 'Porta Caucasia Stepantsminda' },
        { city: 'Akhaltsikhe', name: 'Akhaltsikhe Inn' },
        { city: 'Dilijan', name: 'Dilijazz Hotel' },
        { city: 'Yerevan', name: 'ARARAT Opera Suite Hotel 4*' },
        { city: 'Goris', name: 'Goris Hotel' },
      ],
    },
  ],
  includedLocalized: {
    en: ['Transportation with hotel pick-up and drop-off throughout the tour', 'Professional German-speaking guide for the entire duration', 'All entrance fees as per itinerary', '4x4 vehicle transport in Juta (Day 5)', '4x4 vehicle transport to Gergeti Trinity Church (Day 4)', 'Welcome dinner with Armenian folk music (Day 11)', 'Wine tasting at Areni Winery (Day 12)', 'Brandy tasting at ARARAT Brandy Factory (Day 11)', 'Lavash-making masterclass in Garni (Day 10)', 'Tolma-making masterclass in Dilijan (Day 9)', 'Boat ride on Lake Sevan (Day 10)', 'Accommodation in Twin/Double rooms as specified', 'Full board (all meals from Day 2 onwards; no dinner on Day 1)', 'Bottled water throughout the tour'],
    de: ['Transport mit Hotelabholung und -bringerung während der gesamten Tour', 'Deutschsprachiger Guide für die gesamte Dauer', 'Alle Eintrittsgelder laut Programm', '4x4-Transport nach Juta (Tag 5)', '4x4-Transport zur Gergeti-Dreifaltigkeitskirche (Tag 4)', 'Willkommensabendessen mit armenischer Volksmusik (Tag 11)', 'Weinverkostung bei Areni-Weingut (Tag 12)', 'Brandy-Verkostung bei ARARAT-Fabrik (Tag 11)', 'Lawasch-Kochkurs in Garni (Tag 10)', 'Tolma-Kochkurs in Dilidschan (Tag 9)', 'Bootsfahrt auf dem Sewan-See (Tag 10)', 'Unterkunft in Doppel-/Zweibettzimmern wie angegeben', 'Vollpension (alle Mahlzeiten ab Tag 2; kein Abendessen an Tag 1)', 'Flaschenwasser während der gesamten Tour'],
    ru: ['Транспорт с трансфером из/в отель на протяжении всего тура', 'Профессиональный немецкоговорящий гид на весь период', 'Все входные билеты по программе', 'Транспорт 4x4 в Джуту (День 5)', 'Транспорт 4x4 к церкви Гергети (День 4)', 'Приветственный ужин с армянской народной музыкой (День 11)', 'Дегустация вин в Арени (День 12)', 'Дегустация коньяка на заводе ARARAT (День 11)', 'Мастер-класс по выпечке лаваша в Гарни (День 10)', 'Мастер-класс по приготовлению толмы в Дилижане (День 9)', 'Катание на лодке по озеру Севан (День 10)', 'Проживание в двухместных номерах по программе', 'Полный пансион (все meals со Дня 2; без ужина в День 1)', 'Питьевая вода в бутылках на протяжении всего тура'],
  },
  excludedLocalized: {
    en: ['International flight tickets', 'Travel insurance', 'Single room supplement (€975 / €785)', 'Additional fees not mentioned in the itinerary', 'Personal expenses and gratuities'],
    de: ['Internationale Flugtickets', 'Reiseversicherung', 'Einzelzimmerzuschlag (975 € / 785 €)', 'Zusätzliche Gebühren, die nicht im Programm erwähnt sind', 'Persönliche Ausgaben und Trinkgelder'],
    ru: ['Авиабилеты международных рейсов', 'Страховка для путешествий', 'Доплата за одноместное размещение (975 € / 785 €)', 'Дополнительные сборы, не указанные в программе', 'Личные расходы и чаевые'],
  },
  paymentPolicyLocalized: {
    en: ['A 30% deposit is required at the time of booking, plus a €18 transaction fee', 'The remaining balance is due 5 days before the departure date', 'Payments can be made by bank transfer or credit card'],
    de: ['Eine Anzahlung von 30 % ist bei Buchung erforderlich, zzgl. einer Transaktionsgebühr von 18 €', 'Der Restbetrag ist 5 Tage vor dem Abreisedatum fällig', 'Zahlungen per Banküberweisung oder Kreditkarte möglich'],
    ru: ['При бронировании требуется депозит 30% плюс комиссия за транзакцию 18 €', 'Остаток суммы подлежит оплате за 5 дней до даты отправления', 'Оплата возможна банковским переводом или кредитной картой'],
  },
  cancellationPolicyLocalized: {
    en: ['More than 30 days before departure: full refund minus non-recoverable costs', '15 to 30 days before departure: 50% refund of the tour price', 'Less than 15 days before departure: no refund', 'In case of force majeure: rescheduling at no additional cost, or full refund minus non-recoverable costs'],
    de: ['Mehr als 30 Tage vor Abreise: volle Rückerstattung abzüglich nicht wiederbeschaffbarer Kosten', '15 bis 30 Tage vor Abreise: 50 % Rückerstattung des Tourpreises', 'Weniger als 15 Tage vor Abreise: keine Rückerstattung', 'Bei höherer Gewalt: Umbuchung ohne zusätzliche Kosten oder volle Rückerstattung abzüglich nicht wiederbeschaffbarer Kosten'],
    ru: ['Более чем за 30 дней до отправления: полный возврат за вычетом невозмещаемых расходов', 'За 15–30 дней до отправления: возврат 50% стоимости тура', 'Менее чем за 15 дней до отправления: возврат не предусмотрен', 'При форс-мажоре: перенос дат без доплат или полный возврат за вычетом невозмещаемых расходов'],
  },
}

// =============================================================================
// TOUR 2 — Reise durch Armenien: Kultur, Küche & Begegnungen
// =============================================================================

const armeniaTour: LuxuryTour = {
  id: 'luxury-armenia-10d',
  title: 'Journey Through Armenia: Culture, Cuisine & Encounters',
  subtitle: 'A 10-day immersion in Armenian culture, cuisine, and authentic encounters',
  duration: '10 Days / 9 Nights',
  countries: ['Armenia'],
  description:
    'Delve deep into the soul of Armenia on this thoughtfully curated 10-day journey that goes far beyond sightseeing. This is a tour designed for travellers who want to understand a country through its people, its food, and its living traditions — not just its monuments. From the bustling heart of Yerevan to the rugged peaks of Mount Dimats, from the world\'s longest cable car ride at Tatev to a family farm visit in the Armenian highlands, every day offers an encounter that is genuine, unexpected, and memorable. You\'ll bake Lavash in a village tonir, craft Sujukh with a local family, grill fish at a chef\'s house, and taste wines from the birthplace of viticulture. With a German-speaking guide illuminating the history of one of the world\'s oldest civilisations, and hand-picked hotels offering comfort and character at every stop, this is Armenia as few visitors ever experience it.',
  titleLocalized: {
    en: 'Journey Through Armenia: Culture, Cuisine & Encounters',
    de: 'Reise durch Armenien: Kultur, Küche & Begegnungen',
    ru: 'Путешествие по Армении: Культура, кухня и встречи',
  },
  subtitleLocalized: {
    en: 'A 10-day immersion in Armenian culture, cuisine, and authentic encounters',
    de: 'Eine 10-tägige Reise in die armenische Kultur, Küche und authentische Begegnungen',
    ru: '10-дневное погружение в армянскую культуру, кухню и подлинные встречи',
  },
  descriptionLocalized: {
    en: 'Delve deep into the soul of Armenia on this thoughtfully curated 10-day journey that goes far beyond sightseeing. This is a tour designed for travellers who want to understand a country through its people, its food, and its living traditions — not just its monuments. From the bustling heart of Yerevan to the rugged peaks of Mount Dimats, from the world\'s longest cable car ride at Tatev to a family farm visit in the Armenian highlands, every day offers an encounter that is genuine, unexpected, and memorable. You\'ll bake Lavash in a village tonir, craft Sujukh with a local family, grill fish at a chef\'s house, and taste wines from the birthplace of viticulture. With a German-speaking guide illuminating the history of one of the world\'s oldest civilisations, and hand-picked hotels offering comfort and character at every stop, this is Armenia as few visitors ever experience it.',
    de: 'Tauchen Sie tief in die Seele Armeniens ein auf dieser durchdachten 10-tägigen Reise, die weit über Sightseeing hinausgeht. Diese Tour ist für Reisende gedacht, die ein Land durch seine Menschen, sein Essen und seine lebendigen Traditionen verstehen wollen — nicht nur durch seine Monumente. Vom geschäftigen Herzen Jerevans bis zu den rauen Gipfeln des Berges Dimaz, vom längsten Seilbahnritt der Welt in Tatev bis zum Besuch einer Familienfarm im armenischen Hochland — jeder Tag bietet eine Begegnung, die authentisch, unerwartet und unvergesslich ist. Sie werden Lawasch in einem Dorf-Tonir backen, Sudschnukh mit einer einheimischen Familie herstellen, Fisch im Haus eines Kochs grillen und Weine aus der Wiege des Weinbaus probieren. Mit einem deutschsprachigen Guide, der die Geschichte einer der ältesten Zivilisationen der Welt erleuchtet, ist dies Armenien, wie es wenige Besucher je erleben.',
    ru: 'Погрузитесь в душу Армении в этом тщательно составленном 10-дневном путешествии, выходящем далеко за рамки обычного туризма. Этот тур для тех, кто хочет понять страну через её людей, кухню и живые традиции — а не только через памятники. От бурлящего сердца Еревана до суровых вершин горы Димац, от самой длинной канатной дороги мира в Татеве до визита на семейную ферму в армянском высокогорье — каждый день приносит подлинную, неожиданную и запоминающуюся встречу. Вы будете печь лаваш в деревенском тонире, готовить суджук с местной семьёй, жарить рыбу у шеф-повара и дегустировать вина из колыбели виноделия. С немецкоговорящим гидом, раскрывающим историю одной из древнейших цивилизаций мира, — это Армения, какой её редко видят.',
  },
  days: [
    {
      day: 1,
      title: 'Arrival & Yerevan City Tour',
      route: 'Yerevan',
      duration: 'arrival',
      description: 'Arrive at Zvartnots International Airport, where your guide and driver will be waiting to welcome you to Armenia. Transfer to your hotel, then set out to discover the Armenian capital. Begin at Tsitsernakaberd, the solemn Armenian Genocide Memorial. Continue to the ARARAT Brandy Factory for a tour and tasting. Stroll through Republic Square and explore the Cascade Complex. The evening culminates in a welcome dinner accompanied by live Armenian folk music.',
      highlights: ['Airport meet-and-greet with private transfer', 'Tsitsernakaberd Memorial', 'ARARAT Brandy Factory tour & tasting', 'Republic Square — pink tuff architecture', 'Cascade Complex & sculpture garden', 'Welcome dinner with Armenian folk music'],
      meals: ['Lunch', 'Dinner'],
      accommodation: 'Yerevan',
      image: '/images/luxury/armenia_day1.jpg',
      included: ['Airport transfer', 'ARARAT brandy tasting', 'Welcome dinner with folk music'],
      titleLocalized: { en: 'Arrival & Yerevan City Tour', de: 'Ankunft & Stadtrundfahrt Jerevan', ru: 'Прибытие и обзорная экскурсия по Еревану' },
      descriptionLocalized: {
        en: 'Arrive at Zvartnots International Airport, where your guide and driver will be waiting to welcome you to Armenia. Transfer to your hotel, then set out to discover the Armenian capital. Begin at Tsitsernakaberd, the solemn Armenian Genocide Memorial. Continue to the ARARAT Brandy Factory for a tour and tasting. Stroll through Republic Square and explore the Cascade Complex. The evening culminates in a welcome dinner accompanied by live Armenian folk music.',
        de: 'Ankunft am Flughafen Swartnoz, wo Ihr Guide und Fahrer Sie in Armenien willkommen heißen. Transfer zum Hotel, dann entdecken Sie die armenische Hauptstadt. Beginn am Zizernakaberd, der feierlichen Gedenkstätte des Völkermords. Weiter zur ARARAT-Brandy-Fabrik für Führung und Verkostung. Schlendern Sie über den Republikplatz und erkunden Sie die Kaskade. Der Abend gipfelt in einem Willkommensabendessen mit armenischer Volksmusik.',
        ru: 'Прибытие в аэропорт Звартноц, где вас встретят гид и водитель. Трансфер в отель, затем — знакомство с армянской столицей. Начало — Цицернакаберд, пронзительный Мемориал геноцида армян. Продолжение — коньячный завод ARARAT с экскурсией и дегустацией. Прогулка по площади Республики и комплексу Каскад. Вечер завершается приветственным ужином под живую армянскую народную музыку.',
      },
      highlightsLocalized: {
        en: ['Airport meet-and-greet with private transfer', 'Tsitsernakaberd Memorial', 'ARARAT Brandy Factory tour & tasting', 'Republic Square — pink tuff architecture', 'Cascade Complex & sculpture garden', 'Welcome dinner with Armenian folk music'],
        de: ['Begrüßung am Flughafen mit privatem Transfer', 'Zizernakaberd-Gedenkstätte', 'ARARAT-Brandy-Fabrik Führung & Verkostung', 'Republikplatz — Rosa-Tuff-Architektur', 'Kaskaden-Komplex & Skulpturengarten', 'Willkommensabendessen mit armenischer Volksmusik'],
        ru: ['Встреча в аэропорту с индивидуальным трансфером', 'Мемориал Цицернакаберд', 'Экскурсия и дегустация на коньячном заводе ARARAT', 'Площадь Республики — архитектура из розового туфа', 'Комплекс Каскад и сад скульптур', 'Приветственный ужин с армянской народной музыкой'],
      },
    },
    {
      day: 2,
      title: 'Khor Virap, Noravank & Areni',
      route: 'Yerevan – Khor Virap – Noravank – Areni – Goris',
      duration: 'full',
      description: 'Journey south through the fertile Ararat Plain, with the magnificent silhouette of Mount Ararat as your constant companion. Your first destination is Khor Virap Monastery, the most sacred site in Armenian Christianity. Continue through a spectacular red-rock gorge to Noravank Monastery. Visit Areni Cave and taste wines at a local winery before lunch at Matevosyan House.',
      highlights: ['Khor Virap Monastery — underground dungeon & Mt Ararat views', 'Noravank Monastery — crimson cliff setting', 'Areni Cave — 6,000-year-old wine press', 'Areni Winery tasting', 'Lunch at Matevosyan House'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Goris',
      image: '/images/luxury/armenia_day2.jpg',
      included: ['Wine tasting at Areni'],
      titleLocalized: { en: 'Khor Virap, Noravank & Areni', de: 'Chor Wirap, Norawank & Areni', ru: 'Хор Вирап, Нораванк и Арени' },
      descriptionLocalized: {
        en: 'Journey south through the fertile Ararat Plain, with the magnificent silhouette of Mount Ararat as your constant companion. Your first destination is Khor Virap Monastery, the most sacred site in Armenian Christianity. Continue through a spectacular red-rock gorge to Noravank Monastery. Visit Areni Cave and taste wines at a local winery before lunch at Matevosyan House.',
        de: 'Reise nach Süden durch die fruchtbare Ararat-Ebene mit der majestätischen Silhouette des Berges Ararat als ständigen Begleiter. Ihr erstes Ziel ist das Chor-Wirap-Kloster, die heiligste Stätte des armenischen Christentums. Weiter durch eine spektakuläre Rotstein-Schlucht zum Norawank-Kloster. Besuch der Areni-Höhle und Weinverkostung vor dem Mittagessen im Haus Matewosjan.',
        ru: 'Путешествие на юг через плодородную Араратскую равнину с величественным силуэтом горы Арарат как постоянным спутником. Первая остановка — монастырь Хор Вирап, самая священная святыня армянского христианства. Далее через живописное ущелье из красного камня к монастырю Нораванк. Посещение пещеры Арени и дегустация вин перед обедом в доме Матеvosянов.',
      },
      highlightsLocalized: {
        en: ['Khor Virap Monastery — underground dungeon & Mt Ararat views', 'Noravank Monastery — crimson cliff setting', 'Areni Cave — 6,000-year-old wine press', 'Areni Winery tasting', 'Lunch at Matevosyan House'],
        de: ['Chor-Wirap-Kloster — unterirdisches Verlies & Ararat-Blick', 'Norawank-Kloster — Rotstein-Schlucht', 'Areni-Höhle — 6.000 Jahre alte Weinpresse', 'Areni-Weinverkostung', 'Mittagessen im Haus Matewosjan'],
        ru: ['Монастырь Хор Вирап — подземелье и виды на Арарат', 'Монастырь Нораванк — ущелье из красного камня', 'Пещера Арени — 6000-летняя винодавильня', 'Дегустация вин в Арени', 'Обед в доме Матеvosянов'],
      },
    },
    {
      day: 3,
      title: 'Wings of Tatev & Carahunge',
      route: 'Goris – Tatev – Carahunge – Goris',
      duration: 'full',
      description: 'Take the Wings of Tatev, the world\'s longest reversible aerial tramway (5.7 km), which glides above the spectacular Vorotan River gorge. At the far end awaits the Tatev Monastery, a 9th-century fortress-like complex. Drive to Carahunge, the "Armenian Stonehenge" — a mysterious arrangement of over 200 basalt stones dating back 7,500 years.',
      highlights: ['Wings of Tatev — world\'s longest cable car (5.7 km)', 'Tatev Monastery — 9th-century scholarly centre', 'Carahunge — "Armenian Stonehenge" (7,500 years old)', 'Goris city walk'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Goris',
      image: '/images/luxury/armenia_day3.jpg',
      included: ['Wings of Tatev cable car'],
      titleLocalized: { en: 'Wings of Tatev & Carahunge', de: 'Flügel von Tatev & Karahundsch', ru: 'Крылья Татева и Караундж' },
      descriptionLocalized: {
        en: 'Take the Wings of Tatev, the world\'s longest reversible aerial tramway (5.7 km), which glides above the spectacular Vorotan River gorge. At the far end awaits the Tatev Monastery, a 9th-century fortress-like complex. Drive to Carahunge, the "Armenian Stonehenge" — a mysterious arrangement of over 200 basalt stones dating back 7,500 years.',
        de: 'Nehmen Sie die Flügel von Tatev, die längste reversible Seilbahn der Welt (5,7 km), die über die spektakuläre Vorotan-Schlucht gleitet. Am anderen Ende erwartet Sie das Tatev-Kloster, eine festungsähnliche Anlage des 9. Jahrhunderts. Fahrt nach Karahundsch, dem „armenischen Stonehenge" — eine mysteriöse Anordnung von über 200 Basaltsteinen, die 7.500 Jahre alt sind.',
        ru: 'Прокатитесь на «Крыльях Татева» — самой длинной в мире обратимой канатной дороге (5,7 км), парящей над впечатляющим ущельем реки Воротан. На другом конце — монастырь Татев, комплекс IX века, похожий на крепость. Поездка к Караунджу — «армянскому Стоунхенджу», таинственному сооружению из более чем 200 базальтовых камней возрастом 7500 лет.',
      },
      highlightsLocalized: {
        en: ['Wings of Tatev — world\'s longest cable car (5.7 km)', 'Tatev Monastery — 9th-century scholarly centre', 'Carahunge — "Armenian Stonehenge" (7,500 years old)', 'Goris city walk'],
        de: ['Flügel von Tatev — längste Seilbahn der Welt (5,7 km)', 'Tatev-Kloster — Gelehrtenzentrum des 9. Jh.', 'Karahundsch — „Armenisches Stonehenge" (7.500 Jahre alt)', 'Stadtrundgang Goris'],
        ru: ['Крылья Татева — самая длинная канатная дорога мира (5,7 км)', 'Монастырь Татев — научный центр IX века', 'Караундж — «Армянский Стоунхендж» (7500 лет)', 'Прогулка по Горису'],
      },
    },
    {
      day: 4,
      title: 'Khndzoresk & Jermuk Spa Town',
      route: 'Goris – Khndzoresk – Jermuk',
      duration: 'full',
      description: 'Begin at Khndzoresk, a vast network of cave dwellings carved into the hillside, accessible via a 160-metre swinging suspension bridge. Continue to Jermuk, Armenia\'s premier spa town, famous for its mineral springs and the spectacular 68-metre Jermuk Waterfall.',
      highlights: ['Khndzoresk cave village & swinging bridge (160 m)', 'Jermuk spa town — mineral springs', 'Jermuk Waterfall — 68-metre cascade', 'Jermuk city walk & mineral water gallery'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Jermuk',
      image: '/images/luxury/armenia_day4.jpg',
      titleLocalized: { en: 'Khndzoresk & Jermuk Spa Town', de: 'Chndsoresk & Kurort Dschermuk', ru: 'Хндзореск и курорт Джермук' },
      descriptionLocalized: {
        en: 'Begin at Khndzoresk, a vast network of cave dwellings carved into the hillside, accessible via a 160-metre swinging suspension bridge. Continue to Jermuk, Armenia\'s premier spa town, famous for its mineral springs and the spectacular 68-metre Jermuk Waterfall.',
        de: 'Beginnen Sie in Chndsoresk, einem weitläufigen Netz von Höhlenwohnungen, die über eine 160 Meter lange Hängebrücke erreichbar sind. Weiter nach Dschermuk, dem führenden Kurort Armeniens, bekannt für seine Mineralquellen und den spektakulären 68 Meter hohen Dschermuk-Wasserfall.',
        ru: 'Начните с Хндзореска — обширной сети пещерных жилищ, доступных через 160-метровый подвесной мост. Продолжите в Джермук — главный курорт Армении, знаменитый минеральными источниками и великолепным 68-метровым водопадом.',
      },
      highlightsLocalized: {
        en: ['Khndzoresk cave village & swinging bridge (160 m)', 'Jermuk spa town — mineral springs', 'Jermuk Waterfall — 68-metre cascade', 'Jermuk city walk & mineral water gallery'],
        de: ['Chndsoresk-Höhlendorf & Hängebrücke (160 m)', 'Kurort Dschermuk — Mineralquellen', 'Dschermuk-Wasserfall — 68 Meter Kaskade', 'Dschermuk-Stadtrundgang & Mineralwassergalerie'],
        ru: ['Пещерная деревня Хндзореск и подвесной мост (160 м)', 'Курорт Джермук — минеральные источники', 'Водопад Джермука — 68-метровый каскад', 'Прогулка по Джермуку и галерея минеральных вод'],
      },
    },
    {
      day: 5,
      title: 'Selim Pass, Farm Visit & Fish BBQ Masterclass',
      route: 'Jermuk – Shatin – Selim Pass – Dilijan',
      duration: 'full',
      description: 'Stop at the Shatin Bezoar Goat Observation Point to spot the rare Bezoar ibex. Continue over the Selim Pass to the Orbelian Caravanserai (1332). Visit the Mikayelyan family farm, then enjoy a fish BBQ masterclass at Tsaghkunk Chef House.',
      highlights: ['Shatin Bezoar goat observation point', 'Orbelian Caravanserai (1332) — Silk Road relic', 'Mikayelyan family farm visit', 'Fish BBQ masterclass at Tsaghkunk Chef House'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Dilijan',
      image: '/images/luxury/armenia_day5.jpg',
      included: ['Bezoar goat observation', 'Fish BBQ masterclass'],
      titleLocalized: { en: 'Selim Pass, Farm Visit & Fish BBQ Masterclass', de: 'Selim-Pass, Hofbesuch & Fisch-BBQ-Kochkurs', ru: 'Селимский перевал, визит на ферму и мастер-класс BBQ из рыбы' },
      descriptionLocalized: {
        en: 'Stop at the Shatin Bezoar Goat Observation Point to spot the rare Bezoar ibex. Continue over the Selim Pass to the Orbelian Caravanserai (1332). Visit the Mikayelyan family farm, then enjoy a fish BBQ masterclass at Tsaghkunk Chef House.',
        de: 'Halt am Bezoar-Ziegen-Beobachtungspunkt in Schatin, um die seltene Bezoar-Steinbockziege zu erspähen. Weiter über den Selim-Pass zum Orbelian-Karawanserei (1332). Besuch der Mikajelan-Familienfarm, dann ein Fisch-BBQ-Kochkurs im Tsaghkunk-Chef-Haus.',
        ru: 'Остановка на смотровой площадке безоаровых козлов в Шатине, чтобы увидеть редкого безоарового козла. Пересечение Селимского перевала и посещение караван-сая Орбелянов (1332). Визит на семейную ферму Микаелянов, затем мастер-класс по приготовлению рыбы на гриле в доме шеф-повара Цагкунк.',
      },
      highlightsLocalized: {
        en: ['Shatin Bezoar goat observation point', 'Orbelian Caravanserai (1332) — Silk Road relic', 'Mikayelyan family farm visit', 'Fish BBQ masterclass at Tsaghkunk Chef House'],
        de: ['Bezoar-Ziegen-Beobachtungspunkt Schatin', 'Orbelian-Karawanserei (1332) — Seidenstraße-Relikt', 'Besuch der Mikajelan-Familienfarm', 'Fisch-BBQ-Kochkurs im Tsaghkunk-Chef-Haus'],
        ru: ['Смотровая площадка безоаровых козлов в Шатине', 'Караван-сарай Орбелянов (1332) — наследие Шёлкового пути', 'Визит на семейную ферму Микаелянов', 'Мастер-класс по приготовлению рыбы на гриле в Цагкунк'],
      },
    },
    {
      day: 6,
      title: 'Mount Dimats Offroad Adventure',
      route: 'Dilijan – Mount Dimats – Haghartsin – Dilijan',
      duration: 'full',
      description: 'An exhilarating offroad adventure as 4x4 vehicles take you up Mount Dimats, reaching 2,378 metres. Picnic at the summit before descending to visit the Haghartsin Monastery, a 13th-century complex nestled in a forested valley.',
      highlights: ['Offroad adventure to Mount Dimats (2,378 m)', 'Ijevan mountain range panoramic views', 'Alpine meadow picnic', 'Haghartsin Monastery — forest sanctuary'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Dilijan',
      image: '/images/luxury/armenia_day6.jpg',
      included: ['Offroad Dimats adventure'],
      titleLocalized: { en: 'Mount Dimats Offroad Adventure', de: 'Offroad-Abenteuer Berg Dimaz', ru: 'Внедорожное приключение на гору Димац' },
      descriptionLocalized: {
        en: 'An exhilarating offroad adventure as 4x4 vehicles take you up Mount Dimats, reaching 2,378 metres. Picnic at the summit before descending to visit the Haghartsin Monastery, a 13th-century complex nestled in a forested valley.',
        de: 'Ein atemberaubendes Offroad-Abenteuer: 4x4-Fahrzeuge bringen Sie auf den Berg Dimaz bis 2.378 Meter. Picknick auf dem Gipfel, bevor Sie zum Haghartsin-Kloster hinabsteigen, einem Komplex des 13. Jahrhunderts in einem bewaldeten Tal.',
        ru: 'Захватывающее внедорожное приключение: автомобили 4x4 поднимут вас на гору Димац на высоту 2378 метров. Пикник на вершине перед спуском к монастырю Ахарцин — комплексу XIII века в лесистой долине.',
      },
      highlightsLocalized: {
        en: ['Offroad adventure to Mount Dimats (2,378 m)', 'Ijevan mountain range panoramic views', 'Alpine meadow picnic', 'Haghartsin Monastery — forest sanctuary'],
        de: ['Offroad-Abenteuer auf den Berg Dimaz (2.378 m)', 'Panoramablick auf das Idschewan-Gebirge', 'Almwiesen-Picknick', 'Haghartsin-Kloster — Wald-Heiligtum'],
        ru: ['Внедорожное приключение на гору Димац (2378 м)', 'Панорамные виды на Иджеванский хребет', 'Пикник на альпийском лугу', 'Монастырь Ахарцин — лесное святилище'],
      },
    },
    {
      day: 7,
      title: 'Lake Sevan, Garni & Geghard',
      route: 'Dilijan – Sevan Lake – Garni – Geghard – Yerevan',
      duration: 'full',
      description: 'Drive to Lake Sevan, the "Jewel of Armenia." A boat ride offers breathtaking views. Visit the Geghard Monastery, a UNESCO World Heritage Site. In Garni, participate in a Lavash-making masterclass and visit the 1st-century pagan temple. Return to Yerevan.',
      highlights: ['Lake Sevan — "Jewel of Armenia"', 'Boat ride on Lake Sevan', 'Geghard Monastery — UNESCO World Heritage Site', 'Lavash-making masterclass in Garni', 'Garni pagan temple — 1st century AD'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Yerevan',
      image: '/images/luxury/armenia_day7.jpg',
      included: ['Boat ride Lake Sevan', 'Lavash-making masterclass'],
      titleLocalized: { en: 'Lake Sevan, Garni & Geghard', de: 'Sewan-See, Garni & Geghard', ru: 'Озеро Севан, Гарни и Гегард' },
      descriptionLocalized: {
        en: 'Drive to Lake Sevan, the "Jewel of Armenia." A boat ride offers breathtaking views. Visit the Geghard Monastery, a UNESCO World Heritage Site. In Garni, participate in a Lavash-making masterclass and visit the 1st-century pagan temple. Return to Yerevan.',
        de: 'Fahrt zum Sewan-See, dem „Juwel Armeniens\". Eine Bootsfahrt bietet atemberaubende Ausblicke. Besuch des Geghard-Klosters, eines UNESCO-Weltkulturerbes. In Garni nehmen Sie an einem Lawasch-Kochkurs teil und besuchen den heidnischen Tempel aus dem 1. Jahrhundert. Rückkehr nach Jerevan.',
        ru: 'Поездка к озеру Севан — «Жемчужине Армении». Катание на лодке открывает захватывающие виды. Посещение монастыря Гегард, объекта Всемирного наследия ЮНЕСКО. В Гарни — мастер-класс по выпечке лаваша и посещение языческого храма I века. Возвращение в Ереван.',
      },
      highlightsLocalized: {
        en: ['Lake Sevan — "Jewel of Armenia"', 'Boat ride on Lake Sevan', 'Geghard Monastery — UNESCO World Heritage Site', 'Lavash-making masterclass in Garni', 'Garni pagan temple — 1st century AD'],
        de: ['Sewan-See — „Juwel Armeniens"', 'Bootsfahrt auf dem Sewan-See', 'Geghard-Kloster — UNESCO-Weltkulturerbe', 'Lawasch-Kochkurs in Garni', 'Heidnischer Tempel von Garni — 1. Jh. n. Chr.'],
        ru: ['Озеро Севан — «Жемчужина Армении»', 'Катание на лодке по Севану', 'Монастырь Гегард — Всемирное наследие ЮНЕСКО', 'Мастер-класс по выпечке лаваша в Гарни', 'Языческий храм Гарни — I век н.э.'],
      },
    },
    {
      day: 8,
      title: 'Amberd Fortress & Byurakan Observatory',
      route: 'Yerevan – Amberd – Byurakan – Yerevan',
      duration: 'full',
      description: 'A day of elevation. Drive to Mount Aragats for a hike to Amberd Fortress, perched at 2,300 metres — "fortress in the clouds." Participate in a Sujukh-making masterclass at Chir\'s House. In the evening, visit the Byurakan Observatory, one of the world\'s premier astronomical research centres.',
      highlights: ['Hike to Amberd Fortress on Mt Aragats (3–4 hours)', 'Amberd — "Fortress in the Clouds" (7th c.)', 'Sujukh-making masterclass at Chir\'s House', 'Byurakan Observatory — 1-m Schmidt telescope', 'Dinner under the stars in Byurakan'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Yerevan',
      image: '/images/luxury/armenia_day8.jpg',
      included: ['Sujukh-making masterclass'],
      titleLocalized: { en: 'Amberd Fortress & Byurakan Observatory', de: 'Festung Amberd & Bjurakan-Observatorium', ru: 'Крепость Амберд и Бюраканская обсерватория' },
      descriptionLocalized: {
        en: 'A day of elevation. Drive to Mount Aragats for a hike to Amberd Fortress, perched at 2,300 metres — "fortress in the clouds." Participate in a Sujukh-making masterclass at Chir\'s House. In the evening, visit the Byurakan Observatory, one of the world\'s premier astronomical research centres.',
        de: 'Ein Tag der Höhe. Fahrt zum Berg Aragaz für eine Wanderung zur Festung Amberd auf 2.300 Metern — „Festung in den Wolken". Teilnahme an einem Sudschnukh-Kochkurs im Haus von Tschir. Am Abend Besuch des Bjurakan-Observatoriums, eines der führenden astronomischen Forschungszentren der Welt.',
        ru: 'День высоты. Поездка на гору Арагац для похода к крепости Амберд на высоте 2300 м — «крепость в облаках». Мастер-класс по приготовлению суджука в доме Чира. Вечером — посещение Бюраканской обсерватории, одного из ведущих астрономических исследовательских центров мира.',
      },
      highlightsLocalized: {
        en: ['Hike to Amberd Fortress on Mt Aragats (3–4 hours)', 'Amberd — "Fortress in the Clouds" (7th c.)', 'Sujukh-making masterclass at Chir\'s House', 'Byurakan Observatory — 1-m Schmidt telescope', 'Dinner under the stars in Byurakan'],
        de: ['Wanderung zur Festung Amberd am Berg Aragaz (3–4 Stunden)', 'Amberd — „Festung in den Wolken" (7. Jh.)', 'Sudschnukh-Kochkurs im Haus von Tschir', 'Bjurakan-Observatorium — 1-m-Schmidt-Teleskop', 'Abendessen unter den Sternen in Bjurakan'],
        ru: ['Пеший поход к крепости Амберд на г. Арагац (3–4 часа)', 'Амберд — «Крепость в облаках» (VII в.)', 'Мастер-класс по приготовлению суджука в доме Чира', 'Бюраканская обсерватория — 1-м телескоп Шмидта', 'Ужин под звёздами в Бюракане'],
      },
    },
    {
      day: 9,
      title: 'Etchmiadzin & Zvartnots',
      route: 'Yerevan – Etchmiadzin – Zvartnots – Yerevan',
      duration: 'full',
      description: 'Visit the spiritual heart of Armenia at Etchmiadzin, the oldest state-built Christian cathedral in the world. Enjoy lunch at Machanents House. Conclude at Zvartnots Cathedral, a 7th-century architectural marvel and UNESCO World Heritage Site.',
      highlights: ['Etchmiadzin Cathedral — oldest Christian cathedral (301–303 AD)', 'Treasury with Holy Lance & Noah\'s Ark fragment', 'Lunch at Machanents House', 'Zvartnots Cathedral — 7th-century circular masterpiece'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Yerevan',
      image: '/images/luxury/armenia_day9.jpg',
      titleLocalized: { en: 'Etchmiadzin & Zvartnots', de: 'Etschmiadsin & Swartnoz', ru: 'Эчмиадзин и Звартноц' },
      descriptionLocalized: {
        en: 'Visit the spiritual heart of Armenia at Etchmiadzin, the oldest state-built Christian cathedral in the world. Enjoy lunch at Machanents House. Conclude at Zvartnots Cathedral, a 7th-century architectural marvel and UNESCO World Heritage Site.',
        de: 'Besuchen Sie das spirituelle Herz Armeniens in Etschmiadsin, der ältesten staatlich erbauten christlichen Kathedrale der Welt. Genießen Sie das Mittagessen im Machanents-Haus. Abschluss mit der Swartnoz-Kathedrale, einem architektonischen Wunder des 7. Jahrhunderts und UNESCO-Weltkulturerbe.',
        ru: 'Посетите духовное сердце Армении — Эчмиадзин, старейший в мире христианский кафедральный собор, построенный государством. Насладитесь обедом в доме Мачаненц. Завершение у собора Звартноц — архитектурного чуда VII века и объекта Всемирного наследия ЮНЕСКО.',
      },
      highlightsLocalized: {
        en: ['Etchmiadzin Cathedral — oldest Christian cathedral (301–303 AD)', 'Treasury with Holy Lance & Noah\'s Ark fragment', 'Lunch at Machanents House', 'Zvartnots Cathedral — 7th-century circular masterpiece'],
        de: ['Etschmiadsin-Kathedrale — älteste christliche Kathedrale (301–303 n. Chr.)', 'Schatzkammer mit Heiliger Lanze & Noah-Arche-Fragment', 'Mittagessen im Machanents-Haus', 'Swartnoz-Kathedrale — kreisförmiges Meisterwerk des 7. Jh.'],
        ru: ['Собор Эчмиадзин — старейший христианский собор (301–303 гг.)', 'Сокровищница со Святым Копьём и фрагментом Ноева Ковчега', 'Обед в доме Мачаненц', 'Собор Звартноц — круговой шедевр VII века'],
      },
    },
    {
      day: 10,
      title: 'Departure',
      route: 'Yerevan',
      duration: 'departure',
      description: 'After breakfast, transfer to Zvartnots International Airport for your departure flight. As you leave Armenia, carry with you the flavours of Lavash and Tolma, the echoes of folk songs, the majesty of Mount Ararat, and the warmth of the people who shared their homeland with you — until we meet again.',
      highlights: ['Private airport transfer'],
      meals: ['Breakfast'],
      image: '/images/luxury/armenia_day10.jpg',
      included: ['Private airport transfer'],
      titleLocalized: { en: 'Departure', de: 'Abreise', ru: 'Отбытие' },
      descriptionLocalized: {
        en: 'After breakfast, transfer to Zvartnots International Airport for your departure flight. As you leave Armenia, carry with you the flavours of Lavash and Tolma, the echoes of folk songs, the majesty of Mount Ararat, and the warmth of the people who shared their homeland with you — until we meet again.',
        de: 'Nach dem Frühstück Transfer zum Flughafen Swartnoz für Ihren Abflug. Nehmen Sie die Aromen von Lawasch und Tolma mit, das Echo von Volksliedern, die Majestät des Berges Ararat und die Wärme der Menschen, die ihre Heimat mit Ihnen geteilt haben — bis wir uns wiedersehen.',
        ru: 'После завтрака — трансфер в международный аэропорт Звартноц к вашему вылету. Увозите с собой вкус лаваша и толмы, отзвуки народных песен, величие горы Арарат и тепло людей, разделивших с вами свою родину — до новой встречи.',
      },
      highlightsLocalized: {
        en: ['Private airport transfer'],
        de: ['Privater Flughafentransfer'],
        ru: ['Индивидуальный трансфер в аэропорт'],
      },
    },
  ],
  pricing: [
    { pax: 2, price4Star: 2980, price3Star: 2450 },
    { pax: 4, price4Star: 2250, price3Star: 1950 },
    { pax: 8, price4Star: 1850, price3Star: 1600 },
    { pax: 10, price4Star: 1750, price3Star: 1550 },
    { pax: 12, price4Star: 1650, price3Star: 1450 },
  ],
  singleSupplement: { price4Star: 620, price3Star: 480 },
  included: [
    'Airport transfers (arrival and departure)',
    'Transportation throughout the tour',
    'Professional German-speaking guide for the entire duration',
    'All entrance fees as per itinerary',
    'Welcome dinner with Armenian folk music (Day 1)',
    'Wine tasting at Areni Winery (Day 2)',
    'Cheese tasting in Noratus',
    'Brandy tasting at ARARAT Brandy Factory (Day 1)',
    'Fish BBQ masterclass at Tsaghkunk Chef House (Day 5)',
    'Offroad adventure to Mount Dimats (Day 6)',
    'Lavash-making masterclass in Garni (Day 7)',
    'Bezoar goat observation at Shatin (Day 5)',
    'Sujukh-making masterclass at Chir\'s House (Day 8)',
    'Boat ride on Lake Sevan (Day 7)',
    'Accommodation in Double rooms as specified',
    'Full board (all meals throughout the tour)',
    'Bottled water throughout the tour',
  ],
  excluded: [
    'International flight tickets',
    'Visa fees (if applicable)',
    'Single room supplement (€620 / €480)',
    'Additional fees not mentioned in the itinerary',
    'Personal expenses and gratuities',
  ],
  paymentPolicy: [
    'A 30% deposit is required at the time of booking, plus a €18 transaction fee',
    'The remaining balance is due 5 days before the departure date',
    'Payments can be made by bank transfer or credit card',
  ],
  cancellationPolicy: [
    'More than 30 days before departure: full refund minus non-recoverable costs',
    '15 to 30 days before departure: 50% refund of the tour price',
    'Less than 15 days before departure: no refund',
    'In case of force majeure: rescheduling at no additional cost, or full refund minus non-recoverable costs',
  ],
  images: [
    '/images/luxury/armenia-hero.jpg',
    '/images/luxury/armenia_day1.jpg',
    '/images/luxury/armenia_day2.jpg',
    '/images/luxury/armenia_day3.jpg',
    '/images/luxury/armenia_day4.jpg',
    '/images/luxury/armenia_day5.jpg',
    '/images/luxury/armenia_day6.jpg',
    '/images/luxury/armenia_day7.jpg',
    '/images/luxury/armenia_day8.jpg',
    '/images/luxury/armenia_day9.jpg',
    '/images/luxury/armenia_day10.jpg',
  ],
  hotels: [
    {
      category: '4* Superior',
      hotels: [
        { city: 'Yerevan', name: 'Yerevan Opera Suite Hotel 4*' },
        { city: 'Goris', name: 'BMG Hotel' },
        { city: 'Jermuk', name: 'Jermuk Grand Resort' },
        { city: 'Dilijan', name: 'Dilijazz Hotel' },
      ],
    },
    {
      category: '3* & 4* Standard',
      hotels: [
        { city: 'Yerevan', name: 'Felinger Hotel 4*' },
        { city: 'Goris', name: 'Yeghegvnut Hotel 3*' },
        { city: 'Jermuk', name: 'Verona Resort 4*' },
        { city: 'Dilijan', name: 'Arevi Gosh 3*' },
      ],
    },
  ],
  includedLocalized: {
    en: ['Airport transfers (arrival and departure)', 'Transportation throughout the tour', 'Professional German-speaking guide for the entire duration', 'All entrance fees as per itinerary', 'Welcome dinner with Armenian folk music (Day 1)', 'Wine tasting at Areni Winery (Day 2)', 'Cheese tasting in Noratus', 'Brandy tasting at ARARAT Brandy Factory (Day 1)', 'Fish BBQ masterclass at Tsaghkunk Chef House (Day 5)', 'Offroad adventure to Mount Dimats (Day 6)', 'Lavash-making masterclass in Garni (Day 7)', 'Bezoar goat observation at Shatin (Day 5)', 'Sujukh-making masterclass at Chir\'s House (Day 8)', 'Boat ride on Lake Sevan (Day 7)', 'Accommodation in Double rooms as specified', 'Full board (all meals throughout the tour)', 'Bottled water throughout the tour'],
    de: ['Flughafentransfers (Ankunft und Abreise)', 'Transport während der gesamten Tour', 'Deutschsprachiger Guide für die gesamte Dauer', 'Alle Eintrittsgelder laut Programm', 'Willkommensabendessen mit armenischer Volksmusik (Tag 1)', 'Weinverkostung im Areni-Weingut (Tag 2)', 'Käseverkostung in Noratus', 'Brandy-Verkostung bei ARARAT-Fabrik (Tag 1)', 'Fisch-BBQ-Kochkurs im Tsaghkunk-Chef-Haus (Tag 5)', 'Offroad-Abenteuer Berg Dimaz (Tag 6)', 'Lawasch-Kochkurs in Garni (Tag 7)', 'Bezoar-Ziegen-Beobachtung in Schatin (Tag 5)', 'Sudschnukh-Kochkurs im Haus von Tschir (Tag 8)', 'Bootsfahrt auf dem Sewan-See (Tag 7)', 'Unterkunft in Doppelzimmern wie angegeben', 'Vollpension (alle Mahlzeiten während der Tour)', 'Flaschenwasser während der gesamten Tour'],
    ru: ['Трансферы из/в аэропорт (прибытие и отбытие)', 'Транспорт на протяжении всего тура', 'Профессиональный немецкоговорящий гид на весь период', 'Все входные билеты по программе', 'Приветственный ужин с армянской народной музыкой (День 1)', 'Дегустация вин в Арени (День 2)', 'Дегустация сыра в Нратусе', 'Дегустация коньяка на заводе ARARAT (День 1)', 'Мастер-класс по приготовлению рыбы на гриле в Цагкунк (День 5)', 'Внедорожное приключение на гору Димац (День 6)', 'Мастер-класс по выпечке лаваша в Гарни (День 7)', 'Наблюдение за безоаровыми козлами в Шатине (День 5)', 'Мастер-класс по приготовлению суджука в доме Чира (День 8)', 'Катание на лодке по озеру Севан (День 7)', 'Проживание в двухместных номерах по программе', 'Полный пансион (все meals на протяжении тура)', 'Питьевая вода в бутылках на протяжении всего тура'],
  },
  excludedLocalized: {
    en: ['International flight tickets', 'Visa fees (if applicable)', 'Single room supplement (€620 / €480)', 'Additional fees not mentioned in the itinerary', 'Personal expenses and gratuities'],
    de: ['Internationale Flugtickets', 'Visagebühren (falls zutreffend)', 'Einzelzimmerzuschlag (620 € / 480 €)', 'Zusätzliche Gebühren, die nicht im Programm erwähnt sind', 'Persönliche Ausgaben und Trinkgelder'],
    ru: ['Авиабилеты международных рейсов', 'Визовые сборы (при необходимости)', 'Доплата за одноместное размещение (620 € / 480 €)', 'Дополнительные сборы, не указанные в программе', 'Личные расходы и чаевые'],
  },
  paymentPolicyLocalized: {
    en: ['A 30% deposit is required at the time of booking, plus a €18 transaction fee', 'The remaining balance is due 5 days before the departure date', 'Payments can be made by bank transfer or credit card'],
    de: ['Eine Anzahlung von 30 % ist bei Buchung erforderlich, zzgl. einer Transaktionsgebühr von 18 €', 'Der Restbetrag ist 5 Tage vor dem Abreisedatum fällig', 'Zahlungen per Banküberweisung oder Kreditkarte möglich'],
    ru: ['При бронировании требуется депозит 30% плюс комиссия за транзакцию 18 €', 'Остаток суммы подлежит оплате за 5 дней до даты отправления', 'Оплата возможна банковским переводом или кредитной картой'],
  },
  cancellationPolicyLocalized: {
    en: ['More than 30 days before departure: full refund minus non-recoverable costs', '15 to 30 days before departure: 50% refund of the tour price', 'Less than 15 days before departure: no refund', 'In case of force majeure: rescheduling at no additional cost, or full refund minus non-recoverable costs'],
    de: ['Mehr als 30 Tage vor Abreise: volle Rückerstattung abzüglich nicht wiederbeschaffbarer Kosten', '15 bis 30 Tage vor Abreise: 50 % Rückerstattung des Tourpreises', 'Weniger als 15 Tage vor Abreise: keine Rückerstattung', 'Bei höherer Gewalt: Umbuchung ohne zusätzliche Kosten oder volle Rückerstattung abzüglich nicht wiederbeschaffbarer Kosten'],
    ru: ['Более чем за 30 дней до отправления: полный возврат за вычетом невозмещаемых расходов', 'За 15–30 дней до отправления: возврат 50% стоимости тура', 'Менее чем за 15 дней до отправления: возврат не предусмотрен', 'При форс-мажоре: перенос дат без доплат или полный возврат за вычетом невозмещаемых расходов'],
  },
}

// =============================================================================
// Exports
// =============================================================================

export const luxuryTours: LuxuryTour[] = [caucasusTour, armeniaTour]

export function getLuxuryTourById(id: string): LuxuryTour | undefined {
  return luxuryTours.find((tour) => tour.id === id)
}
