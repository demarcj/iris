export const format_phone_number = (number: string) => {
  const number_list = `${number}`.split(``);
  return number_list.map((num, index) => {
    if(index < 2){
      return ``;
    } else if(index > 7) {
      return num;
    } else if(index === 3 || index === 6) {
      return num + ` `;
    }
    return num;
  });
}