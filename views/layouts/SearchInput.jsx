import React from 'react';
import {Input} from 'antd';
const SearchInput = React.createClass({
    getInitialState() {
        return {value: '', focus: false};
    },
    handleInputChange(e) {
        const value = e.target.value;
        this.setState({value: value}, this.handleSearch);
    },
    handleFocusBlur(e) {
        this.setState({focus: e.target === document.activeElement});
    },
    handleSearch() {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value.trim());
        }
    }, render() {
        return (<Input value={this.state.value} onChange={this.handleInputChange} onFocus={this.handleFocusBlur}
                       onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch} placeholder="搜索..."/>);
    }
});
export default SearchInput;