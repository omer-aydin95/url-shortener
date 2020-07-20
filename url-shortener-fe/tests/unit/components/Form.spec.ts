import {mount} from "@vue/test-utils";
import Form from "../../../src/components/Form.vue";

describe("Form Component Tests", () => {
    const wrapper = mount(Form);

    test("Component has an input text", () => {
        const input = wrapper.find("input");

        expect(input.exists()).toBe(true);
        expect(input.element.getAttribute("type")).toBe("text");
    });

    test("Component has a submit button", () => {
        const btn = wrapper.find("button");

        expect(btn.exists()).toBe(true);
        expect(btn.element.getAttribute("type")).toBe("submit");
    });

    test("Component has a form", () => {
        const form = wrapper.find("form");

        expect(form.exists()).toBe(true);
    });

    test("Input element does not have 'error' class by default", () => {
        const input = wrapper.find("input");

        expect(input.classes().includes("error")).toBe(false);
    });

    test("Input element has 'error' class when wrong input", async () => {
        const form = wrapper.find("form");
        const input = wrapper.find("input");

        await wrapper.setData({urlInput: ""});
        form.trigger("submit");
        await wrapper.vm.$nextTick();
        expect(input.classes()).toContain("error");

        await wrapper.setData({urlInput: "http://asd"});
        form.trigger("submit");
        await wrapper.vm.$nextTick();
        expect(input.classes()).toContain("error");

        await wrapper.setData({urlInput: "asd"});
        form.trigger("submit");
        await wrapper.vm.$nextTick();
        expect(input.classes()).toContain("error");
    });
});
