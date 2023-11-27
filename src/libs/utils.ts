export class Utils {

    static isCustomEnv() {
        return (process.env.PLAYWRIGHT_ENV as string == "1")
      }


}