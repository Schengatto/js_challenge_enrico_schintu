import VueRouter from "vue-router";
import Vue from "vue";
import Vuex from "vuex";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Dashboard from "@/views/pages/Dashboard.vue";
import EventItem from "@/models/event.item";
import dashboardStore from "@/store/dashboard/dashboard-store";
import userStore from "@/store/user/user-store";
import { getModule } from "vuex-module-decorators";

Vue.use(VueRouter);
/**
 * Factory function returns a new store instance
 */
const factory = () => {
  const store = new Vuex.Store({
    modules: {
      dashboardStore: dashboardStore
    }
  });
  return getModule(dashboardStore, store);
};

describe("Test Pagination Component", () => {
  let component!: Wrapper<Dashboard>;
  const items: EventItem[] = [
    {
      tickets: 1,
      title: "test",
      image: "myImg",
      finalPriceFormatted: "€ 10.00",
      originalPrice: 12,
      discounted: true,
      uuid: "12345",
      description: "desc-test",
      finalPrice: 10
    }
  ];
  const mockedDashboardStore = {
    pageItems: items,
    currentPage: 0,
    dashboardViewType: "paginated",
    moveToPage: (n: number) => console.log("moving to page", n),
    updateDashboardView: (s: string) => console.log(s)
  };

  const mockedUserStore = {
    currency: "EUR",
    language: "en"
  };

  beforeEach(() => {
    component = shallowMount(Dashboard, {
      propsData: {
        dashboardStore: mockedDashboardStore,
        userStore: mockedUserStore
      }
    });
  });

  it("The Dashboard component is rendered in page", async () => {
    const component = shallowMount(Dashboard, {
      propsData: {
        dashboardStore: mockedDashboardStore,
        userStore: mockedUserStore
      }
    });
    const target = component.find(".container");
    component.setProps({ dashboardStore: mockedDashboardStore });
    const vm: any = component.vm as any;
    expect(vm.items.length).toBe(0);
    // expect(target.isVisible()).toBeTruthy();
  });
});
