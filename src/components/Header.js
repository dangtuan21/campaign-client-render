import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link className="item" to="/">
        CrowdCoin
      </Link>
      <Menu.Menu position="right">
        <Link className="item" to="/">
          Campaigns
        </Link>
        <Link className="item" to="/campaigns/new">
          +
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
