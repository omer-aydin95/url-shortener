export default class AppUtils {
    public static getRandomShort(numberOfChar: number): string {
        let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let short = "";
    
        for(let i = 0; i < numberOfChar; i++) {
            let randomIndex = Math.floor(Math.random() * (chars.length + 1));
    
            short += chars.charAt(randomIndex);
        }
    
        return short;
    }
}
