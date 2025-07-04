// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_404_getConfig } from './pages/404';
// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_Contact_getConfig } from './pages/contact';
// prettier-ignore
import type { getConfig as File_LegalDisclaimer_getConfig } from './pages/legal/disclaimer';
// prettier-ignore
import type { getConfig as File_LegalPrivacy_getConfig } from './pages/legal/privacy';
// prettier-ignore
import type { getConfig as File_LicensesUst1_getConfig } from './pages/licenses/ust/1';
// prettier-ignore
import type { getConfig as File_LicensesVideo1_getConfig } from './pages/licenses/video/1';
// prettier-ignore
import type { getConfig as File_ToolsIndex_getConfig } from './pages/tools/index';

// prettier-ignore
type Page =
| ({ path: '/404' } & GetConfigResponse<typeof File_404_getConfig>)
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| { path: '/api/files/[name]'; render: 'dynamic' }
| { path: '/api/sitemap.xml'; render: 'dynamic' }
| { path: '/api/speech/renorari'; render: 'dynamic' }
| { path: '/blog/[id]'; render: 'dynamic' }
| { path: '/blog/category/[id]'; render: 'dynamic' }
| { path: '/blog'; render: 'dynamic' }
| ({ path: '/contact' } & GetConfigResponse<typeof File_Contact_getConfig>)
| { path: '/downloads/danotes'; render: 'dynamic' }
| { path: '/downloads/goluboi-vagon'; render: 'dynamic' }
| { path: '/downloads'; render: 'dynamic' }
| { path: '/downloads/sakkijarven-polkka-ust'; render: 'dynamic' }
| { path: '/downloads/sakkijarven-polkka-video'; render: 'dynamic' }
| { path: '/'; render: 'dynamic' }
| ({ path: '/legal/disclaimer' } & GetConfigResponse<typeof File_LegalDisclaimer_getConfig>)
| ({ path: '/legal/privacy' } & GetConfigResponse<typeof File_LegalPrivacy_getConfig>)
| ({ path: '/licenses/ust/1' } & GetConfigResponse<typeof File_LicensesUst1_getConfig>)
| ({ path: '/licenses/video/1' } & GetConfigResponse<typeof File_LicensesVideo1_getConfig>)
| { path: '/tools/aspect'; render: 'dynamic' }
| { path: '/tools/beep'; render: 'dynamic' }
| { path: '/tools/block-checker'; render: 'dynamic' }
| { path: '/tools/discord-channel'; render: 'dynamic' }
| { path: '/tools/generator'; render: 'dynamic' }
| { path: '/tools/grade'; render: 'dynamic' }
| ({ path: '/tools' } & GetConfigResponse<typeof File_ToolsIndex_getConfig>)
| { path: '/tools/qr'; render: 'dynamic' }
| { path: '/tools/reverse'; render: 'dynamic' }
| { path: '/tools/thumbnail-maker'; render: 'dynamic' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
