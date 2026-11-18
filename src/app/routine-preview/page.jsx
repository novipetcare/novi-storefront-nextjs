// TEMPORARY preview page for JP to compare two routine options. Not linked
// from the site; will be removed once an option is chosen.
import RoutineSteps from "../../components/RoutineSteps.jsx";
import RoutinePicker from "../../components/RoutinePicker.jsx";
import { getProducts } from "../../lib/api.js";

export const metadata = { title: "Routine preview", robots: { index: false, follow: false } };

export default async function RoutinePreview() {
  const products = await getProducts();
  return (
    <main>
      <p style={{ textAlign: "center", padding: "1.5rem 1rem 0", fontWeight: 600 }}>OPTION A: static 4-step routine</p>
      <RoutineSteps />
      <hr style={{ maxWidth: 900, margin: "2rem auto", border: 0, borderTop: "2px dashed #b8c4aa" }} />
      <p style={{ textAlign: "center", fontWeight: 600 }}>OPTION B: 3-tap picker (try it)</p>
      <RoutinePicker products={products} />
    </main>
  );
}
