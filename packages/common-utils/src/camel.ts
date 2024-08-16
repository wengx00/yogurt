// 转大驼峰
export function toUpperCamelCase(str: string) {
  return str
    .replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase())
    .replace(/^[a-z]/, (g) => g.toUpperCase());
}

// 转小驼峰
export function toLowerCamelCase(str: string) {
  return str
    .replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase())
    .replace(/^[A-Z]/, (g) => g.toLowerCase());
}

// 转中划线
export function toDashCase(str: string) {
  return str.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();
}
