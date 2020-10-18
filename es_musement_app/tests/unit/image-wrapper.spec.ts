import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount, Wrapper } from "@vue/test-utils";
import ImageWrapper from "@/components/commons/ImageWrapper.vue";

Vue.use(VueRouter);

describe("Test ImageWrapper Component", () => {
  let component!: Wrapper<ImageWrapper>;
  let vm!: any;

  beforeEach(() => {
    component = shallowMount(ImageWrapper, {
      propsData: {
        width: 200,
        height: 100,
        src: "test"
      }
    });
    vm = component.vm as any;
  });

  it("Component rendered in page", async () => {
    const img = component.find("img");
    const svg = component.find("svg");
    expect(img.exists()).toBeFalsy();
    expect(svg.exists()).toBeTruthy();
  });

  it("Image not loaded", async () => {
    component.setData({ startLoading: false });
    component.setData({ loaded: false });
    await Vue.nextTick();
    const img = component.find("img");
    const svg = component.find("svg");
    expect(img.exists()).toBeFalsy();
    expect(svg.exists()).toBeTruthy();
  });

  it("While image is loading", async () => {
    component.setData({ startLoading: true });
    component.setData({ loaded: false });
    await Vue.nextTick();
    const img = component.find("img");
    const svg = component.find("svg");
    expect(img.isVisible()).toBeTruthy();
    expect(svg.isVisible()).toBeTruthy();
  });

  it("Image loaded", async () => {
    component.setProps({ detectNetworkSpeed: true });
    const spyImageLoaded = jest.spyOn(vm, "imageLoaded");
    component.setData({ startLoading: true });
    component.setData({ loaded: false });
    await Vue.nextTick();
    const img = component.find("img");
    expect(img.isVisible()).toBeTruthy();

    jest.useFakeTimers();
    setTimeout(async () => {
      vm.imageLoaded();
      expect(spyImageLoaded).toHaveBeenCalledTimes(1);
      await Vue.nextTick();
      expect(vm.loaded).toBeTruthy();
      const svg = component.find("svg");
      expect(svg.exists()).toBeFalsy();
    });
    jest.advanceTimersByTime(100);
  });

  it("Image loaded with Check Network: Fast Network", async () => {
    component.setProps({ detectNetworkSpeed: true });
    const checkNetworkSpeed = jest.spyOn(vm, "checkNetworkSpeed");
    vm.checkNetworkSpeed(100);
    await Vue.nextTick();
    expect(checkNetworkSpeed).toHaveBeenCalledTimes(1);
    expect(component.emitted().fastNetwork).toBeTruthy();
  });

  it("Image loaded with Check Network: Slow Network", async () => {
    component.setProps({ detectNetworkSpeed: true });
    component.setData({ loadStartAt: new Date().getTime() });
    const checkNetworkSpeed = jest.spyOn(vm, "checkNetworkSpeed");
    vm.checkNetworkSpeed(2600);
    await vm.$nextTick();
    expect(checkNetworkSpeed).toHaveBeenCalledTimes(1);
    expect(component.emitted("slowNetwork")).toBeTruthy();
  });

  it("Image loaded with Check Network: Good Network", async () => {
    component.setProps({ detectNetworkSpeed: true });
    const checkNetworkSpeed = jest.spyOn(vm, "checkNetworkSpeed");
    vm.checkNetworkSpeed(1000);
    await vm.$nextTick();
    expect(checkNetworkSpeed).toHaveBeenCalledTimes(1);
    expect(component.emitted("goodNetwork")).toBeTruthy();
  });

  it("Musement-image: The img element should use the input property", async () => {
    component.setProps({
      title: "test",
      width: 200,
      height: 100,
      src: "http://test.com/test.png",
      backgroundColor: "black",
      srcWidth: 100,
      srcHeight: 50,
      quality: 60
    });
    component.setData({ startLoading: true });
    component.setData({ loaded: true });
    await Vue.nextTick();
    const container = component.findAll(".image-container").at(0);
    const img = component.find("img");
    expect(container.attributes("style")).toBe(
      "width: 200px; height: 100px; background-color: black;"
    );
    expect(img.attributes("alt")).toBe("test");
    expect(img.attributes("width")).toBe("200px");
    expect(img.attributes("height")).toBe("100");
    expect(img.attributes("src")).toContain("http://test.com/test.png");
    expect(img.attributes("src")).toContain("&q=60");
    expect(img.attributes("src")).toContain("&h=50");
    expect(img.attributes("src")).toContain("&w=100");
  });

  it("No-Musement-image: The img element should use the input property", async () => {
    component.setProps({
      title: "test",
      width: "200",
      height: "100",
      src: "http://test.com/test.png",
      backgroundColor: "black",
      musementImage: false
    });
    component.setData({ startLoading: true });
    component.setData({ loaded: true });
    await Vue.nextTick();
    const container = component.findAll(".image-container").at(0);
    const img = component.find("img");
    expect(container.attributes("style")).toBe(
      "width: 200px; height: 100px; background-color: black;"
    );
    expect(img.attributes("alt")).toBe("test");
    expect(img.attributes("width")).toBe("200px");
    expect(img.attributes("height")).toBe("100");
    expect(img.attributes("src")).toBe("http://test.com/test.png");
  });
});
