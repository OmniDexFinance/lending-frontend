import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Submenu {
    &__active {
      opacity: 1;
      display: flex;
    }
    border-width: 1px;
    border-style: solid;
    display: none;
    transition: 300ms opacity ease;
    position: absolute;
    opacity: 0;
    border-radius: 15px;
    width: fit-content;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    z-index: 5;
    height: 70px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    @include respond-to(sm) {
      padding: 0;
      background: transparent !important;
      box-shadow: none;
      border: none;
      height: auto;
      min-height: 50px;
      margin: auto;
      margin-top: 20px;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      @include respond-to(sm) {
        display: none;
      }
    }

    &__logo-inner {
      img {
        height: 40px;
        vertical-align: middle;
      }
      span {
        color: white;
        margin-left: 3px;
        font-size: 24px;
        vertical-align: middle;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__back-button {
      position: absolute;
      padding: 15px;
      left: 0;
      img {
        width: 20px;
        height: 20px;
      }
    }

    &__title-inner {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        padding: 0 50px;
      }
      p {
        font-size: $regular;
        text-transform: uppercase;
      }
    }

    &__right-inner {
      display: flex;
      align-items: center;
    }

    &__navigation-inner {
      ul {
        display: flex;
        align-items: center;
        @include respond-to(sm) {
          display: block;
          text-align: center;
        }
        .Submenu__link-inner.Submenu__linkfirst {
          margin: 0;
          @include respond-to(sm) {
            margin: 0px 20px;
          }
        }
        .Submenu__link-inner {
          margin-left: 40px;
          @include respond-to(sm) {
            margin: 0px 20px;
            display: inline-block;
          }
        }
      }
    }

    &__linkHidden {
      display: none;
    }

    &__burger-inner {
      display: none;
      @include respond-to(md) {
        display: block;
        margin-right: 5px;
      }
      @include respond-to(sm) {
        margin-right: 0;
        position: absolute;
        right: 0;
      }
    }

    &__buttons-inner {
      display: flex;
      align-items: center;
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
