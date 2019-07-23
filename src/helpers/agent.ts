export const isAndroid = () => !!window.navigator.userAgent.match(/Android/);
export const isIOS = () => !!window.navigator.userAgent.match(/iPhone|iPad|iPod/);

export function isMobile(): boolean {
  if (isAndroid) {
    return true;
  }
  if (isIOS) {
    return true;
  }
  return false;
}
