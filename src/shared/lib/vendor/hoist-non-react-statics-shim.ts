import * as hoistNonReactStaticsModule from "../../../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js";

const hoistNonReactStatics = "default" in hoistNonReactStaticsModule ? hoistNonReactStaticsModule.default : (hoistNonReactStaticsModule as unknown as typeof import("hoist-non-react-statics"));

export default hoistNonReactStatics;
