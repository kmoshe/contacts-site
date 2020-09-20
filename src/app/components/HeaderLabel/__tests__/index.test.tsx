import React from 'react';
import { render } from '@testing-library/react';

import { HeaderLabel } from '../index';
import { DefaultTheme } from 'styled-components';

const renderComponent = (theme?: DefaultTheme) =>
  render(<HeaderLabel theme={theme} />);

describe('<HeaderLabel />', () => {
  it('should render an <label> tag', () => {
    const label = renderComponent();
    expect(label.container.querySelector('label')).toBeInTheDocument();
  });
});
