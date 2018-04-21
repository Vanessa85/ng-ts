import { ReflectiveInjector } from '@angular/core';

class EmailService {}

// Each injector creates it’s own instance of a dependency
let injector = ReflectiveInjector.resolveAndCreate([EmailService]);
let childInjector = injector.resolveAndCreateChild([EmailService]);

console.log(injector.get(EmailService) === childInjector.get(EmailService)); // false

// Child injectors forward requests to their parent injector if they can’t resolve the token locally.
injector = ReflectiveInjector.resolveAndCreate([EmailService]);
childInjector = injector.resolveAndCreateChild([]);

console.log(injector.get(EmailService) === childInjector.get(EmailService)); // true