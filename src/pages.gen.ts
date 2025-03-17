// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as Contact_getConfig } from './pages/contact';
// prettier-ignore
import type { getConfig as Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as LegalDisclaimer_getConfig } from './pages/legal/disclaimer';
// prettier-ignore
import type { getConfig as LegalPrivacy_getConfig } from './pages/legal/privacy';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof About_getConfig>)
| { path: '/blog'; render: 'dynamic' }
| ({ path: '/contact' } & GetConfigResponse<typeof Contact_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>)
| ({ path: '/legal/disclaimer' } & GetConfigResponse<typeof LegalDisclaimer_getConfig>)
| ({ path: '/legal/privacy' } & GetConfigResponse<typeof LegalPrivacy_getConfig>)
| { path: '/tools/beep'; render: 'dynamic' }
| { path: '/tools/generator'; render: 'dynamic' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  