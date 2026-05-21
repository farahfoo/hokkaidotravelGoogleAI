import { DayTimeline } from './types';

export const INITIAL_ITINERARY: DayTimeline[] = [
  {
    day: 1,
    date: "May 24",
    location: "Otaru",
    sleep: "Hotel Nord Otaru",
    weather: "10°C (50°F). Cool evening, breezy.",
    activities: [
      {
        id: "act-1-1",
        time: "06:00 PM",
        title: "Arrival in Hokkaido",
        category: "Logistics",
        desc: "Arrive at New Chitose Airport and pick up rental car. Essential start for the alpine journey.",
        icon: "Plane",
        price: "not available",
        hours: "not available"
      },
      {
        id: "act-1-2",
        time: "07:30 PM",
        title: "Hotel Nord Otaru Check-in",
        category: "Logistics",
        desc: "Check into the historic canal-side hotel with classic European architecture.",
        icon: "Hotel",
        price: "not available",
        hours: "not available"
      },
      {
        id: "act-1-3",
        time: "08:30 PM",
        title: "Night Canal Walk",
        category: "Sightseeing",
        desc: "Stroll along the illuminated Otaru Canal. Perfect for photography with historical brick warehouses reflected in the water.",
        icon: "Camera",
        gear: "Medium-weight jacket or light down vest",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRBaehCMYIl93qx5oqyKcKGvEtIjf8Hxp0pFVs-AgvLaWKZPKj_rxwp_6pE68ZxLqvos50bz5nduRuyLrEFIhEDt9vnFot6JeN_obC_8WzdeC2_PAS4qXTUpCjyEEvUUx20hiFmbXVBY4R7VBrzvb5FzivBiHq0FmIaySO91ZdiEzKisl5pdvOeeugNJnU0VN7o_mKQCdXCV-rGZgqPZFNuLL0alIBZN3JcViDLWNqt7hQW8xt46IEc1JF82yXumzOFXqjdQIfJhA",
        price: "Free",
        hours: "24/7"
      }
    ]
  },
  {
    day: 2,
    date: "May 25",
    location: "Otaru / Sapporo",
    sleep: "Sapporo Hotel",
    weather: "16°C (61°F). High wind chill.",
    activities: [
      {
        id: "act-2-1",
        time: "09:00 AM",
        title: "Sankaku Market Sushi",
        category: "Food",
        desc: "Fresh kaisendon breakfast at the triangle market. Seasonal seafood at its peak.",
        icon: "Utensils",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKhY7L4rIZUj0eFzXwUGelAQmYnbR0mLO83Jpiqw2qa6aFS-VhfDq4Aq6HhwqYXh2EThHxwfu8G9nwgBN2-l-yT5CluYX-Rv4-Gx7BAHRMBYtq7xS4_7X2whF196NMDEJuHnddPOZIIEP71Zt8sJ6nW6GO7HIw1Rpop39m_CM-zZz0-8Z26YIc5tdwq3NMIlF6xohf_Y52Rke8DC895Pqa8-I-oZVX8Bw-ZOvvpvTh3ph1RMCZlte0ZZcq59C0iIHkhMtR4UcLBq0",
        price: "¥2,500 - ¥5,000",
        hours: "8:00 AM - 5:00 PM"
      },
      {
        id: "act-2-2",
        time: "11:00 AM",
        title: "Blue Cave Tour",
        category: "Sightseeing",
        desc: "Power boat tour of the mystic Otaru blue caves. Brilliant turquoise waters await.",
        url: "https://www.ryugu-cruise.com/en/",
        icon: "Sailboat",
        gear: "Windbreaker/Waterproof shell required. Sneakers with grip",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpq1LC-0t9wzZfiMcvJwwHqbEG3MC5E_ikspgu0SjJskKt9DMt2mLem3u0-tDEIDH1bsBdFNVlOXb-xXI6DeuuG2sqg49SAHBoOFMDxD97NYcE0F-eWGS_2Bi84iVK6XYIzdd9cgcPdwf40Q0F9JKP8B-Ry7SD2XUc_HxyDTz1SMTgythc1AF_4WBdt5ppoGrUjm48h2kufB8H-uhJquLJtoIfqGwrvCAupiWCBzq8qxCLGRcqKBVSqyp5KB33kUvdYgmgVkOxL-o",
        price: "¥6,000",
        hours: "8:30 AM - 5:30 PM"
      },
      {
        id: "act-2-3",
        time: "03:00 PM",
        title: "Mt. Tengu Ropeway",
        category: "Sightseeing",
        desc: "City views and chipmunk park visit. Panoramic landscape of the harbor.",
        url: "https://tenguyama.ckk.chuo-bus.co.jp/en/",
        icon: "TrendingUp",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_4RE3t6YdBRjZ-hzNFIFMEX1dH2sM13accFoO28X5tXJveoHnw2UyBN6d1bWnEwIQC2_jfPZkgbww_53Th0Bg3lLXGHLTkRRPW6HgNTGn_XUqnNgegiWZnUojF6xOAqmEEGKXRXaegTLHml7u4WDuNHgXWy9qSiNtdPyp0-XkOXcYe_Dan3yvXAcVlf360Vnp828Vi94hF8pXonxPHSqBj7DIzzoE9Hv6r7DrVPi4A27FOu8jNGCS2YUGc9HngGSvxA02BZ_7lmY",
        price: "¥1,400",
        hours: "11:00 AM - 8:30 PM"
      },
      {
        id: "act-2-4",
        time: "07:00 PM",
        title: "Drive to Sapporo",
        category: "Logistics",
        desc: "Evening drive to the vibrant capital city.",
        icon: "Car",
        price: "not available",
        hours: "not available"
      }
    ]
  },
  {
    day: 3,
    date: "May 26",
    location: "Sapporo",
    sleep: "Sapporo Hotel",
    weather: "19°C (66°F). Sunny.",
    activities: [
      {
        id: "act-3-1",
        time: "10:00 AM",
        title: "Sapporo TV Tower",
        category: "Sightseeing",
        desc: "Panoramic views of Odori Park and the city layout.",
        url: "https://www.tv-tower.co.jp/en/",
        icon: "Building",
        gear: "City casual. Light layers for indoor malls",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe2eUoLOb0ykP1lXPeQON1xubCVuwnEq--8b-GON1nAt_EsAXWdM4jHyr0dfHjZiRYKQsqHPpJPLmMzE61QscINZurOlc27q00I4ef9IGbCHES0pldP_RvWZXzhMKUCxN_zUC7EhbRbo4kL8qOiuY732F374CQzJD5ccbX8NfwV5HvftEJuYM5DhhYzOZRf6RgMcFEDyP2HkRez-Dm8CxXOvZY7xu1Gs7M-_dyDmZ2OB9ltpOUIQFpe8vXB6AOhu9RWVMctZVSzjk",
        price: "¥1,000",
        hours: "9:00 AM - 10:00 PM"
      },
      {
        id: "act-3-2",
        time: "12:00 PM",
        title: "Nijo Market Sushi",
        category: "Food",
        desc: "Local market lunch specializing in seasonal Hokkaido treasures.",
        icon: "Fish",
        gear: "City casual",
        price: "¥2,000 - ¥4,500",
        hours: "7:00 AM - 5:00 PM"
      },
      {
        id: "act-3-3",
        time: "03:00 PM",
        title: "Tanukikoji Shopping",
        category: "Shopping",
        desc: "Explore the historic 1km-long shopping arcade. Great for local souvenirs.",
        icon: "ShoppingBag",
        gear: "City casual",
        price: "Free",
        hours: "24/7"
      },
      {
        id: "act-3-4",
        time: "07:00 PM",
        title: "Ishizaki Wagyu Dinner",
        category: "Food",
        desc: "Premium A5 Wagyu dining experience with master chefs.",
        url: "https://savorjapan.com/0006037145/",
        icon: "Flame",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8GKuu41jsjr75VMaxTVI2nKF2nM7QFnZcF2P4pvx3YQsJf2Uft64Osd2ljPTj98XFN9Wz4j6rdkEuSVWbFuC17RcNYHA2Dw4PNsSVkRK6DjfhxawS_zkK4Ncg6BrC5VOCnGoCM5CHEp6cQ07H99KAA7N_sfXwC4y4YC8MHkGDetcrTaONB6QVa8UjMhgZGVkqD2fYMp3KrKFUVI3cnJhAxeePft8l0TuWWCwQuTm8-0QVE0y_y35Vu_uTsOxX-UMf4YCHhrXzuug",
        price: "¥15,000 - ¥25,000",
        hours: "5:00 PM - 11:00 PM"
      }
    ]
  },
  {
    day: 4,
    date: "May 27",
    location: "Furano / Biei",
    sleep: "Sapporo Hotel",
    weather: "18°C (64°F). Mountain rain possible.",
    activities: [
      {
        id: "act-4-1",
        time: "08:30 AM",
        title: "Furano & Biei Day Tour",
        category: "Sightseeing",
        desc: "Seeing flower fields at Shikisai-no-oka with rolling hills of color.",
        url: "https://www.klook.com/en-US/activity/2126-furano-biei-shiki-no-oka-hokkaido/",
        icon: "Palette",
        gear: "Umbrella/Raincoat. Sturdy walking shoes",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYfwAgJ3AmdwVd3JWEDRO40zHAVbLXApI7fD9bDHTP8wCKyShbjKeyFxSxCmFTQwzj4WqdM71VdANvws28XmXn9YkkQAki44mCDhMuqOVYfUlHTwGWwysLnCF29Nde4DGPMvyTd5THb38LP0x0o7SYNx_iAXCKwXiuWqWUw7eOnyHiYpMNQMKEEbD4Qe612OT74MttP8nmuNSHx7NbMUnP9yhiWJc-XnOic8hVzulT08lrhOxbXO6pIqYmafLJ2xNniiRnshbJARA",
        price: "¥500",
        hours: "8:40 AM - 5:00 PM"
      },
      {
        id: "act-4-2",
        time: "11:00 AM",
        title: "Blue Pond (Aoiike)",
        category: "Sightseeing",
        desc: "The surreal milky blue water and silver birch trees of Biei.",
        icon: "Eye",
        gear: "Sturdy walking shoes",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5O4VBLcVceeVxMg-MoWjlk8gC6SCOydEBFx40m2zb_bnbcc--nsdseYaSbqua7QZOo_nMP_bir5SiWV45Tjmq2wYRS_U6Ss5gPEeeuuz6mmvxGHkru4XuyCXqJp9LFWiJknZq8YqvFGkw8RzKJCZHChiu9-d1VTwmvaPzPFiHx_3mZ5faCHGEA75vkB81eN0gywGMcMEgq8ryuuTp_U4zA_0FrzqeZc3PTq_PDPqZwJtSexIJrjJ0EMtsyD5WhqdXRSrGo2SXz-s",
        price: "Free",
        hours: "24/7"
      },
      {
        id: "act-4-3",
        time: "01:00 PM",
        title: "Asahiyama Zoo Option",
        category: "Sightseeing",
        desc: "Famous polar bear and penguin exhibits in unique habitats.",
        url: "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/",
        icon: "Heart",
        price: "¥1,000",
        hours: "9:30 AM - 5:15 PM"
      },
      {
        id: "act-4-4",
        time: "07:30 PM",
        title: "NanKouEn Wagyu",
        category: "Food",
        desc: "Yakiniku night in Susukino. Sizzling local cuts.",
        url: "https://www.klook.com/en-US/activity/20120-nankouen-okura-yakiniku-sapporo/",
        icon: "Flame",
        price: "¥5,000 - ¥8,000",
        hours: "5:00 PM - 11:30 PM"
      }
    ]
  },
  {
    day: 5,
    date: "May 28",
    location: "Jozankei",
    sleep: "Jozankei Ryokan",
    weather: "17°C (63°F). Breezy.",
    activities: [
      {
        id: "act-5-1",
        time: "10:00 AM",
        title: "Moerenuma Park",
        category: "Sightseeing",
        desc: "Large-scale sculpture park designed by Isamu Noguchi. Features the iconic Glass Pyramid.",
        icon: "Compass",
        gear: "Wind-resistant jacket",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIj55AjoUOc5qSs97kvr311jpXh2tzFB6cSs96pcDfJiYD0DeFx52AtK648WnFTPsGOKE76jW4WTTRI696Pa-bY1YxSNInpU21kT4-sF8LmhywB-5j5GZuVxrW27zaYmmD6ww1TMmEQV8HrOGPH9ruPQ0VbrzQVkmgsN4_lYk9Fw1IKZ9BBVGBstMqPVYQUGRhj66Iy12kvkS-J8EoMNXrU4mO2u0_GBy_i5wXAQU0A5x5g3DASQJkZ0ojrEhBRd4OT7blxgRnA4I",
        price: "Free",
        hours: "7:00 AM - 10:00 PM"
      },
      {
        id: "act-5-2",
        time: "01:00 PM",
        title: "Shiroi Koibito Park",
        category: "Shopping",
        desc: "Chocolate factory tour and fairytale architecture.",
        url: "https://www.shiroikoibitopark.jp/en/",
        icon: "Gift",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB3-pYSY-JmsIh-rK8GfwlimEkbYSZgbbdpD71DnuMeMU3opsZ_DM4Bj3G11rPICyctMoFHNGFbQ3BpmViobS8ey1GLoNCBzsLyvRu-lqSsD6mPKdHwPFS5ZtDYD6nMiZVIGWL9M4T7xC9wD_VNOfh_x9Ha2lctfXuwNXO0w6iZz4FVfOGhQquppHitrmTpOMAsnE3afNNjYbC08BP-DWLGe0qf1lIB8z4fjibbrgKwARAKllxZhKX3O5NYib2ZNrlCEK8YYrwn_w",
        price: "¥800",
        hours: "10:00 AM - 6:00 PM"
      },
      {
        id: "act-5-3",
        time: "06:00 PM",
        title: "Ryokan Check-in",
        category: "Logistics",
        desc: "Traditional Japanese inn arrival in the Onsen town. Forest views from your room.",
        icon: "Home",
        gear: "Slip-on shoes for the Ryokan",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxHFs0hLl16zbdXCfswjimTkTgLsmL01C1vAT3l3jEo1Vk-XG-DTwwt3bbWK_qSTupTCgFdDbxqeAwywugrR1s5KaFsg53eVWO6MEObo4YS-l1WlgSjJ7pfUcob_gIv3eD5YeCZGnLEOv5c8wvpNbEOIoUst7lXqgdKMsCbGKdywMGLcHghT1PyKF6N5NSwguUNe6yao3amN5mdJDRg-NfL7e4QMFZ58JpuwEyC_Nu7v3eQkkUVDwimGTEtdht7HXCWwwfGFVYago",
        price: "not available",
        hours: "not available"
      },
      {
        id: "act-5-4",
        time: "07:30 PM",
        title: "Wagyu Kaiseki Dinner",
        category: "Food",
        desc: "Multi-course traditional dinner with Zen aesthetic.",
        icon: "Soup",
        price: "not available",
        hours: "not available"
      }
    ]
  },
  {
    day: 6,
    date: "May 29",
    location: "Lake Toya / Chitose",
    sleep: "Chitose Hotel",
    weather: "15°C (59°F). Colder at summit.",
    activities: [
      {
        id: "act-6-1",
        time: "10:00 AM",
        title: "Mt. Usu Ropeway",
        category: "Sightseeing",
        desc: "Active volcano views. Gear: Hiking Boots.",
        url: "https://usuzan.hokkaido.jp/en/",
        icon: "Mountain",
        gear: "Hiking Boots Required. Thermal fleece layer",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkc1YLFi6LerS9184D1xRZBpm1W9FWrVNZHMhCgwCXFzV6SymAiN0F7NlFSxAz3f1SD4RnvOi0d5fAlixrKWscNwcPiimJqbu_Lf8R-1-aL2Ls8JTz8sdVmAYKOFsZZChDVvDuCye3BUEC6BJxR_QY7O6HIbtmHaRc22gxkOE2N-XQtVgONrQOjpcNn11esjKq6HGs1nEXp-5MuVmVu5oJYDXpIPANB8bqjefGHx2cYvc2P4TzZwNXGMiszFBdHUdgWotJoD7vYM8",
        price: "¥1,800",
        hours: "8:15 AM - 5:30 PM"
      },
      {
        id: "act-6-2",
        time: "12:30 PM",
        title: "Sendouan Wagyu",
        category: "Food",
        desc: "Lakefront dining featuring Hokkaido beef and panoramic views.",
        url: "https://www.wakasaimo.com/shop/sendouan/",
        icon: "Waves",
        price: "¥2,000 - ¥4,500",
        hours: "11:00 AM - 7:00 PM"
      },
      {
        id: "act-6-3",
        time: "03:30 PM",
        title: "Lake Shikotsu",
        category: "Sightseeing",
        desc: "Crystal clear caldera lake visit. Serene nature at its best.",
        icon: "Waves",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAMIfo4opo91D9WxkhtUH-JanqwrxrkGK21F4lPQrVf1wXmQZ5oKDApuur8QDdz2gWdRj2Q4hK892--TvfJNGw6lsjqcq7Z3ocl0d1ERENG0gC0lKOI9VgwjI_uiRy2d-clxG22zobQZcoW3bwmEsY7j2J3cNxWfhzzDCJjhpRXw5fgOekcY0uyqONApj5aGRMpFOaQC7SUMf7k6ViTo8VbmnFbih-TBdBFtFHOxhry3cZFYzjLkvqZUS1SoZ2ZV83G-xX63WUxoU",
        price: "Free",
        hours: "24/7"
      }
    ]
  },
  {
    day: 7,
    date: "May 30",
    location: "Departure",
    sleep: "Home",
    weather: "20°C (68°F). Mild.",
    activities: [
      {
        id: "act-7-1",
        time: "11:00 AM",
        title: "Aeon Mall Chitose",
        category: "Shopping",
        desc: "Last-minute souvenir shopping for local snacks and goods.",
        icon: "ShoppingBag",
        gear: "Comfortable flight layers",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0in_1cI3xhT4Qn_Gmpw-ydlJLEH1S71A3JKVNbyYzbggyNa2P9zw8c_o3qBBYEVeZ3_um2OB3lW-q_T8-wb0CUB-yayA1cgl_Em9Rq4KNxFzekcd69x0gR9iYdgzOH3C4BXtr-zH_pAnDDYfgNxRdKgzmIWzD8WfCliTRptrQ9CgpIa55G3fMo6rAg6oHYA-h2-KZ5bLUpV3YVSHEzPk7TBd73G8M9X2oGcC8NqColNAqvwsN2kLMOjtnjaHW71TKVUBc3x610Qk",
        price: "Free",
        hours: "9:00 AM - 10:00 PM"
      },
      {
        id: "act-7-2",
        time: "01:00 PM",
        title: "Royce' Chocolate World",
        category: "Food",
        desc: "The whimsical world of chocolate at the airport. Watch the machines in action.",
        icon: "Cookie",
        gear: "Comfortable flight layers",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJkVmUZxwoCq_xIlJdnBk7E6OSRCdtYDLdIeEUlG2jF1LFrflu7ga-h-h3DJUbBMpjtOSg_kNPvFakdq9YYeGUugT8hUSrewzv2X2QO_OEUWCKxdr2TiJrcB1ZVIIUHuiXFjWltRWmXBkzRxvT90YeROZEp9qWEntwV9AfsvM_NnDPVSA-rm-JJ-K5ZIPUI6NvosuEeDdg85vD1NWLZs-Y0n-TE2O_amJDPE0VFHTAg2fRGUrnUi6t0MTO-t_CbcjKRxWGf59UJwI",
        price: "Free",
        hours: "8:35 AM - 8:00 PM"
      },
      {
        id: "act-7-3",
        time: "07:00 PM",
        title: "Flight Departure",
        category: "Logistics",
        desc: "Evening flight back home. End of journey.",
        icon: "Plane",
        gear: "Comfortable flight layers",
        price: "not available",
        hours: "not available"
      }
    ]
  }
];

export const GALLERY_IMAGES = [
  {
    title: "Otaru Canal Night Light",
    location: "Otaru",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRBaehCMYIl93qx5oqyKcKGvEtIjf8Hxp0pFVs-AgvLaWKZPKj_rxwp_6pE68ZxLqvos50bz5nduRuyLrEFIhEDt9vnFot6JeN_obC_8WzdeC2_PAS4qXTUpCjyEEvUUx20hiFmbXVBY4R7VBrzvb5FzivBiHq0FmIaySO91ZdiEzKisl5pdvOeeugNJnU0VN7o_mKQCdXCV-rGZgqPZFNuLL0alIBZN3JcViDLWNqt7hQW8xt46IEc1JF82yXumzOFXqjdQIfJhA"
  },
  {
    title: "Fresh Kaisendon breakfast",
    location: "Sankaku Market, Otaru",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKhY7L4rIZUj0eFzXwUGelAQmYnbR0mLO83Jpiqw2qa6aFS-VhfDq4Aq6HhwqYXh2EThHxwfu8G9nwgBN2-l-yT5CluYX-Rv4-Gx7BAHRMBYtq7xS4_7X2whF196NMDEJuHnddPOZIIEP71Zt8sJ6nW6GO7HIw1Rpop39m_CM-zZz0-8Z26YIc5tdwq3NMIlF6xohf_Y52Rke8DC895Pqa8-I-oZVX8Bw-ZOvvpvTh3ph1RMCZlte0ZZcq59C0iIHkhMtR4UcLBq0"
  },
  {
    title: "Mystic Otaru Blue Caves",
    location: "Otaru",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpq1LC-0t9wzZfiMcvJwwHqbEG3MC5E_ikspgu0SjJskKt9DMt2mLem3u0-tDEIDH1bsBdFNVlOXb-xXI6DeuuG2sqg49SAHBoOFMDxD97NYcE0F-eWGS_2Bi84iVK6XYIzdd9cgcPdwf40Q0F9JKP8B-Ry7SD2XUc_HxyDTz1SMTgythc1AF_4WBdt5ppoGrUjm48h2kufB8H-uhJquLJtoIfqGwrvCAupiWCBzq8qxCLGRcqKBVSqyp5KB33kUvdYgmgVkOxL-o"
  },
  {
    title: "Panorama from Mt. Tengu",
    location: "Mt. Tengu, Otaru",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_4RE3t6YdBRjZ-hzNFIFMEX1dH2sM13accFoO28X5tXJveoHnw2UyBN6d1bWnEwIQC2_jfPZkgbww_53Th0Bg3lLXGHLTkRRPW6HgNTGn_XUqnNgegiWZnUojF6xOAqmEEGKXRXaegTLHml7u4WDuNHgXWy9qSiNtdPyp0-XkOXcYe_Dan3yvXAcVlf360Vnp828Vi94hF8pXonxPHSqBj7DIzzoE9Hv6r7DrVPi4A27FOu8jNGCS2YUGc9HngGSvxA02BZ_7lmY"
  },
  {
    title: "Odori Park and Sapporo TV Tower",
    location: "Sapporo",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe2eUoLOb0ykP1lXPeQON1xubCVuwnEq--8b-GON1nAt_EsAXWdM4jHyr0dfHjZiRYKQsqHPpJPLmMzE61QscINZurOlc27q00I4ef9IGbCHES0pldP_RvWZXzhMKUCxN_zUC7EhbRbo4kL8qOiuY732F374CQzJD5ccbX8NfwV5HvftEJuYM5DhhYzOZRf6RgMcFEDyP2HkRez-Dm8CxXOvZY7xu1Gs7M-_dyDmZ2OB9ltpOUIQFpe8vXB6AOhu9RWVMctZVSzjk"
  },
  {
    title: "Flower Fields of Shikisai-no-oka",
    location: "Biei",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYfwAgJ3AmdwVd3JWEDRO40zHAVbLXApI7fD9bDHTP8wCKyShbjKeyFxSxCmFTQwzj4WqdM71VdANvws28XmXn9YkkQAki44mCDhMuqOVYfUlHTwGWwysLnCF29Nde4DGPMvyTd5THb38LP0x0o7SYNx_iAXCKwXiuWqWUw7eOnyHiYpMNQMKEEbD4Qe612OT74MttP8nmuNSHx7NbMUnP9yhiWJc-XnOic8hVzulT08lrhOxbXO6pIqYmafLJ2xNniiRnshbJARA"
  },
  {
    title: "Surreal Shirogane Blue Pond",
    location: "Biei",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5O4VBLcVceeVxMg-MoWjlk8gC6SCOydEBFx40m2zb_bnbcc--nsdseYaSbqua7QZOo_nMP_bir5SiWV45Tjmq2wYRS_U6Ss5gPEeeuuz6mmvxGHkru4XuyCXqJp9LFWiJknZq8YqvFGkw8RzKJCZHChiu9-d1VTwmvaPzPFiHx_3mZ5faCHGEA75vkB81eN0gywGMcMEgq8ryuuTp_U4zA_0FrzqeZc3PTq_PDPqZwJtSexIJrjJ0EMtsyD5WhqdXRSrGo2SXz-s"
  },
  {
    title: "Glass Pyramid in Moerenuma",
    location: "Sapporo",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIj55AjoUOc5qSs97kvr311jpXh2tzFB6cSs96pcDfJiYD0DeFx52AtK648WnFTPsGOKE76jW4WTTRI696Pa-bY1YxSNInpU21kT4-sF8LmhywB-5j5GZuVxrW27zaYmmD6ww1TMmEQV8HrOGPH9ruPQ0VbrzQVkmgsN4_lYk9Fw1IKZ9BBVGBstMqPVYQUGRhj66Iy12kvkS-J8EoMNXrU4mO2u0_GBy_i5wXAQU0A5x5g3DASQJkZ0ojrEhBRd4OT7blxgRnA4I"
  }
];
