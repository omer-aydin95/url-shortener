import {mount} from "@vue/test-utils";
import HistoryItem from "../../../src/components/HistoryItem.vue";
import ShortenedUrl from "../../../src/models/ShortenedUrl";
import AppEvents from "../../../src/constants/AppEvents";

describe("HistoryItem Component Tests", () => {
    const currentDate = new Date(Date.now());
    const shortenedUrl = new ShortenedUrl();
    shortenedUrl.setId("123");
    shortenedUrl.setRealUrl("http://asd.com");
    shortenedUrl.setShortenedUrl("https://pbid.io/abcd1234");
    shortenedUrl.setNumberOfVisit(0);
    shortenedUrl.setExpireDate(currentDate);
    shortenedUrl.setCreateDate(currentDate);
    
    const wrapper = mount(HistoryItem, {
        propsData: {
            shortenedUrl: shortenedUrl,
            index: 2
        }
    });

    test("Component has 'shortenedUrl' and 'index' props", () => {
        expect(wrapper.vm.$props.shortenedUrl).toBeTruthy();
        expect(wrapper.vm.$props.index).toBeTruthy();
    });

    test("Component has a button", () => {
        const btn = wrapper.find("button");

        expect(btn.exists()).toBe(true);
    });

    test("Component has 'dark-bg' class when 'index' props is even", () => {
        const parentDiv = wrapper.find("#history-item");

        expect(parentDiv.classes()).toContain("dark-bg");
    });

    test("Component does not have 'dark-bg' class when 'index' props is odd", async () => {
        await wrapper.setProps({
            index: 1
        });
        
        const parentDiv = wrapper.find("#history-item");

        expect(parentDiv.classes().indexOf("dark-bg")).toBe(-1);
    });

    test(`Component emits '${AppEvents.DELETE_HISTORY_ITEM}' event when button clicked`, async () => {
		const btn = wrapper.find("button");
		btn.trigger("click");

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().DELETE_HISTORY_ITEM).toBeTruthy();
		expect(wrapper.emitted().DELETE_HISTORY_ITEM?.length).toBe(1);
    });
    
    test("Component displays 'shortenedUrl' info", () => {
        const text = wrapper.text();

        expect(text).toContain(shortenedUrl.getRealUrl());
        expect(text).toContain(shortenedUrl.getShortenedUrl());
        expect(text).toContain(shortenedUrl.getExpireDate().toLocaleString());
    });
});
