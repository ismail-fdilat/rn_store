import dokan from './dokan-service.js';
import wcfm from './wcfm-service.js';

export const WCFM = 'wcfm';
export const DOKAN = 'dokan';

export const PLUGIN_VENDOR_INSTALLED = 'wcfm';

const services = PLUGIN_VENDOR_INSTALLED === WCFM ? wcfm : dokan;

// Ex: services.getProducts

export default services;
