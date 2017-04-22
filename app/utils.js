export const MakeRounder = (place) => {
  let tens = Math.pow(10, place)
  return (value) => Math.round(value*tens)/tens
}

export const signify = (value) => (value > 0) ? '+' + value : '' + value