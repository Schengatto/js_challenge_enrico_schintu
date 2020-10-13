import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";
import { TestUtils } from "./test.utils";
import AppDataStore from "@/store/app-data/app-data-store";
import UserMenu from "@/components/user-menu/UserMenu.vue";

Vue.use(VueRouter);

describe("Test User Menu Component", () => {
  const store = TestUtils.store;
  const appDataStoreService = () => {
    return getModule(AppDataStore, store);
  };

  let component: Wrapper<UserMenu>;
  let vm!: any;

  beforeEach(async () => {
    component = shallowMount(UserMenu, {
      mocks: {
        $t: (key: any) => key
      },
      store
    });
    vm = component.vm as any;
  });

  it("User Menu is rendered in page", async () => {
    const bagWrapper = component.find("#user_menu_wrapper");
    expect(bagWrapper.isVisible()).toBeTruthy();
  });

  it("Click on User menu icon", async () => {
    const toggleMenu = jest.spyOn(vm, "toggleMenu");
    const menuBtn = component.find("#user_menu_header_btn");
    menuBtn.trigger("click");
    await appDataStoreService().changeActiveMenu("USER");
    component.vm.$nextTick(() => {
      expect(toggleMenu).toBeCalledTimes(1);
      expect(component.find(".menu-container").isVisible()).toBeTruthy();
    });
  });

  it("Change language", async () => {
    const setLanguage = jest.spyOn(vm, "setLanguage");
    const menuBtn = component.find("#user_menu_header_btn");
    menuBtn.trigger("click");
    await appDataStoreService().changeActiveMenu("USER");
    const langBtn = component.find(".language-btn");
    expect(langBtn.isVisible()).toBeTruthy();
    await langBtn.trigger("click");
    expect(setLanguage).toBeCalledTimes(1);
  });

  it("Change currency", async () => {
    const setCurrency = jest.spyOn(vm, "setCurrency");
    const menuBtn = component.find("#user_menu_header_btn");
    menuBtn.trigger("click");
    await appDataStoreService().changeActiveMenu("USER");
    const langBtn = component.find(".currency-btn");
    expect(langBtn.isVisible()).toBeTruthy();
    await langBtn.trigger("click");
    expect(setCurrency).toBeCalledTimes(1);
  });

  it("Change showcase view type", async () => {
    const changeDashboardView = jest.spyOn(vm, "changeDashboardView");
    const menuBtn = component.find("#user_menu_header_btn");
    menuBtn.trigger("click");
    await appDataStoreService().changeActiveMenu("USER");
    const langBtn = component.find("#paginated_view_btn");
    expect(langBtn.isVisible()).toBeTruthy();
    await langBtn.trigger("click");
    expect(changeDashboardView).toBeCalledTimes(1);
  });
});
