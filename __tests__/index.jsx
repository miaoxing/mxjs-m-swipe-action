import SwipeAction from '..';
import {render} from '@testing-library/react';
import {init} from 'taro-test';

init();

describe('SwipeAction', () => {
  test('basic', () => {
    const result = render(<SwipeAction/>);
    expect(result.container).toMatchSnapshot();
  });
});
