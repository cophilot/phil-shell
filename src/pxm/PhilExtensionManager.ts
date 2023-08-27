import { Dir } from 'src/utils/Dir';
import { PXMPackage } from './PXMPackage';
import { SynonymManager } from 'src/utils/SynonymManager';
import { get_math_package } from './packages/math';
import { System } from 'src/utils/System';
import { Executable } from 'src/utils/Executable';

export class PhilExtensionManager {
  public static PXM_MODULES: Dir = PhilExtensionManager.getPXM_MODULES();

  private static PACKAGES: PXMPackage[] =
    PhilExtensionManager.initAllPackages();

  static getPXM_MODULES(): Dir {
    const dir = new Dir('pxm_modules');
    dir.setWritable(false);
    return dir;
  }

  public static installPackage(packageName: string, log: string[]): boolean {
    if (PhilExtensionManager.PXM_MODULES.getEntry(packageName)) {
      log.push(`Package ${packageName} already installed`);
      return true;
    }
    log.push('Installing package ' + packageName + '...');
    const pkg = PhilExtensionManager.PACKAGES.find(
      (pkg) => pkg.name === packageName
    );
    if (!pkg) {
      log.push(
        SynonymManager.colorString('ERROR', 'red') +
          `: Package ${packageName} not found`
      );
      return false;
    }
    if (pkg.dependencies.length > 0) {
      log.push('Installing dependencies for ' + packageName + '...');

      for (let dep of pkg.dependencies) {
        if (!PhilExtensionManager.installPackage(dep, log)) {
          log.push(
            SynonymManager.colorString('ERROR', 'red') +
              `: Failed to install dependency ${dep}`
          );
          return false;
        }
      }
    }
    for (let file of pkg.folder.entries) {
      log.push('Installing file ' + file.name + '...');
      if (file instanceof Executable) {
        if (!System.isSystemCommandNameFree(file.name)) {
          log.push(
            SynonymManager.colorString('ERROR', 'red') +
              `: Command ${file.name} already exists`
          );
          return false;
        }
      }
    }
    this.PXM_MODULES.add(pkg.folder);
    log.push('Package ' + packageName + ' installed successfully');
    return true;
  }

  public static uninstallPackage(packageName: string): string[] {
    const log: string[] = [];
    log.push('Uninstalling package ' + packageName + '...');
    const pkg = PhilExtensionManager.PXM_MODULES.getEntry(packageName);
    if (!pkg) {
      log.push(
        SynonymManager.colorString('ERROR', 'red') +
          `: Package ${packageName} not found`
      );
      return log;
    }
    PhilExtensionManager.PXM_MODULES.removeEntry(packageName);
    log.push('Package ' + packageName + ' uninstalled successfully');
    return log;
  }

  static getInstalledPackages(): string[] {
    return PhilExtensionManager.PXM_MODULES.entries.map((entry) => entry.name);
  }

  private static initAllPackages(): PXMPackage[] {
    let packages = [];
    packages.push(get_math_package());
    return packages;
  }
}
