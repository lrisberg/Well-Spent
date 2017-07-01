import moment from 'moment';

export const happinessTicks = [1, 4, 7];
export const happinessFormatter = (happiness) => {
  if (happiness === 1) {
    return "☹️";
  }
  else if (happiness === 4) {
    return "😐"
  }
  else if (happiness === 7) {
    return "🙂"
  }
  return happiness;
};

export function makeDailyTimelineTicks(firstTimeVal, lastTimeVal) {
  let ticks = [];
  let tick = firstTimeVal;
  while (lastTimeVal > tick) {
    ticks.push(tick);
    tick += 86400000;
  }
  return ticks;
}

export const dayMonthFormatter = (timeValue) => {
  return moment(timeValue).format('MM/DD');
}
