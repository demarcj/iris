export const LocationMap = {
  other: {
    en: `Other`,
    th: ``
  },
  dark_side: {
    en: `Dark Side`,
    th: `ไม่ใช่ฝั่งทะเล`
  },
  sea_side: {
    en: `Sea Side`,
    th: `ฝั่งทะเล`
  }
}

export const LocationMenu: (keyof typeof LocationMap)[] = [`other`, `dark_side`, `sea_side`];

export const SubDistrictMap = {
  bangsare: {
    en: `Bangsare`,
    th: `บางเสร่`
  },
  buakhao_central_pattaya: {
    en: `Buakhao, Central Pattaya`,
    th: `ซอยบัวขาว พัทยากลาง`
  },
  central_pattaya_beach_road: {
    en: `Central Pattaya Beach Road`,
    th: `พัทยากลาง เลียบชายหาด`
  },
  central_pattaya_2nd_road: {
    en: `Central Pattaya 2nd Road`,
    th: `พัทยากลาง สาย2`
  },
  chaiyapruk: {
    en: `Chaiyapruk`,
    th: `ชัยพฤกษ์`
  },
  chaknok_lake: {
    en: `Chak Nok Lake`,
    th: `อ่างซากนอก`
  },
  huayyai: {
    en: `Huay Yai`,
    th: `ห้วยใหญ่`
  },
  jomtien_beach_road: {
    en: `Jomtien Beach Road`,
    th: `จอมเทียน เลียบชายหาด`
  },
  jomtien_2nd_road: {
    en: `Jomtien 2nd Road`,
    th: `จอมเทียน สาย2`
  },
  kasetsin_tamnak_hill: {
    en: `Kasetsin-Tamnak Hill`,
    th: `ซอยเกษตรสิน เขาพระตำหนัก`
  },
  khao_noi: {
    en: `Khao Noi`,
    th: `เขาน้อย`
  },
  khao_talo: {
    en: `Khao Talo`,
    th: `เขาตาโล`
  },
  mabprachan_lake: {
    en: `Mabprachan Lake`,
    th: `อ่างมาบประชัน`
  },
  na_jomtien: {
    en: `Na-Jomtien`,
    th: `นาจอมเทียน`
  },
  naklua: {
    en: `Naklua`,
    th: `นาเกลือ`
  },
  nongkrabok: {
    en: `Nongkrabok`,
    th: `หนองกระบอก`
  },
  nongprue: {
    en: `Nongprue`,
    th: `หนองปรือ`
  },
  nongpla_lai: {
    en: `Nongpla-Lai`,
    th: `หนองปลาไหล`
  },
  nongket_noi: {
    en: `Nongket Noi`,
    th: `หนองเกตน้อย`
  },
  nongket_yai: {
    en: `Nongket-Yai`,
    th: `หนองเกตใหญ่`
  },
  north_pattaya: {
    en: `North Pattaya`,
    th: `พัทยาเหนือ`
  },
  nuen_plubwan: {
    en: `Nuen Plubwan`,
    th: `เนินพลับหวาน`
  },
  pattaya: {
    en: `Pattaya`,
    th: `พัทยา`
  },
  pong: {
    en: `Pong`,
    th: `โป่ง`
  },
  pornprapa_nimit: {
    en: `Pornprapa-Nimit`,
    th: `พรประภานิมิตร`
  },
  sattahip: {
    en: `Sattahip`,
    th: `บางเสร่`
  },
  siam_country_club: {
    en: `Siam Country Club`,
    th: `สยามคันทรีคลับ`
  },
  south_pattaya: {
    en: `South Pattaya`,
    th: `พัทยาใต้`
  },
  takien_tia: {
    en: `Takien Tia`,
    th: `ตะเคียนเตี้ย`
  },
  tamnak_hill: {
    en: `Tamnak Hill`,
    th: `เขาพระตำหนัก`
  },
  tungklom_tanman: {
    en: `Tungklom-Tanman`,
    th: `ทุ่งกลม-ตาลหมัน`
  },
  wongamart_beach: {
    en: `Wongamart Beach`,
    th: `หาดวงอมาตย์`
  },
}

export const SeaSideMenu: (keyof typeof SubDistrictMap)[] = [
  `naklua`,
  `wongamart_beach`,
  `north_pattaya`,
  `central_pattaya_beach_road`,
  `central_pattaya_2nd_road`,
  `buakhao_central_pattaya`,
  `south_pattaya`,
  `tamnak_hill`,
  `kasetsin_tamnak_hill`,
  `jomtien_beach_road`,
  `jomtien_2nd_road`,
  `na_jomtien`,
  `bangsare`,
  `sattahip`
];

export const DarkSideMenu: (keyof typeof SubDistrictMap)[] = [
  `nongprue`,
  `nongpla_lai`,
  `nongket_noi`,
  `nongket_yai`,
  `pornprapa_nimit`,
  `siam_country_club`,
  `mabprachan_lake`,
  `pong`,
  `takien_tia`,
  `nuen_plubwan`,
  `khao_noi`,
  `khao_talo`,
  `nongkrabok`,
  `tungklom_tanman`,
  `chaknok_lake`,
  `chaiyapruk`,
  `huayyai`
]