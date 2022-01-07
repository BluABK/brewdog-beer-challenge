import { shallowMount, mount } from '@vue/test-utils'
import BeerDetails from '@/components/BeerDetails.vue'
import sourceBeers from '../resources/beers.json'

describe('BeerDetails.vue', () => {
    it('Renders BeerInfo element.', () => {
        const selectedBeer = sourceBeers[0];
        const wrapper = shallowMount(BeerDetails, {
            propsData: {
                initBeer: selectedBeer
            }
        });

        const sourceAttr = {
            name: selectedBeer.name,
            tagline: selectedBeer.tagline,
            abv: selectedBeer.abv,
            description: selectedBeer.description,
        }

        const renderedAttr = wrapper.find('beerinfo-stub').attributes();
        const renderedAttrToMatch = {
            name: renderedAttr.name,
            tagline: renderedAttr.tagline,
            abv: parseFloat(renderedAttr.abv),
            description: renderedAttr.description,
        }

        // Assert the attrs are equal.
        expect(renderedAttrToMatch).toEqual(sourceAttr);
    })

    describe('Renders ingredients', () => {
        it('Renders hops', () => {
            const selectedBeer = sourceBeers[0];
            const wrapper = mount(BeerDetails, {
                propsData: {
                    initBeer: selectedBeer
                }
            });

            const renderedHopsWrappers = wrapper.find('.ingredients-content').find('.hops-container').findAll('.state-entry-element').wrappers;
            const sourceHops = selectedBeer.ingredients.hops;
            const sourceHopDescriptions = sourceHops.map(hop => `${hop.amount.value} ${hop.amount.unit} ${hop.name} (${hop.attribute}).`)
            const renderedHopDescriptions = renderedHopsWrappers.map(stateEntry => stateEntry.vm.description);

            // Assert hop entry computed descriptions are equal.
            expect(renderedHopDescriptions).toEqual(sourceHopDescriptions)
        })

        it('Renders malts', () => {
            const selectedBeer = sourceBeers[0];
            const wrapper = mount(BeerDetails, {
                propsData: {
                    initBeer: selectedBeer
                }
            });

            const renderedMaltsWrappers = wrapper.find('.ingredients-content').find('.malts-container').findAll('.state-entry-element').wrappers;
            const sourceMalts = selectedBeer.ingredients.malt;
            const sourceMaltDescriptions = sourceMalts.map(malt => `${malt.amount.value} ${malt.amount.unit} ${malt.name}.`)
            const renderedMaltDescriptions = renderedMaltsWrappers.map(stateEntry => stateEntry.vm.description);

            // Assert malt entry computed descriptions are equal.
            expect(renderedMaltDescriptions).toEqual(sourceMaltDescriptions)
        })

    })

    describe('Renders methods', () => {
        it('mash temperatures', () => {
            const selectedBeer = JSON.parse(JSON.stringify(sourceBeers[2]));
            const wrapper = mount(BeerDetails, {
                propsData: {
                    initBeer: selectedBeer
                }
            });

            const entries = wrapper.find('.ingredients-content').find('.methods').find('.method-mashtemps-container').findAll('.mashtemp-content');

            let allEntriesPresent = true;
            for (let entry of entries.wrappers) {
                if (!entry.find('.countdown-entry').exists()) allEntriesPresent = false;
                if (!entry.find('button').exists()) allEntriesPresent = false;
                if (!entry.find('.description').exists()) allEntriesPresent = false;
            }

            // Assert all entries are present and of correct amount.
            expect(allEntriesPresent && entries.length === selectedBeer.method.mash_temp.length).toEqual(true);
        })

        it('fermentation', () => {
            const selectedBeer = JSON.parse(JSON.stringify(sourceBeers[2]));
            const wrapper = mount(BeerDetails, {
                propsData: {
                    initBeer: selectedBeer
                }
            });

            const entry = wrapper.find('.ingredients-content').find('.methods').find('.methods-fermentation').find('.state-entry-element');
            const button = entry.find('button')
            const description = entry.find('.description')

            expect(button.exists() && description.exists()).toEqual(true)
        })

        it('twist', () => {
            const selectedBeer = JSON.parse(JSON.stringify(sourceBeers[2]));
            const wrapper = mount(BeerDetails, {
                propsData: {
                    initBeer: selectedBeer
                }
            });

            const entry = wrapper.find('.ingredients-content').find('.methods').find('.methods-twist').find('.state-entry-element');
            const button = entry.find('button')
            const description = entry.find('.description')

            expect(button.exists() && description.exists()).toEqual(true)
        })
    })
})