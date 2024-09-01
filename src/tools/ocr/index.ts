import { LockSquare } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.ocr.title'),
  path: '/ v',
  description: translate('tools.ocr.description'),
  keywords: ['bcrypt', 'hash', 'compare', 'password', 'salt', 'round', 'storage', 'crypto'],
  component: () => import('./ocr.vue'),
  icon: LockSquare,
});
