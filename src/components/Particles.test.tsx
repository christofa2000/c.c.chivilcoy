import { render, screen } from '@testing-library/react';
import React from 'react';
import Particles from './Particles';

describe('Particles', () => {
  it('renders a canvas element', () => {
    console.log('React.act:', React.act);
    try {
      render(<Particles />);
    } catch (e) {
      console.error(e);
      throw e;
    }
    const canvas = screen.getByTestId('particles-canvas');
    expect(canvas).toBeInTheDocument();
  });
});