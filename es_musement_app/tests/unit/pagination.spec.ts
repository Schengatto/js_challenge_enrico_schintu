import VueRouter from "vue-router";
import Vue from "vue";
import { mount, shallowMount, Wrapper } from "@vue/test-utils";
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
    const spyPreviousPage = jest.spyOn(
      (Pagination.prototype.constructor as any).options.methods,
      "previousPage"
    );
    const cmp = mount(Pagination, {
      propsData: {
        nextPage: spyPreviousPage
      }
    });
    cmp.setProps({ currentPage: 1 });
    await Vue.nextTick();
    const target = cmp.find("#previous_page_link");
    expect(target.isVisible()).toBeTruthy();
    target.trigger("click");
    expect(spyPreviousPage).toHaveBeenCalled();
    spyPreviousPage.mockReset();
  });
});
