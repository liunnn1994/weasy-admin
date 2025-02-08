export function parseAcceptLanguage(acceptLanguage?: string | null) {
  // 如果传入的参数为空，则返回空数组
  if (!acceptLanguage) {
    return [];
  }

  // 按逗号分割字符串
  const languages = acceptLanguage.split(',');

  // 解析每个语言标签和质量因子
  const parsedLanguages = languages.map((language) => {
    const parts = language.trim().split(';q=');
    const tag = parts[0];
    const quality = parts[1] ? parseFloat(parts[1]) : 1;
    return { tag, quality };
  });

  // 按质量因子降序排序
  parsedLanguages.sort((a, b) => b.quality - a.quality);

  return parsedLanguages;
}
