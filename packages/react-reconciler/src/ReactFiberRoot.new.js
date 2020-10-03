/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {FiberRoot, SuspenseHydrationCallbacks} from './ReactInternalTypes';
import type {RootTag} from './ReactRootTags';

import {noTimeout, supportsHydration} from './ReactFiberHostConfig';
import {createHostRootFiber} from './ReactFiber.new';
import {
  NoLanes,
  NoLanePriority,
  NoTimestamp,
  createLaneMap,
} from './ReactFiberLane';
import {
  enableSchedulerTracing,
  enableSuspenseCallback,
} from 'shared/ReactFeatureFlags';
import {unstable_getThreadID} from 'scheduler/tracing';
import {initializeUpdateQueue} from './ReactUpdateQueue.new';
import {LegacyRoot, BlockingRoot, ConcurrentRoot} from './ReactRootTags';

// FiberRootNode 和 FiberNode 的区别和作用分别是什么？属性差异挺大的。
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag; // LegacyRoot 或者 ConcurrentRoot
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null; // FiberNode
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null; // 提供给子组件的上下文。
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.callbackNode = null; // Task ?
  this.callbackPriority = NoLanePriority;
  this.eventTimes = createLaneMap(NoLanes); // Array<number>
  this.expirationTimes = createLaneMap(NoTimestamp);

  // NoLanes -> 0
  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;

  this.entangledLanes = NoLanes;
  this.entanglements = createLaneMap(NoLanes);

  if (supportsHydration) {
    this.mutableSourceEagerHydrationData = null;
  }

  if (enableSchedulerTracing) {
    this.interactionThreadID = unstable_getThreadID();
    this.memoizedInteractions = new Set();
    // Interaction = { __count: number, id: number, name: string, timestamp: number }
    // new Map<number, Set<Interaction>>()
    this.pendingInteractionMap = new Map();
  }
  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null;
  }

  if (__DEV__) {
    switch (tag) {
      case BlockingRoot:
        this._debugRootType = 'createBlockingRoot()';
        break;
      case ConcurrentRoot:
        this._debugRootType = 'createRoot()';
        break;
      case LegacyRoot:
        this._debugRootType = 'createLegacyRoot()';
        break;
    }
  }
}

// createContainer 会调用这里来创建一个 FiberRootNode 。
export function createFiberRoot(
  containerInfo: any,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
): FiberRoot {
  const root: FiberRoot = (new FiberRootNode(containerInfo, tag, hydrate): any);
  if (enableSuspenseCallback) {
    root.hydrationCallbacks = hydrationCallbacks;
  }

  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  // 互相引用。
  const uninitializedFiber = createHostRootFiber(tag); // -> FiberNode, FiberNode.tag = HostRoot;
  root.current = uninitializedFiber; // root 的 FiberNode 。
  uninitializedFiber.stateNode = root; // FiberNode 的 stateNode 是 FiberRootNode 。

  initializeUpdateQueue(uninitializedFiber); // fiber.updateQueue = { baseState, firstBaseState, lastBaseState ... }

  return root;
}
