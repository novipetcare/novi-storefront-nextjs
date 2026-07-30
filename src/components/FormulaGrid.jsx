import FormulaCard from "./FormulaCard.jsx";

export default function FormulaGrid({ products }) {
  return (
    <section className="formula-section" id="formulas">
      <div className="section-heading">
        <span className="eyebrow">Shop by need</span>
        <h2>A formula for every dog.</h2>
      </div>

      <div className="formula-grid">
        {products.map((product, index) => (
          <FormulaCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
