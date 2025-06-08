import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  imports: [],
  template: `
    <p>
      checkout works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {

}
