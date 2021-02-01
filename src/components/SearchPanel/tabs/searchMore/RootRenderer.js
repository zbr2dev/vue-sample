export default {
  functional: true,
  props: {
    show: Boolean,
  },
  render(h, ctx) {
    const { children } = ctx;
    const { show } = ctx.props;
    // show root el with children or show only children of root el
    // 1. <div> <hr/> <hr/> </div>  2. <hr/> <hr/>
    return show ? children[0] : children[0].children;
  },
};
