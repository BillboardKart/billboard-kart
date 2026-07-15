export type BillboardStatus = "available" | "booked" | "premium";
export type BillboardType = "LED" | "Digital" | "Static";
export type BillboardCategory =
  "Downtown" | "Highway" | "Shopping Mall" | "Suburbs";

export interface Billboard {
  id: string;
  name: string;
  address: string;
  city: string;
  neighborhood: string;
  category: BillboardCategory;
  status: BillboardStatus;
  size: string;
  type: BillboardType;
  weeklyPrice: number;
  monthlyPrice: number;
  rating: number;
  reviews: number;
  dailyReach: number;
  visibility: string;
  image: string;
  lat: number;
  lng: number;
  tags: string[];
}

const img = (seed: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const BILLBOARDS: Billboard[] = [
  {
    id: "times-square-plaza",
    name: "Times Square Plaza",
    address: "245 Broadway",
    city: "New York, NY",
    neighborhood: "Downtown",
    category: "Downtown",
    status: "available",
    size: "14×48 ft",
    type: "LED",
    weeklyPrice: 2400,
    monthlyPrice: 8400,
    rating: 4.9,
    reviews: 128,
    dailyReach: 52000,
    visibility: "High Traffic",
    image: img("1519501025264-65ba15a82390"),
    lat: 40.758,
    lng: -73.9855,
    tags: ["Outdoor", "High Visibility", "Digital"],
  },
  {
    id: "i95-northbound",
    name: "I-95 Northbound Exit 12",
    address: "Highway 95",
    city: "North County",
    neighborhood: "Highway 95",
    category: "Highway",
    status: "booked",
    size: "20×60 ft",
    type: "Digital",
    weeklyPrice: 3800,
    monthlyPrice: 13300,
    rating: 4.7,
    reviews: 84,
    dailyReach: 78000,
    visibility: "Freeway",
    image: img("1503023345310-bd7c1de61c7d"),
    lat: 40.7648,
    lng: -73.9808,
    tags: ["Outdoor", "Freeway", "Digital"],
  },
  {
    id: "midtown-led-tower",
    name: "Midtown LED Tower",
    address: "5th Ave",
    city: "New York, NY",
    neighborhood: "Midtown",
    category: "Downtown",
    status: "available",
    size: "16×50 ft",
    type: "LED",
    weeklyPrice: 2900,
    monthlyPrice: 10150,
    rating: 4.9,
    reviews: 96,
    dailyReach: 61000,
    visibility: "Skyline",
    image: img("1477959858617-67f85cf4f1df"),
    lat: 40.7549,
    lng: -73.984,
    tags: ["Outdoor", "Skyline", "LED"],
  },
  {
    id: "sunset-blvd-digital",
    name: "Sunset Blvd Digital",
    address: "Sunset Blvd",
    city: "Los Angeles, CA",
    neighborhood: "Sunset Blvd",
    category: "Downtown",
    status: "available",
    size: "14×48 ft",
    type: "Digital",
    weeklyPrice: 1800,
    monthlyPrice: 6300,
    rating: 4.6,
    reviews: 72,
    dailyReach: 44000,
    visibility: "Nightlife",
    image: img("1502920917128-1aa500764cbd"),
    lat: 40.7712,
    lng: -73.9903,
    tags: ["Outdoor", "Nightlife", "Digital"],
  },
  {
    id: "downtown-led-hub",
    name: "Downtown LED Hub",
    address: "Market St",
    city: "San Francisco, CA",
    neighborhood: "SoMa",
    category: "Downtown",
    status: "premium",
    size: "20×60 ft",
    type: "LED",
    weeklyPrice: 3200,
    monthlyPrice: 11200,
    rating: 4.8,
    reviews: 141,
    dailyReach: 68000,
    visibility: "Premium",
    image: img("1449034446853-66c86144b0ad"),
    lat: 40.7681,
    lng: -73.9819,
    tags: ["Premium", "Outdoor", "LED"],
  },
  {
    id: "brooklyn-bridge-view",
    name: "Brooklyn Bridge View",
    address: "DUMBO",
    city: "Brooklyn, NY",
    neighborhood: "DUMBO",
    category: "Suburbs",
    status: "available",
    size: "12×36 ft",
    type: "Static",
    weeklyPrice: 1650,
    monthlyPrice: 5775,
    rating: 4.5,
    reviews: 58,
    dailyReach: 32000,
    visibility: "Waterfront",
    image: img("1518391846015-55a9cc003b25"),
    lat: 40.7789,
    lng: -73.9692,
    tags: ["Outdoor", "Waterfront"],
  },
];

export function getBillboard(id: string): Billboard | undefined {
  return BILLBOARDS.find((b) => b.id === id);
}

export const CATEGORIES: BillboardCategory[] = [
  "Downtown",
  "Highway",
  "Shopping Mall",
  "Suburbs",
];
