import type { Product, ProductSlug } from "@/types/product";

/**
 * Single source of truth for every CORE8 product.
 * Values are per 500 ml serving and approximate.
 *
 * To replace photography: drop a new file into public/images/products/<slug>/
 * (or re-run scripts/process-images.py) and update `image.width/height`.
 */
const productsBySlug = {
  "lean-kiwi": {
    id: "core8-lean-kiwi",
    code: "L1",
    slug: "lean-kiwi",
    name: "Lean Kiwi",
    nameAr: "لين كيوي",
    tagline: "Refresh your day",
    taglineAr: "انتعش يومك",
    description:
      "A refreshing, light blend of kiwi, green apple, lemon and fresh mint. Rich in vitamin C and low in calories, it is the easy way to keep your day light and fresh.",
    descriptionAr:
      "مزيج منعش وخفيف من الكيوي والتفاح الأخضر والليمون والنعناع الطازج. غني بفيتامين C ومنخفض السعرات الحرارية.",
    goal: {
      key: "lean",
      short: "Lean",
      shortAr: "رشاقة",
      label: "Lean / Refresh",
      labelAr: "رشاقة / انتعاش",
    },
    color: "#8BCF00",
    image: {
      src: "/images/products/lean-kiwi/lean-kiwi.webp",
      width: 242,
      height: 347,
      alt: "CORE8 Lean Kiwi natural functional drink with fresh kiwi and mint",
    },
    ogImage: "/images/products/lean-kiwi/lean-kiwi-og.jpg",
    ingredients: [
      { name: "Kiwi", nameAr: "كيوي", amount: "120 g", amountAr: "120 جم" },
      { name: "Green Apple", nameAr: "تفاح أخضر", amount: "130 g", amountAr: "130 جم" },
      { name: "Lemon Juice", nameAr: "عصير ليمون", amount: "20 g", amountAr: "20 جم" },
      { name: "Fresh Mint", nameAr: "نعناع طازج", amount: "5 g", amountAr: "5 جم" },
      { name: "Cold Water", nameAr: "ماء بارد", amount: "Up to 500 ml", amountAr: "حتى 500 مل", isBase: true },
    ],
    benefits: [
      { text: "Refreshing, light and rich in vitamin C", textAr: "منعش وخفيف وغني بفيتامين C" },
      { text: "Low in calories", textAr: "منخفض السعرات الحرارية" },
      { text: "Supports immunity and digestion", textAr: "يدعم المناعة والهضم" },
    ],
    nutrition: {
      servingSize: "500 ml",
      calories: { kind: "exact", value: 175, unit: "kcal" },
      protein: { kind: "range", min: 2, max: 3, unit: "g" },
      carbohydrates: { kind: "exact", value: 41, unit: "g" },
      fiber: { kind: "exact", value: 8, unit: "g" },
      fat: { kind: "lessThan", value: 1, unit: "g" },
    },
    howToEnjoy: [
      "Serve well chilled and shake before drinking.",
      "A light start to the morning or a fresh afternoon reset.",
      "Pairs naturally with a light meal or a long walk.",
    ],
    allergens: [],
    seo: {
      title: "Lean Kiwi",
      description:
        "Lean Kiwi by CORE8: a light, refreshing natural drink with kiwi, green apple, lemon and fresh mint. Around 175 kcal per 500 ml and rich in vitamin C.",
      keywords: ["kiwi drink", "low calorie natural drink", "vitamin C drink", "healthy drinks Egypt"],
    },
  },
  "berry-lean": {
    id: "core8-berry-lean",
    code: "L2",
    slug: "berry-lean",
    name: "Berry Lean",
    nameAr: "بيري لين",
    tagline: "Lean with protein",
    taglineAr: "رشاقة بالبروتين",
    description:
      "Strawberries and Greek yogurt with chia seeds and a touch of natural honey. High in protein, filling and balanced, with fibre that keeps you going between meals.",
    descriptionAr:
      "فراولة وزبادي يوناني مع بذور الشيا ولمسة من العسل الطبيعي. بروتين عالٍ، مُشبع ومتوازن.",
    goal: {
      key: "protein",
      short: "Protein",
      shortAr: "بروتين",
      label: "Protein / Lean",
      labelAr: "بروتين / رشاقة",
    },
    color: "#E83B91",
    image: {
      src: "/images/products/berry-lean/berry-lean.webp",
      width: 233,
      height: 345,
      alt: "CORE8 Berry Lean protein smoothie with strawberries and chia seeds",
    },
    ogImage: "/images/products/berry-lean/berry-lean-og.jpg",
    ingredients: [
      { name: "Frozen Strawberries", nameAr: "فراولة مجمدة", amount: "180 g", amountAr: "180 جم" },
      { name: "Greek Yogurt", nameAr: "زبادي يوناني", amount: "180 g", amountAr: "180 جم" },
      { name: "Chia Seeds", nameAr: "بذور شيا", amount: "10 g", amountAr: "10 جم" },
      { name: "Natural Honey", nameAr: "عسل طبيعي", amount: "15 g", amountAr: "15 جم" },
      { name: "Cold Water", nameAr: "ماء بارد", amount: "Up to 500 ml", amountAr: "حتى 500 مل", isBase: true },
    ],
    benefits: [
      { text: "High protein, filling and balanced", textAr: "بروتين عالٍ، مشبع ومتوازن" },
      { text: "Rich in protein and promotes satiety", textAr: "غني بالبروتين ويدعم الشبع" },
      { text: "Excellent source of fibre for digestive health", textAr: "مصدر ممتاز للألياف ويدعم صحة الجهاز الهضمي" },
    ],
    nutrition: {
      servingSize: "500 ml",
      calories: { kind: "exact", value: 295, unit: "kcal" },
      protein: { kind: "range", min: 21, max: 23, unit: "g" },
      carbohydrates: { kind: "exact", value: 32, unit: "g" },
      fiber: { kind: "exact", value: 8, unit: "g" },
      fat: { kind: "range", min: 7, max: 8, unit: "g" },
    },
    howToEnjoy: [
      "Shake well: chia seeds settle naturally.",
      "A filling snack between meals or a light breakfast.",
      "Great after a workout when you want protein without heaviness.",
    ],
    allergens: ["Milk (Greek yogurt)"],
    seo: {
      title: "Berry Lean",
      description:
        "Berry Lean by CORE8: a natural protein smoothie with strawberries, Greek yogurt, chia and honey. Around 21–23 g protein and 295 kcal per 500 ml.",
      keywords: ["protein smoothie", "natural protein drink", "strawberry Greek yogurt smoothie", "protein drinks Egypt"],
    },
  },
  "power-max": {
    id: "core8-power-max",
    code: "P1",
    slug: "power-max",
    name: "Power Max",
    nameAr: "باور ماكس",
    tagline: "Fuel your performance",
    taglineAr: "طاقة لأدائك",
    description:
      "Dates, fine oats and whole milk, warmed with cinnamon and cardamom. Natural, sustained energy for long days and hard sessions, with a distinct oriental flavour.",
    descriptionAr:
      "تمر وشوفان ولبن كامل الدسم مع القرفة والهيل. طاقة طبيعية مستدامة ليومك وتمرينك بطعم شرقي مميز.",
    goal: {
      key: "energy",
      short: "Energy",
      shortAr: "طاقة",
      label: "Energy / Performance",
      labelAr: "طاقة / أداء",
    },
    color: "#FF8A00",
    image: {
      src: "/images/products/power-max/power-max.webp",
      width: 223,
      height: 341,
      alt: "CORE8 Power Max natural energy drink with dates and oats",
    },
    ogImage: "/images/products/power-max/power-max-og.jpg",
    ingredients: [
      { name: "Pitted Dates", nameAr: "تمر منزوع النوى", amount: "50 g", amountAr: "50 جم" },
      { name: "Fine Oats", nameAr: "شوفان ناعم", amount: "27 g", amountAr: "27 جم" },
      { name: "Whole Milk", nameAr: "لبن كامل الدسم", amount: "325 g", amountAr: "325 جم" },
      { name: "Natural Honey", nameAr: "عسل طبيعي", amount: "7.5 g", amountAr: "7.5 جم" },
      { name: "Cinnamon", nameAr: "قرفة", amount: "0.4 g", amountAr: "0.4 جم" },
      { name: "Ground Cardamom", nameAr: "هيل مطحون", amount: "0.15 g", amountAr: "0.15 جم" },
      { name: "Liquid Base", nameAr: "قاعدة سائلة", amount: "Up to 500 ml", amountAr: "حتى 500 مل", isBase: true },
    ],
    benefits: [
      { text: "Natural energy for daily performance", textAr: "طاقة طبيعية وأداء يومي" },
      { text: "Sustained energy for focus and endurance", textAr: "طاقة مستدامة للتركيز والتحمل" },
      { text: "Good source of fibre with a distinct oriental taste", textAr: "مصدر جيد للألياف بطعم شرقي مميز" },
    ],
    nutrition: {
      servingSize: "500 ml",
      calories: { kind: "exact", value: 480, unit: "kcal" },
      protein: { kind: "range", min: 16, max: 18, unit: "g" },
      carbohydrates: { kind: "exact", value: 70, unit: "g" },
      fiber: { kind: "exact", value: 6, unit: "g" },
      fat: { kind: "exact", value: 11, unit: "g" },
    },
    howToEnjoy: [
      "Before training or ahead of a long, active day.",
      "A satisfying breakfast on the go.",
      "Serve chilled and shake well before drinking.",
    ],
    allergens: ["Milk", "Oats (may contain gluten)"],
    seo: {
      title: "Power Max",
      description:
        "Power Max by CORE8: a natural energy drink made with dates, oats, whole milk, cinnamon and cardamom. Sustained energy with around 480 kcal per 500 ml.",
      keywords: ["natural energy drink", "dates and oats drink", "pre-workout natural drink", "performance drinks"],
    },
  },
  "focus-max": {
    id: "core8-focus-max",
    code: "F1",
    slug: "focus-max",
    name: "Focus Max",
    nameAr: "فوكس ماكس",
    tagline: "Sharpen your focus",
    taglineAr: "ركّز أكثر",
    description:
      "A premium mocha blend of espresso, whole milk, dark cocoa and 70% dark chocolate. Smart energy for focus, alertness and mental energy, rich in antioxidants.",
    descriptionAr:
      "مزيج موكا فاخر من الإسبريسو واللبن كامل الدسم والكاكاو الداكن وشوكولاتة 70%. للتركيز واليقظة والطاقة الذهنية.",
    goal: {
      key: "focus",
      short: "Focus",
      shortAr: "تركيز",
      label: "Focus / Energy",
      labelAr: "تركيز / طاقة",
    },
    color: "#008CFF",
    image: {
      src: "/images/products/focus-max/focus-max.webp",
      width: 234,
      height: 344,
      alt: "CORE8 Focus Max mocha focus drink with coffee beans and almonds",
    },
    ogImage: "/images/products/focus-max/focus-max-og.jpg",
    ingredients: [
      { name: "Espresso", nameAr: "إسبريسو", amount: "70 g", amountAr: "70 جم" },
      { name: "Whole Milk", nameAr: "لبن كامل الدسم", amount: "325 g", amountAr: "325 جم" },
      { name: "Unsweetened Dark Cocoa", nameAr: "كاكاو داكن غير محلى", amount: "7 g", amountAr: "7 جم" },
      { name: "Soaked Almonds", nameAr: "لوز منقوع", amount: "7.5 g", amountAr: "7.5 جم" },
      { name: "Natural Honey", nameAr: "عسل طبيعي", amount: "7.5 g", amountAr: "7.5 جم" },
      { name: "70% Dark Chocolate", nameAr: "دارك شوكولاتة 70%", amount: "70 g", amountAr: "70 جم" },
      { name: "Liquid Base", nameAr: "قاعدة سائلة", amount: "Up to 500 ml", amountAr: "حتى 500 مل", isBase: true },
    ],
    benefits: [
      { text: "Focus, alertness and mental energy", textAr: "تركيز، يقظة، وطاقة ذهنية" },
      { text: "Enhances focus and alertness, rich in antioxidants", textAr: "يعزز التركيز واليقظة وغني بمضادات الأكسدة" },
      { text: "Premium mocha blend with natural caffeine", textAr: "مزيج موكا فاخر ومصدر طاقة ذكي بكافيين طبيعي" },
    ],
    nutrition: {
      servingSize: "500 ml",
      calories: { kind: "exact", value: 410, unit: "kcal" },
      protein: { kind: "range", min: 17, max: 18, unit: "g" },
      carbohydrates: { kind: "exact", value: 31, unit: "g" },
      fiber: { kind: "exact", value: 4, unit: "g" },
      fat: { kind: "exact", value: 18, unit: "g" },
      caffeine: { kind: "range", min: 80, max: 100, unit: "mg" },
    },
    howToEnjoy: [
      "In the morning or before a block of deep work.",
      "Serve chilled and shake well before drinking.",
      "Enjoy earlier in the day if you are sensitive to caffeine.",
    ],
    allergens: ["Milk", "Tree nuts (almonds)"],
    advisory:
      "Contains approximately 80–100 mg of natural caffeine per 500 ml from espresso and cocoa. Not recommended for children, during pregnancy or breastfeeding, or for people sensitive to caffeine.",
    seo: {
      title: "Focus Max",
      description:
        "Focus Max by CORE8: a premium mocha focus drink with espresso, whole milk, dark cocoa and 70% dark chocolate. About 80–100 mg natural caffeine per 500 ml.",
      keywords: ["focus drink", "natural caffeine drink", "mocha protein drink", "coffee energy drink"],
    },
  },
  "muscle-max": {
    id: "core8-muscle-max",
    code: "M1",
    slug: "muscle-max",
    name: "Muscle Max",
    nameAr: "ماسِل ماكس",
    tagline: "Build your strength",
    taglineAr: "ابنِ قوتك",
    description:
      "Oats, peanuts, almonds, cashews, dates and whole milk. Our highest-calorie blend, rich in protein and healthy fats to support muscle building, strength and recovery.",
    descriptionAr:
      "شوفان وفول سوداني ولوز وكاجو وتمر ولبن كامل الدسم. أعلى سعرات لدينا، غني بالبروتين والدهون الصحية لدعم بناء العضلات والاستشفاء.",
    goal: {
      key: "muscle",
      short: "Muscle",
      shortAr: "عضلات",
      label: "Muscle / Strength",
      labelAr: "عضلات / قوة",
    },
    color: "#F21D3B",
    image: {
      src: "/images/products/muscle-max/muscle-max.webp",
      width: 242,
      height: 342,
      alt: "CORE8 Muscle Max high-protein drink with peanuts, oats and dates",
    },
    ogImage: "/images/products/muscle-max/muscle-max-og.jpg",
    ingredients: [
      { name: "Oats", nameAr: "شوفان", amount: "30 g", amountAr: "30 جم" },
      { name: "Peanuts", nameAr: "فول سوداني", amount: "10 g", amountAr: "10 جم" },
      { name: "Almonds", nameAr: "لوز", amount: "5 g", amountAr: "5 جم" },
      { name: "Cashews", nameAr: "كاجو", amount: "7.5 g", amountAr: "7.5 جم" },
      { name: "Dates", nameAr: "تمر", amount: "20 g", amountAr: "20 جم" },
      { name: "Whole Milk", nameAr: "لبن كامل الدسم", amount: "150 g", amountAr: "150 جم" },
      { name: "Water", nameAr: "ماء", amount: "Up to 500 ml", amountAr: "حتى 500 مل", isBase: true },
    ],
    benefits: [
      { text: "Muscle mass, strength and recovery", textAr: "كتلة عضلية، قوة، واستشفاء" },
      { text: "Highest in calories and rich in protein", textAr: "أعلى سعرات وغني بالبروتين لدعم بناء العضلات" },
      { text: "Long-lasting energy, rich in healthy fats", textAr: "طاقة طويلة الأمد وغني بالدهون الصحية" },
    ],
    nutrition: {
      servingSize: "500 ml",
      calories: { kind: "exact", value: 650, unit: "kcal" },
      protein: { kind: "range", min: 24, max: 26, unit: "g" },
      carbohydrates: { kind: "exact", value: 67, unit: "g" },
      fiber: { kind: "exact", value: 9, unit: "g" },
      fat: { kind: "exact", value: 30, unit: "g" },
    },
    howToEnjoy: [
      "After strength training as part of your recovery routine.",
      "A hearty, nutrient-dense meal on the go.",
      "Serve chilled and shake well before drinking.",
    ],
    allergens: ["Milk", "Peanuts", "Tree nuts (almonds, cashews)", "Oats (may contain gluten)"],
    seo: {
      title: "Muscle Max",
      description:
        "Muscle Max by CORE8: a natural high-calorie protein drink with oats, peanuts, almonds, cashews, dates and whole milk. Around 24–26 g protein per 500 ml.",
      keywords: ["muscle gain drink", "natural mass gainer", "high protein drink", "strength recovery drink"],
    },
  },
} satisfies Record<ProductSlug, Product>;

/** Display order across the site (and in the scroll story). */
const productOrder: ProductSlug[] = ["lean-kiwi", "berry-lean", "power-max", "focus-max", "muscle-max"];

export const products: Product[] = productOrder.map((slug) => productsBySlug[slug]);

export function getProduct(slug: ProductSlug): Product {
  return productsBySlug[slug];
}

export function getRelatedProducts(slug: ProductSlug, limit = 3): Product[] {
  const index = productOrder.indexOf(slug);
  // Neighbours first (wrapping), so related products feel intentional.
  const rotated = [...productOrder.slice(index + 1), ...productOrder.slice(0, index)];
  return rotated.slice(0, limit).map((s) => productsBySlug[s]);
}
