import { shallowMount } from '@vue/test-utils'
import StateEntry from '@/components/StateEntry.vue'

describe('HTML rendering', () => {
  it('renders props.state as "IDLE" when :initState is NOT passed', () => {
    const state = 'IDLE'
    const wrapper = shallowMount(StateEntry, {
      // propData: { state }
    })
    // console.log(wrapper.text());
    expect(wrapper.text()).toEqual(state)
  })

  it('renders props.state equal to :initState when passed', () => {
    const testInitState = 'TESTINGssss'
    const wrapper = shallowMount(StateEntry, {
      propsData: {
        initState: testInitState,
      }
    })
    // console.log(wrapper.props())
    // console.log(wrapper.data)
    // // console.log(wrapper.text());
    // console.log(wrapper)
    // console.log(wrapper.vm.$data.state)
    // console.log(wrapper.vm.state)
    expect(wrapper.vm.$data.state).toEqual(testInitState)
  })
})

describe('Computed description', () => {
  it('computes expected twist description', () => {
    const expected = 'Honey: 62.5g at End (WP), Coriander Seeds: 8.5g at 45mins.'
    const wrapper = shallowMount(StateEntry, {
      propsData: {
        twistDescription: "Honey: 62.5g at End (WP), Coriander Seeds: 8.5g at 45mins"
      }
    })
    expect(wrapper.vm.description).toEqual(expected)
  })

  it('computes expected twist description', () => {
    const expected = '22 celsius.'
    const wrapper = shallowMount(StateEntry, {
      propsData: {
        initState: "IDLE",
        initDisabled: true,
        amount: 22,
        unit: "celsius"
      }
    })
    expect(wrapper.vm.description).toEqual(expected)
  })
})