import VueRouter from 'vue-router'
import Vue from 'vue'
import {shallowMount, Wrapper} from "@vue/test-utils";
import ImageWrapper from "@/components/commons/ImageWrapper.vue";

Vue.use(VueRouter);

describe("Test PageWrapper Component", () => {
  let component!: Wrapper<ImageWrapper>;

  beforeEach(() => {
    component = shallowMount(ImageWrapper);
  });

  it('Image not loaded', async () => {
    component.setData({startLoading: false});
    component.setData({loaded: false});
    await Vue.nextTick();
    const img = component.find('img');
    const svg = component.find('svg');
    expect(img.exists()).toBeFalsy();
    expect(svg.exists()).toBeTruthy();
  });

  it('While image is loading', async () => {
    component.setData({startLoading: true});
    component.setData({loaded: false});
    await Vue.nextTick();
    const img = component.find('img');
    const svg = component.find('svg');
    expect(img.isVisible()).toBeTruthy();
    expect(svg.isVisible()).toBeTruthy();
  });

  it('Image loaded', async () => {
    component.setData({startLoading: true});
    component.setData({loaded: true});
    await Vue.nextTick();
    const img = component.find('img');
    const svg = component.find('svg');
    await Vue.nextTick();
    expect(img.isVisible()).toBeTruthy();
    expect(svg.exists()).toBeFalsy();
  });

  it('The img element should use the input property',
    async () => {
      component.setProps({
        title: 'test',
        width: '200px',
        height: '100px',
        src: 'http://test.com/test.png',
        backgroundColor: 'black'
      });
      component.setData({startLoading: true});
      component.setData({loaded: true});
      await Vue.nextTick();
      const container = component.findAll('.image-container').at(0);
      const img = component.find('img');
      expect(container.attributes('style')).toBe('background-color: black; width: 200px; height: 100px;');
      expect(img.attributes('alt')).toBe('test');
      expect(img.attributes('width')).toBe('200px');
      expect(img.attributes('height')).toBe('100px');
      expect(img.attributes('src')).toBe('http://test.com/test.png');
    });
});
