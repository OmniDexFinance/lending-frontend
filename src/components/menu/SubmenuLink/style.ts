import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SubmenuItem__container{
    width: 100%;
    &:hover {
      background: #373a45;
    }
    &__firstItem:hover {
      border-radius: 10px 10px 0 0;
    }
    &__lastItem:hover {
      border-radius: 0 0 10px 10px;
    }    
  }
  .SubmenuLink {
    font-weight: 100;
    @include respond-to(sm) {
      color: white !important;
    }
    .SubmenuLink__title {
      padding: 5px;
      font-size: $regular;
      backface-visibility: hidden;
      transform: translateZ(0);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      max-height: 40px;
      width: 100%;
      margin: 0;
      @include respond-to(md) {
        font-size: $small;
        padding: 5px 0;
      }
      p {
        transition: $transition;
        letter-spacing: 0.25px;
        b {
          opacity: 1;
          font-weight: 100;
          transition: $transition;
        }
      }
    }

    &__hidden {
      display: none;
    }
  }
`;

export default staticStyles;
