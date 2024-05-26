export const FacilitiesMap = {
  swimming_pool: {
    en: `Swimming Pool`,
    th: `สระว่ายน้ำ`
  },
  rooftop_swimming_pool: {
    en: `Rooftop Swimming Pool`,
    th: `สระว่ายน้ำบนดาดฟ้า`
  },
  parking: {
    en: `Parking`,
    th: `ที่จอดรถ`
  },
  underground_parking: {
    en: `Underground Parking`,
    th: `ที่จอดรถใต้อาคาร`
  },
  garden: {
    en: `Garden`,
    th: `สวน`
  },
  security_guard: {
    en: `Security Guard`,
    th: `เจ้าหน้าที่รักษาความปลอดภัย`
  },
  sauna: {
    en: `Sauna`,
    th: `ซาวน่า`
  },
  steamed: {
    en: `Steamed`,
    th: `ห้องสตีม`
  },
  elevator: {
    en: `Elevator`,
    th: `ลิฟต์`
  },
  accessibility: {
    en: `Accessibility`,
    th: `ผู้พิการทางร่างกายเข้าพักได้`
  },
  kids_club: {
    en: `Kids club`,
    th: `สโมสรสำหรับเด็ก`
  },
  access_to_the_beach: {
    en: `Access to the beach`,
    th: `เดินลงหาดได้`
  },
  private_beach: {
    en: `Private Beach`,
    th: `หาดส่วนตัว`
  },
  near_to_the_beach: {
    en: `Near to the beach`,
    th: `ใกล้ชายหาด`
  },
  cctv: {
    en: `CCTV`,
    th: `กล้องวงจรปิด`
  }
}

export const FacilitiesMenu: (keyof typeof FacilitiesMap)[] = [
  `swimming_pool`,
  `rooftop_swimming_pool`,
  `parking`,
  `underground_parking`,
  `garden`,
  `security_guard`,
  `sauna`,
  `steamed`,
  `elevator`,
  `accessibility`,
  `kids_club`,
  `access_to_the_beach`,
  `private_beach`,
  `near_to_the_beach`,
  `cctv`
];