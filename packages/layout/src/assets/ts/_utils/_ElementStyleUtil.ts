export class ElementStyleUtil {
  public static set(
    element: HTMLElement,
    property: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any,
    important?: boolean
  ) {
    if (important) {
      element.style.setProperty(property, value, "important");
    } else {
      element.style.setProperty(property, value);
    }
  }

  public static get(element: HTMLElement, attributeName: string) {
    return element.style.getPropertyValue(attributeName);
  }

  public static remove(element: HTMLElement, attibuteName: string) {
    element.style.removeProperty(attibuteName);
  }
}
