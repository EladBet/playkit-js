//@flow
import getLogger from '../utils/logger'

/**
 * Engine Provider
 * @classdesc
 */
export default class EngineProvider {
  /**
   * The logger of the Engine provider.
   * @member {any} _logger
   * @static
   * @private
   */
  static _logger: any = getLogger('EngineProvider');

  /**
   * The Engine adapter registry.
   * @member {Array<IEngine>} _engineProviders
   * @static
   * @private
   */
  static _engineProviders: Array<typeof IEngine> = [];

  /**
   * Add an engine to the registry.
   * @function register
   * @param {IEngine} engine -  The engine to register.
   * @static
   * @returns {void}
   */
  static register(engine: typeof IEngine): void {
    if (engine) {
      if (!EngineProvider._engineProviders.includes(engine)) {
        EngineProvider._logger.debug(`Adapter <${engine.id}> has been registered successfully`);
        EngineProvider._engineProviders.push(engine);
      } else {
        EngineProvider._logger.debug(`Adapter <${engine.id}> is already registered, do not register again`);
      }
    }
  }

  /**
   * Remove an engine from the registry.
   * @function unRegister
   * @param {IEngine} engine - The engine to unRegister.
   * @static
   * @returns {void}
   */
  static unRegister(engine: typeof IEngine): void {
    let index = EngineProvider._engineProviders.indexOf(engine);
    if (index > -1) {
      EngineProvider._logger.debug(`Unregistered <${engine.id}> adapter`);
      EngineProvider._engineProviders.splice(index, 1);
    }
  }

  /**
   * Get the appropriate Engines.
   * @function getMediaSourceAdapter
   * @returns {Array<IEngine>|null} - The Array of engines, or null if such doesn't exists.
   * @static
   */
  static getEngines(): ?Array<typeof IEngine> {
    if (EngineProvider._engineProviders) {
      return EngineProvider._engineProviders;
    }
    return null;
  }

  /**
   * Destroys and clear the registered engines
   * @static
   * @returns {void}
   */
  static destroy(): void {
    EngineProvider._engineProviders = [];
  }
}

const registerEngine = EngineProvider.register;
export {registerEngine,EngineProvider};

