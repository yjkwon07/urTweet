export default function urlParamReplace(url: string, param: { [key: string]: any }) {
  let replaceUrl = url;
  Object.entries(param).forEach(([key, value]) => {
    const targetReplace = `:${key}`;
    replaceUrl = replaceUrl.replace(targetReplace, value);
  });
  return replaceUrl;
}
