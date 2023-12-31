export const urlFromServerlessRequest = (
  {
    url: pathname,
    headers: {
      ['x-forwarded-host']: host,
      ['x-forwarded-proto']: proto
    }
  } = {}
) => new URL(pathname, `${proto}://${host}`).href;

export const urlFromEdgeRequest = (
  {
    url: pathname,
    headers
  } = {}
) => new URL(
  pathname,
  [
    headers.get('x-forwarded-proto'),
    headers.get('x-forwarded-host')
  ].join('://')
).href;

export const urlFromRequest =
  typeof EdgeRuntime !== 'string' ?
    urlFromServerlessRequest :
    urlFromEdgeRequest;
