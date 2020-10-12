import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";
import MiniBag from "@/components/min-bag/MiniBag.vue";
import CartStore from "@/store/cart/cart-store";
import { TestUtils } from "./test.utils";
import AppDataStore from "@/store/app-data/app-data-store";
import UserStore from "@/store/user/user-store";

Vue.use(VueRouter);

const store = TestUtils.store;
const cartStoreService = () => {
  return getModule(CartStore, store);
};
const userStoreService = () => {
  return getModule(UserStore, store);
};
const appDataStoreService = () => {
  return getModule(AppDataStore, store);
};
let component: Wrapper<MiniBag>;
let vm!: any;

describe("Test Pagination Component", () => {
  beforeEach(async () => {
    await cartStoreService().CART_CLEAR();
    component = shallowMount(MiniBag, {
      mocks: {
        $t: (key: any) => key
      },
      store
    });
    vm = component.vm as any;
  });

  it("Mini Bag is rendered in page", async () => {
    const bagWrapper = component.find("#mini_bag_wrapper");
    expect(bagWrapper.isVisible()).toBeTruthy();
  });

  it("Click on Mini Bag menu", async () => {
    const toggleMenu = jest.spyOn(vm, "toggleMenu");
    const bagWrapper = component.find(".mini-bag-header-wrapper");
    bagWrapper.trigger("click");
    await appDataStoreService().changeActiveMenu("CART");
    component.vm.$nextTick(() => {
      expect(toggleMenu).toBeCalledTimes(1);
      expect(component.find(".menu-container").isVisible()).toBeTruthy();
    });
  });

  it("Cart with 2 items", async () => {
    cartStoreService().cartStore.totalPrice = 20;
    cartStoreService().cartStore.items = TestUtils.generateEventItems(2);
    await Vue.nextTick();
    expect(vm.cartTotalAmount).toBe(20);
    expect(vm.numberOfItems).toBe(2);
    expect(vm.items.length).toBe(2);
    const priceOnHeader = component.find(".header-bag__price");
    expect(priceOnHeader.isVisible()).toBeTruthy();
    expect(priceOnHeader.html().includes("20")).toBeTruthy();
    expect(component.find(".list-container").isVisible()).toBeTruthy();
    const bagWrapper = component.find(".mini-bag-header-wrapper");
    bagWrapper.trigger("click");
    await appDataStoreService().changeActiveMenu("CART");
    vm.$forceUpdate();
    expect(component.findAll(".bag-item").length).toBe(2);
  });

  it("Cart with 1 items, remove 1 item", async () => {
    const spyRemoveItem = jest.spyOn(vm, "removeItem");
    cartStoreService().cartStore.items = TestUtils.generateEventItems(1);
    await appDataStoreService().changeActiveMenu("CART");
    await Vue.nextTick();
    expect(vm.items.length).toBe(1);
    const bagWrapper = component.find(".mini-bag-header-wrapper");
    bagWrapper.trigger("click");
    vm.$forceUpdate();
    expect(component.findAll(".bag-item").length).toBe(1);
    const removeBtn = component.find(".item-remove-icon");
    expect(removeBtn.isVisible()).toBeTruthy();
    await removeBtn.trigger("click");
    expect(spyRemoveItem).toBeCalled();
  });
});
