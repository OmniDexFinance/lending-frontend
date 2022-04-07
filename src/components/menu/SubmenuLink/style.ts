import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SubmenuLink {
    font-weight: 300;
    @include respond-to(sm) {
      color: white !important;
    }
    &:hover {
      .SubmenuLink__title {
        i {
          width: 80%;
        }
      }
    }
    .SubmenuLink__title {
      position: relative;
      padding: 10px 0;
      font-size: $regular;
      backface-visibility: hidden;
      transform: translateZ(0);
      display: flex;
      align-items: center;
      justify-content: center;
      @include respond-to(sm) {
        font-size: $small;
        padding: 10px 0;
      }
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
      i {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        bottom: -1px;
        height: 3px;
        transition: all 0.4s ease;
        border-radius: $borderRadius;
        @include respond-to(sm) {
          display: none;
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: inherit;
          transition: $transition;
          filter: blur(3px);
        }
      }
    }

    &__active {
      .SubmenuLink__title {
        p {
          b {
            opacity: 0;
          }
        }
        strong {
          opacity: 1;
        }
        i {
          width: 80% !important;
        }
      }
    }

    &__hidden {
      display: none;
    }
  }
`;

export default staticStyles;
