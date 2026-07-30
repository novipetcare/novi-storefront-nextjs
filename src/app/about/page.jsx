import LegalPageLayout from "../../components/LegalPageLayout.jsx";
import { getContent } from "../../lib/api.js";

export const metadata = {
  title: "About Us — NOVI",
  description: "Learn about NOVI — premium, India-specific dog care.",
};

export default async function AboutPage() {
  const content = await getContent();
  return (
    <LegalPageLayout title="About Us">
      <p>{content.about_us}</p>
    </LegalPageLayout>
  );
}
