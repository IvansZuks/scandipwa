/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';

import SearchOverlay from './SearchOverlay.component';

const SearchBarDispatcher = import(/* webpackMode: "lazy", webpackPrefetch: false, webpackChunkName: "dispatchers" */'Store/SearchBar/SearchBar.dispatcher');

export const mapStateToProps = state => ({
    searchResults: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    makeSearchRequest: options => SearchBarDispatcher.then(({ default: dispatcher }) => dispatcher.handleData(dispatch, options)),
    clearSearchResults: () => SearchBarDispatcher.then(({ default: dispatcher }) => dispatcher.clearSearchResults(dispatch))
});

export class SearchOverlayContainer extends PureComponent {
    static propTypes = {
        makeSearchRequest: PropTypes.func.isRequired,
        clearSearchResults: PropTypes.func.isRequired,
        searchCriteria: PropTypes.string.isRequired
    };

    containerFunctions = {
        getProductLinkTo: this.getProductLinkTo.bind(this),
        makeSearchRequest: this.makeSearchRequest.bind(this)
    };

    getProductLinkTo(product) {
        const { url_key } = product;

        if (!url_key) {
            return {};
        }

        return {
            pathname: `/product/${ url_key }`,
            state: { product }
        };
    }

    makeSearchRequest() {
        const {
            makeSearchRequest,
            clearSearchResults,
            searchCriteria
        } = this.props;

        if (searchCriteria) {
            clearSearchResults();

            makeSearchRequest({
                args: {
                    search: searchCriteria,
                    pageSize: 24,
                    currentPage: 1
                }
            });
        }
    }

    render() {
        return (
            <SearchOverlay
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOverlayContainer);
