// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_404_getConfig } from './pages/404';
// prettier-ignore
import type { getConfig as File_ApiFilesName_getConfig } from './pages/_api/files/[name]';
// prettier-ignore
import type { getConfig as File_ApiSitemapXml_getConfig } from './pages/_api/sitemap.xml';
// prettier-ignore
import type { getConfig as File_ApiSpeechRenorari_getConfig } from './pages/_api/speech/renorari';
// prettier-ignore
import type { getConfig as File_About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as File_BlogIdIndex_getConfig } from './pages/blog/[id]/index';
// prettier-ignore
import type { getConfig as File_BlogCategoryIdIndex_getConfig } from './pages/blog/category/[id]/index';
// prettier-ignore
import type { getConfig as File_BlogIndex_getConfig } from './pages/blog/index';
// prettier-ignore
import type { getConfig as File_Contact_getConfig } from './pages/contact';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
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
| ({ path: '/_api/files/[name]' } & GetConfigResponse<typeof File_ApiFilesName_getConfig>)
| ({ path: '/_api/sitemap.xml' } & GetConfigResponse<typeof File_ApiSitemapXml_getConfig>)
| ({ path: '/_api/speech/renorari' } & GetConfigResponse<typeof File_ApiSpeechRenorari_getConfig>)
| ({ path: '/about' } & GetConfigResponse<typeof File_About_getConfig>)
| ({ path: '/blog/[id]' } & GetConfigResponse<typeof File_BlogIdIndex_getConfig>)
| ({ path: '/blog/category/[id]' } & GetConfigResponse<typeof File_BlogCategoryIdIndex_getConfig>)
| ({ path: '/blog' } & GetConfigResponse<typeof File_BlogIndex_getConfig>)
| ({ path: '/contact' } & GetConfigResponse<typeof File_Contact_getConfig>)
| { path: '/downloads/goluboi-vagon'; render: 'static' }
| { path: '/downloads'; render: 'static' }
| { path: '/downloads/sakkijarven-polkka-ust'; render: 'static' }
| { path: '/downloads/sakkijarven-polkka-video'; render: 'static' }
| { path: '/downloads/scores'; render: 'static' }
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/legal/disclaimer' } & GetConfigResponse<typeof File_LegalDisclaimer_getConfig>)
| ({ path: '/legal/privacy' } & GetConfigResponse<typeof File_LegalPrivacy_getConfig>)
| ({ path: '/licenses/ust/1' } & GetConfigResponse<typeof File_LicensesUst1_getConfig>)
| ({ path: '/licenses/video/1' } & GetConfigResponse<typeof File_LicensesVideo1_getConfig>)
| { path: '/tools/aspect'; render: 'static' }
| { path: '/tools/beep'; render: 'static' }
| { path: '/tools/block-checker'; render: 'static' }
| { path: '/tools/discord-channel'; render: 'static' }
| { path: '/tools/generator'; render: 'static' }
| { path: '/tools/grade'; render: 'static' }
| ({ path: '/tools' } & GetConfigResponse<typeof File_ToolsIndex_getConfig>)
| { path: '/tools/qr'; render: 'static' }
| { path: '/tools/reverse'; render: 'static' }
| { path: '/tools/thumbnail-maker'; render: 'static' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
