import { shallowMount } from "@vue/test-utils";
import BaseInput from "@/components/BaseInput.vue";
import InvalidFeedback from "@/components/InvalidFeedback.vue";

describe("BaseInput.vue", () => {
  it("Failed isUnique shows message", () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: {
        label: "Name",
        validationModel: {}
      },
      components: { InvalidFeedback }
    });
    expect(wrapper.find("label").text()).toMatch("Name");
  });
});
