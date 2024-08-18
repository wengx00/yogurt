/// <reference types="vite/client" />

declare namespace React {
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    onPointerEnterCapture?: any;
    onPointerLeaveCapture?: any;
  }
}