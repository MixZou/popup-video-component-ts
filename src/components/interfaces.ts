export interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}

export interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  position?: string;
  mask?: boolean;
  content?: (content: HTMLElement) => void;
}

export interface Ivideo {
  url: string;
  elem: string | HTMLElement;
  width?: string;
  height?: string;
  autoplay?: boolean;
}
