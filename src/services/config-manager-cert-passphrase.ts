import { logger } from './logger';

const argvParser = require('minimist');
const PASSPHRASE_ARGUMENT = 'passphrase';
const PASSPHRASE_ENV = 'GATEWAY_PASSPHRASE';

export namespace ConfigManagerCertPassphrase {
  // this adds a level of indirection so we can test the code
  export const bindings = {
    _exit: process.exit,
  };

  export const readPassphrase = (): string | undefined => {
    const argv = argvParser(process.argv, { string: [PASSPHRASE_ARGUMENT] });
    if (argv[PASSPHRASE_ARGUMENT]) {
      return argv[PASSPHRASE_ARGUMENT];
    } else if (process.env[PASSPHRASE_ENV]) {
      return process.env[PASSPHRASE_ENV];
    }

    // the compiler does not know that bindings._exit() will end the function
    // so we need a return to satisfy the compiler checks
    logger.error(
      `The passphrase has to be provided by argument (--${PASSPHRASE_ARGUMENT}=XXX) or in an env variable (export ${PASSPHRASE_ENV}=XXX)`,
    );
    bindings._exit();
    return;
  };
}
