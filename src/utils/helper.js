const SECONDS_IN_YEAR = 31536000;
const SECONDS_IN_MONTH = 2592000;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

function displayViews(viewCount) {
  if (viewCount >= 1000 && viewCount < 1000000)
    return `${(viewCount / 1000).toFixed(0)}K`;
  else if (viewCount >= 1000000 && viewCount < 1000000000)
    return `${(viewCount / 1000000).toFixed(1)}M`;
  else if (viewCount >= 1000000000) return `${(viewCount / 1000000000).toFixed(1)}M`;

  return viewCount;
}

function formatDate(date) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

  let interval = seconds / SECONDS_IN_YEAR;
  if (interval > 1) return rtf.format(-Math.floor(interval), 'year');

  interval = seconds / SECONDS_IN_MONTH;
  if (interval > 1) return rtf.format(-Math.floor(interval), 'month');

  interval = seconds / SECONDS_IN_DAY;
  if (interval > 1) return rtf.format(-Math.floor(interval), 'day');

  interval = seconds / SECONDS_IN_HOUR;
  if (interval > 1) return rtf.format(-Math.floor(interval), 'hour');

  interval = seconds / SECONDS_IN_MINUTE;
  if (interval > 1) return rtf.format(-Math.floor(interval), 'minute');

  return rtf.format(-Math.floor(interval), 'second');
}

export { formatDate, displayViews };
