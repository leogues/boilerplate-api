function parseContentLength(header: string | number | null | undefined): number | null {
  if (!header) return null;
  const size = Number(header);
  return Number.isNaN(size) ? null : size;
}

export { parseContentLength };
