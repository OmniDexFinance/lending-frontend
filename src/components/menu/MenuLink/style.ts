import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MenuLink {
    font-weight: 300;
    .MenuLink__title {
      font-family: 'Kanit';
      position: relative;
      padding: 0;
      font-size: $regular;
      backface-visibility: hidden;
      transform: translateZ(0);
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        transition: $transition;
        position: relative;
        display: inline-block;
        letter-spacing: 0.25px;
        b {
          opacity: 1;
          font-weight: 300;
          transition: $transition;
        }
      }
      strong {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: $transition;
        font-weight: 600;
        white-space: nowrap;
        letter-spacing: 0.25px;
      }
    }

    &__active {
      .MenuLink__title {
        p {
          b {
            opacity: 0;
          }
        }
        strong {
          opacity: 1;
        }
      }
    }

    &__hidden {
      display: none;
    }
  }
`;

export default staticStyles;
