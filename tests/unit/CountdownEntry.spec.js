import { shallowMount } from '@vue/test-utils'
import CountdownEntry from '@/components/CountdownEntry.vue'

describe('HTML rendering', () => {
  it('renders props.state as "IDLE" when :initState is NOT passed', () => {
    const state = 'IDLE';
    const wrapper = shallowMount(CountdownEntry);
    expect(wrapper.text()).toEqual(state);
  })

  it('renders props.state equal to :initState when passed', () => {
    const testInitState = 'TESTING';
    const wrapper = shallowMount(CountdownEntry, {
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
    it('Computes expected description', () => {
      const mashTemp = {
        "temp": {
          "value": 60,
          "unit": "celsius"
        },
        "duration": 10,
        "state": "IDLE",
        "disabled": false,
        "time_remaining": 600
      }

      const expected = '10 minutes at 60 celsius.'

      const wrapper = shallowMount(CountdownEntry, {
        propsData: {
          initState: "IDLE",
          initDisabled: true,
          initTime: mashTemp.time_remaining,
          duration: mashTemp.duration,
          timeRemaining: mashTemp.time_remaining,
          amount: mashTemp.temp.value,
          unit: mashTemp.temp.unit
        }
      })

      // Assert
      expect(wrapper.vm.description).toEqual(expected);
    })
  })

  describe('disabled', () => {
    it('disabled returns true when $attrs.initDisabled is true', () => {
      const wrapper = shallowMount(CountdownEntry, {
        propsData: {
          initDisabled: true
        }
      })
      expect(wrapper.vm.disabled).toBe(true);
    })

    it('disabled returns false when $attrs.initDisabled is false', () => {
      const wrapper = shallowMount(CountdownEntry, {
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
      const wrapper = shallowMount(CountdownEntry, {
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
      const wrapper = shallowMount(CountdownEntry, {
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
      const wrapper = shallowMount(CountdownEntry, {
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

    it('Sets prop state="RUNNING" if not done.', () => {
      const mashTemp = {
        "temp": {
          "value": 60,
          "unit": "celsius"
        },
        "duration": 10,
        "state": "IDLE",
        "disabled": false,
        "time_remaining": 600
      }

      const expected = "RUNNING";

      const wrapper = shallowMount(CountdownEntry, {
        propsData: {
          initState: "IDLE",
          initDisabled: false,
          initTime: mashTemp.time_remaining,
          duration: mashTemp.duration,
          timeRemaining: mashTemp.time_remaining,
          amount: mashTemp.temp.value,
          unit: mashTemp.temp.unit
        }
      })


      // Perform action
      wrapper.vm.clickedButton();

      // Assert
      expect(wrapper.vm.state).toEqual(expected);
    })

    it('Sets prop state="DONE" when timer hits 0.', async () => {
      const mashTemp = {
        "temp": {
          "value": 60,
          "unit": "celsius"
        },
        "duration": 10,
        "state": "IDLE",
        "disabled": false,
        "time_remaining": 600
      }

      const expected = "DONE";

      const wrapper = shallowMount(CountdownEntry, {
        propsData: {
          initState: "IDLE",
          initDisabled: false,
          initTime: mashTemp.time_remaining,
          duration: mashTemp.duration,
          timeRemaining: mashTemp.time_remaining,
          amount: mashTemp.temp.value,
          unit: mashTemp.temp.unit
        }
      })

      // Perform action
      wrapper.vm.clickedButton();

      // Wait until action has taken place
      await wrapper.vm.$nextTick();

      // Pretend time has elapsed
      wrapper.vm.timeRemaining = 0;

      // Tick the timer
      wrapper.vm.tick();

      // Assert
      expect(wrapper.vm.state).toEqual(expected);
    })

    it('Emits updated disabled as true"', async () => {
      const expected = true;
      const wrapper = shallowMount(CountdownEntry, {
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