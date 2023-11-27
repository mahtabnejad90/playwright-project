import { Page, Locator } from '@playwright/test';

export class BookingPageObjects {

  readonly page: Page;
  //add locators references here


  constructor(page: Page) {
    this.page = page;
    // add 
  }
}
