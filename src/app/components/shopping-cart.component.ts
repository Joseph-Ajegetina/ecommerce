import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  imports: [],
  template: `
    <p>
      shopping-cart works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {

}
