import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLoginButtons() {
    if (this.props.authenticated) {
      return (
        <div className="item">
          <Link to="/signout" className="ui button red">
            Sign Out
          </Link>
        </div>
      );
    } else {
      return (
        <>
          <div className="item">
            <Link to="/signup" className="ui primary button">
              Sign Up
            </Link>
          </div>
          <div className="item">
            <Link to="/signin" className="ui button">
              Sign In
            </Link>
          </div>
        </>
      );
    }
  }

  activePath(isAtPath) {
    return this.props.location.pathname === isAtPath ? 'active' : '';
  }

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <Link to="/feature" className={`item ${this.activePath('/feature')}`}>
          Feature
        </Link>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="ui secondary menu">
        <div className="ui container">
          <Link to="/" className={`item ${this.activePath('/')}`}>
            Home
          </Link>
          {this.renderLinks()}
          <div className="right menu">{this.renderLoginButtons()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(Header);
