import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Pagination from "@/components/commons/Pagination.vue";

Vue.use(VueRouter);

describe("Test Pagination Component", () => {
  let component!: Wrapper<Pagination>;
  let vm!: any;

  beforeEach(() => {
    component = shallowMount(Pagination, {
      propsData: {
        currentPage: 1,
        hasNext: true
      }
    });
    vm = component.vm as any;
  });

  it("The Pagination component is rendered in page", () => {
    const target = component.find(".pagination");
    expect(target.isVisible()).toBeTruthy();
  });

  it("The page active is the one provided in input", async () => {
    await Vue.nextTick();
    const target = component.find(".active");
    expect(target.isVisible()).toBeTruthy();
    expect(target.html().includes("2")).toBeTruthy();
  });

  it("When the user click the next page link", async () => {
    const spyNextPage = jest.spyOn(vm, "nextPage");
    await Vue.nextTick();
    const target = component.find("#next_page_link");
    expect(target.isVisible()).toBeTruthy();
    target.trigger("click");
    expect(spyNextPage).toHaveBeenCalled();
    spyNextPage.mockReset();
  });

  it("When the user click the previous page link", async () => {
    const spyPreviousPage = jest.spyOn(vm, "previousPage");
    const loadPage = jest.spyOn(vm, "loadPage");
    component.setProps({ currentPage: 1 });
    await Vue.nextTick();
    const target = component.find("#previous_page_link");
    expect(target.isVisible()).toBeTruthy();
    target.trigger("click");
    expect(spyPreviousPage).toHaveBeenCalled();
    expect(loadPage).toHaveBeenCalled();
    component.setProps({ currentPage: 0 });
    await Vue.nextTick();
    loadPage.mockReset();
    spyPreviousPage.mockReset();
    await target.trigger("click");
    expect(loadPage).not.toHaveBeenCalled();
  });

  it("Ask to load again the current page", async () => {
    const loadPage = jest.spyOn(vm, "loadPage");
    component.setProps({ currentPage: 1 });
    vm.loadPage(1);
    await Vue.nextTick();
    expect(component.emitted("changePage")).toBeFalsy();
    loadPage.mockReset();
  });

  it("Current Page changed", async () => {
    const currentPageChanged = jest.spyOn(vm, "currentPageChanged");
    const initPagesRange = jest.spyOn(vm, "initPagesRange");
    vm.currentPageChanged(3);
    await Vue.nextTick();
    expect(currentPageChanged).toHaveBeenCalled();
    expect(initPagesRange).toHaveBeenNthCalledWith(1, 2);
    initPagesRange.mockReset();
    vm.currentPageChanged(0);
    await Vue.nextTick();
    expect(initPagesRange).toHaveBeenNthCalledWith(1, 0);
    initPagesRange.mockReset();
    component.setProps({ hasNextPage: false });
    vm.currentPageChanged(4);
    await Vue.nextTick();
    expect(initPagesRange).toHaveBeenNthCalledWith(1, 3);
  });
});
