import { ReflectiveInjector  } from '@angular/core';

class MandrillService {};
class SendGridService {};

let injector = ReflectiveInjector.resolveAndCreate([
  MandrillService,
  SendGridService
]);

let emailService = injector.get(MandrillService);
emailService.foo = 'foo!';
let emailService2 = injector.get(MandrillService);

console.log(emailService);
// Dependency caching
console.log(emailService === emailService2);
console.log(emailService2.foo);