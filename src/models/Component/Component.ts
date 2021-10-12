import { string } from '../../utils';

/**
 * The Laconic Component class.
 *
 * @public
 */
export default abstract class Component extends HTMLElement {
  public props: Record<string, string> = {};

  /**
   * HTML Web Component lifecycle method for when this Component is appended into a DOM.
   */
  // TODO - implement on-connection items.
  abstract connectedCallback(): void

  /**
   * HTML Web Component lifecycle method for when this Component is disconnected from a DOM.
   */
  // TODO - clean up.
  abstract disconnectedCallback(): void

  /**
   * HTML Web Component lifecycle method for when this Component is moved to a new DOM.
   */
  // TODO - implement shadow-dom cleanup.
  abstract adoptedCallback(): void

  /**
   * HTML Web Component lifecycle method for when an attribute is updated on this Component.
   *
   * @param name - The name of the attribute that was changed.
   * @param previous - The previous value of the changed attribute.
   * @param next - The updated value of the changed attribute.
   */
  private attributeChangedCallback(name: string, previous: string, next: string): void {
    this.props[name] = next;
    this.innerHTML = this.render(this.props);
  }

  /**
   * HTML Web Component accessor method for retreiving which attributes to observe.
   *
   * @returns - An array of attribute names.
   */
  private static get observedAttributes(): Array<string> {
    return Object.keys(this.props);
  }

  /**
   * Render this component as a string.
   *
   * @param properties - Properties of this Component.
   * @returns - An HTML string representing this component.
   */
  public abstract render(props: Record<string, string>): string;

  /**
   * Namespace of this component.
   *
   * @returns - The namespace of this component.
   */
  public static get namespace(): string {
    return string.toKabab(this.name);
  }

  /**
   * Get the properties associated with this Component.
   *
   * @returns - An object containing property names and their options.
   */
  public static get props(): Record<string, string> {
    return {};
  }

  /**
   * Register this Component.
   *
   * @param name - Name to register the provided Component as.
   * @param component - Component to register against the provided name.
   */
  public static register(name: string, component: typeof Component): void {
    if (customElements.get(component.namespace)) {
      return;
    }

    // NOTE - Disabling ESLint for the next line as there's an explicit type mismatch.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customElements.define(component.namespace, component as any);
  }
}
