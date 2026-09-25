export interface ProductVariant {
  id: string;
  dimension: string;
  price: number;
  stock: number;
}

export interface ProductColor {
  name_fr: string;
  name_ar: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  category: 'beds' | 'pillows' | 'mattresses' | 'protectors' | 'nightstands' | 'dressings';
  name_fr: string;
  name_ar: string;
  subtitle_fr: string;
  subtitle_ar: string;
  description_fr: string;
  description_ar: string;
  features_fr: string[];
  features_ar: string[];
  image: string;
  base_price: number; // in DZD
  old_price?: number;
  is_featured?: boolean;
  is_best_seller?: boolean;
  badge_fr?: string;
  badge_ar?: string;
  variants: ProductVariant[];
  colors?: ProductColor[];
}

export const PRODUCTS: Product[] = [
  // --- LITS COFFRE ---
  {
    id: 'bed-sultan',
    slug: 'lit-coffre-sultan',
    category: 'beds',
    name_fr: 'Lit Coffre Sultan',
    name_ar: 'سرير سلطان الملكي مع صندوق تخزين',
    subtitle_fr: 'Le choix royal pour des nuits inoubliables',
    subtitle_ar: 'الخيار الملكي لليالي لا تُنسى وفخامة استثنائية',
    description_fr: 'Le lit coffre Sultan allie noblesse et robustesse. Sa tête de lit haute galbée avec finition passepoil contrasté apporte une majesté incomparable à votre chambre. Équipé d\'un grand coffre de rangement métallique avec vérins hydrauliques renforcés.',
    description_ar: 'يجمع سرير سلطان الملكي بين الأصالة والمتانة الفائقة. لوح رأسي كابيتوني فاخر مع حواف منحنية أنيقة وتطريز متقن. مزود بصندوق تخزين معدني واسع مع مضخات هيدروليكية متينة لسهولة الفتح والإغلاق.',
    features_fr: [
      'Structure en bois rouge massif garantissant solidité et longévité',
      'Coffre métallique haute résistance avec double vérin hydraulique',
      'Revêtement en tissu anti-tache déperlant et facile à nettoyer',
      'Tête de lit capitonnée de prestige',
      'Fabrication algérienne de qualité supérieure'
    ],
    features_ar: [
      'هيكل متين من الخشب الأحمر الطبيعي لضمان الصلابة مدى الحياة',
      'صندوق تخزين معدني مقوى مع نظام هيدروليكي مزدوج وسلس',
      'قماش فاخر مضاد للبقع وسهل التنظيف اليومي',
      'لوح رأسي مبطن بحرفية ملكية راقية',
      'صناعة محلية فاخرة بمواصفات عالمية'
    ],
    image: '/images/products/sultan.jpg',
    base_price: 36000,
    is_featured: true,
    is_best_seller: true,
    badge_fr: 'Best Seller',
    badge_ar: 'الأكثر طلباً',
    variants: [
      { id: 'v-sultan-90', dimension: '90 x 190 cm', price: 36000, stock: 10 },
      { id: 'v-sultan-120', dimension: '120 x 190 cm', price: 45000, stock: 8 },
      { id: 'v-sultan-140', dimension: '140 x 190 cm', price: 58000, stock: 12 },
      { id: 'v-sultan-160', dimension: '160 x 190 / 160 x 200 cm', price: 60000, stock: 20 },
      { id: 'v-sultan-180', dimension: '180 x 200 cm', price: 70000, stock: 6 },
      { id: 'v-sultan-200', dimension: '200 x 200 cm', price: 78000, stock: 4 },
    ],
    colors: [
      { name_fr: 'Beige Lin', name_ar: 'بيج كتان', hex: '#d9cdbe' },
      { name_fr: 'Taupe Chaud', name_ar: 'توب دافئ', hex: '#8c7867' },
      { name_fr: 'Gris Anthracite', name_ar: 'رمادي فحمي', hex: '#3d4044' },
    ]
  },
  {
    id: 'bed-vienna',
    slug: 'lit-coffre-vienna',
    category: 'beds',
    name_fr: 'Lit Coffre Vienna',
    name_ar: 'سرير فيينا العصري مع صندوق',
    subtitle_fr: "L'élégance pensée pour vos nuits",
    subtitle_ar: 'أناقة مدروسة لنوم هادئ وتصميم عصري متجدد',
    description_fr: "Le modèle Vienna se caractérise par sa tête de lit aux courbes douces et harmonieuses. Conçu avec des matériaux respectueux de votre santé et une structure en bois rouge massif, il apporte une ambiance cocooning et contemporaine.",
    description_ar: 'يتميز نموذج فيينا بلوح رأسي منحني بانسيابية لافتة يمنح غرفة النوم جواً من الدفء والهدوء. مبني بهيكل خشب أحمر صلب وصندوق تخزين سفلي متين.',
    features_fr: [
      'Design épuré avec angles arrondis très doux',
      'Structure en bois rouge massif',
      'Grand coffre de rangement métallique avec fond anti-poussière',
      'Tissu premium résistant aux taches'
    ],
    features_ar: [
      'تصميم ناعم بحواف دائرية انسيابية',
      'هيكل مصنوع من الخشب الأحمر الصلب',
      'صندوق تخزين حديدي مع عازل سفلي ضد الغبار',
      'قماش عالي الجودة مقاوم للأوساخ والتآكل'
    ],
    image: '/images/products/vienna.jpg',
    base_price: 37000,
    is_featured: true,
    variants: [
      { id: 'v-vienna-90', dimension: '90 x 190 cm', price: 37000, stock: 8 },
      { id: 'v-vienna-120', dimension: '120 x 190 cm', price: 45000, stock: 6 },
      { id: 'v-vienna-140', dimension: '140 x 190 cm', price: 55000, stock: 10 },
      { id: 'v-vienna-160', dimension: '160 x 190 / 160 x 200 cm', price: 55000, stock: 15 },
      { id: 'v-vienna-180', dimension: '180 x 200 cm', price: 65000, stock: 5 },
      { id: 'v-vienna-200', dimension: '200 x 200 cm', price: 73000, stock: 3 },
    ],
    colors: [
      { name_fr: 'Beige Doux', name_ar: 'بيج ناعم', hex: '#ded4c8' },
      { name_fr: 'Marron Moka', name_ar: 'بني موكا', hex: '#7b6354' },
      { name_fr: 'Gris Ombre', name_ar: 'رمادي غامق', hex: '#44484d' },
    ]
  },
  {
    id: 'bed-piano',
    slug: 'lit-coffre-piano',
    category: 'beds',
    name_fr: 'Lit Coffre Piano',
    name_ar: 'سرير بيانو الكابيتوني العصري',
    subtitle_fr: 'Le confort qui fait la différence',
    subtitle_ar: 'راحة استثنائية ولمسة فنية تصنع الفارق',
    description_fr: 'Design moderne aux lignes verticales pures inspirées des touches d\'un piano. Cadre affleurant pour un encombrement maîtrisé avec un volume de coffre maximal.',
    description_ar: 'سرير بيانو بتطريز مستقيم يعكس روح البساطة العصرية والأناقة المترفة، مناسب لجميع مساحات الغرف.',
    features_fr: [
      'Lignes verticales rembourrées haute densité',
      'Coffre métallique grande contenance',
      'Bois rouge sélectionné',
      'Revêtement lavable'
    ],
    features_ar: [
      'خطوط طولية محشوة بإسفنج عالي الكثافة',
      'صندوق تخزين ذو سعة استيعاب كبرى',
      'خشب أحمر متين ومعالج',
      'قماش عملي قابل للغسيل والمسح'
    ],
    image: '/images/products/piano.jpg',
    base_price: 35000,
    is_featured: true,
    variants: [
      { id: 'v-piano-90', dimension: '90 x 190 cm', price: 35000, stock: 10 },
      { id: 'v-piano-120', dimension: '120 x 190 cm', price: 40000, stock: 8 },
      { id: 'v-piano-140', dimension: '140 x 190 cm', price: 50000, stock: 12 },
      { id: 'v-piano-160', dimension: '160 x 190 / 160 x 200 cm', price: 50000, stock: 16 },
      { id: 'v-piano-180', dimension: '180 x 200 cm', price: 60000, stock: 5 },
      { id: 'v-piano-200', dimension: '200 x 200 cm', price: 68000, stock: 4 },
    ],
    colors: [
      { name_fr: 'Beige Naturel', name_ar: 'بيج طبيعي', hex: '#d8cdbe' },
      { name_fr: 'Brun Chaud', name_ar: 'بني دافئ', hex: '#6b5444' },
      { name_fr: 'Gris Souris', name_ar: 'رمادي غامق', hex: '#484b50' },
    ]
  },
  {
    id: 'bed-nevine',
    slug: 'lit-coffre-nevine',
    category: 'beds',
    name_fr: 'Lit Coffre Nevine',
    name_ar: 'سرير نيفين الفندقي الفاخر',
    subtitle_fr: "L'harmonie parfaite entre style et confort",
    subtitle_ar: 'التناغم المثالي بين الفخامة والراحة المطلقة',
    description_fr: "Le lit Nevine offre une présence imposante et raffinée digne des plus grands hôtels. Son encadrement rembourré crée un cocon chaleureux et protecteur.",
    description_ar: 'سرير نيفين بإطاره المزدوج يمنح غرفة نومك طابعاً فندقياً راقياً. يوفر راحة تامة للظهر أثناء القراءة أو مشاهدة التلفاز.',
    features_fr: [
      'Tête de lit enveloppante avec bordure douce',
      'Structure bois rouge garantie robuste',
      'Coffre métallique renforcé',
      'Idéal avec nos tables de chevet assorties'
    ],
    features_ar: [
      'لوح رأسي محيطي يوفر دعماً مريحاً للظهر',
      'هيكل قوي من الخشب الأحمر',
      'صندوق تخزين داخلي فسيح',
      'متوافق تماماً مع كومودينو وخزائن ماي بيد'
    ],
    image: '/images/products/nevine.jpg',
    base_price: 38000,
    is_featured: true,
    variants: [
      { id: 'v-nevine-90', dimension: '90 x 190 cm', price: 38000, stock: 7 },
      { id: 'v-nevine-120', dimension: '120 x 190 cm', price: 45000, stock: 6 },
      { id: 'v-nevine-140', dimension: '140 x 190 cm', price: 58000, stock: 9 },
      { id: 'v-nevine-160', dimension: '160 x 190 / 160 x 200 cm', price: 60000, stock: 14 },
      { id: 'v-nevine-180', dimension: '180 x 200 cm', price: 70000, stock: 5 },
      { id: 'v-nevine-200', dimension: '200 x 200 cm', price: 78000, stock: 3 },
    ],
    colors: [
      { name_fr: 'Gris Perle', name_ar: 'رمادي لؤلؤي', hex: '#c5c8c9' },
      { name_fr: 'Beige Sable', name_ar: 'بيج رملي', hex: '#d1c2aa' },
      { name_fr: 'Chocolat', name_ar: 'شوكولا', hex: '#5c4639' },
    ]
  },
  {
    id: 'bed-oslo',
    slug: 'lit-coffre-oslo',
    category: 'beds',
    name_fr: 'Lit Coffre Oslo',
    name_ar: 'سرير أوسلو الأزرق الفخم',
    subtitle_fr: "L'élégance qui transforme votre chambre",
    subtitle_ar: 'أناقة فاخرة تمنح غرفتك هوية فريدة وعصرية',
    description_fr: 'Inspiré du design scandinave chic, le modèle Oslo se pare d\'une superbe teinte Bleu Nuit en velours anti-tache avec double coussin dorsal ergonomique.',
    description_ar: 'بتصميم نابع من أرقى خطوط الديكور الإسكندنافي، يتألق سرير أوسلو بلونه الأزرق الملكي الساحر مع وسائد ظهر مريحة للغاية.',
    features_fr: [
      'Tête de lit double coussin grand confort',
      'Teinte Bleu Nuit velouté signature',
      'Coffre métallique avec vérins à gaz',
      'Structure bois rouge'
    ],
    features_ar: [
      'لوح رأسي مزدوج الوسائد لأقصى درجات الراحة',
      'لون أزرق ملكي مخملي فاخر ومقاوم للأتربة',
      'صندوق تخزين حديدي مع مكابس غازية ناعمة',
      'هيكل صلب من الخشب الأحمر'
    ],
    image: '/images/products/oslo.jpg',
    base_price: 38000,
    is_featured: true,
    badge_fr: 'Coup de Cœur',
    badge_ar: 'اختيار مميز',
    variants: [
      { id: 'v-oslo-90', dimension: '90 x 190 cm', price: 38000, stock: 6 },
      { id: 'v-oslo-120', dimension: '120 x 190 cm', price: 45000, stock: 5 },
      { id: 'v-oslo-140', dimension: '140 x 190 cm', price: 58000, stock: 8 },
      { id: 'v-oslo-160', dimension: '160 x 190 / 160 x 200 cm', price: 60000, stock: 12 },
      { id: 'v-oslo-180', dimension: '180 x 200 cm', price: 70000, stock: 4 },
      { id: 'v-oslo-200', dimension: '200 x 200 cm', price: 78000, stock: 3 },
    ],
    colors: [
      { name_fr: 'Bleu Nuit', name_ar: 'أزرق ملكي', hex: '#1c2d4a' },
      { name_fr: 'Beige Sable', name_ar: 'بيج رملي', hex: '#d4c7b8' },
      { name_fr: 'Gris Anthracite', name_ar: 'رمادي داكن', hex: '#3d4044' },
    ]
  },
  {
    id: 'bed-bubble',
    slug: 'lit-coffre-bubble',
    category: 'beds',
    name_fr: 'Lit Coffre Bubble',
    name_ar: 'سرير بابل (قماش بوكليت)',
    subtitle_fr: 'Le confort qui vous enveloppe chaque nuit',
    subtitle_ar: 'راحة تحيط بك كل ليلة بلمسة قماش البوكليت الدافئ',
    description_fr: "La grande tendance design de l'année : un tissu bouclette ultra-doux (Teddy bouclé) combiné à une tête de lit organique tout en rondeur.",
    description_ar: 'الصرعة الأحدث في عالم الأثاث العصري: قماش بوكليت دافئ وفائق النعومة مع رأسية سرير دائرية انسيابية مريحة للعين والنوم.',
    features_fr: [
      'Revêtement tendance en tissu bouclette premium',
      'Formes galbées douces sans angles vifs',
      'Coffre métallique avec vérins hydrauliques',
      'Structure bois rouge'
    ],
    features_ar: [
      'قماش بوكليت فاخر وعصري سهل التنظيف',
      'حواف مستديرة آمنة ومريحة',
      'صندوق تخزين حديدي هيدروليكي',
      'قاعدة خشبية متينة'
    ],
    image: '/images/products/bubble.jpg',
    base_price: 38000,
    is_featured: true,
    variants: [
      { id: 'v-bubble-90', dimension: '90 x 190 cm', price: 38000, stock: 8 },
      { id: 'v-bubble-120', dimension: '120 x 190 cm', price: 45000, stock: 6 },
      { id: 'v-bubble-140', dimension: '140 x 190 cm', price: 58000, stock: 10 },
      { id: 'v-bubble-160', dimension: '160 x 190 / 160 x 200 cm', price: 60000, stock: 15 },
      { id: 'v-bubble-180', dimension: '180 x 200 cm', price: 70000, stock: 5 },
      { id: 'v-bubble-200', dimension: '200 x 200 cm', price: 78000, stock: 3 },
    ],
    colors: [
      { name_fr: 'Blanc Cassé Bouclé', name_ar: 'أبيض عاجي بوكليت', hex: '#ede8df' },
      { name_fr: 'Taupe Bouclé', name_ar: 'توب بوكليت', hex: '#8a7767' },
      { name_fr: 'Gris Ardoise', name_ar: 'رمادي فحمي', hex: '#35383d' },
    ]
  },
  {
    id: 'bed-glaxsy',
    slug: 'lit-coffre-glaxsy',
    category: 'beds',
    name_fr: 'Lit Coffre Glaxsy',
    name_ar: 'سرير غلاكسي الهندسي الفخم',
    subtitle_fr: "L'élégance au service de vos nuits",
    subtitle_ar: 'أناقة عصرية هندسية في خدمة راحتك اليومية',
    description_fr: 'Le lit Glaxsy propose un double encadrement rectangulaire avec surpiqûres sellier soignées. Un classique chic qui s\'accorde avec tous les styles d\'intérieur.',
    description_ar: 'تصميم هندسي متناسق بإطار مزدوج وتفاصيل خياطة دقيقة تضفي فخامة واضحة على الغرفة.',
    features_fr: [
      'Double encadrement géométrique chic',
      'Coffre métallique renforcé',
      'Structure bois rouge durable',
      'Tissu anti-tache haute densité'
    ],
    features_ar: [
      'إطار مزدوج بتطريز أنيق',
      'صندوق معدني قوي لتخزين الأفرشة والملابس',
      'هيكل خشب أحمر أصلي',
      'قماش ممتاز مقاوم للبقع'
    ],
    image: '/images/products/glaxsy.jpg',
    base_price: 36000,
    variants: [
      { id: 'v-glaxsy-90', dimension: '90 x 190 cm', price: 36000, stock: 7 },
      { id: 'v-glaxsy-120', dimension: '120 x 190 cm', price: 45000, stock: 5 },
      { id: 'v-glaxsy-140', dimension: '140 x 190 cm', price: 58000, stock: 9 },
      { id: 'v-glaxsy-160', dimension: '160 x 190 / 160 x 200 cm', price: 60000, stock: 12 },
      { id: 'v-glaxsy-180', dimension: '180 x 200 cm', price: 70000, stock: 4 },
      { id: 'v-glaxsy-200', dimension: '200 x 200 cm', price: 78000, stock: 3 },
    ],
    colors: [
      { name_fr: 'Beige Sable', name_ar: 'بيج رملي', hex: '#ded4c6' },
      { name_fr: 'Taupe Caramel', name_ar: 'توب كراميل', hex: '#8a715d' },
      { name_fr: 'Gris Foncé', name_ar: 'رمادي غامق', hex: '#393c41' },
    ]
  },
  {
    id: 'bed-piano-pro',
    slug: 'lit-coffre-piano-pro',
    category: 'beds',
    name_fr: 'Lit Coffre Piano Pro +',
    name_ar: 'سرير بيانو برو بلس (كابيتوناج كامل)',
    subtitle_fr: "L'élégance qui sublime votre chambre",
    subtitle_ar: 'أناقة فاخرة تبرز جمال غرفة نومك بتفاصيل دقيقة',
    description_fr: "La déclinaison ultime de la série Piano : la tête de lit et le pied de lit sont tous deux capitonnés verticalement pour une esthétique à 360 degrés.",
    description_ar: 'الإصدار الأكثر تميزاً من سلسلة بيانو؛ تصميم متكامل بتطريز كابيتوني عمودي أنيق على لوح الرأس ومقدمة السرير السفلية مع أرجل خشبية مرتفعة.',
    features_fr: [
      'Tête et pied de lit capitonnés verticalement',
      'Pieds surélevés en bois massif pour faciliter le nettoyage',
      'Structure bois rouge et coffre métallique',
      'Tissu anti-tache velouté'
    ],
    features_ar: [
      'كابيتوناج عمودي فاخر على لوح الرأس وقدم السرير معاً',
      'أرجل خشبية مرتفعة لسهولة تنظيف الأرضية',
      'صندوق معدني صلب مدمج',
      'قماش مخملي ناعم مقاوم للأوساخ'
    ],
    image: '/images/products/piano-pro.jpg',
    base_price: 38000,
    badge_fr: 'Édition Pro',
    badge_ar: 'نسخة برو الممتازة',
    variants: [
      { id: 'v-pianopro-90', dimension: '90 x 190 cm', price: 38000, stock: 5 },
      { id: 'v-pianopro-120', dimension: '120 x 190 cm', price: 45000, stock: 5 },
      { id: 'v-pianopro-140', dimension: '140 x 190 cm', price: 55000, stock: 7 },
      { id: 'v-pianopro-160', dimension: '160 x 190 / 160 x 200 cm', price: 58000, stock: 10 },
      { id: 'v-pianopro-180', dimension: '180 x 200 cm', price: 68000, stock: 4 },
      { id: 'v-pianopro-200', dimension: '200 x 200 cm', price: 74000, stock: 3 },
    ],
    colors: [
      { name_fr: 'Écru Crème', name_ar: 'كريمي ناصع', hex: '#eee7db' },
      { name_fr: 'Moka Clair', name_ar: 'موكا فاتح', hex: '#a69280' },
      { name_fr: 'Noir Anthracite', name_ar: 'رمادي داكن', hex: '#2b2d30' },
    ]
  },
  {
    id: 'bed-bulk',
    slug: 'lit-coffre-bulk',
    category: 'beds',
    name_fr: 'Lit Coffre Bulk',
    name_ar: 'سرير بولك المعاصر (تصميم سحاب)',
    subtitle_fr: "L'harmonie parfaite entre style et confort",
    subtitle_ar: 'قمة الراحة العصرية بتصميم وسائدي منتفخ وفائق النعومة',
    description_fr: 'Le modèle Bulk offre une présence sculpturale impressionnante grâce à son capitonnage bombé généreux façon boudins moelleux.',
    description_ar: 'سرير بولك المعاصر بتصميم وسائدي عريض يحيط بالسرير بالكامل، مظهر فخم وعصري لعشاق الأثاث غير التقليدي.',
    features_fr: [
      'Contour de lit et tête de lit capitonnés très épais',
      'Grand coffre de rangement métallique',
      'Structure bois rouge massif',
      'Tissu ultra-doux anti-tache'
    ],
    features_ar: [
      'جوانب ورأس سرير مبطنة بسماكة فائقة وملمس ناعم',
      'صندوق تخزين معدني عملي وواسع',
      'هيكل خشب أحمر عالي المتانة',
      'قماش فاخر مقاوم للبقع'
    ],
    image: '/images/products/bulk.jpg',
    base_price: 38000,
    is_featured: true,
    variants: [
      { id: 'v-bulk-90', dimension: '90 x 190 cm', price: 38000, stock: 5 },
      { id: 'v-bulk-120', dimension: '120 x 190 cm', price: 45000, stock: 4 },
      { id: 'v-bulk-140', dimension: '140 x 190 cm', price: 58000, stock: 7 },
      { id: 'v-bulk-160', dimension: '160 x 190 / 160 x 200 cm', price: 60000, stock: 10 },
      { id: 'v-bulk-180', dimension: '180 x 200 cm', price: 70000, stock: 4 },
      { id: 'v-bulk-200', dimension: '200 x 200 cm', price: 78000, stock: 3 },
    ],
    colors: [
      { name_fr: 'Crème Vanille', name_ar: 'كريمي فانيليا', hex: '#ede6da' },
      { name_fr: 'Beige Chaud', name_ar: 'بيج دافئ', hex: '#c5b59e' },
      { name_fr: 'Anthracite', name_ar: 'فحمي', hex: '#373a3f' },
    ]
  },

  // --- OREILLERS ---
  {
    id: 'pillow-visco-gel',
    slug: 'oreiller-visco-gel-memoire-forme',
    category: 'pillows',
    name_fr: 'Oreiller Visco Gel à Mémoire de Forme',
    name_ar: 'وسادة فيسكو جل الطبية (تبريد وميموري فوم)',
    subtitle_fr: 'Le confort qui s’adapte à vous, la fraîcheur qui vous accompagne',
    subtitle_ar: 'راحة تتكيف معك وانتعاش يدوم طوال الليل',
    description_fr: 'Équipé de la technologie Gel Cooling rafraîchissante et d\'une mousse à mémoire de forme viscoélastique. Réduit les points de pression, dissipe la chaleur et soutient parfaitement la nuque et les cervicales.',
    description_ar: 'وسادة طبية مزودة بطبقة جل التبريد الأزرق ورغوة الذاكرة المتطورة. تحافظ على برودة الرأس وتقلل الضغط على فقرات الرقبة وتمنع آلام الكتف الصباحية.',
    features_fr: [
      'Plaque de Gel Cooling thermorégulatrice',
      'Mousse viscoélastique à mémoire de forme',
      'Soutien ergonomique tête et nuque',
      'Housse zippée lavable et respirante'
    ],
    features_ar: [
      'طبقة جل تبريد تمتص حرارة الجسم',
      'رغوة ذاكرة تتشكل حسب وضعية النوم',
      'دعم مثالي للعمود الفقري والرقبة',
      'غطاء قماشي صحي قابل للفك والغسل'
    ],
    image: '/images/products/oreiller-visco-gel.jpg',
    base_price: 6500,
    old_price: 7500,
    is_best_seller: true,
    badge_fr: 'Technologie Gel',
    badge_ar: 'تقنية الجل المنعش',
    variants: [
      { id: 'v-viscogel-standard', dimension: '60 x 40 cm (H 12 cm)', price: 6500, stock: 40 }
    ]
  },
  {
    id: 'pillow-visco',
    slug: 'oreiller-visco-memoire-forme',
    category: 'pillows',
    name_fr: 'Oreiller Visco à Mémoire de Forme',
    name_ar: 'وسادة فيسكو ميموري فوم الطبية',
    subtitle_fr: 'Confort et soutien sur-mesure pour des nuits réparatrices',
    subtitle_ar: 'دعم مخصص لنوم عميق وصحي بدون آلام رقبة',
    description_fr: 'Mousse viscoélastique haute densité qui épouse la morphologie précise de votre tête et de votre cou avant de reprendre doucement sa forme d\'origine. Hypoallergénique et antibactérien.',
    description_ar: 'مصنوعة من رغوة ميموري فوم عالية الكثافة تحتضن الرأس والرقبة بدقة لتخفيف الضغط وتنشيط الدورة الدموية.',
    features_fr: [
      'Soulagement immédiat des tensions cervicales',
      'Mousse à reprise de forme lente',
      'Traitement anti-acariens et hypoallergénique',
      'Fabrication médicale de haute qualité'
    ],
    features_ar: [
      'تخفيف فوري لتشنجات الرقبة والأكتاف',
      'رغوة ذكية تستعيد شكلها الأصلي بعد الاستيقاظ',
      'مضادة للبكتيريا وحساسية الصدر',
      'جودة طبية ممتازة للاستخدام اليومي'
    ],
    image: '/images/products/oreiller-visco.jpg',
    base_price: 4500,
    variants: [
      { id: 'v-visco-standard', dimension: '60 x 40 cm', price: 4500, stock: 35 }
    ]
  },
  {
    id: 'pillow-plume',
    slug: 'oreiller-a-plume-naturelle',
    category: 'pillows',
    name_fr: 'Oreiller à Plume Naturelle',
    name_ar: 'وسادة الريش الطبيعي الفندقية',
    subtitle_fr: 'Accueil moelleux et confort naturel d\'un hôtel 5 étoiles',
    subtitle_ar: 'نعومة فائقة وإحساس الفنادق الفاخرة بفضل الريش الطبيعي',
    description_fr: 'Garnissage en plumes sélectionnées avec soin pour leur gonflant et leur douceur exceptionnelle. Aération naturelle continue pour un sommeil toujours frais et sain.',
    description_ar: 'حشوة ريش طبيعي نقية ومختارة بعناية لمنحك ملمساً قطنياً فائق النعومة وتهوية طبيعية طوال الليل.',
    features_fr: [
      '100% plumes naturelles traitées et stérilisées',
      'Enveloppe en percale de coton étanche au duvet',
      'Légèreté et accueil moelleux inégalés',
      'Livré dans sa valisette zippée My Bed'
    ],
    features_ar: [
      'ريش طبيعي 100% معالج ومعقم بأحدث المعايير',
      'قماش خارجي قطني مانع لخروج الريش',
      'خفة ومرونة مريحة جداً للرأس',
      'تأتي في حقيبة شفافة فاخرة خاصة بالعلامة'
    ],
    image: '/images/products/oreiller-plume.jpg',
    base_price: 8000,
    old_price: 9500,
    variants: [
      { id: 'v-plume-standard', dimension: '70 x 50 cm', price: 8000, stock: 25 }
    ]
  },
  {
    id: 'pillow-orthopedique',
    slug: 'oreiller-orthopedique-fibre-siliconee',
    category: 'pillows',
    name_fr: 'Oreiller Orthopédique Fibre Siliconée',
    name_ar: 'وسادة طبية بألياف السيليكون (50×70)',
    subtitle_fr: 'Soutien optimal et confort anti-affaissement',
    subtitle_ar: 'دعم متوازن وألياف سيليكونية مضادة للهبوط والتشوه',
    description_fr: 'Garnissage en fibre siliconée creuse de haute résilience. Conserve son gonflant nuit après nuit. Lavable en machine à 40°C pour une hygiène irréprochable.',
    description_ar: 'محشوة بألياف سيليكونية لولبية ناعمة تقاوم التكتل والانضغاط وتوفر دعماً متوازناً. قابلة للغسل في الغسالة على 40 درجة مئوية.',
    features_fr: [
      'Dimensions standard 50 x 70 cm',
      'Fibre siliconée indéformable et aérée',
      'Lavable en machine à 40°C',
      'Idéal pour toute la famille'
    ],
    features_ar: [
      'مقاس معياري 50 × 70 سم يناسب جميع الأغطية',
      'ألياف سيليكونية مرنة تحتفظ بشكلها الدائم',
      'قابلة للغسيل السهل بدرجة حرارة 40 مئوية',
      'مثالية لجميع أفراد العائلة'
    ],
    image: '/images/products/oreiller-orthopedique.jpg',
    base_price: 1500,
    old_price: 2000,
    is_best_seller: true,
    variants: [
      { id: 'v-ortho-5070', dimension: '50 x 70 cm', price: 1500, stock: 60 }
    ]
  },

  // --- PROTECTION DU MATELAS ---
  {
    id: 'protege-matelas',
    slug: 'protege-matelas-coton-pvc-impermeable',
    category: 'protectors',
    name_fr: 'Protège Matelas Coton & PVC Imperméable',
    name_ar: 'واقي مراتب قطني عازل للسوائل 100%',
    subtitle_fr: 'Imperméable, hygiénique, respirant et ajustable',
    subtitle_ar: 'حماية كاملة من السوائل والأوساخ مع سطح قطني ناعم ومريح',
    description_fr: 'Surface en éponge 80% coton ultra-douce et absorbante, sous-couche 100% PVC imperméable et silencieuse qui préserve votre matelas contre les taches, la transpiration et les accidents du quotidien. Bords élastiqués pour une tenue parfaite.',
    description_ar: 'واقي مراتب مميز بسطح قطني مريح وطبقة عازلة تمنع تسرب أي سوائل نهائياً إلى المرتبة، بدون أي صوت مزعج أثناء الحركة مع حواف مطاطية دائرية.',
    features_fr: [
      '100% imperméable et silencieux',
      '80% Coton doux et respirant',
      'Bords élastiqués façon drap-housse',
      'Disponible pour toutes les dimensions de lit'
    ],
    features_ar: [
      'عزل تام للسوائل بنسبة 100%',
      'سطح قطني ناعم وصحي لا يسبب التعرق',
      'حواف مرنة تثبت بإحكام تحت المرتبة',
      'متوفر بجميع المقاسات من سرير الأطفال إلى السرير المزدوج'
    ],
    image: '/images/products/protege-matelas.jpg',
    base_price: 2200,
    is_best_seller: true,
    variants: [
      { id: 'prot-90', dimension: '90 x 190 cm', price: 2200, stock: 30 },
      { id: 'prot-140', dimension: '140 x 190 cm', price: 2800, stock: 25 },
      { id: 'prot-160', dimension: '160 x 200 cm', price: 3200, stock: 35 },
      { id: 'prot-180', dimension: '180 x 200 cm', price: 3800, stock: 20 },
    ]
  },

  // --- MATELAS ---
  {
    id: 'matelas-orthopedique-royal',
    slug: 'matelas-orthopedique-royal-mybed',
    category: 'mattresses',
    name_fr: 'Matelas Orthopédique Royal (Ferme)',
    name_ar: 'مرتبة رويال الطبية لتقويم العمود الفقري',
    subtitle_fr: 'Soutien ferme et soulagement dorsal durable',
    subtitle_ar: 'صلابة مدروسة لتخفيف آلام الظهر ودعم كامل للعمود الفقري',
    description_fr: 'Matelas orthopédique conçu pour un maintien anatomique précis de la colonne vertébrale. Mousse haute résilience densité 30 kg/m³ avec capitonnage aéré et tissu traité hypoallergénique.',
    description_ar: 'مرتبة طبية معتمدة تدعم استقامة الظهر بدقة. رغوة عالية الكثافة 30 كغ/م³ مع نسيج خارجي ناعم وجيد التهوية يمنع الرطوبة وحشرات الفراش.',
    features_fr: [
      'Mousse haute densité 30 kg/m³ soutien ferme',
      'Garantie fabricant 5 ans',
      'Hauteur totale : 25 cm',
      'Tissu antibactérien et aéré'
    ],
    features_ar: [
      'رغوة عالية الكثافة 30 كغ/م³ لدعم صحي متين',
      'ضمان المصنع لمدة 5 سنوات كاملة',
      'الارتفاع الإجمالي: 25 سم',
      'قماش مضاد للبكتيريا والحساسية'
    ],
    image: '/images/products/vienna.jpg',
    base_price: 32000,
    variants: [
      { id: 'm-ortho-90', dimension: '90 x 190 cm', price: 19000, stock: 10 },
      { id: 'm-ortho-140', dimension: '140 x 190 cm', price: 27000, stock: 8 },
      { id: 'm-ortho-160', dimension: '160 x 200 cm', price: 32000, stock: 15 },
      { id: 'm-ortho-180', dimension: '180 x 200 cm', price: 38000, stock: 6 },
    ]
  },
  {
    id: 'matelas-ressorts-ensaches-7zones',
    slug: 'matelas-ressorts-ensaches-7zones',
    category: 'mattresses',
    name_fr: 'Matelas Ressorts Ensachés 7 Zones Confort',
    name_ar: 'مرتبة النوابض المنفصلة (7 مناطق نوم)',
    subtitle_fr: 'Indépendance de couchage absolue et accueil moelleux',
    subtitle_ar: 'استقلالية تامة أثناء الحركة وراحة استثنائية لشركاء النوم',
    description_fr: 'Chaque ressort agit indépendamment dans son propre sachet en tissu : les mouvements de votre partenaire ne vous réveillent plus jamais. 7 zones de confort adaptées à chaque partie du corps.',
    description_ar: 'نوابض فولاذية معزولة في أكياس فردية؛ إذا تحرك الشريك لا تشعر بأي اهتزاز على الإطلاق. 7 مناطق لدعم الرأس والكتفين والخصر والقدمين.',
    features_fr: [
      'Plus de 700 ressorts ensachés indépendants',
      'Zéro transmission de mouvement entre partenaires',
      'Garantie 8 ans',
      'Hauteur : 28 cm avec surmatelas intégré'
    ],
    features_ar: [
      'أكثر من 700 نابض منفصل في جيوب قماشية',
      'انعدام انتقال الحركة بين الشريكين نهائياً',
      'ضمان 8 سنوات',
      'ارتفاع 28 سم مع طبقة علوية مبطنة مدمجة'
    ],
    image: '/images/products/sultan.jpg',
    base_price: 46000,
    old_price: 54000,
    is_featured: true,
    badge_fr: 'Haut de Gamme',
    badge_ar: 'قمة الفخامة',
    variants: [
      { id: 'm-ressort-140', dimension: '140 x 190 cm', price: 39000, stock: 7 },
      { id: 'm-ressort-160', dimension: '160 x 200 cm', price: 46000, stock: 12 },
      { id: 'm-ressort-180', dimension: '180 x 200 cm', price: 53000, stock: 5 },
    ]
  },

  // --- TABLES DE CHEVET & MOBILIER ---
  {
    id: 'chevet-elegance',
    slug: 'table-de-chevet-elegance-led',
    category: 'nightstands',
    name_fr: 'Table de Chevet Élégance (2 Tiroirs)',
    name_ar: 'طاولة سرير إيليغانس بـدرجين مع إضاءة خافتة',
    subtitle_fr: 'Finition soignée assortie à nos lits coffre',
    subtitle_ar: 'تشطيب متقن يتناسق بشكل رائع مع أسرّة ماي بيد',
    description_fr: 'Table de nuit contemporaine à 2 tiroirs avec glissières télescopiques silencieuses. Poignées discrètes et possibilité d\'ajouter un rétroéclairage LED chaleureux.',
    description_ar: 'كومودينو أنيق مزود بدرجين ومجاري سحب صامتة، مصنوع من الخشب الأحمر والـ MDF المعالج بألوان متناسقة مع مجموعات الأسرّة.',
    features_fr: [
      '2 tiroirs spacieux à fermeture douce',
      'Structure bois rouge et finitions au choix',
      'Dimensions : L 45 x P 40 x H 48 cm'
    ],
    features_ar: [
      'درجان واسعان مع إغلاق هادئ وسلس',
      'هيكل متين وتشطيبات بالألوان المتناسقة',
      'المقاسات: العرض 45 × العمق 40 × الارتفاع 48 سم'
    ],
    image: '/images/products/nevine.jpg',
    base_price: 14000,
    variants: [
      { id: 'v-chevet-single', dimension: 'Lot de 1 chevet', price: 14000, stock: 15 },
      { id: 'v-chevet-duo', dimension: 'Lot de 2 chevets', price: 26000, stock: 10 },
    ]
  },
  {
    id: 'dressing-verre-luxe',
    slug: 'dressing-armoire-verre-fume-led',
    category: 'dressings',
    name_fr: 'Dressing & Armoire Vitrée avec Éclairage LED',
    name_ar: 'خزانة ملابس عصرية بأبواب زجاجية وإضاءة LED',
    subtitle_fr: 'Le luxe contemporain sur-mesure pour votre chambre',
    subtitle_ar: 'خزانة ملابس عصرية أنيقة بالزجاج الداكن والإضاءة المدمجة',
    description_fr: 'Armoire dressing haut de gamme avec portes battantes en verre fumé, profilés aluminium noir mat et éclairage LED vertical automatique à l\'ouverture des portes. Aménagement intérieur sur-mesure.',
    description_ar: 'خزانة ملابس فخمة بأبواب زجاجية عاكسة وإطار ألومنيوم أسود مع أشرطة إضاءة LED داخلية تعمل تلقائياً. تقسيمات داخلية مدروسة للملابس والأحذية والإكسسوارات.',
    features_fr: [
      'Portes en verre trempé fumé sécurit',
      'Cadre en profilé aluminium anodisé noir',
      'Éclairage LED intégré automatique',
      'Fabrication sur commande et devis personnalisé'
    ],
    features_ar: [
      'أبواب من الزجاج المقوى العاكس والآمن',
      'إطار من الألومنيوم الأسود الفاخر',
      'إنارة داخلية مخفية تضيء عند الفتح',
      'تصنيع مخصص حسب مقاس غرفتك ومساحتها'
    ],
    image: '/images/products/nevine.jpg',
    base_price: 120000,
    badge_fr: 'Sur Mesure',
    badge_ar: 'حسب الطلب',
    variants: [
      { id: 'v-dressing-2m', dimension: '200 x 240 x 60 cm (4 portes)', price: 120000, stock: 3 },
      { id: 'v-dressing-2m60', dimension: '260 x 240 x 60 cm (5 portes)', price: 155000, stock: 2 },
    ]
  }
];
