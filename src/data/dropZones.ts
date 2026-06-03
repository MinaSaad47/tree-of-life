export type TreeStage = "creation_alive" | "dead_waiting" | "redeemed_alive";

export type DropZoneId =
  | "adam-eve"
  | "fall"
  | "noah"
  | "abraham"
  | "joseph"
  | "moses"
  | "david"
  | "jonah"
  | "jesus"
  | "crucifixion"
  | "resurrection"
  | "peter"
  | "paul"
  | "apostles"
  | "early-church"
  | "martyrs-saints"
  | "modern-believers";

export type DropZoneData = {
  id: DropZoneId;
  label: string;
  x: number;
  y: number;
  size: number;
  unlockStage: TreeStage;
  stage: "creation" | "fall" | "old_testament" | "christ" | "resurrection" | "new_life";
  description: string;
  question?: string;
  image: string;
};

export const dropZones: DropZoneData[] = [
  {
    id: "adam-eve",
    label: "آدم وحواء",
    x: 50,
    y: 90,
    size: 56,
    unlockStage: "creation_alive",
    stage: "creation",
    description: "آدم وحواء قبل السقوط",
    question: "مين أول ناس ربنا خلقهم على الأرض؟",
    image: "adam-eve.webp",
  },
  {
    id: "fall",
    label: "السقوط",
    x: 50,
    y: 80,
    size: 56,
    unlockStage: "creation_alive",
    stage: "fall",
    description: "آدم وحواء سمعوا كلام الحية وأكلوا من الثمرة",
    question: "مين خدع آدم وحواء وخلاهم يعصوا ربنا؟",
    image: "fall.webp",
  },
  {
    id: "noah",
    label: "نوح",
    x: 37,
    y: 70,
    size: 48,
    unlockStage: "dead_waiting",
    stage: "old_testament",
    description: "نوح والفلك",
    question: "مين بنى فلك كبير علشان ربنا ينقذ عيلته؟",
    image: "noah.webp",
  },
  {
    id: "abraham",
    label: "إبراهيم",
    x: 63,
    y: 70,
    size: 48,
    unlockStage: "dead_waiting",
    stage: "old_testament",
    description: "إبراهيم ووعد ربنا",
    question: "مين ربنا طلب منه يقدم ابنه ذبيحة؟",
    image: "abraham.webp",
  },
  {
    id: "joseph",
    label: "يوسف",
    x: 34,
    y: 60,
    size: 48,
    unlockStage: "dead_waiting",
    stage: "old_testament",
    description: "يوسف في مصر",
    question: "مين بقى وزير على مصر؟",
    image: "joseph.webp",
  },
  {
    id: "moses",
    label: "موسى",
    x: 66,
    y: 60,
    size: 48,
    unlockStage: "dead_waiting",
    stage: "old_testament",
    description: "موسى والوصايا",
    question: "مين ربنا استخدمه عشان يشق البحر الأحمر؟",
    image: "moses.webp",
  },
  {
    id: "david",
    label: "داود",
    x: 37,
    y: 50,
    size: 48,
    unlockStage: "dead_waiting",
    stage: "old_testament",
    description: "داود بالمزمار أو المقلاع",
    question: "مين كان ملك وكان بيعزف على القيثارة؟",
    image: "david.webp",
  },
  {
    id: "jonah",
    label: "يونان",
    x: 63,
    y: 50,
    size: 48,
    unlockStage: "dead_waiting",
    stage: "old_testament",
    description: "يونان والحوت الكبير",
    question: "مين هرب من ربنا وركب السفينة؟",
    image: "jonah.webp",
  },
  {
    id: "jesus",
    label: "يسوع",
    x: 50,
    y: 42,
    size: 58,
    unlockStage: "dead_waiting",
    stage: "christ",
    description: "يسوع المسيح",
    question: "مين هو ابن الله؟",
    image: "jesus.webp",
  },
  {
    id: "crucifixion",
    label: "الصليب",
    x: 50,
    y: 32,
    size: 58,
    unlockStage: "dead_waiting",
    stage: "christ",
    description: "يسوع على الصليب",
    question: "فين تمت ذبيحة الفداء؟",
    image: "crucifixion.webp",
  },
  {
    id: "resurrection",
    label: "القيامة",
    x: 50,
    y: 22,
    size: 58,
    unlockStage: "dead_waiting",
    stage: "resurrection",
    description: "القبر الفاضي أو المسيح القائم",
    question: "مين قام من الموت بعد 3 أيام؟",
    image: "resurrection.webp",
  },
  {
    id: "peter",
    label: "بطرس",
    x: 34,
    y: 22,
    size: 48,
    unlockStage: "redeemed_alive",
    stage: "new_life",
    description: "بطرس الرسول",
    question: "مين آمن على إيده 3000 شخص في يوم واحد؟",
    image: "peter.webp",
  },
  {
    id: "paul",
    label: "بولس",
    x: 66,
    y: 22,
    size: 48,
    unlockStage: "redeemed_alive",
    stage: "new_life",
    description: "بولس الرسول",
    question: "مين كتب 14 رسالة في العهد الجديد؟",
    image: "paul.webp",
  },
  {
    id: "apostles",
    label: "الرسل",
    x: 30,
    y: 12,
    size: 48,
    unlockStage: "redeemed_alive",
    stage: "new_life",
    description: "الرسل مع بعض",
    question: "مين نزل عليهم الروح القدس يوم الخمسين؟",
    image: "apostles.webp",
  },
  {
    id: "early-church",
    label: "الكنيسة الأولى",
    x: 70,
    y: 12,
    size: 48,
    unlockStage: "redeemed_alive",
    stage: "new_life",
    description: "الكنيسة الأولى",
    question: "إيه اسم أول جماعة من المؤمنين بالمسيح؟",
    image: "early-church.webp",
  },
  {
    id: "martyrs-saints",
    label: "القديسين",
    x: 40,
    y: 8,
    size: 48,
    unlockStage: "redeemed_alive",
    stage: "new_life",
    description: "الشهداء والقديسين",
    question: "مين ضحوا بحياتهم من أجل المسيح؟",
    image: "martyrs-saints.webp",
  },
  {
    id: "modern-believers",
    label: "إحنا النهارده",
    x: 60,
    y: 8,
    size: 48,
    unlockStage: "redeemed_alive",
    stage: "new_life",
    description: "أولاد وعائلات مسيحية النهارده",
    question: "مين بيشهد للمسيح في العالم النهارده؟",
    image: "modern-believers.webp",
  },
];

const medallionImages = import.meta.glob<string>("../assets/medallions/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
});

export const medallionImage = (image: string) => medallionImages[`../assets/medallions/${image}`] ?? "";
