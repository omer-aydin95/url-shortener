import {mount} from "@vue/test-utils";
import History from "../../../src/components/History.vue";
import HistoryItem from "../../../src/components/HistoryItem.vue";
import ShortenedUrl from "../../../src/models/ShortenedUrl";
import AppEvents from "../../../src/constants/AppEvents";

describe("History Component Tests", () => {
    const currentDate = new Date(Date.now());
    const shortenedUrl1 = new ShortenedUrl();
    shortenedUrl1.setId("123");
    shortenedUrl1.setRealUrl("http://asd.com");
    shortenedUrl1.setShortenedUrl("https://pbid.io/abcd1234");
    shortenedUrl1.setNumberOfVisit(0);
    shortenedUrl1.setExpireDate(currentDate);
    shortenedUrl1.setCreateDate(currentDate);
    const shortenedUrl2 = new ShortenedUrl();
    shortenedUrl2.setId("321");
    shortenedUrl2.setRealUrl("http://qwe.com");
    shortenedUrl2.setShortenedUrl("https://pbid.io/1234abcd");
    shortenedUrl2.setNumberOfVisit(0);
    shortenedUrl2.setExpireDate(currentDate);
    shortenedUrl2.setCreateDate(currentDate);

    const wrapper = mount(History, {
        propsData: {
            shortenedUrls: [shortenedUrl1, shortenedUrl2]
        }
    });

    test("Component has 2 children 'HistoryItem' component", () => {
        const historyItems = wrapper.findAllComponents(HistoryItem);

        expect(historyItems.length).toBe(2);
    });

    test("Component has 3 children 'HistoryItem' component when add 1 more", async () => {
        const shortenedUrl3 = new ShortenedUrl();
        shortenedUrl3.setId("231");
        shortenedUrl3.setRealUrl("http://zxc.com");
        shortenedUrl3.setShortenedUrl("https://pbid.io/ab12cd34");
        shortenedUrl3.setNumberOfVisit(0);
        shortenedUrl3.setExpireDate(currentDate);
        shortenedUrl3.setCreateDate(currentDate);

        await wrapper.setProps({
            shortenedUrls: [shortenedUrl1, shortenedUrl2, shortenedUrl3]
        });

        const historyItems = wrapper.findAllComponents(HistoryItem);

        expect(historyItems.length).toBe(3);
    });

    test(`Component emits ${AppEvents.DELETE_HISTORY_ITEM} event when any of the children fires it`, async () => {
        const historyItem = wrapper.findComponent(HistoryItem);
        const btn = historyItem.find("button");
        btn.trigger("click");

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted().DELETE_HISTORY_ITEM).toBeTruthy();
		expect(wrapper.emitted().DELETE_HISTORY_ITEM?.length).toBe(1);
    });
});
