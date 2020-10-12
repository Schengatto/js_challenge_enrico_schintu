import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import EventItemCard from "@/components/showcase/elements/EventItemCard.vue";
import EventItem from "@/models/event.item";

Vue.use(VueRouter);

describe("Test Pagination Component", () => {
  let component!: Wrapper<EventItemCard>;
  const item: EventItem = {
    tickets: 1,
    title: "test",
    image: "myImg",
    finalPriceFormatted: "€ 10.00",
    originalPrice: 12,
    discounted: true,
    uuid: "12345",
    description: "desc-test",
    finalPrice: 10
  };

  it("The EventItemCard component is rendered in page", () => {
    component = shallowMount(EventItemCard, {
      propsData: { item },
      mocks: { $t: (msg: any) => msg }
    });
    const target = component.find(".product");
    expect(target.isVisible()).toBeTruthy();
  });

  it("Add to wishlist", async () => {
    const spyAddToWishList = jest.spyOn(
      (EventItemCard.prototype.constructor as any).options.methods,
      "addToWishlist"
    );
    component = shallowMount(EventItemCard, {
      propsData: { item },
      mocks: { $t: (msg: any) => msg }
    });
    const wishlistButton = component.find(".product__wishlist-button");
    expect(wishlistButton.isVisible()).toBeTruthy();
    wishlistButton.trigger("click");
    await Vue.nextTick();
    expect(spyAddToWishList).toHaveBeenCalledTimes(1);
  });

  it("Add to cart", async () => {
    const spyAddToCart = jest.spyOn(
      (EventItemCard.prototype.constructor as any).options.methods,
      "addToCart"
    );
    component = shallowMount(EventItemCard, {
      propsData: { item },
      mocks: { $t: (msg: any) => msg }
    });
    const cartBtn = component.find(".cart-btn");
    expect(cartBtn.isVisible()).toBeTruthy();
    cartBtn.trigger("click");
    await Vue.nextTick();
    expect(spyAddToCart).toHaveBeenCalledTimes(1);
  });

  it("Add to cart btn behaviour", async () => {
    const spyShowCartLabel = jest.spyOn(
      (EventItemCard.prototype.constructor as any).options.methods,
      "showCartLabel"
    );
    const spyHideCartLabel = jest.spyOn(
      (EventItemCard.prototype.constructor as any).options.methods,
      "hideCartLabel"
    );
    component = shallowMount(EventItemCard, {
      propsData: {
        item,
        showCartLabel: spyShowCartLabel,
        hideCartLabel: spyHideCartLabel
      },
      mocks: { $t: (msg: any) => msg }
    });
    await Vue.nextTick();
    const cartBtn = component.find(".cart-btn");
    cartBtn.trigger("mouseenter");
    component.vm.$nextTick(() => {
      expect(component.find(".add-to-cart-label").isVisible());
      expect(spyShowCartLabel).toHaveBeenCalledTimes(1);
      cartBtn.trigger("mouseleave");
      component.vm.$nextTick(() => {
        expect(component.find(".add-to-cart-label").exists()).toBeFalsy();
        expect(spyHideCartLabel).toHaveBeenCalledTimes(1);
      });
    });
  });

  it("Get imageSrc", async () => {
    component = shallowMount(EventItemCard, {
      propsData: { item },
      mocks: { $t: (msg: any) => msg }
    });
    const vm: any = component.vm as any;
    expect(vm.imageSrc.startsWith("myImg")).toBeTruthy();
    component.setProps({ item: { ...item, image: null } });
    await Vue.nextTick();
    expect(vm.imageSrc).toBe("");
  });
});
