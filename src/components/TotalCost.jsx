/* eslint-disable react/prop-types */
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay }) => {
  const total_amount = (totalCosts?.venue || 0) + (totalCosts?.av || 0) + (totalCosts?.meals || 0);

  // Format number with thousands separators and two decimal places (e.g. 1,234.56)
  const formatCurrency = (value) => {
    // Ensure we have a number
    const num = Number(value) || 0;
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <p className="preheading">
            <h3>Total cost for the event</h3>
          </p>
        </div>
        <div>
          <h2 id="pre_fee_cost_display" className="price">
            ${formatCurrency(total_amount)}
          </h2>
          <div className="render_items">
            <ItemsDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;