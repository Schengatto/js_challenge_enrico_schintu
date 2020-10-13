import VueRouter from "vue-router";
import Vue from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import { TestUtils } from "./test.utils";
import ShowcaseWrapper from "@/views/pages/ShowcaseWrapper.vue";

Vue.use(VueRouter);

describe("Test Showcase wrapper", () => {
  let component: Wrapper<ShowcaseWrapper>;
  let vm!: any;

  beforeEach(() => {
    component = mount(ShowcaseWrapper, {
      store: TestUtils.store
    });
    vm = component.vm as any;
  });

  it("Component rendered in page", async () => {
    const bagWrapper = component.find("#showcase_wrapper");
    expect(bagWrapper.isVisible()).toBeTruthy();
  });

  it("There aren't menu opened", async () => {
    const enableBodyOverflow = jest.spyOn(vm, "enableBodyOverflow");
    const disableBodyOverflow = jest.spyOn(vm, "disableBodyOverflow");
    await vm.currentPageChanged("NONE");
    vm.$nextTick(() => {
      expect(enableBodyOverflow).toBeCalledTimes(1);
      expect(disableBodyOverflow).toBeCalledTimes(0);
    });
  });

  it("One menu opened", async () => {
    const enableBodyOverflow = jest.spyOn(vm, "enableBodyOverflow");
    const disableBodyOverflow = jest.spyOn(vm, "disableBodyOverflow");
    await vm.currentPageChanged("USER");
    vm.$nextTick(() => {
      expect(enableBodyOverflow).toBeCalledTimes(0);
      expect(disableBodyOverflow).toBeCalledTimes(1);
    });
  });
});
