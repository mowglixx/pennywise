export const compareDates = (date1, date2, comparison) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (comparison === "before") {
    return d1 < d2;
  } else if (comparison === "after") {
    return d1 > d2;
  } else {
    throw new Error('Invalid comparison string. Use "before" or "after".');
  }
};

export const calculateNextPayday = (inputDate = new Date(), intervalObj) => {
  const { startDate, interval } = intervalObj;

  const getNextDate = (startDate, interval) => {
    const nextDate = new Date(startDate);
    switch (interval) {
      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case "fortnightly":
        nextDate.setDate(nextDate.getDate() + 14);
        break;
      case "fourweekly":
        nextDate.setDate(nextDate.getDate() + 28);
        break;
      case "monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case "annually":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        throw new Error(
          'Invalid interval. Use "weekly", "fortnightly", "fourweekly", "monthly", or "annually".'
        );
    }
    return nextDate;
  };

  let nextPayday = new Date(startDate);

  while (compareDates(nextPayday, inputDate, "before")) {
    nextPayday = getNextDate(nextPayday, interval);
  }

  return nextPayday;
};

const userPaydayConfig = {
  startDate: "2024-05-20T18:46:37.048Z",
  interval: "monthly",
};

// Example usage
//   {
//     startDate: '2024-01-01', // Initial payday
//     interval: 'monthly' // Payday interval
//   };

console.log(calculateNextPayday(new Date(), userPaydayConfig)); // Outputs the next payday date based on today's date
