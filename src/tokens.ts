import { ReflectiveInjector, InjectionToken } from '@angular/core';

// first: using string
// { provide: 'EmailService', useClass: MandrillService }
/**
 * Second: base class
 */
class EmailService { };
class MandrillService extends EmailService { };
class SendGridService extends EmailService { };

let injector = ReflectiveInjector.resolveAndCreate([
  { provide: EmailService, useClass: MandrillService }
]);

let emailService = injector.get(EmailService);
console.log(emailService); // MandrillService {}

/**
 * Third: InjectionToken
 */
let EmailService2 = new InjectionToken<string>('EmailService');
injector = ReflectiveInjector.resolveAndCreate([
  { provide: EmailService, useClass: SendGridService }
]);

console.log(injector.get(EmailService)); // SendGridService {}