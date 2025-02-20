import { Frequency } from "@/lib/infrastructure/prismaRepository";


export const compareDates = (d1: Date, d2: Date, comparison: "before" | "after" = "before") => {

    return comparison === "after" ? d1.valueOf() > d2.valueOf() : d1.valueOf() < d2.valueOf()
};


const getNextDate = (startDate: Date | string, interval: Frequency) => {
    const nextDate = new Date(startDate);
    switch (interval) {
        case "ONEOFF":
            return nextDate
        case "DAILY":
            nextDate.setDate(nextDate.getDate() + 1);
            break;
        case "WEEKLY":
            nextDate.setDate(nextDate.getDate() + 7);
            break;
        case "FORTNIGHTLY":
            nextDate.setDate(nextDate.getDate() + 14);
            break;
        case "FOURWEEKLY":
            nextDate.setDate(nextDate.getDate() + 28);
            break;
        case "MONTHLY":
            nextDate.setMonth(nextDate.getMonth() + 1);
            break;
        case "QUARTERLY":
            nextDate.setMonth(nextDate.getMonth() + 3);
            break;
        case "ANNUALLY":
            nextDate.setFullYear(nextDate.getFullYear() + 1);
            break;
        default:
            break;
    }
    return nextDate;
};


export const calculateNextPayday = (intervalObj: { startDate: string | Date | undefined, interval: Frequency }, inputDate: Date = new Date()) => {

    const { startDate: sd, interval } = intervalObj;

    const startDate = sd ? new Date(sd) : new Date()

    let nextPayday = new Date(startDate);



    while (interval !== "ONEOFF" && compareDates(nextPayday, new Date(inputDate))) {
        nextPayday = getNextDate(nextPayday, interval);
    }


    return nextPayday;
};