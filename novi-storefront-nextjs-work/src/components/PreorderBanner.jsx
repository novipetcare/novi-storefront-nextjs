// Shows a site-wide pre-order notice, sourced from the admin-editable
// "preorder_banner_text" content field. Hides itself automatically if
// that field is ever cleared — so turning this off once shipping
// starts is just editing text in the admin panel, no redeploy needed.
export default function PreorderBanner({ content }) {
  const text = content?.preorder_banner_text;
  if (!text || !text.trim()) return null;

  return (
    <div className="preorder-banner" role="status">
      {text}
    </div>
  );
}
