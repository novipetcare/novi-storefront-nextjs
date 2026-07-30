import LegalPageLayout from "../../components/LegalPageLayout.jsx";
import { getContent } from "../../lib/api.js";

export const metadata = {
  title: "Terms & Conditions — NOVI",
  description: "NOVI's terms and conditions.",
};

export default async function TermsPage() {
  const content = await getContent();
  return (
    <LegalPageLayout title="Terms & Conditions">
      <p className="legal-text">{content.terms_and_conditions}</p>
    </LegalPageLayout>
  );
}
