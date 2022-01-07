import { shallowMount, mount } from '@vue/test-utils'
import StateEntry from '@/components/StateEntry.vue'

describe('HTML rendering', () => {
  it('renders props.state as "IDLE" when :initState is NOT passed', () => {
    const state = 'IDLE';
    const wrapper = shallowMount(StateEntry);
    expect(wrapper.text()).toEqual(state);
  })

  it('renders props.state equal to :initState when passed', () => {
    const testInitState = 'TESTING';
    const wrapper = shallowMount(StateEntry, {
      propsData: {
        initState: testInitState,
      }
    })

    // Assert
    expect(wrapper.vm.$data.state).toEqual(testInitState);
  })
})

describe('Computed', () => {
  describe('description', () => {
    it('computes expected twist description', () => {
      const expected = 'Honey: 62.5g at End (WP), Coriander Seeds: 8.5g at 45mins.'
      const wrapper = mount(StateEntry, {
        propsData: {
          twistDescription: "Honey: 62.5g at End (WP), Coriander Seeds: 8.5g at 45mins"
        }
      })
      expect(wrapper.vm.description).toEqual(expected);
    })

    it('computes expected fermentation description', () => {
      const expected = '22 celsius.'
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initState: "IDLE",
          initDisabled: true,
          amount: 22,
          unit: "celsius"
        }
      })

      // Assert
      expect(wrapper.vm.description).toEqual(expected);
    })

    it('computes expected malt description', () => {
      const expected = '3.63 kilograms Extra Pale.'
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initState: "IDLE",
          initDisabled: true,
          amount: 3.63,
          unit: "kilograms",
          name: "Extra Pale"
        }
      })

      // Assert
      expect(wrapper.vm.description).toEqual(expected);
    })

    it('computes expected hops description', () => {
      const expected = '2.5 grams Amarillo (bitter).'
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initState: "IDLE",
          initDisabled: true,
          amount: 2.5,
          unit: "grams",
          name: "Amarillo",
          attribute: "bitter"
        }
      })

      // Assert
      expect(wrapper.vm.description).toEqual(expected);
    })
  })

  describe('disabled', () => {
    it('disabled returns true when $attrs.initDisabled is true', () => {
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initDisabled: true
        }
      })
      expect(wrapper.vm.disabled).toBe(true);
    })

    it('disabled returns false when $attrs.initDisabled is false', () => {
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initDisabled: false
        }
      })
      expect(wrapper.vm.disabled).toBe(false);
    })
  })
})

describe('Props', () => {

})

describe('Watchers', () => {
  describe('state', () => {
    it('Emits updated state when changed.', async () => {
      const expected = "CHANGED";
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initState: "UNCHANGED",
        }
      })

      // Change state
      wrapper.vm.state = expected;

      // Wait until $emits have been handled
      await wrapper.vm.$nextTick();

      // assert event payload
      expect(wrapper.emitted('update:state')[1]).toEqual([expected]);
    })
  })

  describe('disabled', () => {
    it('Emits updated disabled when changed.', async () => {
      const expected = true;
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initDisabled: false,
        }
      })

      // Change isDisabled, the backing prop for the computed disabled prop.
      await wrapper.setProps({ isDisabled: expected })

      // Wait until $emits have been handled
      await wrapper.vm.$nextTick();

      // assert event payload
      expect(wrapper.emitted()['update:disabled'][1]).toEqual([expected]);
    })
  })
})

describe('Methods', () => {
  describe('clickedButton', () => {
    it('Does not set state if already disabled.', () => {
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initState: "TEST",
          initDisabled: true
        }
      })

      // Perform action
      wrapper.vm.clickedButton();

      // Assert
      expect(wrapper.vm.state).toEqual("TEST");
    })

    it('Sets prop state="DONE".', () => {
      const expected = "DONE";
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initState: "TEST", // To ensure state isn't accidentally set to expected, yielding a false positive
          initDisabled: false
        }
      })

      // Perform action
      wrapper.vm.clickedButton();

      // Assert
      expect(wrapper.vm.state).toEqual(expected);
    })

    it('Emits updated disabled as true"', async () => {
      const expected = true;
      const wrapper = shallowMount(StateEntry, {
        propsData: {
          initDisabled: false
        }
      })

      // Perform action
      wrapper.vm.clickedButton();

      // Wait until $emits have been handled
      await wrapper.vm.$nextTick();

      // assert event payload
      expect(wrapper.emitted()['update:disabled'][1]).toEqual([expected]);
    })
  })
})