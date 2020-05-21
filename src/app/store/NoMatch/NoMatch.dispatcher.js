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

import { updateNoMatch } from 'Store/NoMatch';
/**
 * NoMatch Dispatcher
 * @class NoMatchDispatcher
 */
export class NoMatchDispatcher extends ExtensibleClass {
    updateNoMatch(dispatch, options) {
        const { noMatch } = options;
        dispatch(updateNoMatch(noMatch));
    }
}

export default new (middleware(NoMatchDispatcher, 'Store/NoMatch/Dispatcher'))();
