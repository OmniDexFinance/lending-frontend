import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import {
  DropdownWrapper,
  rgba,
  textCenterEllipsis,
  useThemeContext,
} from '@omnidex/omnidex-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useMenuContext } from '../../../libs/menu';
import Link from '../../basic/Link';
import ConnectButton from '../../ConnectButton';

import staticStyles from './style';
import messages from './messages';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';
import useGetEnsName from '../../../libs/hooks/use-get-ens-name';

export default function AddressInfo() {
  const intl = useIntl();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();
  const { chainId } = useWeb3React();
  const {
    currentAccount,
    disconnectWallet,
    displaySwitchAccountModal,
    currentProviderName,
    availableAccounts,
  } = useUserWalletDataContext();
  const { ensName } = useGetEnsName(currentAccount);
  const ensNameAbbreviated = ensName
    ? ensName.length > 18
      ? textCenterEllipsis(ensName, 12, 3)
      : ensName
    : undefined;
  const { closeMobileMenu } = useMenuContext();

  const [visible, setVisible] = useState(false);
  const config = chainId ? getNetworkConfig(chainId) : null;
  const networkColor = '#7157ff';

  const borderColor = rgba(`${currentTheme.darkBlue.rgb}, 0.1`);
  const hoverColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);
  const isError = config == null ? true : false;
  return (
    <div className="AddressInfo">
      {currentAccount ? (
        <DropdownWrapper
          visible={visible}
          setVisible={setVisible}
          horizontalPosition={(sm && 'center') || 'right'}
          verticalPosition="bottom"
          className="AddressInfo__dropdownWrapper"
          buttonComponent={
            <button
              className={classNames('AddressInfo__button', { AddressInfo__buttonActive: visible })}
              onClick={() => setVisible(!visible)}
              type="button"
            >
              <div
                className={classNames('AddressInfo__buttonIcon', {
                  AddressInfo_buttonError: isError,
                })}
              >
                <svg
                  viewBox="0 0 24 24"
                  color="primary"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  className="Menu__icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z"
                  ></path>
                </svg>
              </div>
              <span>
                {ensNameAbbreviated ? ensNameAbbreviated : textCenterEllipsis(currentAccount, 2, 4)}
              </span>
              <svg
                style={{ fill: 'white' }}
                viewBox="0 0 24 24"
                color="text"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
              </svg>
            </button>
          }
        >
          <div className="AddressInfo__content">
            <Link
              to="/history"
              className="AddressInfo__contentButton ButtonLink"
              onClick={() => {
                setVisible(false);
                closeMobileMenu();
              }}
            >
              <span>{intl.formatMessage(messages.history)}</span>
            </Link>

            {(currentProviderName?.includes('ledger') || availableAccounts.length > 1) && (
              <button
                className="AddressInfo__contentButton"
                type="button"
                onClick={() => displaySwitchAccountModal(true)}
              >
                <span>{intl.formatMessage(messages.changeAddress)}</span>
              </button>
            )}
            <hr className="AddressInfo__separator" />
            <button
              className="AddressInfo__contentButton"
              type="button"
              onClick={() => {
                disconnectWallet();
                closeMobileMenu();
              }}
            >
              <span>{intl.formatMessage(messages.disconnect)}</span>
            </button>
          </div>
        </DropdownWrapper>
      ) : (
        <ConnectButton size="small" />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AddressInfo {
          &__buttonIcon {
            .Menu__icon {
              margin-left: 0px;
              margin-top: 5px;
              fill: ${isCurrentThemeDark
                ? currentTheme.primary.hex
                : currentTheme.textDarkBlue.hex};
            }
            left: 0px;
            top: -5px;
            text-align: center;
            width: 40px;
            height: 40px;
            background: ${currentTheme.whiteElement.hex};
            position: absolute;
            border-radius: 100px;
            border: 2px solid
              ${isCurrentThemeDark ? currentTheme.primary.hex : currentTheme.textDarkBlue.hex};
          }
          &__separator {
            height: 1px;
            border: 0px;
            background: ${currentTheme.border.hex};
          }
          .ConnectButton {
            border: 0px;
            box-shadow: none;
            &:after,
            &:before {
              border-radius: 25px;
            }
            &__inner {
              font-size: 20px;
              border-radius: 25px;
              background: ${currentTheme.primary.hex};
              span {
                font-size: 16px !important;
                font-weight: bold;
                font-family: 'Kanit';
              }
            }
          }
          &__button {
            border: 1px solid ${isCurrentThemeDark ? 'transparent' : currentTheme.textDarkBlue.hex};
            padding-left: 50px;
            padding-right: 10px;
            background: ${isCurrentThemeDark
              ? currentTheme.mainBg.hex
              : currentTheme.textDarkBlue.hex};
            color: ${currentTheme.white.hex} !important;
            svg {
              margin-top: -2px;
            }
          }

          &__buttonActive {
            border-color: ${currentTheme.white.hex};
          }

          &__content {
            background: ${currentTheme.whiteElement.hex};
            color: ${currentTheme.textDarkBlue.hex};
            border: 1px solid ${currentTheme.border.hex};
          }

          &__content-caption {
            border-bottom: 1px solid ${currentTheme.darkBlue.hex};
          }
          &__content-network {
            i {
              background: ${networkColor};
            }
          }

          &__contentButton {
            color: ${currentTheme.primary.hex} !important;
            border-bottom: 1px solid ${borderColor};
            &:hover {
              background: ${hoverColor};
            }
          }
        }
      `}</style>
    </div>
  );
}
