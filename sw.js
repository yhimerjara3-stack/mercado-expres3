/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "25e421ba9943bfa50c3f1d8b158807d2"
  }, {
    "url": "pwa-512x512.png",
    "revision": "feaa09a3e78fcf571243b9f15c28f940"
  }, {
    "url": "pwa-192x192.png",
    "revision": "a9e704febfc9fc448c01d5c76d83f6c9"
  }, {
    "url": "index.html",
    "revision": "89d87f2910e8016170de71a90c865b63"
  }, {
    "url": "icon.svg",
    "revision": "b77e449e5864401e55676c53ce4c19ec"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "97a22bbdcea307f32d08123e39a19b3f"
  }, {
    "url": "assets/index-PxpT78sc.js",
    "revision": null
  }, {
    "url": "assets/index-BMQi_vs2.css",
    "revision": null
  }, {
    "url": "assets/aistudio/index_a737536e.html",
    "revision": null
  }, {
    "url": "assets/aistudio/image_d319b030.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_8cb271bd.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_8636e484.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_789e8f80.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_433fb803.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_181f0fa7.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "97a22bbdcea307f32d08123e39a19b3f"
  }, {
    "url": "icon.svg",
    "revision": "b77e449e5864401e55676c53ce4c19ec"
  }, {
    "url": "pwa-192x192.png",
    "revision": "a9e704febfc9fc448c01d5c76d83f6c9"
  }, {
    "url": "pwa-512x512.png",
    "revision": "feaa09a3e78fcf571243b9f15c28f940"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "25e421ba9943bfa50c3f1d8b158807d2"
  }, {
    "url": "manifest.webmanifest",
    "revision": "df5ab44ef25f502d2c22f1066639faec"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
