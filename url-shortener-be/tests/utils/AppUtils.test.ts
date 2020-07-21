import AppUtils from "../../src/utils/AppUtils";

describe("AppUtils Tests", () => {
    test("There is no duplicate random short string in 10000 8 char string generation", () => {
        const generatedShortStrings = new Array<String>();

        let duplicate: number = 0;

        for(let i = 0; i < 10000; i++) {
            const generatedShortString: string = AppUtils.getRandomShort(8);

            if(generatedShortStrings.includes(generatedShortString)) {
                duplicate++;
            }

            generatedShortStrings.push(generatedShortString);
        }

        expect(duplicate).toBe(0);
    });
});
