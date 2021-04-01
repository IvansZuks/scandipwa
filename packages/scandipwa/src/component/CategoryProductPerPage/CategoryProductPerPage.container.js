import PropTypes from 'prop-types';
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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CategoryProductPerPage from './CategoryProductPerPage.component';

export const mapStateToProps = (state) => ({
    defaultListProductCount: state.ConfigReducer.list_per_page,
    defaultGridProductCount: state.ConfigReducer.grid_per_page,
    gridCountOptions: state.ConfigReducer.grid_per_page_values,
    listCountOptions: state.ConfigReducer.list_per_page_values
});

export const mapDispatchToProps = () => ({});

export class CategoryProductPerPageContainer extends PureComponent {
    static propTypes = {
        defaultListProductCount: PropTypes.string.isRequired,
        defaultGridProductCount: PropTypes.string.isRequired,
        gridCountOptions: PropTypes.string.isRequired,
        listCountOptions: PropTypes.string.isRequired,
        plpType: PropTypes.string.isRequired
    };

    state = {
        currentValue: '12'
    };

    containerFunctions = {
        handleChange: this.handleChange.bind(this)
    };

    containerProps = () => {
        const {
            defaultListProductCount,
            defaultGridProductCount,
            gridCountOptions,
            listCountOptions,
            plpType
        } = this.props;

        return {
            defaultListProductCount,
            defaultGridProductCount,
            gridCountOptions: this.createOptionsArray(gridCountOptions),
            listCountOptions: this.createOptionsArray(listCountOptions),
            plpType
        };
    };

    handleChange(value) {
        this.setState({ currentValue: value });
    }

    createOptionsArray(options) {
        return options.split(',').reduce(
            (acc, option) => {
                acc.push({
                    id: option,
                    name: option,
                    value: option,
                    label: option
                });

                return acc;
            },
            []
        );
    }

    render() {
        const { currentValue } = this.state;
        console.log('***', currentValue);

        return (
            <CategoryProductPerPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductPerPageContainer);
