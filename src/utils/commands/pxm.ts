import { PhilExtensionManager } from 'src/pxm/PhilExtensionManager';
import { Executable } from '../Executable';

export function get_pxm() {
  return new Executable('pxm', {
    execute: (args) => {
      if (args.length == 0) return ['pxm: missing operand'];
      if (args[0] == 'list' || args[0] == 'ls') {
        if (args.length != 1) return ['pxm: too many arguments'];

        const installedPackages =
          PhilExtensionManager.getInstalledPackages(true);
        installedPackages.push(
          installedPackages.length + ' packages installed'
        );
        return installedPackages;
      }
      if (args[0] == 'install' || args[0] == 'i') {
        if (args.length != 2) return ["pxm: missing operand after 'install'"];
        let log: string[] = [];
        PhilExtensionManager.installPackage(args[1], log);
        return log;
      }
      if (args[0] == 'uninstall') {
        if (args.length != 2) return ["pxm: missing operand after 'uninstall'"];
        return PhilExtensionManager.uninstallPackage(args[1]);
      }

      return [];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
