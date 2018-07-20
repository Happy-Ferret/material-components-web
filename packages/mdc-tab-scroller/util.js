/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 import {cssClasses} from './constants';

/**
 * Stores result from computeHorizontalScrollbarHeight to avoid redundant processing.
 * @private {number|undefined}
 */
let horizontalScrollbarHeight;

/**
 * Computes the height of browser-rendered horizontal scrollbars, given an element to test with.
 * May return 0 (e.g. on OS X browsers under default configuration).
 * @param {!Element} el
 * @return {number}
 */
function computeHorizontalScrollbarHeight() {
  if (typeof horizontalScrollbarHeight === 'undefined') {
    const el = document.createElement('div');
    el.className = cssClasses.SCROLL_TEST;
    document.body.appendChild(el);

    horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
    document.body.removeChild(el);
  }

  return horizontalScrollbarHeight;
}

export {computeHorizontalScrollbarHeight};