import {mount} from "@vue/test-utils";
import Dialog from "../../../src/components/Dialog.vue";
import AppEvents from "../../../src/constants/AppEvents";

describe("Dialog Component Tests", () => {
	const testMsg = "Dialog test message!!!";

	const wrapper = mount(Dialog, {
		propsData: {
			msg: testMsg
		}
	});

	test("Component has a button", () => {
		const btn = wrapper.find("button");

		expect(btn.exists()).toBe(true);
	});

	test("Component has a p tag", () => {
		const p = wrapper.find("p");

		expect(p.exists()).toBe(true);
	});

	test("Component has 'msg' in the props", () => {
		expect(wrapper.vm.$props.msg).toBeTruthy();
	});

	test(`Component's message is equal to '${testMsg}'`, () => {
		expect(wrapper.vm.$props.msg).toBe(testMsg);
	});

	test(`Component emits ${AppEvents.CLOSE_DIALOG} event when button clicked`, async () => {
		const btn = wrapper.find("button");
		btn.trigger("click");

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().CLOSE_DIALOG).toBeTruthy();
		expect(wrapper.emitted().CLOSE_DIALOG?.length).toBe(1);
	});
});
