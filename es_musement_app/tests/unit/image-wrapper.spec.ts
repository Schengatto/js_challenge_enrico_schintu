import VueRouter from "vue-router";
import Vue from "vue";
import { mount, shallowMount, Wrapper } from "@vue/test-utils";
import ImageWrapper from "@/components/commons/ImageWrapper.vue";

Vue.use(VueRouter);

describe("Test PageWrapper Component", () => {
  let component!: Wrapper<ImageWrapper>;

  beforeEach(() => {
    component = shallowMount(ImageWrapper);
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
    const spyImageLoaded = jest.spyOn(
      (ImageWrapper.prototype.constructor as any).options.methods,
      "imageLoaded"
    );
    const cmp = mount(ImageWrapper, {
      propsData: {
        imageLoaded: spyImageLoaded
      }
    });
    cmp.setData({ startLoading: true });
    cmp.setData({ loaded: false });
    await Vue.nextTick();
    const img = cmp.find("img");
    expect(img.isVisible()).toBeTruthy();
    const vm: any = cmp.vm as any;
    vm.imageLoaded();
    expect(spyImageLoaded).toHaveBeenCalledTimes(1);
    await Vue.nextTick();
    expect(vm.loaded).toBeTruthy();
    const svg = cmp.find("svg");
    expect(svg.exists()).toBeFalsy();
  });

  it("The img element should use the input property", async () => {
    component.setProps({
      title: "test",
      width: "200px",
      height: "100px",
      src: "http://test.com/test.png",
      backgroundColor: "black"
    });
    component.setData({ startLoading: true });
    component.setData({ loaded: true });
    await Vue.nextTick();
    const container = component.findAll(".image-container").at(0);
    const img = component.find("img");
    expect(container.attributes("style")).toBe(
      "background-color: black; width: 200px; height: 100px;"
    );
    expect(img.attributes("alt")).toBe("test");
    expect(img.attributes("width")).toBe("200px");
    expect(img.attributes("height")).toBe("100px");
    expect(img.attributes("src")).toBe("http://test.com/test.png");
  });
});
