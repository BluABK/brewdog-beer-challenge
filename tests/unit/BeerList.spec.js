import { shallowMount, mount } from '@vue/test-utils'
import BeerList from '@/components/BeerList.vue'
import sourceBeers from '../resources/beers.json'

describe('BeerList.vue', () => {
    it('Renders list of beer elements.', () => {
        const wrapper = shallowMount(BeerList, {
            data() {
                return {
                    beers: sourceBeers
                }
            }
        });

        expect(wrapper.find('.beer-list').exists()).toBeTruthy();
    })

    it('Rendered list contains beer elements.', () => {
        const wrapper = mount(BeerList, {
            data() {
                return {
                    beers: sourceBeers
                }
            }
        });

        const beerListWrapper = wrapper.find('.beer-list');
        const beerItemWrapperArray = beerListWrapper.findAll('.beer-item');
        const beerNames = beerItemWrapperArray.wrappers.map(beerWrapper => beerWrapper.find('.beer-item-name').text())

        // Assert that the rendered beer items are the same as the source beer JSON.
        expect(beerNames).toEqual(sourceBeers.map(beer => beer.name));
    })

    it('Clicking a beer in the list emits a copy of the selected beer', async () => {
        // const testInitState = 'TESTING';
        const wrapper = mount(BeerList, {
            data() {
                return {
                    beers: [sourceBeers[0]]
                }
            }
        })

        const beerItemWrapper = wrapper.find('.beer-list').find('.beer-item');

        // Click the beer element.
        await beerItemWrapper.trigger('click')

        // Wait until $emits have been handled
        await wrapper.vm.$nextTick();

        // Assert event payload
        expect(wrapper.emitted('selectBeer')[0]).toEqual([sourceBeers[0]]);
    })
})