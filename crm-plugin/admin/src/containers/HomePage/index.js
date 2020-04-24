/*
 *
 * HomePage
 *
 */
import styled from "styled-components";
import React, { memo } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { request } from "strapi-helper-plugin";
import { all, call, fork, put, select, takeLatest } from "redux-saga/effects";
import { connect } from "react-redux";
import saga from "./saga";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { handleRoute } from "./action";
import Link from "./components/Link";

const Title = styled.div`
  font-size: 18px;
  line-height: 18px;
  font-weight: bold;
`;
const FormContainer = styled.div`
  background: #ffffff;
  padding: 22px 28px 22px;
  border-radius: 2px;
  box-shadow: 0 2px 4px #e3e9f3;
`;
const Button = styled.button`
  margin-right: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  outline: 0;
  height: 30px;
  padding: 0 15px;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: normal;
  border-radius: 2px;
  cursor: pointer;
  outline: 0;
  background-color: #ffffff;
  background-color: #6dbb1a;
  border: 1px solid #6dbb1a;
  color: #ffffff;
  min-width: 140px;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  // handleRoute = () => {
  //   const { dispatch } = this.props;
  //   dispatch({ type: "ROUTE_FETCH_REQUESTED" });
  //   console.log("handleRoute");

  //   // strapi.plugins["crm-plugin"].services.routes.generateRoutes();
  // };
  render() {
    // console.log("handleRoute", handleRoute);
    return (
      <div className="container-fluid" style={{ padding: "18px 30px" }}>
        <div className="row">
          <div
            className="col-sm-6 header-title"
            style={{ paddingTop: "0.8rem" }}
          >
            <h1>{pluginId}</h1>
          </div>
        </div>

        <div className="form-wrapper row" style={{ paddingTop: "21px" }}>
          <div className="col-md-12">
            <FormContainer>
              <div className="row">
                <div className="col-md-7">
                  <div>
                    <Title>Github Repository</Title>
                  </div>
                  <div>
                    <span>
                      <a
                        target="_blank"
                        href="https://github.com/webaccess/crmplatform"
                      >
                        https://github.com/webaccess/crmplatform
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-md-7">
                  <div>
                    <Title>Routes</Title>
                  </div>
                  <Link />
                </div>
              </div>
            </FormContainer>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    data: state.user,
  };
}

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withSaga = strapi.injectSaga({ key: "homePage", saga, pluginId });
// export default compose(withSaga, withConnect)(memo(HomePage));
export default memo(HomePage);
