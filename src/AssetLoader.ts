import { Assets } from "pixi.js";
import { manifest } from "./assets";

export class AssetLoader {
  private static instance: AssetLoader; // singleton instance holder
  private loadedBundles: Set<string> = new Set();

  private constructor() {}

  // singleton
  public static getInstance(): AssetLoader {
    if (!AssetLoader.instance) {
      AssetLoader.instance = new AssetLoader();
      AssetLoader.instance.init();
    }
    return AssetLoader.instance;
  }

  public async init() {
    await Assets.init({ manifest });
  }

  public async loadBundle(bundleName: string, loadNext: boolean = true) {
    if (this.loadedBundles.has(bundleName)) {
      return;
    }

    await Assets.loadBundle(bundleName);
    this.loadedBundles.add(bundleName);

    if (loadNext) {
      console.log(loadNext, bundleName)
      this.backgroundLoadNextBundle(bundleName);
    }
  }

  private backgroundLoadNextBundle(currentBundleName: string) {
    const currentBundleIndex = manifest.bundles.findIndex(
      (b) => b.name === currentBundleName
    );
    const nextBundle = manifest.bundles[currentBundleIndex + 1];
    
    if (nextBundle) {
      Assets.backgroundLoadBundle([nextBundle.name]);
      console.log('next is loaded', nextBundle)
    }
  }

  public getAsset(assetName: string) {
    return Assets.get(assetName);
  }
}
