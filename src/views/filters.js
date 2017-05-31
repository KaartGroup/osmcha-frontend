// @flow
import React from 'react';
import Mousetrap from 'mousetrap';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';

import { Navbar } from '../components/navbar';
import { Filter } from '../components/filter';
import { Button } from '../components/button';

import filters from '../config/filters.json';

import { applyFilters } from '../store/changesets_page_actions';

import type { RootStateType } from '../store';

class Filters extends React.PureComponent {
  props: {
    filters: Object,
    location: Object,
    applyFilters: (Object, string) => mixed // base 0
  };
  state = { ...this.props.filters };
  scrollable = null;
  componentDidMount() {
    // Mousetrap.bind(FILTER_BINDING, () => {
    //   this.toggleFilter();
    // });
  }
  handleSelectChange = (name, obj) => {
    if (Array.isArray(obj)) {
      return this.setState({
        [name]: obj.map(o => ({ label: o.label, value: o.value })) || []
      });
    }
    return this.setState({
      [name]: (obj && obj.value) || ''
    });
  };
  handleFormChange = (event: any) => {
    let value;
    let name;
    const target = event.target;

    value = target.type === 'checkbox' ? target.checked : target.value;
    name = target.name;

    this.setState({
      [name]: value
    });
  };
  handleApply = () => {
    this.props.applyFilters(this.state, '/');
  };
  handleClear = () => {
    var keys = Object.keys(this.state);
    var newState = {};
    keys.forEach(k => (newState[k] = undefined));
    this.setState(newState);
    console.log(newState);
    this.props.applyFilters({}, '/');
  };
  render() {
    const width = window.innerWidth;
    return (
      <div
        className={`flex-parent flex-parent--column changesets-list bg-gray-faint ${width < 800 ? 'viewport-full' : ''}`}
      >
        <header className="hmin55 h55 p12 pb24 border-b border--gray-light bg-gray-faint txt-s flex-parent justify--space-around">
          some header
        </header>
        <div className="m12 flex-parent flex-parent--row flex-parent--wrap justify--space-around scroll-auto wmax960 ">
          {filters
            .filter(f => !f.ignore)
            .map((f, k) => (
              <Filter
                data={f}
                value={this.state[f.name]}
                key={k}
                onChange={this.handleFormChange}
                onSelectChange={this.handleSelectChange}
              />
            ))}
          <span className="flex-child flex-child--grow wmin420 wmax435" />
        </div>
        <div className="flex-parent flex-parent--column justify--space-around  flex-child--grow" />
        <footer className="hmin55 p12 pb24 border-t border--gray-light bg-gray-faint txt-s flex-parent justify--space-around">
          <Link to={{ search: this.props.location.search, pathname: '/' }}>
            Close
          </Link>
          <a onClick={this.handleClear}>
            Clear
          </a>
          <a onClick={this.handleApply}>
            Apply
          </a>
        </footer>
      </div>
    );
  }
}

Filters = connect(
  (state: RootStateType, props) => ({
    filters: state.changesetsPage.get('filters') || {},
    location: props.location
  }),
  {
    applyFilters
  }
)(Filters);

export { Filters };
