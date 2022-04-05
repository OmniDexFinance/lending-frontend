import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { useThemeContext, BasicModal } from '@omnidex/omnidex-ui-kit';

import { useMenuContext } from '../../../libs/menu';
import ConnectionModeSwitcher from '../ConnectionModeSwitcher';

import staticStyles from './style';
import messages from './messages';

export default function UserSettings() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const [visible, setVisible] = useState(false);
  return (
    <div className="UserSettings">
      <button
        onClick={(e: React.MouseEvent) => {
          setVisible(true);
          e.stopPropagation();
        }}
      >
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          color="textSubtle"
          xmlns="http://www.w3.org/2000/svg"
          className="Menu__icon"
        >
          <path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"></path>
        </svg>
      </button>
      <BasicModal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        withCloseButton={true}
        className={classNames('SettingsModal__modal')}
      >
        <div className="SettingsModal__modal-inner">
          <p>SETTINGS</p>
          <ConnectionModeSwitcher />
        </div>
      </BasicModal>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SettingsModal {
          &__modal {
            border: 1px solid ${currentTheme.border.hex} !important;
            border-radius: 15px !important;
            background: ${currentTheme.whiteElement.hex} !important;
            p {
              color: ${currentTheme.primary.hex};
            }
            .SwitcherWrapper__title {
              color: ${currentTheme.textDarkBlue.hex} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
