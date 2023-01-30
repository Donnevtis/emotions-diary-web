export const isDark = (color: string) => {
  const hexColor = Number(color.replace(/^#/, '0x'));

  if (isNaN(hexColor)) return;

  return 0x555555 > hexColor;
};

export const recordToNested = (array: Record<string, string[]>) =>
  Object.entries(array).map(([name, value]) => ({
    label: name,
    value: name,
    children: value.map((v) => ({ label: v, value: v })),
  }));
