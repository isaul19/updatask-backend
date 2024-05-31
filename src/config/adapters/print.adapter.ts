import colors from "colors";

export class Print {
  public static success(text: string): void {
    console.log(colors.bgGreen(text));
  }

  public static error(text: string): void {
    console.log(colors.bgRed(text));
  }

  public static warning(text: string): void {
    console.log(colors.bgYellow(text));
  }
}
