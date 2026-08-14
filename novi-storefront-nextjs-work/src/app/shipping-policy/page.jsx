import LegalPageLayout from "../../components/LegalPageLayout.jsx";
import { getContent } from "../../lib/api.js";

export const metadata = {
  title: "Shipping Policy — NOVI",
  description: "NOVI's shipping policy.",
  alternates: {
    canonical: "/shipping-policy",
  },
};

export default async function ShippingPolicyPage() {
  const content = await getContent();
  return (
    <LegalPageLayout title="Shipping Policy">
      <p className="legal-text">{content.shipping_policy}</p>
    </LegalPageLayout>
  );
}
