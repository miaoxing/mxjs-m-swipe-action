import SwipeAction from '..';
import {render} from '@testing-library/react';

describe('SwipeAction', () => {
  test('basic', () => {
    const result = render(<SwipeAction/>);
    expect(result.container).toMatchSnapshot();
  });
});
