export const frequency = {
    startDate: {
      type: Date,
      default: new Date()
    },
    interval: {
      type: String,
      trim: true,
      lowercase: true,
      default: "monthly",
      enum: {
        values: [
          "daily",
          "weekly",
          "fortnightly",
          "fourweekly",
          "monthly",
          "quarterly",
          "sixmonthly",
          "annually",
        ],
        message:
          "Please choose a valid interval, `{VALUE}` is not a valid entry for `{PATH}`",
      }
    },
  }

