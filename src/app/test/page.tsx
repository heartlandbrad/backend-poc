// src/app/test/page.tsx - A simple static test page

import React from 'react';

// This file will render at the URL: /test
export default function TestPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
      <h1 style={{ color: '#006064' }}>Test Route Success!</h1>
      <p style={{ color: '#006064' }}>If you see this page, Next.js routing is working correctly for sub-paths.</p>
      <p style={{ color: '#006064' }}>The remaining 404 issue is isolated to the root route (<code style={{ backgroundColor: '#b2ebf2', padding: '2px 4px', borderRadius: '4px' }}>/</code>) resolution.</p>
      <p style={{ color: '#006064' }}>Please try Step 2 (Force a Clean Redeploy).</p>
    </div>
  );
}