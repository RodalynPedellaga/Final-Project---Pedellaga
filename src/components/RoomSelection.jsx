import "./RoomSelection.css";
import TotalCost from "./TotalCost.jsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venue";
import { incrementAvQuantity, decrementAvQuantity } from "./av";
import { toggleMealSelection } from "./meal";

const Conference = () => {
  const [showItems, setShowItems] = useState(false);
  const [activeTab, setActiveTab] = useState("venue");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const mealsItems = useSelector((state) => state.meals);
  const avItems = useSelector((state) => state.av);
  const venueItems = useSelector((state) => state.venue);
  const dispatch = useDispatch();

  const auditoriumItem = venueItems.find(
    (item) => item.name === "Auditorium Hall (Capacity:200)"
  );
  const remainingAuditoriumQuantity = auditoriumItem
    ? 3 - auditoriumItem.quantity
    : 3;

  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };
  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  const handleMealSelection = (index) => {
    // toggle selection for a meal by index
    // (the meals reducer expects the index as payload)
    dispatch(toggleMealSelection(index));
  };

  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) {
          totalCost += item.cost * numberOfPeople;
        }
      });
    }
    return totalCost;
  };
  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealsTotalCost = calculateTotalCost("meals");

  const navigateToProducts = (idType) => {
    // keep backwards-compatible API: accept '#venue' etc or plain names
    const name = idType?.replace?.("#", "") || idType;
    if (["venue", "addons", "meals"].includes(name)) {
      setActiveTab(name === "addons" ? "av" : name === "meals" ? "meals" : "venue");
      // hide details panel if open
      if (showItems) setShowItems(false);
    }
  };

  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "venue" });
      }
    });
    avItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "av")
      ) {
        items.push({ ...item, type: "av" });
      }
    });
    mealsItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "meals" };
        if (item.numberOfPeople) {
          itemForDisplay.numberOfPeople = numberOfPeople;
        }
        items.push(itemForDisplay);
      }
    });
    return items;
  };

  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
    console.log(items);
    return (
      <>
        <div className="display_box1">
          {items.length === 0 && <p>No items selected</p>}
          <table className="table_item_data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>
                    {item.type === "meals" || item.numberOfPeople
                      ? ` For ${numberOfPeople} people`
                      : item.quantity}
                  </td>
                  <td>
                    {item.type === "meals" || item.numberOfPeople
                      ? `${item.cost * numberOfPeople}`
                      : `${item.cost * item.quantity}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={(e) => { e.preventDefault(); navigateToProducts("#venue"); }}>
              Venue
            </a>
            <a href="#addons" onClick={(e) => { e.preventDefault(); navigateToProducts("#addons"); }}>
              Add-ons
            </a>
            <a href="#meals" onClick={(e) => { e.preventDefault(); navigateToProducts("#meals"); }}>
              Meals
            </a>
          </div>
          <button
            className="details_button"
            onClick={() => setShowItems(!showItems)}
          >
            Show Details
          </button>
        </div>
      </navbar>
      <div className="main_container">
        {!showItems ? (
          <div className="items-information panels">
            <section id="venue" className={`panel venue_panel ${activeTab === "venue" ? "active" : ""}`}>
              <div className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      {venueItems[index].name ===
                      "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-minus btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <div className="button_container">
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? " btn-warning btn-disabled"
                                : "btn-warning btn-plus"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              venueItems[index].quantity === 10
                                ? " btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
              </div>
            </section>
            
            <section id="addons" className={`panel addons_panel ${activeTab === "av" ? "active" : ""}`}>
              <div className="venue_container container_main">
              <div className="text">
                <h1> Add-ons Selection</h1>
              </div>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                  <div className="av_data venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="addons_btn">
                      <button
                        className="btn-warning"
                        onClick={() => handleDecrementAvQuantity(index)}
                      >
                        &ndash;
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="btn-success"
                        onClick={() => handleIncrementAvQuantity(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: {avTotalCost}</div>
              </div>
            </section>

            <section id="meals" className={`panel meals_panel ${activeTab === "meals" ? "active" : ""}`}>
              <div className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>

              <div className="input-container venue_selection">
                <label htmlFor="numberOfPeople">
                  <h3>Number of People:</h3>
                </label>
                <input
                  type="number"
                  className="input_box5"
                  id="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  min="1"
                />
              </div>
              <div className="meal_selection">
                {mealsItems.map((item, index) => {
                  return (
                    <div
                      className="meal_item"
                      key={index}
                      style={{ padding: 15 }}
                    >
                      <div className="inner">
                        <input
                          type="checkbox"
                          id={`meal_${index}`}
                          checked={item.selected}
                          onChange={() => handleMealSelection(index)}
                        />
                        <label htmlFor={`meal_${index}`}>{item.name}</label>
                      </div>
                      <div className="meal_cost">${item.cost}</div>
                    </div>
                  );
                })}
              </div>
              <div className="total_cost">Total Cost: {mealsTotalCost}</div>
              </div>
            </section>
            {/* empty spacer to keep layout if needed */}
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={totalCosts}
              handleClick={handleToggleItems}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Conference;