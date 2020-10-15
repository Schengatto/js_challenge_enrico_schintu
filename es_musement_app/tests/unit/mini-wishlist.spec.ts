import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";
import { TestUtils } from "./test.utils";
import AppDataStore from "@/store/app-data/app-data-store";
import WishlistStore from "@/store/wishlist/wishlist-store";
import MiniWishlist from "@/components/mini-wishlist/MiniWishlist.vue";

Vue.use(VueRouter);

describe("Test Mini wishlist Component", () => {
  const store = TestUtils.store;
  const wishListStoreService = () => {
    return getModule(WishlistStore, store);
  };
  const appDataStoreService = () => {
    return getModule(AppDataStore, store);
  };

  let component: Wrapper<MiniWishlist>;
  let vm!: any;

  beforeEach(async () => {
    await wishListStoreService().WISHLIST_CLEAR();
    component = shallowMount(MiniWishlist, {
      mocks: {
        $t: (key: any) => key
      },
      store
    });
    vm = component.vm as any;
  });

  it("Mini Wishlist is rendered in page", async () => {
    const bagWrapper = component.find("#mini_wishlist_wrapper");
    expect(bagWrapper.isVisible()).toBeTruthy();
  });

  it("Click on Mini Wishlist menu", async () => {
    const toggleMenu = jest.spyOn(vm, "toggleMenu");
    const menuBtn = component.find(".wishlist-icon");
    menuBtn.trigger("click");
    await appDataStoreService().changeActiveMenu("WISHLIST");
    component.vm.$nextTick(() => {
      expect(toggleMenu).toBeCalledTimes(1);
      expect(component.find(".menu-container").isVisible()).toBeTruthy();
    });
  });

  it("Wishlist with 2 items", async () => {
    wishListStoreService().wishlistStore.items = TestUtils.generateEventItems(2);
    await Vue.nextTick();
    expect(vm.numberOfItems).toBe(2);
    expect(vm.wishListItems.length).toBe(2);
    const priceOnHeader = component.find(".item__counter");
    expect(priceOnHeader.isVisible()).toBeTruthy();
    expect(priceOnHeader.html().includes("2")).toBeTruthy();
    expect(component.find(".list-container").isVisible()).toBeTruthy();
    const menuBtn = component.find(".wishlist-icon");
    menuBtn.trigger("click");
    await appDataStoreService().changeActiveMenu("WISHLIST");
    vm.$forceUpdate();
    expect(component.findAll(".menu-event-item").length).toBe(2);
  });

  it("Cart with 1 items, remove 1 item", async () => {
    const spyRemoveItem = jest.spyOn(vm, "removeItem");
    wishListStoreService().wishlistStore.items = TestUtils.generateEventItems(1);
    await appDataStoreService().changeActiveMenu("WISHLIST");
    await Vue.nextTick();
    expect(vm.wishListItems.length).toBe(1);
    const menuBtn = component.find(".wishlist-icon");
    menuBtn.trigger("click");
    vm.$forceUpdate();
    expect(component.findAll(".menu-event-item").length).toBe(1);
    const removeBtn = component.find(".item-remove-icon");
    expect(removeBtn.isVisible()).toBeTruthy();
    await removeBtn.trigger("click");
    expect(spyRemoveItem).toBeCalled();
  });

  it("Cart with 2 items, remove all", async () => {
    const clearWishList = jest.spyOn(vm, "clearWishList");
    wishListStoreService().wishlistStore.items = TestUtils.generateEventItems(2);
    await appDataStoreService().changeActiveMenu("WISHLIST");
    await Vue.nextTick();
    expect(vm.wishListItems.length).toBe(2);
    // remove all btn
    const buyBtn = component.find(".menu-footer-btn");
    expect(buyBtn.isVisible()).toBeTruthy();
    await buyBtn.trigger("click");
    expect(clearWishList).toBeCalledTimes(1);
  });

  it("Test Prevent scroll", async () => {
    const preventMouseWheelPropagation = jest.spyOn(vm, "preventMouseWheelPropagation");
    await appDataStoreService().changeActiveMenu("WISHLIST");
    await Vue.nextTick();
    // scroll action over the menu
    const buyBtn = component.find(".menu-container");
    expect(buyBtn.isVisible()).toBeTruthy();
    await buyBtn.trigger("wheel");
    await Vue.nextTick();
    expect(preventMouseWheelPropagation).toBeCalledTimes(1);
  });
});
