import LegalPageLayout from "../../components/LegalPageLayout.jsx";
import { getContent } from "../../lib/api.js";

export const metadata = {
  title: "Privacy Policy — NOVI",
  description: "How NOVI handles your data.",
};

export default async function PrivacyPolicyPage() {
  const content = await getContent();
  return (
    <LegalPageLayout title="Privacy Policy">
      <p className="legal-text">{content.privacy_policy}</p>
    </LegalPageLayout>
  );
}
