export type FontOption = {
  id: string;
  label: string;
  family: string; // nom utilisé par expo-font après chargement
};

// Pour ajouter une police : déposer le fichier dans assets/fonts,
// le charger dans app/_layout.tsx (useFonts), puis l'ajouter ici.
export const availableFonts: FontOption[] = [
  { id: 'system', label: 'Système', family: 'System' },
  { id: 'noto-sans-jp', label: 'Noto Sans JP', family: 'NotoSansJP' },
  { id: 'noto-serif-jp', label: 'Noto Serif JP', family: 'NotoSerifJP' },
  { id: 'yu-gothic', label: 'Yu Gothic', family: 'YuGothic' },
];

export function getFontFamily(fontId: string): string {
  return availableFonts.find((f) => f.id === fontId)?.family ?? 'System';
}
