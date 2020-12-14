import { shallowMount } from "@vue/test-utils"
import Counter from '@/components/Counter.vue'

describe("Counter.vue", () => {
    let wrapper;

    // this will before every test case
    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });

    it("initial value is zero", () => {
        expect(wrapper.vm.counter).toBe(0);
    });

    it("increase when click", () => {
        wrapper.find('button').trigger('click');
        expect(wrapper.vm.counter).toBe(1);
        // expect(wrapper.find('button').classes('positive')).toBeTruthy();
    });

    it("increase when click, decrease when right-click", () => {
        wrapper.find('button').trigger('contextmenu');
        expect(wrapper.vm.counter).toBe(-1);
        // expect(wrapper.find('button').classes('negative')).toBeTruthy();
    });
});