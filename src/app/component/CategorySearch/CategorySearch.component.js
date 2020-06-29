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
import './CategorySearch.style';

export const CATEGORY_SEARCH_TIMEOUT = 500;

// TODO: add to template
/** @middleware Component/CategorySearch/Component */
export class CategorySearch extends ExtensiblePureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        onChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = { value: decodeURIComponent(props.value) };
    }

    componentDidUpdate(prevProps) {
        const { value: prevValue } = prevProps;
        const { value } = this.props;

        if (prevValue !== value) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ value });
        }
    }

    onChange = (e) => {
        const { value } = e.target;
        const { onChange } = this.props;
        this.setState({ value });

        clearTimeout(this.timeout);
        this.timeout = setTimeout(onChange, CATEGORY_SEARCH_TIMEOUT, value);
    };

    render() {
        const { value } = this.state;
        return (
            <input
              block="CategorySearch"
              value={ value }
              onChange={ this.onChange }
              placeholder={ __('I`m looking for...') }
            />
        );
    }
}

export default CategorySearch;
