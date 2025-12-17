import React from "react";

const Header = React.memo(({ cartCount }) => {
  console.log("Header Rendered");

  return (
    <header style={styles.header}>
      <h2>🛍 React Performance Store</h2>
      <div>🛒 Cart Items: {cartCount}</div>
    </header>
  );
});

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    marginBottom: "10px",
  },
};
export default Header;
