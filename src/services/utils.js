export function getQueryParam(paramName) {
  const queryString = location.search.substr(1);
  const queryStringParams = queryString.split('&');
  const queryStringKeyValues = queryStringParams.map(x => x.split('='));
  const codeParam = queryStringKeyValues.filter(x => x[0] === paramName);
  if (codeParam.length === 0) {
    return null;
  }
  return codeParam[0][1];
}
