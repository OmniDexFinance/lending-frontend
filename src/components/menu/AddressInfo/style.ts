import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .AddressInfo {
    margin-left: 13px;
    @include respond-to(sm) {
      margin: auto;
    }
    &__button {
      display: flex;
      text-align: right;
      min-width: 110px;
      padding: 5px;
      height: 32px;
      line-height: 20px;
      border-radius: 25px;
      font-size: $extraSmall;
      transition: $transition;
      @include respond-to(sm) {
        margin: auto;
        position: relative;
      }
      p {
        text-transform: capitalize;
        white-space: nowrap;
      }

      span {
        vertical-align: baseline;
        font-family: 'Kanit';
        font-weight: bold;
        font-size: 16px;
      }
    }

    &__content {
      width: 160px;
      border-radius: 20px;
      @include respond-to(sm) {
        width: 260px;
      }
    }

    &__content-caption {
      padding: 10px 5px 14px;
      @include respond-to(sm) {
        padding: 10px 25px;
      }
    }
    &__content-network {
      font-size: $extraSmall;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 12px;
      @include respond-to(sm) {
        margin-bottom: 10px;
        font-size: $small;
      }
      span {
        display: inline-flex;
        text-transform: capitalize;
      }
      i {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 6px;
        position: relative;
        bottom: 1px;
        @include respond-to(sm) {
          margin-right: 5px;
          width: 12px;
          height: 12px;
        }
      }
    }
    &__content-address {
      font-size: $small;
      word-break: break-all;
      text-align: center;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }
    &__content-ens {
      font-size: $small;
      word-break: break-all;
      text-align: center;
      margin-top: 12px;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__contentButton {
      font-weight: 300;
      text-transform: uppercase;
      font-size: $medium;
      padding: 15px 15px;
      width: 100%;
      text-align: left;
      font-family: 'Kanit';
      backface-visibility: hidden;
      transform: translateZ(0);
      &:hover {
        border-bottom: 1px solid transparent;
      }
      @include respond-to(sm) {
        padding: 10px 15px;
        font-size: $small;
      }
      &:last-child {
        border-bottom: none !important;
      }

      * {
        backface-visibility: hidden;
        transform: translateZ(0);
      }
    }
  }
`;

export default staticStyles;
