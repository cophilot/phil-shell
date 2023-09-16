import { Dir } from 'src/utils/Dir';
import { PXMPackage } from './PXMPackage';
import { SynonymManager } from 'src/utils/SynonymManager';
import { get_math_package } from './packages/math';
import { System } from 'src/utils/System';
import { Executable } from 'src/utils/Executable';
import { get_echoa_package } from './packages/echoa';

export class PhilExtensionManager {
  public static PXM_MODULES: Dir = PhilExtensionManager.getPXM_MODULES();

  private static PACKAGES: PXMPackage[] =
    PhilExtensionManager.initAllPackages();

  static getPXM_MODULES(): Dir {
    const dir = new Dir('pxm_modules');
    dir.setWritable(false);
    return dir;
  }

  static installAllPAckages(log: string[]): boolean {
    let avPkgs = PhilExtensionManager.getAvailablePackages(false);
    if (avPkgs.length == 0) {
      log.push('No packages available');
      return false;
    }
    log.push('Installing all available packages...');
    for (let pkg of avPkgs) {
      if (!PhilExtensionManager.installPackage(pkg, log)) {
        log.push(
          SynonymManager.colorString('ERROR', 'red') +
            `: Failed to install package ${pkg}`
        );
        return false;
      }
    }
    log.push('All packages installed successfully');
    return true;
  }

  static installPackage(packageName: string, log: string[]): boolean {
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
      log.push('Installing command ' + file.name + '...');
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

  static uninstallAllPackages(): string[] {
    const log: string[] = [];
    const installedPackages = PhilExtensionManager.getInstalledPackages(false);
    if (installedPackages.length == 0) {
      log.push('No packages installed');
      return log;
    }
    log.push('Uninstalling all packages...');
    for (let pkg of installedPackages) {
      let a = PhilExtensionManager.uninstallPackage(pkg);
      a.forEach((e) => {
        log.push(e);
      });
    }
    log.push('All packages uninstalled successfully');
    return log;
  }

  static uninstallPackage(packageName: string): string[] {
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

  static getInstalledPackages(withInfos: boolean): string[] {
    let packageNames = PhilExtensionManager.PXM_MODULES.entries.map(
      (entry) => entry.name
    );
    if (!withInfos) {
      return packageNames;
    }
    let result: string[] = [];
    packageNames.forEach((packageName, index) => {
      PhilExtensionManager.getPackageInfos(packageName, false)?.forEach(
        (info) => {
          result.push(info);
        }
      );
    });
    return result;
  }

  static getAvailablePackages(withInfos: boolean): string[] {
    let packageNames = PhilExtensionManager.PACKAGES.map((pkg) => pkg.name);
    packageNames = packageNames.filter(
      (name) => !PhilExtensionManager.PXM_MODULES.getEntry(name)
    );
    if (!withInfos) {
      return packageNames;
    }
    let result: string[] = [];
    packageNames.forEach((packageName, index) => {
      PhilExtensionManager.getPackageInfos(packageName, false)?.forEach(
        (info) => {
          result.push(info);
        }
      );
    });
    return result;
  }

  static getPackageInfos(
    packageName: string,
    long: boolean
  ): string[] | undefined {
    const pkg = PhilExtensionManager.PACKAGES.find(
      (pkg) => pkg.name === packageName
    );
    if (!pkg) {
      return undefined;
    }
    if (long) {
      return [
        pkg.name,
        'v' + pkg.version,
        '',
        pkg.description,
        '',
        'Dependencies:',
        ...pkg.dependencies.map((dep) => '- ' + dep),
      ];
    }
    return [pkg.name + '@' + pkg.version + ' - ' + pkg.description];
  }

  private static initAllPackages(): PXMPackage[] {
    let packages = [get_math_package(), get_echoa_package()];
    return packages;
  }
}
