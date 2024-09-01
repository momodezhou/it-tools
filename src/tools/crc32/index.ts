import { LockSquare } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.crc32.title'),
  path: '/crc32',
  description: translate('tools.crc32.description'),
  keywords: ['bcrypt', 'hash', 'compare', 'password', 'salt', 'round', 'storage', 'crypto','crc32'],
  component: () => import('./crc32.vue'),
  icon: LockSquare,
});
