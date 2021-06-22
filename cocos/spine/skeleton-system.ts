import { EDITOR } from 'internal:constants';
import { director, Director } from '../core/director';
import { System } from '../core/components';
import { legacyCC } from '../core/global-exports';
import { Skeleton } from './skeleton';
import { Scheduler } from '../core/scheduler';

export class SkeletonSystem extends System {
    /**
     * @en
     * The ID flag of the system.
     * @zh
     * 此系统的 ID 标记。
     */
    static readonly ID = 'SKELETON';

    /**
     * @en
     * Gets the instance of the tween system.
     * @zh
     * 获取Spine骨骼系统的实例。
     */

    // static get instance (): SkeletonSystem {
    //     return SkeletonSystem._instance;
    // }

    public static _instance: SkeletonSystem;

    protected _skeleton : Skeleton| null = null;

    // protected _onEnable = false;

    private static _skeletonCount = 0;

    // constructor () {
    //     super();
    //     SkeletonSystem._skeletonCount = 0;
    // }

    // public onEnable () {
    //     if (!this._onEnable) {
    //         this._onEnable = true;
    //     }
    // }

    // public onDisable () {
    //     this._onEnable = false;
    // }

    postUpdate (dt: number) {
        if (!this._skeleton) {
            return;
        }
        this._skeleton.updateAnimation(dt);
    }

    public registerSkeleton (skeleton: Skeleton | null) {
        if (!skeleton) return;
        SkeletonSystem._skeletonCount++;
        this._skeleton = skeleton;
    }

    public unregisterSkeleton () {
        SkeletonSystem._skeletonCount--;
    }
}

director.once(Director.EVENT_INIT, () => {
    initSkeletonSystem();
});

function initSkeletonSystem () {
    const oldIns = SkeletonSystem._instance;
    if (oldIns) {
        director.unregisterSystem(oldIns);
    }
    const sys = new SkeletonSystem();
    (SkeletonSystem._instance as any) = sys;
    director.registerSystem(SkeletonSystem.ID, sys, 100);
}

legacyCC.internal.SpineSkeletonSystem = SkeletonSystem;
