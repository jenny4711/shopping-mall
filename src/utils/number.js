// export const currencyFormat = (value) => {
//   const number = value !== undefined ? value : 0;
//   return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
// };

// export const cc_expires_format = (string) => {
//   return string
//     .replace(
//       /[^0-9]/g,
//       "" // To allow only numbers
//     )
//     .replace(
//       /^([2-9])$/g,
//       "0$1" // To handle 3 > 03
//     )
//     .replace(
//       /^(1{1})([3-9]{1})$/g,
//       "0$1/$2" // 13 > 01/3
//     )
//     .replace(
//       /^0{1,}/g,
//       "0" // To handle 00 > 0
//     )
//     .replace(
//       /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
//       "$1/$2" // To handle 113 > 11/3
//     );
// };



export const currencyFormat = (value) => {
  if (typeof value !== "number") {
    console.warn("currencyFormat: Expected a number but received:", value);
    return value; // Return original value if not a number
  }
  const number = value !== undefined ? value : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};



// export const cc_expires_format = (input) => {
//   if (typeof input !== "string") {
//     console.warn("ccExpiresFormat: Expected a string but received:", input);
//     return input; // Return original value if not a string
//   }
  
//   const cleaned = input.replace(/[^0-9]/g, ""); // Allow only numbers
  
//   if (cleaned.length <= 2) {
//     return cleaned;
//   }

//   const month = cleaned.substring(0, 2);
//   const year = cleaned.substring(2, 4); // Limit year to two digits

//   return `${month}/${year}`;
// };


export const cc_expires_format = (string) => {
  return string
    .replace(
      /[^0-9]/g,
      "" // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      "0$1" // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      "$1/$2" // To handle 113 > 11/3
    );
};

