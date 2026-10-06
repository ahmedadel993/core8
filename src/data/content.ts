import type { FaqItem, Principle } from "@/types/site";

/**
 * Centralised marketing copy (English). Components read from here rather
 * than embedding strings, so an Arabic dictionary can be added alongside.
 */
export const content = {
  hero: {
    eyebrow: "Natural functional drinks",
    title: "CORE8",
    tagline: "Fuel your best",
    lines: ["Natural.", "Fresh.", "Balanced.", "Built around your goal."],
    primaryCta: "Find Your CORE8",
    secondaryCta: "Explore Products",
    scrollHint: "Scroll to discover",
  },
  story: {
    eyebrow: "The range",
    title: "One drink for your current goal.",
    intro: "Five blends. Five goals. Every bottle is built from whole, natural ingredients and balanced for the moment you are in.",
    finaleTitle: "Five goals. One CORE8.",
    finaleText: "Lean, protein, energy, focus or muscle. Choose the drink that matches today.",
    finaleCta: "Choose your goal",
    perServing: "per 500 ml",
    ingredientsLabel: "Inside",
    benefitsLabel: "Why it works",
    discover: "Discover",
  },
  chooseGoal: {
    eyebrow: "Choose your goal",
    title: "What is your goal today?",
    intro: "Pick what you need. We will point you to the right bottle.",
  },
  why: {
    eyebrow: "Why CORE8",
    title: "Made the way food should be.",
    intro: "No shortcuts and no lab-made flavour. Just whole ingredients, blended in balance and built for real days.",
  },
  ingredients: {
    eyebrow: "Natural ingredients",
    title: "Real ingredients. Nothing to hide.",
    intro: "Every ingredient you see here is exactly what goes into the bottle. Fruit, dairy, grains, nuts and spices, measured per 500 ml.",
    foundIn: "Found in",
  },
  overview: {
    eyebrow: "The lineup",
    title: "Meet the five.",
    intro: "Each CORE8 blend is designed around a single goal, so choosing is simple.",
  },
  nutrition: {
    eyebrow: "Transparency",
    title: "Nutrition, side by side.",
    intro: "Approximate values per 500 ml bottle. Natural ingredients vary slightly from batch to batch.",
    caption: "Approximate nutrition per 500 ml for each CORE8 drink",
    caffeineNote: "Focus Max contains approximately 80–100 mg of natural caffeine per 500 ml. All other CORE8 drinks are caffeine-free.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
  },
  finalCta: {
    eyebrow: "Fuel your best",
    title: "Find your CORE8.",
    text: "Five natural drinks, each built around a goal. Start with the one that fits today.",
    primary: "Find Your CORE8",
    secondary: "Follow on Instagram",
  },
  productsPage: {
    eyebrow: "The CORE8 range",
    title: "Five drinks. Five goals.",
    intro:
      "Natural functional drinks for the way you actually live: light refreshment, filling protein, steady energy, sharp focus and serious strength.",
  },
  about: {
    eyebrow: "Our story",
    title: "One drink for your current goal.",
    lead: "CORE8 started with a simple frustration: most drinks are built for everyone, which means they are built for no one in particular.",
    paragraphs: [
      "Some days you want something light. Some days you need protein that keeps you full, energy that lasts through a long session, focus for deep work, or real fuel for strength. One drink cannot do all of that well.",
      "So we built five. Each CORE8 blend starts with a single goal and works backwards to the ingredients: kiwi and mint for a light refresh, Greek yogurt and chia for protein, dates and oats for energy, espresso and dark chocolate for focus, oats, nuts and milk for strength.",
      "Everything is natural, measured and blended in balance. No artificial colours, no artificial flavours, nothing you would not recognise. Just fresh ingredients built around the goal you have today.",
    ],
    statement: "Natural. Fresh. Balanced. Built around your goal.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk.",
    intro:
      "Questions about a drink, orders, collaborations or stocking CORE8 at your gym, café or store? The fastest way to reach us is on Instagram.",
    channels: [
      { title: "Orders & availability", text: "Send us a DM with what you'd like and where you are." },
      { title: "Gyms, cafés & stores", text: "Interested in stocking CORE8? Tell us about your space." },
      { title: "Collaborations", text: "Athletes, creators and brands: we'd love to hear your idea." },
    ],
  },
  disclaimer:
    "Nutritional values are approximate per 500 ml serving. CORE8 drinks are foods, not medicines, and are not intended to diagnose, treat, cure or prevent any disease.",
} as const;

export const principles: Principle[] = [
  {
    icon: "leaf",
    title: "100% natural ingredients",
    description: "Whole fruit, dairy, grains, nuts and spices. If you cannot recognise it, it is not in the bottle.",
  },
  {
    icon: "sparkles",
    title: "No artificial colours or flavours",
    description: "The colour comes from kiwi, strawberries, dates and cocoa. The flavour comes from the same place.",
  },
  {
    icon: "droplet",
    title: "Naturally sweet",
    description: "Sweetness comes from fruit, dates and natural honey. No artificial sweeteners.",
  },
  {
    icon: "zap",
    title: "Smart, balanced energy",
    description: "Carbohydrates, protein, fibre and fats in proportion, so energy feels steady rather than spiky.",
  },
  {
    icon: "dumbbell",
    title: "Daily and athletic performance",
    description: "From a light morning refresh to post-training recovery, there is a CORE8 for the moment you are in.",
  },
];

export const generalFaqs: FaqItem[] = [
  {
    question: "What is CORE8?",
    answer:
      "CORE8 is a range of five natural functional drinks, each built around a single goal: Lean Kiwi for a light refresh, Berry Lean for protein, Power Max for energy, Focus Max for focus and Muscle Max for strength.",
  },
  {
    question: "Which CORE8 drink should I choose?",
    answer:
      "Start with your goal. Choose Lean Kiwi when you want something light, Berry Lean for a filling protein boost, Power Max before an active day or training, Focus Max for mental energy, and Muscle Max after strength training or as a hearty meal.",
  },
  {
    question: "Are CORE8 drinks natural?",
    answer:
      "Yes. Every CORE8 drink is made from whole, natural ingredients such as fruit, Greek yogurt, milk, oats, nuts, dates and spices, with no artificial colours or flavours.",
  },
  {
    question: "Do CORE8 drinks contain caffeine?",
    answer:
      "Only Focus Max, which contains approximately 80–100 mg of natural caffeine per 500 ml from espresso and cocoa. Lean Kiwi, Berry Lean, Power Max and Muscle Max are caffeine-free.",
  },
  {
    question: "Are the nutrition values exact?",
    answer:
      "They are approximate values per 500 ml bottle. Because we use natural ingredients, values can vary slightly between batches.",
  },
  {
    question: "Do CORE8 drinks contain allergens?",
    answer:
      "Some do. Berry Lean, Power Max, Focus Max and Muscle Max contain milk; Focus Max and Muscle Max contain nuts; Power Max and Muscle Max contain oats. Each product page lists its allergens.",
  },
  {
    question: "How should I store CORE8?",
    answer: "Keep your CORE8 refrigerated, shake well before drinking and enjoy it chilled.",
  },
  {
    question: "Where can I buy CORE8?",
    answer: "Follow @core8.drinks on Instagram for availability, new drops and orders.",
  },
];
