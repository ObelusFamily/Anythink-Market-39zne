import React from "react";
import { connect } from "react-redux";
import agent from "../../agent";
import {
  APPLY_TAG_FILTER, FILTER_BY_TITLE, HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from "../../constants/actionTypes";
import Banner from "./Banner";
import MainView from "./MainView";
import Tags from "./Tags";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
  onFilter: (payload) => dispatch({ type: FILTER_BY_TITLE, payload }),
});

class Home extends React.Component {
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
  
  render() {
    return (
      <div className="home-page">
        <Banner onFilter={this.props.onFilter}/>

        <div className="container page">
          <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
          <MainView />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
