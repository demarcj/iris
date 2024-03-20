export const format_phone_number = (number: number) => {
  const number_list = `${number}`.split(``);
  return number_list.map((num, index) => {
    if(index < 2){
      return ``;
    } else if(index > 7) {
      return num;
    } else if(index === 4 || index === 7) {
      return num + ` `;
    }
    return num;
  });
}