import { PhilExtensionManager } from 'src/pxm/PhilExtensionManager';
import { Executable } from '../Executable';

export function get_pxm() {
  return new Executable(
    'pxm',
    {
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
        if (args[0] == 'available' || args[0] == 'av') {
          if (args.length != 1) return ['pxm: too many arguments'];

          const allPackages = PhilExtensionManager.getAvailablePackages(true);
          allPackages.push(allPackages.length + ' packages available');
          return allPackages;
        }
        if (args[0] == 'install' || args[0] == 'i') {
          if (args.length != 2) return ["pxm: missing operand after 'install'"];
          let log: string[] = [];
          if (args[1] == 'all') {
            PhilExtensionManager.installAllPAckages(log);
            return log;
          }
          PhilExtensionManager.installPackage(args[1], log);
          return log;
        }
        if (args[0] == 'uninstall') {
          if (args.length != 2)
            return ["pxm: missing operand after 'uninstall'"];
          if (args[1] == 'all')
            return PhilExtensionManager.uninstallAllPackages();
          return PhilExtensionManager.uninstallPackage(args[1]);
        }

        return ['pxm: invalid argument'];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '***********************************',
      '*** phil extension manager HELP ***',
      '***********************************',
      ' ',
      'Manage phil extensions',
      ' ',
      'pxm available',
      'List all available packages',
      ' ',
      'pxm list',
      'List all installed packages',
      ' ',
      'pxm install [package]',
      'Install a package',
      ' ',
      'pxm install all',
      'Install all available packages',
      ' ',
      'pxm uninstall [package]',
      'Uninstall a package',
      ' ',
      'pxm uninstall all',
      'Uninstall all installed packages',
      ' ',
    ]
  );
}
