export interface ConfessionNote {
  id: string;
  roman: string;
  text: string;
  subtext: string;
}

export interface ChapterLine {
  id: string;
  index: string;
  text: string;
  whisper: string;
}

export interface QuizOption {
  id: string;
  label: string;
  reaction: string;
  heatPoints: number;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: QuizOption[];
}

export interface QuizResultProfile {
  minPoints: number;
  maxPoints: number;
  title: string;
  subtitle: string;
  verdict: string;
  closingNote: string;
}

export interface UnsaidLetter {
  id: string;
  label: string;
  sealMark: string;
  message: string;
  postscript: string;
}

export interface ChrisGreyTrack {
  id: string;
  youtubeId: string;
  title: string;
  artist: string;
  album: string;
  releaseTag: string;
  mood: string;
  whisper: string;
  youtubeUrl: string;
  artworkUrl: string;
}

export interface PortraitFrame {
  id: string;
  src: string;
  alt: string;
  figureLabel: string;
  caption: string;
  note: string;
  focalPosition: string;
}

const BASE = import.meta.env.BASE_URL;

export const HERO_IMAGE = `${BASE}src/assets/images/hero_velvet_roses_1795558131469.jpg`;
export const CHAPTER_IMAGE = `${BASE}src/assets/images/chapter_candlelight_silk_1795558131962.jpg`;
export const UNSAID_IMAGE = `${BASE}src/assets/images/unsaid_wax_seal_1795558132770.jpg`;
export const INVITATION_IMAGE = `${BASE}src/assets/images/invitation_climax_backdrop_1795558132896.jpg`;

export const CHI_PORTRAITS: PortraitFrame[] = [
  {
    id: "chi-1",
    src: `${BASE}assets/aistudio/268882_bab5aa50.jpg`,
    alt: "Chi wearing headphones while leaning against a blue motorcycle",
    figureLabel: "PLATE I",
    caption: "Unbothered, headphones on—and somehow still all I think about.",
    note: "Velvet & quiet confidence",
    focalPosition: "object-[58%_42%]"
  },
  {
    id: "chi-2",
    src: `${BASE}assets/aistudio/268883_f31a34c7.jpg`,
    alt: "Chi in a deep red shirt and black cap taking a mirror portrait",
    figureLabel: "PLATE II",
    caption: "Dressed in crimson, looking like my worst best decision.",
    note: "Midnight crimson mood",
    focalPosition: "object-top"
  },
  {
    id: "chi-3",
    src: `${BASE}assets/aistudio/268884_5b349310.jpg`,
    alt: "Close-up portrait of Chi looking toward the camera",
    figureLabel: "PLATE III",
    caption: "That look you give when you know exactly what you're doing.",
    note: "Close enough to ruin my focus",
    focalPosition: "object-center"
  }
];

export const CONFESSION_NOTES: ConfessionNote[] = [
  {
    id: "c1",
    roman: "I",
    text: "I've been trying to behave. It's becoming increasingly difficult.",
    subtext: "Consider this my formal resignation from restraint."
  },
  {
    id: "c2",
    roman: "II",
    text: "You have absolutely no business being this distracting.",
    subtext: "Even when you aren't trying, you still win."
  },
  {
    id: "c3",
    roman: "III",
    text: "I have a few thoughts about you that are definitely not suitable for polite conversation.",
    subtext: "And none of them belong in daylight."
  },
  {
    id: "c4",
    roman: "IV",
    text: "You make innocent intentions feel like a terrible lie.",
    subtext: "I stopped believing myself days ago."
  },
  {
    id: "c5",
    roman: "V",
    text: "Sometimes I look at your messages and wonder how we're still pretending this is innocent.",
    subtext: "The subtext has been louder than the words."
  },
  {
    id: "c6",
    roman: "VI",
    text: "I don't just want your attention. I want some uninterrupted time with you.",
    subtext: "No screens between us. Just the room."
  },
  {
    id: "c7",
    roman: "VII",
    text: "I have a feeling we'd be terrible at keeping our hands to ourselves.",
    subtext: "And honestly, Chi, I don't intend to test my willpower."
  }
];

export const DARK_ROMANCE_LINES: ChapterLine[] = [
  {
    id: "d1",
    index: "01",
    text: "I want the kind of evening where we lose track of time.",
    whisper: "Clocks turned face down. Phones forgotten across the room."
  },
  {
    id: "d2",
    index: "02",
    text: "A little tension, a little teasing, and absolutely no reason to rush.",
    whisper: "Every slow second stretched until it breaks."
  },
  {
    id: "d3",
    index: "03",
    text: "I want to see what happens when we're finally in the same room without distractions.",
    whisper: "Close enough to hear your breath change."
  },
  {
    id: "d4",
    index: "04",
    text: "Some things are better whispered than typed.",
    whisper: "Especially the ones that make you look at me like that."
  },
  {
    id: "d5",
    index: "05",
    text: "I wonder how long we'd manage to behave around each other.",
    whisper: "Ten minutes? Five? Or not even past the doorway."
  },
  {
    id: "d6",
    index: "06",
    text: "If chemistry were a crime, I think we'd both be guilty.",
    whisper: "And neither of us would bother pleading innocent."
  },
  {
    id: "d7",
    index: "07",
    text: "I don't want a perfect evening. I want an unforgettable one.",
    whisper: "The kind that lingers on your skin until morning."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: "If I told you I wanted to see you tonight, what would you say?",
    options: [
      {
        id: "q1-a",
        label: "Where and when?",
        reaction: "Direct, effortless, and dangerous. I like a man who doesn't waste a single second.",
        heatPoints: 2
      },
      {
        id: "q1-b",
        label: "Depends... what's the plan?",
        reaction: "Playing composed, are we? Don't worry—you'll find out the moment the door closes.",
        heatPoints: 1
      },
      {
        id: "q1-c",
        label: "You don't have to ask twice.",
        reaction: "Good. Because I wasn't planning on keeping my patience much longer anyway.",
        heatPoints: 3
      }
    ]
  },
  {
    id: 2,
    prompt: "Are you naturally this tempting, or is it a talent?",
    options: [
      {
        id: "q2-a",
        label: "Natural talent.",
        reaction: "Confident enough to own it. That only makes me want to test how far it goes.",
        heatPoints: 2
      },
      {
        id: "q2-b",
        label: "Maybe it's just with you.",
        reaction: "Careful, Chi. Lines like that are exactly why behaving isn't on the menu.",
        heatPoints: 3
      },
      {
        id: "q2-c",
        label: "You'll have to find out.",
        reaction: "Consider that challenge formally accepted—preferably in person, after midnight.",
        heatPoints: 3
      }
    ]
  },
  {
    id: 3,
    prompt: "What kind of evening would you choose?",
    options: [
      {
        id: "q3-a",
        label: "Sweet and romantic.",
        reaction: "Sweet at first, maybe... though I doubt it stays entirely innocent for long.",
        heatPoints: 1
      },
      {
        id: "q3-b",
        label: "A little teasing and a lot of chemistry.",
        reaction: "Now you're speaking my language. Slow tension, dark pours, and stolen glances.",
        heatPoints: 2
      },
      {
        id: "q3-c",
        label: "Something we'll both remember.",
        reaction: "Bold choice. Let's make sure neither of us sleeps early—or wants to.",
        heatPoints: 3
      }
    ]
  },
  {
    id: 4,
    prompt: "How good are you at resisting temptation?",
    options: [
      {
        id: "q4-a",
        label: "Very good.",
        reaction: "Adorable. Let's see how long that discipline lasts once I'm actually standing in front of you.",
        heatPoints: 1
      },
      {
        id: "q4-b",
        label: "Depends on the temptation.",
        reaction: "Smart answer. I happen to be very persuasive when I want something.",
        heatPoints: 2
      },
      {
        id: "q4-c",
        label: "I wasn't planning on resisting.",
        reaction: "Finally, complete honesty. That makes the rest of tonight delightfully simple.",
        heatPoints: 3
      }
    ]
  },
  {
    id: 5,
    prompt: "If I pulled you a little closer, what would you do?",
    options: [
      {
        id: "q5-a",
        label: "Smile.",
        reaction: "That quiet, knowing smile? You have no idea how lethal that already is.",
        heatPoints: 1
      },
      {
        id: "q5-b",
        label: "Look into your eyes.",
        reaction: "Hold my gaze long enough, and we both know what happens next.",
        heatPoints: 2
      },
      {
        id: "q5-c",
        label: "Pull you closer too.",
        reaction: "Exactly the answer I was hoping for. Zero distance left between us.",
        heatPoints: 3
      }
    ]
  }
];

export const QUIZ_PROFILES: QuizResultProfile[] = [
  {
    minPoints: 5,
    maxPoints: 8,
    title: "Deceptively Composed",
    subtitle: "Quietly Intoxicating",
    verdict:
      "You play it smooth, Chi—calm voice, steady gaze, pretending you're entirely in control. Which only makes the moment your composure slips twice as thrilling.",
    closingNote: "Let's see how long that restraint survives candlelight."
  },
  {
    minPoints: 9,
    maxPoints: 12,
    title: "Calculated Temptation",
    subtitle: "Fluent in Tension",
    verdict:
      "You know exactly what you're doing. Half-innocent on the surface, undeniably magnetic underneath—you enjoy the slow burn almost as much as the surrender.",
    closingNote: "Consider the tension officially mutual."
  },
  {
    minPoints: 13,
    maxPoints: 15,
    title: "Guilty Without Appeal",
    subtitle: "Unapologetically Dangerous",
    verdict:
      "Zero pretense, pure chemistry. Not a single innocent bone in sight, Chi—and honestly, it's the most attractive thing about you tonight.",
    closingNote: "Stop reading and come claim what you already started."
  }
];

export const UNSAID_LETTERS: UnsaidLetter[] = [
  {
    id: "u1",
    label: "Envelope I",
    sealMark: "C",
    message: "I want to experience your presence, not just your notifications.",
    postscript: "A lit screen is a poor substitute for your warmth."
  },
  {
    id: "u2",
    label: "Envelope II",
    sealMark: "II",
    message: "I wonder what your kisses feel like.",
    postscript: "Soft at first, or the kind that makes me forget my own name."
  },
  {
    id: "u3",
    label: "Envelope III",
    sealMark: "III",
    message: "I want an evening where the rest of the world can mind its business.",
    postscript: "Locked doors, low music, and zero interruptions."
  },
  {
    id: "u4",
    label: "Envelope IV",
    sealMark: "IV",
    message: "I have a few ideas, but I'd rather not spoil the surprise.",
    postscript: "Trust me—none of them are boring."
  },
  {
    id: "u5",
    label: "Envelope V",
    sealMark: "V",
    message: "Let's just say I don't think we'd run out of things to do.",
    postscript: "In fact, I suspect we'd barely get started before midnight."
  }
];

export const CHRIS_GREY_PLAYLIST: ChrisGreyTrack[] = [
  {
    id: "cg-burn",
    youtubeId: "fdJrSjMgPFE",
    title: "LET THE WORLD BURN",
    artist: "Chris Grey",
    album: "THE CASTLE NEVER FALLS",
    releaseTag: "Official Music Video",
    mood: "Obsessive Devotion",
    whisper: "I'd let the world burn for you.",
    youtubeUrl: "https://www.youtube.com/watch?v=fdJrSjMgPFE",
    artworkUrl: "https://i.ytimg.com/vi/fdJrSjMgPFE/hqdefault.jpg"
  },
  {
    id: "cg-angels",
    youtubeId: "m_X2dUkO2ZY",
    title: "MAKE THE ANGELS CRY",
    artist: "Chris Grey",
    album: "THE CASTLE NEVER FALLS",
    releaseTag: "Official Music Video",
    mood: "Forbidden Chemistry",
    whisper: "Every time that we touch, I hear the angels cry.",
    youtubeUrl: "https://www.youtube.com/watch?v=m_X2dUkO2ZY",
    artworkUrl: "https://i.ytimg.com/vi/m_X2dUkO2ZY/hqdefault.jpg"
  },
  {
    id: "cg-haunted",
    youtubeId: "I9q-OsfJSmo",
    title: "HAUNTED",
    artist: "Chris Grey",
    album: "THE CASTLE NEVER FALLS",
    releaseTag: "Official Lyric Video",
    mood: "Midnight Shadow",
    whisper: "We said our last goodbyes, but you know that's a lie.",
    youtubeUrl: "https://www.youtube.com/watch?v=I9q-OsfJSmo",
    artworkUrl: "https://i.ytimg.com/vi/I9q-OsfJSmo/hqdefault.jpg"
  },
  {
    id: "cg-shadows",
    youtubeId: "lATrfJ7wxwM",
    title: "THE SHADOWS",
    artist: "Chris Grey",
    album: "CHAPTER I: DESIRE",
    releaseTag: "Official Audio",
    mood: "After-Hours Tension",
    whisper: "In the shadows, you belong to me.",
    youtubeUrl: "https://www.youtube.com/watch?v=lATrfJ7wxwM",
    artworkUrl: "https://i.ytimg.com/vi/lATrfJ7wxwM/hqdefault.jpg"
  },
  {
    id: "cg-sick",
    youtubeId: "XSuv51WA1Lw",
    title: "SICK & TWISTED",
    artist: "Chris Grey",
    album: "THE CASTLE NEVER FALLS",
    releaseTag: "Official Audio",
    mood: "Dark Allure",
    whisper: "No pretending once the lights go low.",
    youtubeUrl: "https://www.youtube.com/watch?v=XSuv51WA1Lw",
    artworkUrl: "https://i.ytimg.com/vi/XSuv51WA1Lw/hqdefault.jpg"
  },
  {
    id: "cg-lifetime",
    youtubeId: "q3OLmQ7LrKo",
    title: "LIFETIME",
    artist: "Chris Grey",
    album: "THE CASTLE NEVER FALLS",
    releaseTag: "Official Audio",
    mood: "Slow Surrender",
    whisper: "Take your time—we have all night.",
    youtubeUrl: "https://www.youtube.com/watch?v=q3OLmQ7LrKo",
    artworkUrl: "https://i.ytimg.com/vi/q3OLmQ7LrKo/hqdefault.jpg"
  }
];
