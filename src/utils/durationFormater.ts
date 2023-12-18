const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function formatDuration(duration: number) {
  const h = Math.floor(duration / 3600);
  const m = Math.floor((duration - h * 60 * 60) / 60);
  const s = duration % 60;

  if (h) {
    return `${h}:${LEADING_ZERO_FORMATTER.format(
      m
    )}:${LEADING_ZERO_FORMATTER.format(s)}`;
  }

  return `${m}:${LEADING_ZERO_FORMATTER.format(s)}`;
}
