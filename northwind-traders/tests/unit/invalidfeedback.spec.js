import { shallowMount } from "@vue/test-utils";
import InvalidFeedback from "@/components/InvalidFeedback.vue";

describe("InvalidFeedback.vue", () => {
  it("Failed isUnique shows message", () => {
    const wrapper = shallowMount(InvalidFeedback, {
      propsData: {
        model: {
          isUnique: false
        }
      }
    });
    expect(wrapper.text()).toMatch("already exists");
  });
  it("Failed MinValue shows message", () => {
    const wrapper = shallowMount(InvalidFeedback, {
      propsData: {
        field: "Name",
        model: {
          minValue: false,
          $params: { minValue: { min: 10 } }
        }
      }
    });
    expect(wrapper.text()).toMatch("Name must be equal or greater than 10.");
  });
});
