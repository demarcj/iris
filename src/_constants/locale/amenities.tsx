export const AmenitiesMap = {
  air_conditioner: {
    en: `Air conditioner`,
    th: `เครื่องปรับอากาศ`
  },
  balcony: {
    en: `Balcony`,
    th: `ระเบียง`
  },
  bathtub: {
    en: `Bathtub`,
    th: `อ่างอาบน้ำ`
  },
  balcony_table_and_seats: {
    en: `Balcony Table and Seats`,
    th: `ระเบียง`
  },
  cabinet_closet: {
    en: `Cabinet / Closet`,
    th: `ตู้เสื้อผ้า`
  },
  curtains: {
    en: `Curtains`,
    th: `ผ้าม่าน`
  },
  dining_table: {
    en: `Dining Table`,
    th: `โต๊ะทานอาหาร`
  },
  electric_stove: {
    en: `Electric Stove`,
    th: `เตาไฟฟ้า`
  },
  european_kitchen: {
    en: `European Kitchen`,
    th: `ครัวยุโรป`
  },
  fitness_room: {
    en: `Fitness Room`,
    th: `ห้องออกกำลังกาย`
  },
  gas_stove: {
    en: `Gas Stove`,
    th: `เตาแก๊ส`
  },
  garden: {
    en: `Garden`,
    th: `สวน`
  },
  jacuzzi: {
    en: `Jacuzzi`,
    th: `อ่างจากุซซี่`
  },
  kitchen_hood_fan: {
    en: `Kitchen Hood/Fan`,
    th: `ฮู๊ดดูดควัน / พัดลมระบายในครัว`
  },
  microwave: {
    en: `Microwave`,
    th: `ไมโครเวฟ`
  },
  oven: {
    en: `Oven`,
    th: `เตาอบ`
  },
  parking: {
    en: `Parking`,
    th: `ที่จอดรถ`
  },
  pet_friendly: {
    en: `Pet Friendly`,
    th: `เป็นมิตรกับสัตว์เลี้ยง`
  },
  refrigerator: {
    en: `Refrigerator`,
    th: `ตู้เย็น`
  },
  sofa_bed: {
    en: `Sofa Bed`,
    th: `โซฟาปรับเตียงได้`
  },
  swimming_pool: {
    en: `Swimming Pool`,
    th: `สระว่ายน้ำส่วนตัว`
  },
  thai_kitchen: {
    en: `Thai Kitchen`,
    th: `ครัว`
  },
  tv_television: {
    en: `TV / Television`,
    th: `ทีวี`
  },
  washing_machine: {
    en: `Washing Machine`,
    th: `เครื่องซักผ้า`
  },
  water_tank: {
    en: `Water Tank`,
    th: `แทงค์เก็บน้ำ`
  },
  working_table: {
    en: `Working Table`,
    th: `โต๊ะทำงาน`
  },
  wifi: {
    en: `WIFI`,
    th: `ไวไฟ`
  }
} as const;

export const AmenitiesMenu: (keyof typeof AmenitiesMap)[] = [
  `air_conditioner`,
  `balcony`,
  `bathtub`,
  `balcony_table_and_seats`,
  `cabinet_closet`,
  `curtains`,
  `dining_table`,
  `electric_stove`,
  `european_kitchen`,
  `fitness_room`,
  `gas_stove`,
  `garden`,
  `jacuzzi`,
  `kitchen_hood_fan`,
  `microwave`,
  `oven`,
  `parking`,
  `pet_friendly`,
  `refrigerator`,
  `sofa_bed`,
  `swimming_pool`,
  `thai_kitchen`,
  `tv_television`,
  `washing_machine`,
  `water_tank`,
  `working_table`,
  `wifi`
] as const;