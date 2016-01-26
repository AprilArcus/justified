declare class HTMLParagraphElement extends HTMLElement {
  align: string;
}

declare class NodeFilter {
  static SHOW_ALL: number;
  static SHOW_ATTRIBUTE: number;
  static SHOW_CDATA_SECTION: number;
  static SHOW_COMMENT: number;
  static SHOW_DOCUMENT: number;
  static SHOW_DOCUMENT_FRAGMENT: number;
  static SHOW_DOCUMENT_TYPE: number;
  static SHOW_ELEMENT: number;
  static SHOW_ENTITY: number;
  static SHOW_ENTITY_REFERENCE: number;
  static SHOW_NOTATION: number;
  static SHOW_PROCESSING_INSTRUCTION: number;
  static SHOW_TEXT: 4;
  static FILTER_ACCEPT: number;
  static FILTER_REJECT: number;
  static FILTER_SKIP: number;
  // should return an enum. one of:
  // NodeFilter.FILTER_ACCEPT or
  // NodeFilter.FILTER_REJECT or
  // NodeFilter.FILTER_SKIP
  acceptNode(node: Node): number;
}

declare class NodeIterator<T> {
  root: Node;
  whatToShow: number;
  filter: NodeFilter;
  expandEntityReferences: boolean;
  referenceNode: Node;
  pointerBeforeReferenceNode: boolean;
  detach(): void;
  previousNode(): T | null;
  nextNode(): T | null;
}

declare class TreeWalker<T> {
  root: Node;
  whatToShow: number;
  filter: NodeFilter;
  expandEntityReferences: boolean;
  currentNode: T;
  parentNode(): T | null;
  firstChild(): T | null;
  lastChild(): T | null;
  previousSibling(): T | null;
  nextSibling(): T | null;
  previousNode(): T | null;
  nextNode(): T | null;
}

type ElementRegistrationOptions = {
  prototype?: {
    createdCallback?: () => void;
    attachedCallback?: () => void;
    detachedCallback?: () => void;
    attributeChangedCallback?: (
      attributeLocalName: string,
      oldAttributeValue: ?string,
      newAttributeValue: ?string,
      attributeNamespace: ?string
    ) => void;
  };
  extends?: string;
}

declare class DocumentExtras extends Document {
  registerElement(type: string, options?: ElementRegistrationOptions): any;
  createNodeIterator(root: Node, whatToShow: 4, filter: ?NodeFilter): NodeIterator<Text>;
  createNodeIterator(root: Node, whatToShow: ?number, filter: ?NodeFilter): NodeIterator<Node>;
  createTreeWalker(root: Node, whatToShow: 4, filter: ?NodeFilter, entityReferenceExpansion: ?boolean): TreeWalker<Text>;
  createTreeWalker(root: Node, whatToShow: ?number, filter: ?NodeFilter, entityReferenceExpansion: ?boolean): TreeWalker<Node>;
}

declare var document: DocumentExtras;
