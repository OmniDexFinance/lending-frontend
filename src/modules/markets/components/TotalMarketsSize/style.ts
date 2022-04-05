import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TotalMarketsSize {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    border-radius: 15px;
    justify-content: space-between;
    padding: 10px 30px;
    position: relative;
    z-index: 5;
    height: 70px;
    &__value {
      font-size: $extraLarge;
      margin-left: 20px;
      font-family: 'roboto-font';
      font-weight: bold;
    }
    @include respond-to(md) {
      margin-bottom: 10px;
    }
    @include respond-to(sm) {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 15px 10px;
      width: calc(100% + 20px);
      position: relative;
      left: -10px;
    }
    p {
      font-size: $regular;
      margin-bottom: 5px;
      @include respond-to(xl) {
        font-size: $regular;
        margin-bottom: 3px;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-weight: 300;
        margin-bottom: 2px;
        font-size: $regular;
      }
    }
    h2 {
      white-space: nowrap;
      font-size: 30px;
      @include respond-to(xl) {
        font-size: 20px;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
      @include respond-to(sm) {
        font-size: 30px;
      }
    }
  }
`;

export default staticStyles;
