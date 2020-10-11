import VueRouter from 'vue-router'
import Vue from 'vue'
import {shallowMount, Wrapper} from "@vue/test-utils";
import App from "@/App.vue";

Vue.use(VueRouter);

describe("Test App.vue", () => {
  let component!:Wrapper<App>;

  beforeEach(() => {
    component = shallowMount(App);
  });

  it('The browser is not compatible', () => {
    component.setData({force: false});
    const target = component.findComponent({name: '#incompatible_browser_wrapper'});
    expect(target).toBeTruthy();
  });

  it('The access is forced and the client can access the app', () => {
    component.setData({force: true});
    const target = component.findComponent({name: '#app'});
    expect(target).toBeTruthy();
  });

  it('The browser is not compatible, and the client click on the force access button', () => {
    component.setData({force: false});
    const button = component.find('#force-btn');
    button.trigger('click');
    Vue.nextTick();
    const target = component.findComponent({name: '#app'});
    expect(target).toBeTruthy();
  });
});
