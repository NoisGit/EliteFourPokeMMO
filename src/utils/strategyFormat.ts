export const formatStrategyText = (text: string) => text
  .replace(/TRUCO/g, 'Truco')
  .replace(/OTRA VEZ/g, 'Otra Vez')
  .replace(/TRAMPA ROCAS/g, '🪨 Trampa Rocas 🪨')
  .replace(/\s+/g, ' ')
  .trim()
