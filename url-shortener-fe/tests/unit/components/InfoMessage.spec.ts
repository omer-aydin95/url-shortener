import {mount} from "@vue/test-utils";
import InfoMessage from "../../../src/components/InfoMessage.vue";

describe("InfoMessage Component Tests", () => {
    const testMsg = "Info test message!!!";

	const wrapper = mount(InfoMessage, {
		propsData: {
			msg: testMsg
		}
    });
    
    test("Component has a p tag", () => {
        const p = wrapper.find("p");

        expect(p.exists()).toBe(true);
    });

    test("Component has 'msg' in the props", () => {
        expect(wrapper.vm.$props.msg).toBeTruthy();
    });

    test(`Component's test message is equal to '${testMsg}'`, () => {
        expect(wrapper.vm.$props.msg).toBe(testMsg);
    });

    test(`Component displays the '${testMsg}' message`, () => {
		expect(wrapper.text()).toContain(testMsg);
	});
});
