import { defineComponent, type PropType, type VNode } from 'vue'

// Renders a list of vnodes taken from a slot, so a layout can place parts of its slot in different columns.
export default defineComponent({
  name: 'SpNodes',
  props: { nodes: { type: Array as PropType<readonly VNode[]>, required: true } },
  setup: props => () => props.nodes,
})
