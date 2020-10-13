import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";
import ShowcaseStore from "@/store/showcase/showcase-store";
import Showcase from "@/components/showcase/Showcase.vue";
import { TestUtils } from "./test.utils";

Vue.use(VueRouter);

let component: Wrapper<Showcase>;

const factory = () => {
  return getModule(ShowcaseStore, TestUtils.store);
};

const showcaseStore = TestUtils.store;

describe("Test Showcase Component", () => {
  beforeEach(() => {
    const test = factory();
    test.CLEAR();
    test.ADD_PAGE_ITEMS(TestUtils.generateEventItems(6));
    component = shallowMount(Showcase, {
      store: showcaseStore
    });
  });

  it("Pagination view. The Dashboard component is rendered in page. The events are rendered in the page as well.", async () => {
    const paginationWrapper = component.find(".pagination_wrapper");
    const vm: any = component.vm as any;
    expect(vm.items.length).toBe(6);
    expect(paginationWrapper.isVisible()).toBeTruthy();
    expect(vm.currentPage).toBe(0);
    expect(vm.paginatorActive).toBeTruthy();
    const eventItems = component.findAll(".product-list__item");
    expect(eventItems.length).toBe(6);
    vm.loadPage(2);
    await Vue.nextTick();
  });

  it("Scrollable view. The Dashboard component is rendered in page. The events are rendered in the page as well.", async () => {
    await factory().CHANGE_DASHBOARD_VIEW("scroll");
    const component: Wrapper<Showcase> = shallowMount(Showcase, { store: showcaseStore });
    const scrollWrapper = component.find(".scroll_wrapper");
    const vm: any = component.vm as any;
    await Vue.nextTick();
    expect(vm.items.length).toBe(6);
    expect(scrollWrapper.isVisible()).toBeTruthy();
    expect(vm.currentPage).toBe(0);
    expect(vm.paginatorActive).toBeFalsy();
  });

  it("Scrollable view behavior", async () => {
    const spyUpdateItemsScrollView = jest.spyOn(
      (Showcase.prototype.constructor as any).options.methods,
      "updateItemsScrollView"
    );
    const handleNewScrollListItems = jest.spyOn(
      (Showcase.prototype.constructor as any).options.methods,
      "handleNewScrollListItems"
    );
    await factory().CHANGE_DASHBOARD_VIEW("scroll");
    const component: Wrapper<Showcase> = shallowMount(Showcase, { store: showcaseStore });
    const vm: any = component.vm as any;
    const mockState = {
      loaded: () => console.log("loaded"),
      complete: () => console.log("complete")
    };
    const spyLoaded = jest.spyOn(mockState, "loaded");
    const spyCompleted = jest.spyOn(mockState, "complete");
    vm.infiniteHandler(mockState);
    await Vue.nextTick();
    expect(vm.currentPage).toBe(0);
    expect(spyUpdateItemsScrollView).toBeCalledTimes(1);
    expect(spyUpdateItemsScrollView).toBeCalledWith(6, 6, mockState);
    vm.handleNewScrollListItems(TestUtils.generateMusementItems(3), mockState);
    expect(handleNewScrollListItems).toBeCalledTimes(1);
    expect(spyLoaded).toBeCalledTimes(1);
    vm.handleNewScrollListItems([], mockState);
    expect(handleNewScrollListItems).toBeCalledTimes(2);
    expect(spyCompleted).toBeCalledTimes(1);
  });
});
