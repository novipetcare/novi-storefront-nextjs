import LegalPageLayout from "../../components/LegalPageLayout.jsx";
import { getContent } from "../../lib/api.js";

export const metadata = {
  title: "Contact Us — NOVI",
  description: "Get in touch with the NOVI team.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const content = await getContent();
  return (
    <LegalPageLayout title="Contact">
      <div className="contact-details">
        {content.contact_email && (
          <p>
            <strong>Email:</strong> {content.contact_email}
          </p>
        )}
        {content.contact_phone && (
          <p>
            <strong>Phone:</strong> {content.contact_phone}
          </p>
        )}
        {content.contact_address && (
          <p>
            <strong>Address:</strong> {content.contact_address}
          </p>
        )}
      </div>
    </LegalPageLayout>
  );
}
