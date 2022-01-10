import SwipeAction from '..';
import {render} from '@testing-library/react';
import '../initTaroH5';

describe('SwipeAction', () => {
  test('basic', () => {
    const result = render(<SwipeAction/>);
    expect(result.container).toMatchSnapshot();
  });
});
