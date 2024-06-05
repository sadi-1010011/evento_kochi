// Date difference function written bt github.com/sadi-1010011 at June 1 2024, for evento project
// the challenge in date diff, is date format can varry across platforms and input types too.
// so we have to figure year, month and day of the date discarding the remaining time, zone, and gmt etc.
// then perform date difference logic on the given 2 dates;

import moment from 'moment'; // using moment saves it all

export default function checkDate(date1, currentdate) {
  if (moment(date1).isAfter(currentdate)) return '+'
  else if (moment(date1).isBefore(currentdate)) return '-';
  else return '0';
}
// export default function checkDate(date1) {
//     // Get the current date
//     const currentDate = new Date();
  
//     // Normalize the current date to remove the time component
//     currentDate.setHours(0, 0, 0, 0);
  
//     // Convert the given date to a Date object and normalize it
//     const date1__ = new Date(date1);
//     date1__.setHours(0, 0, 0, 0);
  
//     // Compare the dates
//     if (date1__.getTime() > currentDate.getTime()) {
//       return '+';
//     } else if (date1__.getTime() < currentDate.getTime()) {
//       return '-';
//     } else {
//       return '0';
//     }
// }
  

// function dateDiff_Sadiq(date1, date2) {
//     // finds difference between 2 given dates

//     let dateDiff, date1YYYY, date1MM, date1DD, date2YYYY, date2MM, date2DD, firstEnd = 0, lastEnd = 0, i;
//     // split into dd/mm/yyyy format
//     const date1__ = date1.split('-');
//     const date2__ = date2.split('-');

//     // identify yyyy
//     for (i = 0; i < 3; i++) {
//         if (parseInt(date1__[i]).length === 4) {
//             i === 2 ? firstEnd = 1 : lastEnd = 0;
//             date1YYYY = parseInt(date1__[i]); // found yyyy 1
//         }
//         if (parseInt(date2__[i]).length === 4) {
//             i === 0 ? firstEnd = 0 : lastEnd = 1;
//             date2YYYY = parseInt(date2__[i]); // found yyyy 2
//         }

//         // fount MM 1,2
//         if (firstEnd) {
//             date1MM = parseInt(date1__[firstEnd]);
//             date1DD = parseInt(date1__[firstEnd + 1]);
//             date2MM = parseInt(date2__[firstEnd]);
//             date2DD = parseInt(date1__[firstEnd + 1]);
//         } else {
//             date1MM = parseInt(date1__[lastEnd]);
//             date1DD = parseInt(date1__[lastEnd + 1]);
//             date2MM = parseInt(date2__[lastEnd]);
//             date2DD = parseInt(date1__[lastEnd + 1]);
//         }

//     }

//     // date difference logic:

//     // yearwise diff
//     if (date1YYYY - date2YYYY < 0) dateDiff = '-';
//     if (date1YYYY - date2YYYY > 0) dateDiff = '+';
//     if (date1YYYY - date2YYYY === 0) {
//         // monthwise diff
//         if (date1MM - date2MM > 0) dateDiff = '+';
//         if (date1MM - date2MM < 0) dateDiff = '-';
//         if (date1MM - date2MM === 0) {
//             // daywise diff
//             if (date1DD - date2DD > 0) dateDiff = '+';
//             if (date1DD - date2DD < 0) dateDiff = '-';
//             if (date1DD - date2DD === 0) dateDiff = '0'; // same date
//         }
//     }

//     return dateDiff;
// }