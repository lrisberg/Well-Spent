import moment from 'moment';
import React from 'react';

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

export function makeChartPanel(chart, options) {
  let titleElement;

  let title = options.title || null;
  let xaxis = options.xaxis || null;
  let yaxis = options.yaxis || null;

  if (title) {
    titleElement = (
      <div className="panel-heading">
        <h3 className="panel-title">{title}</h3>
      </div>
    )
  }
  return (
    <div className="panel panel-chart panel-default">
      {titleElement}
      <div className="panel-body">
        <p className="yaxis">{yaxis}</p>
        <div className="dashboard-chart">
          {chart}
        </div>
        <p className="text-center">{xaxis}</p>
      </div>
    </div>
  )
}

export const happinessDomain = [0, 8];
