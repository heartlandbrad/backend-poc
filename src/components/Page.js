"use strict";
// src/components/Page.tsx
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
var rsc_1 = require("@storyblok/react/rsc");
function Page(_a) {
    var _b;
    var blok = _a.blok;
    return (<main {...(0, rsc_1.storyblokEditable)(blok)}>
      <h1>My Next.js Storyblok Page</h1>
      {/* Renders nested blocks dynamically */}
      {(_b = blok.body) === null || _b === void 0 ? void 0 : _b.map(function (nestedBlok) { return (<rsc_1.StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid}/>); })}
    </main>);
}
