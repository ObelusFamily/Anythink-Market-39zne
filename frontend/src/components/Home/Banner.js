import React, { useState } from "react";
import agent from "../../agent";
import logo from "../../imgs/logo.png";

const Banner = ({ onFilter, search, onChangeValue }) => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>A place to </span>
          <span id="get-part" onClick={() => setHidden(!hidden)}>
            get
          </span>
          {!hidden && (
            <input
              type="search"
              name="search"
              id="search-box"
              placeholder="What is it that you truly desire?"
              onChange={async (e) => {
                const title = e.target.value.trim();
                onChangeValue(title);
                if (title.length > 2 || !title) {
                  const filteredItems = await agent.Items.byTitle(
                    e.target.value
                  );
                  onFilter(e.target.value, filteredItems);
                }
              }}
            />
          )}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
