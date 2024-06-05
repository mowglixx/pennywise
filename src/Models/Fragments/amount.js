export const amount = {
    type: Number,
    set: (v) => Math.round(Number.parseFloat(v).toFixed(2) * 100),
    default: 0,
    required: true
  }