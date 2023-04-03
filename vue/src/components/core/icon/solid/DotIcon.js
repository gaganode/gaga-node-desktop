import { defineComponent, h } from "vue";

export default defineComponent({
  render: () =>
    h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
      h("path", {
        "fill-rule": "evenodd",
        d: "M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z",
        "clip-rule": "evenodd",
      }),
    ]),
});
