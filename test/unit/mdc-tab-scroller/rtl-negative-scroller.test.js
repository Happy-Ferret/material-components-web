/**
  * @license
  * Copyright 2018 Google Inc. All Rights Reserved.
  *
  * Licensed under the Apache License, Version 2.0 (the "License")
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

import {assert} from 'chai';
import td from 'testdouble';

import {setupFoundationTest} from '../helpers/setup';
import MDCTabScrollerFoundation from '../../../packages/mdc-tab-scroller/foundation';
import MDCTabScrollerRTLNegative from '../../../packages/mdc-tab-scroller/rtl-negative-scroller';

suite('MDCTabScrollerRTLNegative');

const setupTest = ({rootWidth, contentWidth, scrollLeft}) => {
  const {mockAdapter} = setupFoundationTest(MDCTabScrollerFoundation);
  const scroller = new MDCTabScrollerRTLNegative(mockAdapter);
  td.when(mockAdapter.getScrollAreaOffsetWidth()).thenReturn(rootWidth);
  td.when(mockAdapter.getScrollContentOffsetWidth()).thenReturn(contentWidth);
  td.when(mockAdapter.getScrollAreaScrollLeft()).thenReturn(scrollLeft);
  return {scroller, mockAdapter};
};

test('#computeCurrentScrollPositionRTL() returns the current scroll distance when translateX is 0', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -123});
  assert.strictEqual(scroller.computeCurrentScrollPositionRTL(0), -123);
});

test('#computeCurrentScrollPositionRTL() returns the current scroll distance minus translateX', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -123});
  assert.strictEqual(scroller.computeCurrentScrollPositionRTL(11), -134);
});

test('#scrollToRTL() returns a normalized scrollX property', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -111});
  assert.strictEqual(scroller.scrollToRTL(-123).scrollX, -123);
});

test('#scrollToRTL() returns a normalized translateX property', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -111});
  assert.strictEqual(scroller.scrollToRTL(-123).translateX, -12);
});

test('#scrollToRTL() returns 0 for scrollX property when scrollLeft would be too far right', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -500});
  assert.strictEqual(scroller.scrollToRTL(1).scrollX, 0);
});

test('#scrollToRTL() returns 0 for translateX property when scrollLeft would be the same', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -123});
  assert.strictEqual(scroller.scrollToRTL(-123).translateX, 0);
});

test('#scrollToRTL() returns min scroll value for scrollX property when scrollLeft would be too far left', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -677});
  assert.strictEqual(scroller.scrollToRTL(-801).scrollX, -800);
});

test('#incrementScrollRTL() returns a normalized scrollX property', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -111});
  assert.strictEqual(scroller.incrementScrollRTL(-17).scrollX, -128);
});

test('#incrementScrollRTL() returns a normalized translateX property', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -111});
  assert.strictEqual(scroller.incrementScrollRTL(-50).translateX, -50);
});

test('#incrementScrollRTL() returns 0 for scrollX property when scrollLeft would be too far right', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -45});
  assert.strictEqual(scroller.incrementScrollRTL(46).scrollX, 0);
});

test('#incrementScrollRTL() returns 0 for translateX property when scrollLeft would be the same', () => {
  const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -123});
  assert.strictEqual(scroller.incrementScrollRTL(0).translateX, 0);
});

test('#incrementScrollRTL() returns min scroll value for scrollX property when scrollLeft would be too far left',
  () => {
    const {scroller} = setupTest({rootWidth: 200, contentWidth: 1000, scrollLeft: -677});
    assert.strictEqual(scroller.incrementScrollRTL(-124).scrollX, -800);
  }
);