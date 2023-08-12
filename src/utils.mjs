export const urlFromRequest = (
  {
    url: pathname,
    headers: {
      ['x-forwarded-host']: host,
      ['x-forwarded-proto']: proto
    }
  } = {}
) => new URL(pathname, `${proto}://${host}`);
