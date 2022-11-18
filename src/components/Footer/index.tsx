import React from 'react';
import classNames from 'classnames';
import { DarkModeSwitcher } from '@omnidex/omnidex-ui-kit';

import staticStyles from './style';

interface FooterProps {
  inside?: boolean;
}

export default function Footer({ inside }: FooterProps) {
  return (
    <footer className={classNames('Footer', { Footer__inside: inside })}>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </footer>
  );
}
