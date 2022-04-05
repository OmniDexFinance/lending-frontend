import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';
  .TokenPriceInfo {
    font-weight: bold;
    display: flex;
    img {
      margin-right: 8px;
      @include respond-to(sm) {
        height: 18px;
        width: 18px;
        margin-top: 2px;
      }
    }
    span {
      @include respond-to(sm) {
        font-size: 12px;
      }
    }
    @include respond-to(sm) {
      display: none;
    }
  }
`;

export default staticStyles;
