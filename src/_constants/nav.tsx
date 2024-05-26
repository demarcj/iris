export const NavMap = {
  properties: {
    en: {
      text: `Properties`,
      link: `/en/properties`,
      type: `link`
    },
    th: {
      text: `Properties`,
      link: `/th/properties`,
      type: `link`
    }
  },
  contact: {
    en: {
      text: `Contact`,
      link: `/en/contact_us`,
      type: `link`
    },
    th: {
      text: `Contact`,
      link: `/th/contact_us`,
      type: `link`
    }
  }
}

export const NavList: (keyof typeof NavMap)[] = [
  `properties`,
  `contact`,
];