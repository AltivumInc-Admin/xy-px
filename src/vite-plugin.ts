// Vite plugin that auto-injects xy-px
export function xyPxPlugin() {
  return {
    name: 'xy-px-auto-inject',
    transformIndexHtml(html: string) {
      // Inject the script to load xy-px automatically
      const injection = `
        <script type="module">
          import 'xy-px/auto';
        </script>
      `;
      return html.replace('</head>', `${injection}</head>`);
    }
  };
}