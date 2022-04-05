import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';
  .LabeledSwitchDisabled.LabeledSwitch__inner {
    @include respond-to(sm) {
      background: #181818;
    }
  }
`;

export default staticStyles;
