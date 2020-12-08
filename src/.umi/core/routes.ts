// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/wangxiaohui/Desktop/cc_code/react-antd3x-components/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"Getting Started","meta":{}},{"title":"Drawer","path":"/drawer","meta":{},"children":[{"path":"/drawer","title":"CCDrawer","meta":{}}]},{"title":"Form","path":"/form","meta":{},"children":[{"path":"/form","title":"CCForm","meta":{}}]},{"title":"Modal","path":"/modal","meta":{},"children":[{"path":"/modal","title":"CCModal","meta":{}}]},{"title":"Search-bar","path":"/search-bar","meta":{},"children":[{"path":"/search-bar","title":"CCSearchBar","meta":{}}]},{"title":"Table","path":"/table","meta":{},"children":[{"path":"/table","title":"CCTable","meta":{}}]}]}},"locales":[],"navs":{},"title":"react-antd3x-components","mode":"doc"},
      ...props,
    }),
    "routes": [
      {
        "path": "/drawer",
        "component": require('../../Drawer/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Drawer/index.md",
          "updatedTime": 1604299273000,
          "slugs": [
            {
              "depth": 2,
              "value": "CCDrawer",
              "heading": "ccdrawer"
            }
          ],
          "title": "CCDrawer",
          "group": {
            "path": "/drawer",
            "title": "Drawer"
          }
        },
        "title": "CCDrawer"
      },
      {
        "path": "/form",
        "component": require('../../Form/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Form/index.md",
          "updatedTime": 1604299273000,
          "slugs": [
            {
              "depth": 2,
              "value": "CCForm",
              "heading": "ccform"
            }
          ],
          "title": "CCForm",
          "group": {
            "path": "/form",
            "title": "Form"
          }
        },
        "title": "CCForm"
      },
      {
        "path": "/modal",
        "component": require('../../Modal/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Modal/index.md",
          "updatedTime": 1604299273000,
          "slugs": [
            {
              "depth": 2,
              "value": "CCModal",
              "heading": "ccmodal"
            }
          ],
          "title": "CCModal",
          "group": {
            "path": "/modal",
            "title": "Modal"
          }
        },
        "title": "CCModal"
      },
      {
        "path": "/search-bar",
        "component": require('../../SearchBar/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/SearchBar/index.md",
          "updatedTime": 1604299273000,
          "slugs": [
            {
              "depth": 2,
              "value": "CCSearchBar",
              "heading": "ccsearchbar"
            }
          ],
          "title": "CCSearchBar",
          "group": {
            "path": "/search-bar",
            "title": "Search-bar"
          }
        },
        "title": "CCSearchBar"
      },
      {
        "path": "/table",
        "component": require('../../Table/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Table/index.md",
          "updatedTime": 1604299273000,
          "slugs": [
            {
              "depth": 2,
              "value": "CCTable",
              "heading": "cctable"
            }
          ],
          "title": "CCTable",
          "group": {
            "path": "/table",
            "title": "Table"
          }
        },
        "title": "CCTable"
      },
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1604299273000,
          "slugs": [
            {
              "depth": 1,
              "value": "Getting Started",
              "heading": "getting-started"
            },
            {
              "depth": 1,
              "value": "Dependencies",
              "heading": "dependencies"
            },
            {
              "depth": 1,
              "value": "Guide",
              "heading": "guide"
            }
          ],
          "title": "Getting Started"
        },
        "title": "Getting Started"
      }
    ],
    "title": "react-antd3x-components"
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
