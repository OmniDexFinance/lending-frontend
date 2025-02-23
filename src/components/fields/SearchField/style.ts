import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SearchField {
    width: 240px;
    display: flex;
    align-items: center;
    position: relative;
    outline: none;
    @include respond-to(xl) {
      width: 200px;
    }
    @include respond-to(lg) {
      width: 185px;
    }
    @include respond-to(md) {
      width: 200px;
    }
    @include respond-to(sm) {
      width: 100%;
      max-width: 335px;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-style: solid;
      border-width: 1px;
      border-radius: $borderRadius;
    }

    .SearchField__image {
      margin-right: 15px;
      width: 14px;
      height: 14px;
      @include respond-to(xl) {
        margin-right: 10px;
      }
      @include respond-to(lg) {
        width: 12px;
        height: 12px;
      }
      @include respond-to(md) {
        margin-right: 15px;
        width: 14px;
        height: 14px;
      }
    }

    .BasicField {
      input {
        padding: 16px;
        height: 40px;
        font-size: $medium;
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }
    }
  }

  .SearchFieldFocused {
    &:after {
      border-width: 2px;
    }
  }
`;

export default staticStyles;
