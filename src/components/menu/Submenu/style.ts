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
    border-radius: 10px;
    width: auto;
    align-items: center;
    padding: 0;
    z-index: 5;
    height: auto;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    @include respond-to(md) {
      padding: 0;
      background: transparent !important;
      box-shadow: none;
      border: none;
      height: auto;
      min-height: 50px;
      margin: auto;
      margin-top: 0;
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

    &__navigation-inner {
      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        height: auto;
        @include respond-to(md) {
          display: block;
          text-align: left;
        }
        .Submenu__link-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          height: auto;
          width: 100%;
          @include respond-to(md) {
            margin: 0px 20px;
          }
        }
      }
    }

    &__linkHidden {
      display: none;
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
