import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';
  .Markets .TopPanelWrapper {
    background: transparent;
    border: none;
    box-shadow: none;
  }
  .Markets {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 50px !important;
    @include respond-to(sm) {
      margin-top: 0 !important;
    }
    &__content {
      @include respond-to(sm) {
        background: transparent !important;
        border: none !important;
      }
      flex-direction: column;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      margin-top: 50px;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      margin-top: 40px;
      padding: 0px 30px;
      border-radius: 25px;
    }
    &__top-content {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 10px 0px;
      @include respond-to(xl) {
        padding: 12px 20px;
      }
      @include respond-to(lg) {
        padding: 15px 20px;
      }
      @include respond-to(md) {
        padding: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__size,
    &__market-switcher {
      display: none;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__marketSwitcher--title {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      font-size: $regular;
    }

    &__mobile--cards {
      display: none;
      @include respond-to(sm) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__help--modalInner {
      margin-bottom: 10px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .Markets__help--modal {
      .TextWithModal__text {
        font-size: $medium;
      }
    }

    &__price-switcher {
      margin-top: 30px;
      @include respond-to(xl) {
        margin-top: 20px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
