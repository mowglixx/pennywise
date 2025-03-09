import { Frequency } from "@/lib/infrastructure/prismaRepository";


export const compareDates = (d1: Date, d2: Date, comparison: "before" | "after" = "before") => {

    return comparison === "after" ? d1.valueOf() > d2.valueOf() : d1.valueOf() < d2.valueOf()
};


export const getNextDate = (startDate: Date | string, interval: Frequency) => {
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

export const calculateAllPaydays = (intervalObj: { startDate: string | Date | undefined, interval: Frequency }, inputDate: Date = new Date()) => {

    const { startDate: sd, interval } = intervalObj;

    const startDate = sd ? new Date(sd) : new Date()

    let nextPayday = new Date(startDate);

    while (interval !== "ONEOFF" && compareDates(nextPayday, new Date(inputDate))) {
        nextPayday = getNextDate(nextPayday, interval);
    }


    return nextPayday;
};


interface IdatedResourceItem {
    frequency: Frequency;
    dueDate: Date;
    description: string;
    id: string;
}


export const calculateAllPaydaysThisMonth = (resourceArray: Array<IdatedResourceItem>) => {

    /////////////////////////////////////////////////////////////////////
    // 1. DONE: Get payday instances - 
    //          required resourceArray is defined as an input
    /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////
    // 2. DONE: Set window to first and last day of the month
    /////////////////////////////////////////////////////////////////////

    // 2.1. Define a function to get the last day of the month as a number
    const getLastday = function (date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    // 2.2. set the first day of the window
    const firstDay = new Date()
    firstDay.setDate(1)

    // 2.2. set the last day of the window
    const lastDay = new Date()
    lastDay.setDate(getLastday(lastDay))

    const PAYMENT_WINDOW = {
        from: new Date(firstDay.toDateString()),
        to: new Date(lastDay.toDateString())
    }

    /////////////////////////////////////////////////////////////////////
    // 3. Calculate all pay dates within two dates
    /////////////////////////////////////////////////////////////////////
    const calculateAllPaydays = (intervalObj: { startDate: string | Date | undefined, interval: Frequency }, paymentWindow?: { from: Date, to: Date }, objName?: string) => {

        if (!paymentWindow) {
            paymentWindow = PAYMENT_WINDOW
        }


        const { startDate: sd, interval } = intervalObj;

        const startDate = sd ? new Date(sd) : new Date()

        // 3.1. create an empty array
        const payDays = [];

        // 3.1.1 Calculate the first payday in the window to work from
        let nextPayday = getNextDate(startDate, interval);

        // 3.2. Calculate Paydays and add them to the Array
        while (interval !== "ONEOFF" && compareDates(nextPayday, paymentWindow.from, "after") && compareDates(nextPayday, paymentWindow.to, "before")) {
            payDays.push(nextPayday)
            nextPayday = getNextDate(nextPayday, interval);
        }
        // 3.3. Return the new array of paydays the the accumlative list
        console.log({
            name:
                payDays
        })
        return payDays;
    };

    // TODO: 3.4. Reduce the payday array of arrays to one array

    // TODO: 3.5. Sort the array items by date 
    const sortByDate = (a: IdatedResourceItem, b: IdatedResourceItem) => {

        return calculateNextPayday({ startDate: a.dueDate, interval: a.frequency }).getTime() - calculateNextPayday({ startDate: b?.dueDate, interval: b.frequency }).getTime();
    }

    /////////////////////////////////////////////////////////////////////
    // 4. DONE: Return all the pay dates 
    /////////////////////////////////////////////////////////////////////
    return resourceArray.map((resource) => {

        return { ...resource, paydays: calculateAllPaydays({ startDate: resource.dueDate, interval: resource.frequency }, PAYMENT_WINDOW, resource.description) }

    })
}