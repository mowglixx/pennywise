

export type Frequency = "ONEOFF"
    | "DAILY"
    | "WEEKLY"
    | "FORTNIGHTLY"
    | "FOURWEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "ANNUALLY";

export interface AltFrequency {
    // can be used to show intervalN * interval
    intervalN: number,
    interval: "once" | "hour" | "day" | "week" | "month" | "year",
}