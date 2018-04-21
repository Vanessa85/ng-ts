import { ReflectiveInjector  } from '@angular/core';

class MandrillService {};
class SendGridService {};

let injector = ReflectiveInjector.resolveAndCreate([
  MandrillService,
  SendGridService
]);

let emailService = injector.get(MandrillService);
let emailService2 = injector.get(MandrillService);

console.log(emailService);
console.log(emailService === emailService2);