import { shallowMount } from '@vue/test-utils'
import TwistEntry from '@/components/TwistEntry.vue'

describe('TwistEntry.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(TwistEntry, {
      propsData: { msg }
    })
    console.log(wrapper.text());
    expect(wrapper.text()).toMatch(msg)
  })
})
