"use strict";
// src/app/layout.tsx
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var storyblok_1 = require("@/lib/storyblok"); // Adjust path as needed
// Call the initialization function at the top level
(0, storyblok_1.getStoryblokApi)();
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <body>{children}</body>
    </html>);
}
