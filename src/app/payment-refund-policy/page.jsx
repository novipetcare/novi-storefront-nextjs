import LegalPageLayout from "../../components/LegalPageLayout.jsx";
import { getContent } from "../../lib/api.js";

export const metadata = {
  title: "Payment & Refund Policy — NOVI",
  description: "NOVI's payment and refund policy.",
};

export default async function PaymentRefundPolicyPage() {
  const content = await getContent();
  return (
    <LegalPageLayout title="Payment & Refund Policy">
      <p className="legal-text">{content.payment_refund_policy}</p>
    </LegalPageLayout>
  );
}
