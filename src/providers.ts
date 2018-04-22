import { ReflectiveInjector } from '@angular/core';

class MandrillService { };
class SendGridService { };
class GenericEmailService { };

// let injector = ReflectiveInjector.resolveAndCreate([
//   { provide: MandrillService, useClass: MandrillService },
//   { provide: SendGridService, useClass: SendGridService }
// ]);
// provide -> token (string or an instance of something called and InjectionToken)
// shortcut
// let injector = ReflectiveInjector.resolveAndCreate([
//   MandrillService,
//   SendGridService
// ]);

let injector = ReflectiveInjector.resolveAndCreate([
  { provide: 'EmailService', useClass: MandrillService }
]);

let emailService = injector.get('EmailService');
console.log(emailService); // new MandrillService()

/**
 * 2
 */

injector = ReflectiveInjector.resolveAndCreate([
  { provide: GenericEmailService, useClass: GenericEmailService },
  { provide: MandrillService, useExisting: GenericEmailService },
  { provide: SendGridService, useExisting: GenericEmailService }
]);

let emailService1 = injector.get(SendGridService);
console.log(emailService1); // GenericEmailService {}
let emailService2 = injector.get(MandrillService);
console.log(emailService2); // GenericEmailService {}
let emailService3 = injector.get(GenericEmailService);
console.log(emailService3); // GenericEmailService {}
console.log(emailService1 === emailService2 && emailService2 === emailService3); // true 

/**
 * 3: useValue
 */
injector = ReflectiveInjector.resolveAndCreate([
  { provide: 'APIKey', useValue: 'XDFDDF545' }
]);

let apiKey = injector.get('APIKey');
console.log(apiKey); // XDFDDF545

injector = ReflectiveInjector.resolveAndCreate([
  { provide: 'Config', useValue: Object.freeze({ APIKey: 'XDFDFG3', APISecret: '55-1546-54' }) }
]);
console.log(injector.get('Config'));

/**
 * 4: useFactory
 */
const isProd = true;
injector = ReflectiveInjector.resolveAndCreate([
  {
    provide: 'EmailService',
    useFactory: () => {
      if (isProd) {
        return new MandrillService();
      } else {
        return new SendGridService();
      }
    }
  }
]);

console.log(injector.get('EmailService')); // MandrillService {}
// let emailService1 = injector.get(EmailService);
// let emailService2 = injector.get(EmailService);
// console.log(emailService2 === emailService2); // true 