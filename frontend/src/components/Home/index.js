/* eslint-disable no-constant-condition */
import React from "react";
import { connect } from "react-redux";
import agent from "../../agent";
import {
  APPLY_TAG_FILTER,
  FILTER_BY_TITLE,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import Banner from "./Banner";
import MainView from "./MainView";
import Tags from "./Tags";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  items: state.itemList.items,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
  onFilter: (title, payload) =>
    dispatch({ type: FILTER_BY_TITLE, payload, title }),
});

class Home extends React.Component {
  state = {
    search: "",
  };
  componentWillMount() {
    const tab = "all";
    const itemsPromise = agent.Items.all;

    this.props.onLoad(
      tab,
      itemsPromise,
      Promise.all([agent.Tags.getAll(), itemsPromise()])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  onChangeValue = (search) => {
    this.setState({
      search,
    });
  };
  render() {
    return (
      <div className="home-page">
        <Banner
          search={this.state.search}
          onChangeValue={this.onChangeValue}
          onFilter={this.props.onFilter}
        />

        <div className="container page">
          <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
          {this.state.search && !this.props.items.length ? (
            <div id="empty" className="text-center">
              <p>No items found for {this.state.search} </p>
            </div>
          ) : (
            <MainView />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
