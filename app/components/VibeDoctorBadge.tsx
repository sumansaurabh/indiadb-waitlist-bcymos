
export function VibeDoctorBadge() {
  const html = `
<a id="vibedoctor-badge" target="_blank" href="https://vibedoctor.dev/?utm_source=vibedoctor-badge" style="display:inline-flex!important;box-sizing:border-box;height:40px;padding:8px 16px 8px 12px;align-items:center!important;gap:10px;border-radius:50px!important;background:#fff!important;position:fixed!important;bottom:16px;right:16px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,sans-serif;z-index:9999!important;border: 1px solid rgba(0,0,0,0.1);box-shadow: 0px 4px 10px rgba(0,0,0,0.05);">
    <img src="https://www.vibedoctor.dev/vibedoctor-logo.svg" alt="Vibedoctor Logo" style="width:20px;height:20px;display:block;filter: invert(1) brightness(0);">
    <p style="color:#000!important;font-family:Inter,sans-serif!important;font-size:13px!important;font-style:normal!important;font-weight:600!important;line-height:20px!important;margin:0!important;white-space:nowrap!important">
        Made with Vibedoctor
    </p>
</a>
  `;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
