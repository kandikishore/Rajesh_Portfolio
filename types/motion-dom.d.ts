declare module "motion-dom" {
  export type AnyResolvedKeyframe = any;
  export type AnimationOptions = any;
  export type AnimationPlaybackControls = any;
  export type AnimationPlaybackControlsWithThen = any;
  export type AnimationPlaybackOptions = any;
  export type ArcOptions = any;
  export type DelayedFunction = (...args: any[]) => any;
  export type DOMKeyframesDefinition = any;
  export type ElementOrSelector = any;
  export type EventInfo = any;
  export type Feature = any;
  export type FollowValueOptions = any;
  export type IProjectionNode = any;
  export type KeyframeResolver<T = any> = any;
  export type LegacyAnimationControls = any;
  export type MotionNodeOptions = any;
  export type MotionPath = any;
  export type MotionValueEventCallbacks = Record<string, any>;
  export type NodeGroup = any;
  export type OnKeyframesResolved<T = any> = (...args: any[]) => any;
  export type PresenceContextProps = any;
  export type ResolvedValues = Record<string, any>;
  export type SpringOptions = any;
  export type SVGPathProperties = Record<string, any>;
  export type TransformOptions = any;
  export type TransformProperties = Record<string, any>;
  export type Transition = any;
  export type UnresolvedValueKeyframe = any;
  export type ValueAnimationTransition = any;
  export type VisualElement = any;
  export type WillChange = any;

  export class MotionValue<T = any> {
    constructor(init?: T);
    get(): T;
    set(value: T): void;
    on(eventName: string, callback: (...args: any[]) => void): () => void;
  }

  export const FlatTree: any;
  export const optimizedAppearDataAttribute: string;
  export const visualElementStore: any;

  export function addScaleCorrector(...args: any[]): any;
  export function animateVisualElement(...args: any[]): any;
  export function arc(...args: any[]): any;
  export function buildTransform(...args: any[]): any;
  export function calcLength(...args: any[]): any;
  export function createBox(...args: any[]): any;
  export function delay(...args: any[]): any;
  export function resolveMotionValue(...args: any[]): any;
}
