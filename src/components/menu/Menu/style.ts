import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Menu {
    width: 100%;
    transform: translateY(-70px);
    padding: 5px 15px;
    z-index: 5;
    position: absolute;
    transition: 400ms transform ease, 400ms opacity ease;
    opacity: 0.4;
    height: 60px;
    &__active {
      transform: translateY(0px);
      opacity: 1;
    }
    &__icon {
      @include respond-to(sm) {
        margin: 0;
      }
    }
    .Menu__logo-link {
      margin-right: 30px;
      @include respond-to(lg) {
        margin-right: 20px;
      }
    }
    @include respond-to(sm) {
      padding: 0;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
      border: none;
      height: auto;
      min-height: 50px;
    }
    &__container {
      @include respond-to(sm) {
        min-height: 50px;
      }
      width: 1600px;
      max-width: 100%;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
        font-size: 20px;
        font-weight: 400;
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
      margin-right: 40px;
      margin-left: -4px;
      @include respond-to(xl) {
        margin-right: 40px;
      }
      @include respond-to(lg) {
        margin-right: 40px;
      }
      @include respond-to(md) {
        display: none;
      }
      ul {
        display: flex;
        align-items: center;
        .Menu__link-inner {
          height: 50px;
          border-radius: 15px;
          line-height: 50px;
          padding: 0px 15px;
          @include respond-to(lg) {
            padding: 0px 15px;
          }
        }
      }
    }
    &__name {
      font-family: 'roboto-font';
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
