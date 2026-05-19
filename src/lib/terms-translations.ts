export interface NestedItem {
  text: string
  subItems: string[]
}

export type RegulationItem = string | NestedItem

export interface TourRegulations {
  title: string
  bookingConditionsTitle: string
  bookingConditions: RegulationItem[]
  cancellationTitle: string
  cancellation: RegulationItem[]
}

export const regulationsData: Record<string, { group: TourRegulations; private: TourRegulations; outgoing: TourRegulations }> = {
  en: {
    group: {
      title: 'Group Tours',
      bookingConditionsTitle: '1. Booking conditions',
      bookingConditions: [
        'Group tours are confirmed at least 1 day in advance, depending on the number of participants.',
        'The minimum number of participants required to organize the tour is indicated in the separate description section of each tour.',
        'Payments for group tours are accepted only in advance by bank transfer or at ONE WAY Tour office (Parpetsi 16).',
        'Russian-speaking and English-speaking participants can participate in group tours only with the service of a guide in the corresponding language, which is provided with a mandatory surcharge.',
        'The average duration of group tours is indicated on the website, but depending on the situation, the duration of the tour can be shortened or increased by 1-2 hours.',
        'If the child (0-7 years) does not occupy a separate seat in the car, they can participate in the tour for free. If a separate seat is required, the full price of the group tour is paid for the child regardless of age.',
        'Desired seats in the car are not reserved in advance.',
        'Participants are expected to be at the Komitas State Conservatory yard (Sayat-Nova 1a) at least 20 minutes before the start of the tour for proper check-in and seating.',
        'In case of a delay of 5 minutes or more after the start of the group tour, the Company is not obliged to wait for the late participant. The price of the booked tour will not be refunded in case of not participating due to lateness.',
        'The use of any type of food, alcoholic beverages, tea, coffee, other beverages (except water), or tobacco products is strictly prohibited during the group tour in the vehicle.',
        'The presence of an exit stamp in the passport of citizens of the Republic of Armenia is mandatory for participating in a group tour to the Republic of Georgia.',
        'For group tours to the Republic of Georgia, citizens of some countries must obtain a Republic of Georgia visa, and in some cases, also a Republic of Armenia visa for return. The company does not provide visa assistance. Issuance of visas is based on international agreements between the Republic of Georgia, the Republic of Armenia, and the participant\'s country of citizenship.',
        'In case of any passport and/or document issues at the Armenian-Georgian border, the company is not obliged to wait more than 15-30 minutes during the group tour.',
        {
          text: 'Participants are recommended to wear sports shoes, comfortable clothes, and bring the following items for group tours:',
          subItems: [
            'Protective cap, Sunglasses, Warm clothes, Raincoat, Sunscreen',
            'For hiking tours: hiking sticks, medicine box, flashlight, replacement shoes, enough food and water'
          ]
        },
        'Weather conditions may vary between attractions and Yerevan.',
        'Participants should avoid wearing revealing clothing when visiting churches. Women should bring a headscarf.',
        'Participants are not allowed to take pets with them on group tours.',
        'The Company is not responsible for belongings left, lost, or damaged during group tours, either in the vehicles or at the visited sites.',
        'For some group tours, the vehicle may not be able to reach the destination, requiring walking and/or climbing. Participants with difficulty walking or climbing are advised to check in advance about such terrains.',
        'In addition to the stops mentioned in the group tour route, additional stops are possible only with the agreement of all group participants.',
        'Participants must follow the guide\'s instructions during the tour. The Company is not responsible for the participant’s life or safety if instructions are not followed.'
      ],
      cancellationTitle: '2. Cancellation and changes to the tour program',
      cancellation: [
        'In case of cancellation of the booked group tour at least 24 hours before participation, the amount paid for the reservation will be returned to the Client.',
        'If the reservation of the tour confirmed by the Client and the Company is canceled in violation of the specified period, the payment for the reservation will be charged in full.',
        'In the event of adverse weather conditions or force majeure, the Company reserves the right to change, shorten, or cancel the group tour program for safety reasons.',
        'If the Company cancels the group tour, the full cost of the purchased tour will be returned to the Client.',
        'If the Company replaces visited locations or services provided during the tour with equivalent alternatives due to the aforementioned circumstances, it bears no further obligations to the Client and does not return any money.',
        'In case of inadequate replacement or program reduction, the Company will return to the Client the difference in value between the purchased group tour and the actual implemented program.'
      ]
    },
    private: {
      title: 'Private Tours',
      bookingConditionsTitle: '1. Booking conditions',
      bookingConditions: [
        'One-day individual tours must be booked at least 3 days in advance.',
        'Payments for individual tours are accepted only in advance by bank transfer or at the ONE WAY Tour office (Parpetsi 16).',
        'The average duration of one-day tours is indicated on the website, but depending on circumstances, the duration may be shortened or extended by 1-2 hours. If the guest requires an additional 2 or more hours, an extra fee of 5000 drams per hour will be charged.',
        'Individual tours can begin from the guest\'s address within Yerevan.',
        'The use of food, alcoholic beverages, tea, coffee, other beverages (except water), or tobacco products is strictly prohibited in the vehicle during the tour.',
        'Participants from certain countries may need to obtain a Republic of Georgia visa, and in some cases, a Republic of Armenia visa for return when on an individual tour to Georgia. The company does not assist in obtaining visas, and issuance depends on international agreements between Georgia, Armenia, and the participant\'s home country.',
        {
          text: 'During individual excursions, participants are advised to wear athletic, closed shoes and comfortable clothing, and to bring:',
          subItems: [
            'Protective cap, Sunglasses, Warm clothes, Raincoat, Sunscreen',
            'Hiking sticks (for hiking tours), Medicine box, Flashlight, Replacement shoes, Adequate food and water'
          ]
        },
        'Weather conditions may vary between Yerevan and the tour locations.',
        'When visiting churches, it is recommended that both men and women avoid revealing clothing. Women are advised to bring a headscarf.',
        'The company is not responsible for lost, damaged, or left-behind items during individual tours, either in the vehicle or at the visited locations.',
        'For some tours, the vehicle may not be able to reach the destination, requiring participants to walk or climb. If participants have difficulty walking or climbing, it is advised to check for such conditions in advance.',
        'Additional stops, beyond those mentioned in the itinerary, are possible only by prior agreement.'
      ],
      cancellationTitle: '2. Cancellation and changes to the tour program',
      cancellation: [
        'If the booked individual tour is canceled at least 24 hours before the tour date, the amount paid for the reservation will be refunded to the Client.',
        'If the reservation is canceled by the Client after the specified period, the full payment for the tour will be charged.',
        'For additional services reserved along with the tour, the cancellation policy may vary depending on the type of service.',
        'In case of adverse weather conditions or force majeure, the Company reserves the right to modify, shorten, or cancel the individual tour for safety reasons.',
        'If the Company cancels the individual tour, the full amount paid for the tour will be refunded to the Client.',
        'If the Company replaces the visited places or services during the tour with equivalent alternatives due to the aforementioned circumstances, no refunds will be made. However, if the replacement or reduction is inadequate, the Company will refund the Client the difference in value between the purchased individual tour and the actual program delivered.'
      ]
    },
    outgoing: {
      title: 'Outgoing Tours',
      bookingConditionsTitle: '1. Booking conditions',
      bookingConditions: [
        'Tours are confirmed at least 1 day in advance, depending on the destination.',
        '30% of the package must be paid after the tour confirmation, with the remaining balance due 10 days before the flight.',
        'Payments for tours are accepted exclusively by bank transfer.'
      ],
      cancellationTitle: '2. Procedure for cancellation of reservations',
      cancellation: [
        'If the confirmed reservation is canceled by the Customer up to 31 days before the flight, the Commissioner will refund the entire cost of services within three working days.',
        'If the confirmed reservation is canceled 21 to 31 days before the flight, the Commissioner will not refund 30% of the cost of services.',
        'If the confirmed reservation is canceled 11 to 21 days before the flight, the Commissioner will not refund 50% of the cost of services.',
        'If the confirmed reservation is canceled less than 11 days before the flight, the Commissioner will not refund 100% of the cost of services.',
        {
          text: 'Cancellation conditions at the Commissioner\'s initiative:',
          subItems: [
            'If the confirmed reservation is canceled by the Commissioner\'s initiative, the Commissioner is obliged to return the full amount to the Client within 7 working days from the cancellation date.'
          ]
        }
      ]
    }
  },
  de: {
    group: {
      title: 'Gruppenreisen',
      bookingConditionsTitle: '1. Buchungsbedingungen',
      bookingConditions: [
        'Gruppenreisen werden mindestens 1 Tag im Voraus bestätigt, abhängig von der Teilnehmerzahl.',
        'Die für die Organisation der Tour erforderliche Mindestteilnehmerzahl ist im jeweiligen Beschreibungsabschnitt der Tour angegeben.',
        'Zahlungen für Gruppenreisen werden nur im Voraus per Banküberweisung oder im ONE WAY Tour-Büro (Parpetsi 16) akzeptiert.',
        'Russisch- und englischsprachige Teilnehmer können an Gruppenreisen nur mit einem Guide in der entsprechenden Sprache teilnehmen, was mit einem obligatorischen Aufpreis verbunden ist.',
        'Die durchschnittliche Dauer von Gruppenreisen ist auf der Website angegeben, kann sich jedoch je nach Situation um 1-2 Stunden verkürzen oder verlängern.',
        'Wenn das Kind (0-7 Jahre) keinen eigenen Sitzplatz im Fahrzeug beansprucht, kann es kostenlos an der Tour teilnehmen. Wird ein eigener Sitzplatz benötigt, ist für das Kind unabhängig vom Alter der volle Preis der Gruppenreise zu zahlen.',
        'Gewünschte Sitzplätze im Fahrzeug werden nicht im Voraus reserviert.',
        'Teilnehmer sollten sich mindestens 20 Minuten vor Beginn der Tour im Hof des Staatlichen Konservatoriums Komitas (Sayat-Nova 1a) zum Check-in und zur Sitzplatzvergabe einfinden.',
        'Bei einer Verspätung von 5 Minuten oder mehr nach Beginn der Gruppenreise ist das Unternehmen nicht verpflichtet, auf den verspäteten Teilnehmer zu warten. Der Preis der gebuchten Tour wird bei Nichtteilnahme wegen Verspätung nicht erstattet.',
        'Der Verzehr von jeglicher Art von Lebensmitteln, alkoholischen Getränken, Tee, Kaffee, anderen Getränken (außer Wasser) oder Tabakwaren im Fahrzeug während der Gruppenreise ist strengstens untersagt.',
        'Für die Teilnahme an einer Gruppenreise in die Republik Georgien ist ein Ausreisestempel im Reisepass von Staatsbürgern der Republik Armenien zwingend erforderlich.',
        'Für Gruppenreisen in die Republik Georgien müssen Bürger einiger Länder ein Visum für die Republik Georgien und in einigen Fällen auch ein Rückreisevisum für die Republik Armenien beantragen. Das Unternehmen bietet keine Visaunterstützung an. Die Erteilung von Visa basiert auf internationalen Abkommen zwischen der Republik Georgien, der Republik Armenien und dem Herkunftsland des Teilnehmers.',
        'Bei Pass- und/oder Dokumentenproblemen an der armenisch-georgischen Grenze ist das Unternehmen während der Gruppenreise nicht verpflichtet, länger als 15-30 Minuten zu warten.',
        {
          text: 'Den Teilnehmern wird empfohlen, Sportschuhe und bequeme Kleidung zu tragen und folgende Gegenstände für Gruppenreisen mitzubringen:',
          subItems: [
            'Schutzkappe, Sonnenbrille, warme Kleidung, Regenmantel, Sonnencreme',
            'Für Wandertouren: Wanderstöcke, Hausapotheke, Taschenlampe, Wechselschuhe, ausreichend Essen und Wasser'
          ]
        },
        'Die Wetterbedingungen können zwischen den Sehenswürdigkeiten und Jerewan variieren.',
        'Teilnehmer sollten beim Besuch von Kirchen auf freizügige Kleidung verzichten. Frauen sollten ein Kopftuch mitbringen.',
        'Teilnehmer dürfen keine Haustiere auf Gruppenreisen mitnehmen.',
        'Das Unternehmen haftet nicht für Gegenstände, die während der Gruppenreisen in den Fahrzeugen oder an den besuchten Orten zurückgelassen, verloren oder beschädigt werden.',
        'Bei einigen Gruppenreisen kann das Fahrzeug das Ziel möglicherweise nicht direkt erreichen, sodass Gehen und/oder Klettern erforderlich ist. Teilnehmern mit Geh- oder Kletterschwierigkeiten wird empfohlen, sich vorab über das Gelände zu informieren.',
        'Zusätzliche Stopps außerhalb der in der Route der Gruppenreise genannten sind nur mit Zustimmung aller Gruppenteilnehmer möglich.',
        'Teilnehmer müssen den Anweisungen des Guides während der Tour Folge leisten. Das Unternehmen haftet nicht für das Leben oder die Sicherheit des Teilnehmers, wenn die Anweisungen nicht befolgt werden.'
      ],
      cancellationTitle: '2. Stornierung und Änderungen des Tourprogramms',
      cancellation: [
        'Bei Stornierung der gebuchten Gruppenreise mindestens 24 Stunden vor der Teilnahme wird der für die Reservierung gezahlte Betrag an den Kunden zurückerstattet.',
        'Wird die vom Kunden und dem Unternehmen bestätigte Reservierung der Tour unter Verletzung der angegebenen Frist storniert, wird die Gebühr für die Reservierung in voller Höhe fällig.',
        'Bei ungünstigen Wetterbedingungen oder höherer Gewalt behält sich das Unternehmen das Recht vor, das Gruppenreise-Programm aus Sicherheitsgründen zu ändern, zu verkürzen oder abzusagen.',
        'Sagt das Unternehmen die Gruppenreise ab, wird dem Kunden der volle Preis der erworbenen Tour erstattet.',
        'Ersetzt das Unternehmen besuchte Orte oder während der Tour erbrachte Dienstleistungen aufgrund der vorgenannten Umstände durch gleichwertige Alternativen, entstehen ihm gegenüber dem Kunden keine weiteren Verpflichtungen und es erfolgt keine Rückerstattung.',
        'Im Falle eines unangemessenen Ersatzes oder einer Programmkürzung erstattet das Unternehmen dem Kunden die Wertdifferenz zwischen der erworbenen Gruppenreise und dem tatsächlich durchgeführten Programm.'
      ]
    },
    private: {
      title: 'Private Touren',
      bookingConditionsTitle: '1. Buchungsbedingungen',
      bookingConditions: [
        'Eintägige Individualtouren müssen mindestens 3 Tage im Voraus gebucht werden.',
        'Zahlungen für Individualtouren werden nur im Voraus per Banküberweisung oder im ONE WAY Tour-Büro (Parpetsi 16) akzeptiert.',
        'Die durchschnittliche Dauer von eintägigen Touren ist auf der Website angegeben, kann sich jedoch je nach Umständen um 1-2 Stunden verkürzen oder verlängern. Wenn der Gast zusätzliche 2 oder mehr Stunden benötigt, wird eine zusätzliche Gebühr von 5000 Dram pro Stunde erhoben.',
        'Individualtouren können an der Adresse des Gastes in Jerewan beginnen.',
        'Der Verzehr von Lebensmitteln, alkoholischen Getränken, Tee, Kaffee, anderen Getränken (außer Wasser) oder Tabakwaren im Fahrzeug während der Tour ist strengstens untersagt.',
        'Teilnehmer aus bestimmten Ländern müssen möglicherweise ein Visum für die Republik Georgien und in einigen Fällen ein Rückreisevisum für die Republik Armenien beantragen, wenn sie an einer Individualtour nach Georgien teilnehmen. Das Unternehmen leistet keine Unterstützung bei der Erlangung von Visa, und die Erteilung hängt von internationalen Abkommen zwischen Georgien, Armenien und dem Heimatland des Teilnehmers ab.',
        {
          text: 'Bei individuellen Ausflügen wird den Teilnehmern empfohlen, geschlossene Sportschuhe und bequeme Kleidung zu tragen und Folgendes mitzubringen:',
          subItems: [
            'Schutzkappe, Sonnenbrille, warme Kleidung, Regenmantel, Sonnencreme',
            'Wanderstöcke (für Wandertouren), Hausapotheke, Taschenlampe, Wechselschuhe, ausreichend Essen und Wasser'
          ]
        },
        'Die Wetterbedingungen können zwischen Jerewan und den Tourorten variieren.',
        'Beim Besuch von Kirchen wird empfohlen, dass sowohl Männer als auch Frauen freizügige Kleidung vermeiden. Frauen wird empfohlen, ein Kopftuch mitzubringen.',
        'Das Unternehmen haftet nicht für verlorene, beschädigte oder zurückgelassene Gegenstände während der Individualtouren, weder im Fahrzeug noch an den besuchten Orten.',
        'Bei einigen Touren kann das Fahrzeug das Ziel möglicherweise nicht direkt erreichen, sodass die Teilnehmer gehen oder klettern müssen. Wenn Teilnehmer Schwierigkeiten beim Gehen oder Klettern haben, wird empfohlen, sich vorab über diese Bedingungen zu informieren.',
        'Zusätzliche Stopps außerhalb des Reiseplans sind nur nach vorheriger Vereinbarung möglich.'
      ],
      cancellationTitle: '2. Stornierung und Änderungen des Tourprogramms',
      cancellation: [
        'Wird die gebuchte Individualtour mindestens 24 Stunden vor dem Tourdatum storniert, wird der für die Reservierung gezahlte Betrag an den Kunden zurückerstattet.',
        'Wird die Reservierung nach dem angegebenen Zeitraum vom Kunden storniert, wird die volle Gebühr für die Tour fällig.',
        'Für zusätzliche Dienstleistungen, die zusammen mit der Tour gebucht wurden, können die Stornierungsbedingungen je nach Art der Dienstleistung variieren.',
        'Bei ungünstigen Wetterbedingungen oder höherer Gewalt behält sich das Unternehmen das Recht vor, die Individualtour aus Sicherheitsgründen zu ändern, zu verkürzen oder abzusagen.',
        'Sagt das Unternehmen die Individualtour ab, wird der volle für die Tour gezahlte Betrag an den Kunden zurückerstattet.',
        'Ersetzt das Unternehmen die besuchten Orte oder Dienstleistungen während der Tour durch gleichwertige Alternativen, erfolgt keine Rückerstattung. Bei unzureichendem Ersatz oder Programmkürzung erstattet das Unternehmen dem Kunden jedoch die Wertdifferenz zwischen der erworbenen Individualtour und dem tatsächlich durchgeführten Programm.'
      ]
    },
    outgoing: {
      title: 'Auslandsreisen',
      bookingConditionsTitle: '1. Buchungsbedingungen',
      bookingConditions: [
        'Touren werden mindestens 1 Tag im Voraus bestätigt, je nach Reiseziel.',
        '30% des Reisepreises müssen nach der Bestätigung der Tour bezahlt werden, der Restbetrag ist 10 Tage vor dem Flug fällig.',
        'Zahlungen für Touren werden ausschließlich per Banküberweisung akzeptiert.'
      ],
      cancellationTitle: '2. Verfahren zur Stornierung von Reservierungen',
      cancellation: [
        'Wird die bestätigte Reservierung vom Kunden bis zu 31 Tage vor dem Flug storniert, erstattet der Veranstalter den vollen Betrag innerhalb von drei Werktagen.',
        'Wird die bestätigte Reservierung 21 bis 31 Tage vor dem Flug storniert, erstattet der Veranstalter 30% des Reisepreises nicht zurück.',
        'Wird die bestätigte Reservierung 11 bis 21 Tage vor dem Flug storniert, erstattet der Veranstalter 50% des Reisepreises nicht zurück.',
        'Wird die bestätigte Reservierung weniger als 11 Tage vor dem Flug storniert, erstattet der Veranstalter 100% des Reisepreises nicht zurück.',
        {
          text: 'Stornierungsbedingungen auf Initiative des Veranstalters:',
          subItems: [
            'Wird die bestätigte Reservierung auf Initiative des Veranstalters storniert, ist dieser verpflichtet, dem Kunden den vollen Betrag innerhalb von 7 Werktagen ab dem Stornierungsdatum zurückzuerstatten.'
          ]
        }
      ]
    }
  },
  ru: {
    group: {
      title: 'Групповые туры',
      bookingConditionsTitle: '1. Условия бронирования',
      bookingConditions: [
        'Групповые туры подтверждаются минимум за 1 день, в зависимости от количества участников.',
        'Минимальное количество участников, необходимое для организации тура, указано в описании каждого конкретного тура.',
        'Оплата групповых туров принимается только заранее банковским переводом или в офисе ONE WAY Tour (Парпеци 16).',
        'Русскоязычные и англоязычные участники могут принимать участие в групповых турах только с услугами гида на соответствующем языке, которые предоставляются за обязательную доплату.',
        'Средняя продолжительность групповых туров указана на сайте, но в зависимости от ситуации она может быть сокращена или увеличена на 1-2 часа.',
        'Если ребенок (0-7 лет) не занимает отдельного места в машине, он может участвовать в туре бесплатно. Если требуется отдельное место, полная стоимость группового тура оплачивается за ребенка независимо от возраста.',
        'Желаемые места в машине заранее не бронируются.',
        'Участникам рекомендуется быть во дворе Ереванской государственной консерватории имени Комитаса (Саят-Нова 1а) не менее чем за 20 минут до начала тура для надлежащей регистрации и посадки.',
        'В случае опоздания на 5 минут и более после начала группового тура Компания не обязана ждать опоздавшего участника. Стоимость забронированного тура не возвращается в случае неучастия из-за опоздания.',
        'Употребление любой еды, алкогольных напитков, чая, кофе, других напитков (кроме воды) или табачных изделий в транспортном средстве во время группового тура строго запрещено.',
        'Наличие выездного штампа в паспорте граждан Республики Армения является обязательным для участия в групповом туре в Республику Грузия.',
        'Для групповых туров в Республику Грузия граждане некоторых стран должны получить визу Республики Грузия, а в некоторых случаях также визу Республики Армения для возвращения. Компания не оказывает визовую поддержку. Выдача виз осуществляется на основании международных соглашений между Республикой Грузия, Республикой Армения и страной гражданства участника.',
        'В случае каких-либо проблем с паспортом и/или документами на армяно-грузинской границе компания не обязана ждать более 15-30 минут во время группового тура.',
        {
          text: 'Участникам рекомендуется носить спортивную обувь, удобную одежду и брать с собой следующие вещи для групповых туров:',
          subItems: [
            'Защитный головной убор, солнцезащитные очки, теплая одежда, дождевик, солнцезащитный крем',
            'Для пеших туров: походные палки, аптечка, фонарик, сменная обувь, достаточное количество еды и воды'
          ]
        },
        'Погодные условия могут различаться между достопримечательностями и Ереваном.',
        'Участникам следует избегать откровенной одежды при посещении церквей. Женщинам следует взять с собой головной платок.',
        'Участникам не разрешается брать с собой домашних животных в групповые туры.',
        'Компания не несет ответственности за вещи, оставленные, потерянные или поврежденные во время групповых туров, как в транспортных средствах, так и на посещаемых объектах.',
        'Для некоторых групповых туров транспортное средство не может доехать до места назначения, что требует ходьбы и/или подъема. Участникам с трудностями при ходьбе или подъеме рекомендуется заранее узнать о таком рельефе.',
        'Помимо остановок, указанных в маршруте группового тура, дополнительные остановки возможны только с согласия всех участников группы.',
        'Участники должны следовать инструкциям гида во время тура. Компания не несет ответственности за жизнь или безопасность участника при несоблюдении инструкций.'
      ],
      cancellationTitle: '2. Отмена и изменения в программе тура',
      cancellation: [
        'В случае отмены забронированного группового тура не менее чем за 24 часа до участия, сумма, уплаченная за бронирование, возвращается Клиенту.',
        'Если бронирование тура, подтвержденное Клиентом и Компанией, аннулируется с нарушением указанного срока, оплата за бронирование взимается в полном объеме.',
        'В случае неблагоприятных погодных условий или форс-мажорных обстоятельств Компания оставляет за собой право изменить, сократить или отменить программу группового тура в целях безопасности.',
        'Если Компания отменяет групповой тур, Клиенту возвращается полная стоимость приобретенного тура.',
        'Если Компания заменяет посещаемые места или услуги, предоставляемые во время тура, эквивалентными альтернативами в связи с вышеуказанными обстоятельствами, она не несет дальнейших обязательств перед Клиентом и не возвращает деньги.',
        'В случае неадекватной замены или сокращения программы Компания возвращает Клиенту разницу в стоимости между приобретенным групповым туром и фактически реализованной программой.'
      ]
    },
    private: {
      title: 'Индивидуальные туры',
      bookingConditionsTitle: '1. Условия бронирования',
      bookingConditions: [
        'Однодневные индивидуальные туры должны быть забронированы не менее чем за 3 дня.',
        'Оплата индивидуальных туров принимается только заранее банковским переводом или в офисе ONE WAY Tour (Парпеци 16).',
        'Средняя продолжительность однодневных туров указана на сайте, но в зависимости от обстоятельств продолжительность может быть сокращена или увеличена на 1-2 часа. Если гостю требуется дополнительные 2 или более часов, взимается дополнительная плата в размере 5000 драмов за час.',
        'Индивидуальные туры могут начинаться с адреса гостя в пределах Еревана.',
        'Употребление еды, алкогольных напитков, чая, кофе, других напитков (кроме воды) или табачных изделий в транспортном средстве во время тура строго запрещено.',
        'Участникам из некоторых стран может потребоваться получить визу Республики Грузия, а в некоторых случаях — визу Республики Армения для возвращения при поездке в Грузию в рамках индивидуального тура. Компания не оказывает визовую поддержку, выдача виз зависит от международных соглашений между Грузией, Арменией и страной гражданства участника.',
        {
          text: 'Во время индивидуальных экскурсий участникам рекомендуется носить спортивную закрытую обувь и удобную одежду, а также брать с собой:',
          subItems: [
            'Защитный головной убор, солнцезащитные очки, теплая одежда, дождевик, солнцезащитный крем',
            'Походные палки (для пеших туров), аптечка, фонарик, сменная обувь, достаточное количество еды и воды'
          ]
        },
        'Погодные условия могут различаться между Ереваном и местами проведения туров.',
        'При посещении церквей рекомендуется как мужчинам, так и женщинам избегать откровенной одежды. Женщинам рекомендуется взять с собой головной платок.',
        'Компания не несет ответственности за потерянные, поврежденные или оставленные вещи во время индивидуальных туров, как в транспортном средстве, так и на посещаемых объектах.',
        'Для некоторых туров транспортное средство не может доехать до места назначения, что требует от участников ходьбы или подъема. Если у участников есть трудности с ходьбой или подъемом, рекомендуется заранее уточнить эти условия.',
        'Дополнительные остановки, помимо указанных в маршруте, возможны только по предварительному согласованию.'
      ],
      cancellationTitle: '2. Отмена и изменения в программе тура',
      cancellation: [
        'Если забронированный индивидуальный тур отменяется не менее чем за 24 часа до даты тура, сумма, уплаченная за бронирование, возвращается Клиенту.',
        'Если бронирование отменяется Клиентом после указанного срока, взимается полная стоимость тура.',
        'Для дополнительных услуг, забронированных вместе с туром, правила отмены могут меняться в зависимости от типа услуги.',
        'В случае неблагоприятных погодных условий или форс-мажорных обстоятельств Компания оставляет за собой право изменить, сократить или отменить индивидуальный тур в целях безопасности.',
        'Если Компания отменяет индивидуальный тур, Клиенту возвращается полная сумма, уплаченная за тур.',
        'Если Компания заменяет посещаемые места или услуги во время тура эквивалентными альтернативами в связи с вышеуказанными обстоятельствами, возврат средств не производится. Однако в случае неадекватной замены или сокращения программы Компания возвращает Клиенту разницу в стоимости между приобретенным индивидуальным туром и фактически реализованной программой.'
      ]
    },
    outgoing: {
      title: 'Выездные туры',
      bookingConditionsTitle: '1. Условия бронирования',
      bookingConditions: [
        'Туры подтверждаются минимум за 1 день, в зависимости от направления.',
        '30% стоимости пакета должны быть оплачены после подтверждения тура, оставшаяся часть — за 10 дней до вылета.',
        'Оплата туров принимается исключительно банковским переводом.'
      ],
      cancellationTitle: '2. Порядок аннулирования бронирования',
      cancellation: [
        'Если подтвержденное бронирование аннулируется Клиентом за 31 день до вылета, туроператор возвращает полную стоимость услуг в течение трех рабочих дней.',
        'Если подтвержденное бронирование аннулируется за 21–31 день до вылета, туроператор не возвращает 30% стоимости услуг.',
        'Если подтвержденное бронирование аннулируется за 11–21 день до вылета, туроператор не возвращает 50% стоимости услуг.',
        'Если подтвержденное бронирование аннулируется менее чем за 11 дней до вылета, туроператор не возвращает 100% стоимости услуг.',
        {
          text: 'Условия отмены по инициативе туроператора:',
          subItems: [
            'Если подтвержденное бронирование аннулируется по инициативе туроператора, он обязан вернуть Клиенту полную сумму в течение 7 рабочих дней с даты отмены.'
          ]
        }
      ]
    }
  }
}
